<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Config;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function responseBadRequest($code, $msg = 'Bad request') {
        return response()->json([
            'message' => $msg,
            'code' => $code
        ], 400);
    }

    public function responseServerError($code) {
        return response()->json([
            'status' => false,
            'message' => "Internal server is error.",
            'code' => $code
        ], 500);
    }

    public function responseSuccess($code, $data) {
        return response()->json([
            'message' => "success",
            'code' => $code,
            'result' => $data
        ], 200);
    }
}
