<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Notifications;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotificationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notifications = Notifications::orderBy('created_at', 'desc')->get();

        return $this->responseSuccess(200, $notifications);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'notification_ids' => 'required',
        ]);

        if ($validatedData->fails()){
            return $this->responseBadRequest("notification_ids field is required.", 400);
        }
        try {
            $notification_ids = $request->notification_ids;

            $notifications = Notifications::whereIn(
                'id', $notification_ids
            )->get();

            foreach ($notifications as $notification) {
                $notification->update(['status' => true]);
            }

            return $this->responseSuccess(200, $notifications);
        } catch (Exception $error) {
            return $this->responseServerError(500);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
