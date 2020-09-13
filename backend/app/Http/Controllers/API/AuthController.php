<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->client = new Client();
    }

    public function login(Request $request, $provider) {
        if ($provider == "google") {
           return $this->checkUserOnGoogle($request->social_token);
        }

        if ($provider == "facebook") {
            return $this->checkUserOnFacebook($request->social_token);
        }
    }

    public function checkUserOnGoogle($social_token) {
        try {
            $checkToken = $this->client->get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=$social_token");
            $responseGoogle = json_decode($checkToken->getBody()->getContents(), true);

            return $this->checkUserByEmail($responseGoogle);
        } catch (\Exception $e) {
            return $this->responseBadRequest(400, 'Token is invalid');
        }
    }

    public function checkUserOnFacebook($social_token) {
        try {
            $checkToken = $this->client->get("https://graph.facebook.com/v8.0/me?access_token=$social_token&fields=email,name,id");
            $responseFacebook = json_decode($checkToken->getBody()->getContents(), true);
            return $this->checkUserByEmail($responseFacebook);
        } catch (\Exception $e) {
            return $this->responseBadRequest(400, 'Token is invalid');
        }
    }

    public function checkUserByEmail($profile) {
        $user = User::where('email', $profile['email'])->first();

        if (!$user) {
            $user = new User;

            $user->name = $profile['name'];
            $user->email = $profile['email'];
            $user->password = bcrypt(Str::random(8));
            $user->telephone = '';
            $user->total_point = 3;
            $user->verified = true;
        }

        $user->forceFill([
            'email' => $user['email'],
            'email_verified_at' => Carbon::now(),
        ])->save();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addMonths(6);
        
        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ]);
    }
}
