<?php

namespace App\Http\Controllers;

use App\Http\Resources\SelectUserResource;
use App\Models\AppCountry;
use App\Models\AppFercapGroup;
use App\Models\AppFercapGroupHasUser;
use App\Models\AppProtocolType;
use App\Models\AppRole;
use App\Models\RecFile;
use App\Models\Survey;
use App\Models\SurveyDiscussionComment;
use App\Models\SurveyDiscussionFile;
use App\Models\SurveyDiscussionRoom;
use App\Models\SurveyFile;
use App\Models\SurveyorList;
use App\Models\SurveyTeam;
use App\Models\UploadedFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    private function saveFile($file, $folder) {
        $fileExtension = $file->getClientOriginalExtension();
        $file_name_original = $file->getClientOriginalName();
        $fileSizeBytes = $file->getSize();
        $uniqueFileName = date('Ymd_His') . '_' . uniqid() . '.' . $fileExtension;
        $folderPath = public_path($folder);

        $savedFile = UploadedFile::create([
            'folder' => $folder,
            'file_name' => $uniqueFileName,
            'original_name' => $file_name_original,
            'size' => $fileSizeBytes,
            'extension' => $fileExtension,
            'uploaded_by' => Auth::user()->id
        ]);

        $file->move($folderPath, $uniqueFileName);
        return $savedFile;
    }

    private function deleteFile($fileId)
    {
        $file = UploadedFile::findOrFail($fileId);
        $folderPath = public_path($file->folder);
        $filePath = $folderPath . '/' . $file->file_name;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        $file->delete();
    }

    public function getSelectUser(Request $request)
    {
        $ferRole = AppRole::where('codename', 'fercap')->first();
        $users = User::whereNot('role_id', 1)->where('role_id', $ferRole->id)->where('status', 1)->get();
        return SelectUserResource::collection($users);
    }

    public function groupUserList($id)
    {
        $groupUsers = AppFercapGroupHasUser::where('group_id', $id)->get()->pluck('user_id');
        return $groupUsers;
    }

    public function getCountries()
    {
        $countries = AppCountry::all()->pluck('name');
        return $countries;
    }

    public function getRoles()
    {
        $roles = AppRole::where('role_type', 'user')->get(['id', 'name'])->toArray();
        return $roles;
    }

    public function getProtocolTypes()
    {
        $protocolTypes = AppProtocolType::where('status', true)->get()->toArray();
        return $protocolTypes;
    }

    public function storeFile(Request $request)
    {
        $request->validate([
            'file_store' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,gif|max:5120', // max size 5MB
        ]);

        try {
            if ($request->hasFile('file_store')) {
                $file = $request->file('file_store');
                $savedFile = $this->saveFile($file, 'uploads/recognition_files');
            } else {
                return response()->json([
                    'message' => 'No file uploaded'
                ], 400);
            }
            return response()->json([
                'file_name' => $savedFile->original_name,
                'file_id' => $savedFile->id
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error saving file',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function handleDeleteFile($file_id)
    {
        try {
            $this->deleteFile($file_id);
            return response()->json([
                'message' => 'File deleted successfully'
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error deleting file',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function getRecognitionFiles($rec_id)
    {
        $rec_files = RecFile::where('recognition_id', $rec_id)->with('getFile')->get();
        return $rec_files;
    }

    public function downloadFile($id)
    {
        $file = UploadedFile::findOrFail($id);
        $folderPath = public_path($file->folder);
        $filePath = $folderPath . '/' . $file->file_name;

        if (file_exists($filePath)) {
            return response()->download($filePath);
        } else {
            return response()->json([
                'message' => 'File not found'
            ], 404);
        }
    }

    public function getFercapGroups() {
        $fercapGroups = AppFercapGroup::where('status', true)->with('users')->get(['id', 'group_name']);
        $respFercapGroups = $fercapGroups->map(function ($group) {
            return [
            'id' => $group['id'],
            'name' => $group['group_name'],
            'total_member' => count($group['users'] ?? []),
            ];
        });
        return $respFercapGroups;
    }

    public function getSurveys() {
        $surveys = Survey::with('fercapGroup')->get(['survey_id', 'description', 'start_date', 'end_date', 'status', 'fercap_group']);
        return $surveys;
    }

    public function joinSurvey($state, $id) {
        try {
            $setStatus = $state === 'join' ? 1 : 0;
            if (SurveyorList::where('survey_id', $id)->where('user_id', Auth::user()->id)->exists()) {
                SurveyorList::where('survey_id', $id)->where('user_id', Auth::user()->id)->update([
                    'status' => $setStatus
                ]);
            } else {
                SurveyorList::create([
                    'survey_id' => $id,
                    'user_id' => Auth::user()->id,
                    'status' => $setStatus
                ]);
            }
            return back()->with('resFormBack', [
                'success' => 'You have successfully ' . ($state === 'join' ? 'joined' : 'left') . ' the survey',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            return back()->with('resFormBack', [
                'success' => 'An error occurred while ' . ($state === 'join' ? 'joining' : 'leaving') . ' the survey',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function getSurveyorList($survey_id) {
        $teammList = SurveyTeam::where('survey_id', $survey_id)->get()->pluck('user_id');
        $surveyorList = SurveyorList::where('survey_id', $survey_id)->where('status', true)->whereNotIn('user_id', $teammList)->with('getUser')->get();
        $respArray = [];
        foreach ($surveyorList as $surveyor) {
            $respArray[] = [
                'id' => $surveyor->getUser->id,
                'name' => $surveyor->getUser->full_name,
                'role' => $surveyor->getUser->role_name,
            ];
        }
        return $respArray;
    }

    public function getSurveyTeam($survey_id) {
        $surveyTeam = SurveyTeam::where('survey_id', $survey_id)->with('getUser')->get();
        $respArray = [];
        foreach ($surveyTeam as $team) {
            $respArray[] = [
                'id' => $team->getUser->id,
                'name' => $team->getUser->full_name,
                'team_role' => $team->getRole->name
            ];
        }
        return $respArray;
    }

    public function getSurveyTeamRoles() {
        $roles = AppRole::where('role_type', 'surveyTeam')->get(['id', 'name'])->toArray();
        return $roles;
    }

    public function storeMessage(Request $request) {
        $message = $request->validate([
            'content' => 'required|string',
            'room_id' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png|max:5120', // max size 5MB
        ]);
        try {
            $chatRoom = SurveyDiscussionRoom::where('room_id', $message['room_id'])->firstOrFail();
            if ($chatRoom->status === 0) {
                return response()->json([
                    'message' => 'The discussion room is closed',
                ], 400);
            }
            $comment =  SurveyDiscussionComment::create([
                'content' => $message['content'],
                'room_id' => $chatRoom->id,
                'created_by' => Auth::user()->id
            ]);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $savedFile = $this->saveFile($file, 'uploads/discussion_files');

                SurveyDiscussionFile::create([
                    'file_id' => $savedFile->id,
                    'room_id' => $chatRoom->id,
                    'comment_id' => $comment->id,
                ]);
            }

            return response()->json([
                'message' => 'Message sent successfully',
            ], 201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error sending message',
            ], 500);
        }
    }

    public function getRoomMessages($room_id) {
        $chatRoom = SurveyDiscussionRoom::where('room_id', $room_id)->firstOrFail();
        $messages = SurveyDiscussionComment::where('room_id', $chatRoom->id)->with(['getUser', 'getFile'])->get();
        $respArray = [];
        foreach ($messages as $message) {
            $respArray[] = [
                'id' => $message->id,
                'name' => $message->getUser->full_name,
                'content' => $message->content,
                'created_at' => $message->created_at->toISOString(),
                'file' => $message->getFile
            ];
        }
        return $respArray;
    }

    public function submitDiscussionFile(Request $request) {
        $request->validate([
            'file_id' => 'required|exists:uploaded_files,id',
            'room_id' => 'required|exists:survey_discussion_rooms,id',
        ]);

        try {
            $discussionRoom = SurveyDiscussionRoom::find($request->room_id);
            if (SurveyFile::where('survey_id', $discussionRoom->survey_id)->where('file_type', $discussionRoom->room_type)->exists()) {
                SurveyFile::where('survey_id', $discussionRoom->survey_id)->where('file_type', $discussionRoom->room_type)->update([
                    'file_id' => $request->file_id,
                    'status' => 1
                ]);
            } else {
                SurveyFile::create([
                    'file_id' => $request->file_id,
                    'survey_id' => $discussionRoom->survey_id,
                    'file_type' => $discussionRoom->room_type,
                ]);
            }

            return back()->with('resFormBack', [
                'success' => 'The file was submitted successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'success' => 'An error occurred while submitting the file',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function removeDiscussionFile($id) {
        try {
            $file = SurveyFile::findOrFail($id);
            $file->delete();

            return back()->with('resFormBack', [
                'success' => 'The file was removed successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'success' => 'An error occurred while removing the file',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function rejectSubmitDiscussionFile($id) {
        try {
            $file = SurveyFile::findOrFail($id);
            $file->status === 0 ? $file->status = 1 : $file->status = 0;
            $file->save();

            return back()->with('resFormBack', [
                'success' => 'The file was rejected successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'success' => 'An error occurred while rejecting the file',
                'timestamp' => now()->toISOString()
            ]);
        }
    }
    public function approveSubmitDiscussionFile($id) {
        try {
            $file = SurveyFile::findOrFail($id);
            $file->status === 2 ? $file->status = 1 : $file->status = 2;
            $file->save();

            return back()->with('resFormBack', [
                'success' => 'The file was rejected successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'success' => 'An error occurred while rejecting the file',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function rejectDiscussionFile(Request $request) {
        $request->validate([
            'file_id' => 'required|exists:uploaded_files,id',
            'message_id' => 'required|exists:survey_discussion_comments,id',
        ]);
        try {
            $file = SurveyDiscussionFile::where('file_id', $request->file_id)->where('comment_id', $request->message_id)->firstOrFail();
            $file->status === 0 ? $file->status = 1 : $file->status = 0;
            $file->save();

            return response()->json([
                'message' => 'The file was rejected successfully',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'An error occurred while rejecting the file',
            ], 500);
        }
    }

    public function getSurveyFileFromType($survey_id, $room_type) {
        $survey = Survey::where('survey_id', $survey_id)->firstOrFail();
        $files = SurveyFile::where('survey_id', $survey->id)->where('file_type', $room_type)->where('status', 2)->with('getFileData')->first();
        return $files;
    }

    public function getSurveyFilesFromType($survey_id, $room_type) {
        $files = SurveyFile::where('survey_id', $survey_id)->where('file_type', $room_type)->with('getFileData')->get();
        return $files;
    }

    public function uploadSurveyFiles(Request $request, $fileType) {
        // $fileType = "public", "private", "report", "action_plan", "evaluation"
        $request->validate([
            'files.*' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:5120', // max size 5MB
        ]);

        try {
            foreach ($request->file('files') ?? [] as $file) {
                $savedFile = $this->saveFile($file, 'uploads/survey_files');
                SurveyFile::create([
                    'file_id' => $savedFile->id,
                    'survey_id' => $request->survey_id,
                    'file_type' => $fileType,
                ]);
            }

            return response()->json([
                'message' => 'Files uploaded successfully',
            ], 201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error uploading files.',
            ], 500);
        }
    }

    public function uploadRecognitionFiles(Request $request) {
        $request->validate([
            'files.*' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:5120', // max size 5MB
        ]);

        try {
            foreach ($request->file('files') ?? [] as $file) {
                $savedFile = $this->saveFile($file, 'uploads/recognition_files');
                RecFile::create([
                    'file_id' => $savedFile->id,
                    'recognition_id' => $request->rec_id,
                    'file_type' => $request->file_type,
                ]);
            }

            return response()->json([
                'message' => 'Files uploaded successfully',
            ], 201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error uploading files.',
            ], 500);
        }
    }

    public function deleteSurveyFile($surveyFileID) {
        try {
            $surveyFile = SurveyFile::findOrFail($surveyFileID);
            $this->deleteFile($surveyFile->file_id);
            $surveyFile->delete();

            return response()->json([
                'message' => 'File deleted successfully.',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error deleting file.',
            ], 500);
        }
    }

    public function deleteRecFile($recFileID) {
        try {
            $recFile = RecFile::findOrFail($recFileID);
            $this->deleteFile($recFile->file_id);
            $recFile->delete();

            return response()->json([
                'message' => 'File deleted successfully.',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error deleting file. ' . $th->getMessage(),
            ], 500);
        }
    }

    public function toggleDiscussionRoomStatus($roomId, $setStatus) {
        try {
            $room = SurveyDiscussionRoom::findOrFail($roomId);
            $room->status = $setStatus;
            $room->save();

            return response()->json([
                'message' => 'Room status updated successfully.',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Error updating room status.' . $th->getMessage(),
            ], 500);
        }
    }
}
