<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Attachment::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "files" => "required"
        ]);

        $files = [];
        if($request->hasfile("files")){
           foreach ($request->file('files') as $key => $file) {
               $fileName = time().rand(1,99).'.'.$file->extension();
               $file-> move(public_path('uploads', $fileName));
                $files[]['name'] = $fileName;
           }
        }



        foreach ($files as $key=>$file){
           Attachment::create($file);
        }

        return response()->json(["message" => "upload successful"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attachment $attachment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attachment $attachment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attachment $attachment)
    {
        //
    }
}
