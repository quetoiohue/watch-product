<?php

namespace App\Http\Controllers\API;

use App\CardPayment;
use App\Http\Controllers\Controller;
use App\Package;
use App\Transaction;
use App\User;
use App\UserPackage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {

    public function whoami() {
        $user = Auth::user();
        $user->products;
        $user->productAlerts;

        return $this->responseSuccess(200, $user);
    }

    public function changeUserTelephone(Request $request) {
        $user = Auth::user();
        $telephone = $request->telephone;

        try {
            $updatedUser = User::find($user->id);
            $updatedUser->telephone = $telephone;

            $updatedUser->save();

            return $this->responseSuccess(200, $updatedUser);
        } catch (\Exception $e) {
            return $this->responseServerError(500);
        }
    }
}