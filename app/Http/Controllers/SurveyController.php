<?php

namespace App\Http\Controllers;

use App\Models\AppRole;
use App\Models\Survey;
use App\Models\SurveyDiscussionRoom;
use App\Models\SurveyFile;
use App\Models\SurveyTeam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $SurveyData = $request->validate([
            'description' => 'required|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'fercap_group' => 'required|integer|exists:app_fercap_groups,id',
            'recognition_id' => 'required|integer|exists:recognitions,id',
        ]);

        try {
            $SurveyData['survey_id'] = Str::uuid();
            $SurveyData['created_by'] = Auth::user()->id;
            $newSurvey = Survey::create($SurveyData);

            $DiscussionRole = AppRole::whereIn('codename', ['surveyor', 'ec'])->get()->pluck('id');
            $room_type = [
                [
                    'type' => 'report',
                    'title' => 'Survey Report',
                ],
                [
                    'type' => 'action_plan',
                    'title' => 'Action Plan',
                ],
                [
                    'type' => 'evaluation',
                    'title' => 'Survey team evaluation',
                ],
            ];

            foreach ($room_type as $typeData) {
                foreach ($DiscussionRole as $roleTarget) {
                    SurveyDiscussionRoom::create([
                        'room_id' => Str::uuid(),
                        'survey_id' => $newSurvey->id,
                        'room_title' => $typeData['title'],
                        'room_type' => $typeData['type'],
                        'target_role' => $roleTarget,
                        'created_by' => Auth::user()->id
                    ]);
                }
            }

            return back()->with('resFormBack', [
                'success' => 'The Survey was created successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'An error occurred while creating the Survey',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $survey = Survey::where('survey_id', $id)->with('fercapGroup', 'simpRecognition')->firstOrFail();
        $disscussionRooms = SurveyDiscussionRoom::where('survey_id', $survey->id)->with('getTargetRole')->get(['room_id', 'room_type', 'target_role', 'status'])->toArray();
        return inertia('Survey/SurveyDetail', [
            'resFormBack' => session('resFormBack') ?? null,
            'survey' => $survey,
            'disscussionRooms' => $disscussionRooms,
        ]);
    }

    public function availableSurvey()
    {
        $surveys = Survey::where('status', 1)->with('simpRecognition', 'isSurveyor', 'isSurveyorTeam')
            ->whereDoesntHave('surveyTeam', function ($query) {
                $query->where('user_id', Auth::user()->id);
        })->get(['survey_id', 'description', 'start_date', 'end_date', 'recognition_id', 'id'])->toArray();
        return inertia('AvailableSurvey/AvailableSurveyPage', [
            'resFormBack' => session('resFormBack') ?? null,
            'surveys' => $surveys,
        ]);
    }

    public function mySurvey()
    {
        $surveys = Survey::with('simpRecognition', 'isSurveyor', 'isSurveyorTeam')
            ->whereHas('surveyTeam', function ($query) {
                $query->where('user_id', Auth::user()->id);
        })->get(['survey_id', 'description', 'start_date', 'end_date', 'recognition_id', 'id'])->toArray();
        return inertia('MySurvey/MySurveyPage', [
            'resFormBack' => session('resFormBack') ?? null,
            'surveys' => $surveys,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $SurveyData = $request->validate([
            'description' => 'required|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'fercap_group' => 'required|integer|exists:app_fercap_groups,id',
        ]);

        try {
            Survey::where('survey_id', $id)->update($SurveyData);

            return back()->with('resFormBack', [
                'success' => 'The Survey was updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'An error occurred while updating the Survey',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Survey::where('survey_id', $id)->delete();

            return back()->with('resFormBack', [
                'success' => 'The Survey was deleted successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'An error occurred while deleting the Survey',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function addSurveyTeam(Request $request, string $surveyId)
    {
        try {
            $teamList = $request->teamList ?? [];
            if (!empty($teamList)) {
                foreach ($teamList as $key => $userId) {
                    if (SurveyTeam::where('survey_id', $surveyId)->where('user_id', $userId)->exists()) {
                        SurveyTeam::where('survey_id', $surveyId)->where('user_id', $userId)->update([
                            'status' => 1
                        ]);
                    } else {
                        SurveyTeam::create([
                            'survey_id' => $surveyId,
                            'user_id' => $userId,
                            'selected_by' => Auth::user()->id
                        ]);
                    }
                }
            }

            $survey = Survey::find($surveyId);

            return to_route('surveys.team.edit', $survey->survey_id)->with('resFormBack', [
                'success' => 'The Survey Team was added successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'An error occurred while adding the Survey Team',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function editSurveyTeam($surveyId)
    {
        $survey = Survey::where('survey_id', $surveyId)->with('fercapGroup', 'simpRecognition')->firstOrFail();
        $surveyTeam = SurveyTeam::where('survey_id', $survey->id)->with('getUser')->get();
        $respArray = [];
        foreach ($surveyTeam as $team) {
            $respArray[] = [
                'id' => $team->getUser->id,
                'name' => $team->getUser->full_name,
                'role' => $team->getUser->role_name,
                'team_role' => $team->role_id ?? ""
            ];
        }
        return inertia('Survey/EditSurveyTeam', [
            'resFormBack' => session('resFormBack') ?? null,
            'survey' => $survey,
            'teamList' => $respArray,
        ]);
    }

    public function saveSurveyTeam(Request $request)
    {
        $request->validate([
            'survey_id' => 'required|exists:surveys,id',
        ]);
        try {
            $teamList = $request->team_member ?? [];
            $surveyId = $request->survey_id;
            $survey = Survey::findOrFail($surveyId);
            if (!empty($teamList)) {
                foreach ($teamList as $key => $role_id) {
                    if (SurveyTeam::where('survey_id', $surveyId)->where('user_id', $key)->exists() && $role_id) {
                        SurveyTeam::where('survey_id', $surveyId)->where('user_id', $key)->update([
                            'role_id' => $role_id
                        ]);
                    }
                }
            }

            return to_route("recognitions.show", $survey->recognition->recognition_id)->with('resFormBack', [
                'success' => 'The Survey Team was saved successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'An error occurred while saving the Survey Team',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function deleteSurveyTeamMember($survey_id, $member_id)
    {
        try {
            SurveyTeam::where('survey_id', $survey_id)->where('user_id', $member_id)->delete();
            return back()->with('resFormBack', [
                'success' => 'The Survey Team Member was deleted successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            return back()->with('resFormBack', [
                'error' => 'An error occurred while deleting the Survey Team Member',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function showDiscussionRoom($survey_id, $room_id)
    {
        $discussionRoom = SurveyDiscussionRoom::where('room_id', $room_id)->with('getTargetRole')->firstOrFail();
        $submitedFiles = SurveyFile::where('survey_id', $discussionRoom->survey_id)->where('file_type', $discussionRoom->room_type)->with('getFileData')->first();
        return inertia('Survey/Discussions/DiscussionRoom', [
            'resFormBack' => session('resFormBack') ?? null,
            'roomData' => $discussionRoom,
            'submitedFile' => $submitedFiles ? [
                'id' => $submitedFiles->id,
                'file_id' => $submitedFiles->file_id,
                'file_data' => $submitedFiles->getFileData,
                'status' => $submitedFiles->status,
            ] : [],
        ]);
    }
}
