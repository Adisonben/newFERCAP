<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecognitionRequest;
use App\Models\AppFercapGroupHasUser;
use App\Models\RecFile;
use App\Models\Recognition;
use App\Models\RecognitionHasProtocol;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class RecognitionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return inertia('Recognition/RecognitionPage', [
            'resFormBack' => session('resFormBack') ?? null,
            'recognitions' => Recognition::orderByDesc('created_at')->get(['recognition_id', 'institute', 'ec_name', 'created_at', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('Recognition/CreateRecognitionPage', [
            'resFormBack' => session('resFormBack') ?? null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RecognitionRequest $request)
    {
        $RecognitionData = $request->validated();
        $newRecId = null;
        try {
            $RecognitionData['recognition_id'] = Str::uuid();
            $RecognitionData['created_by'] = Auth::user()->id;
            $newRecognition = Recognition::create($RecognitionData);
            $newRecId = $newRecognition->id;

            if (!empty($request->common_type)) {
                foreach ($request->common_type as $typeKey => $commonTypeList) {
                    if (!empty($commonTypeList) && is_array($commonTypeList)) {
                        foreach ($commonTypeList as $key => $commonType) {
                            RecognitionHasProtocol::create([
                                'recognition_id' => $newRecognition->id,
                                'protocols_id' => $key,
                                'review_type' => $typeKey,
                                'number' => $commonType,
                            ]);
                        }
                    }
                }
            }

            if (!empty($request->rec_files)) {
                foreach ($request->rec_files as $key => $file) {
                    if ($file !== null) {
                        RecFile::create([
                            'file_id' => $file['file_id'],
                            'recognition_id' => $newRecognition->id,
                            'file_type' => $key
                        ]);
                    }
                }
            }

            return to_route('recognitions.index')->with('resFormBack', [
                'success' => 'Recognition created successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            if ($newRecId !== null) {
                Recognition::where('id', $newRecId)->delete();
            }
            return back()->with('resFormBack', [
                'error' => 'An error occurred while creating the Recognition',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $recognition = Recognition::where('recognition_id', $id)->with('protocols')->firstOrFail();
            $surveyQuery = Survey::with('fercapGroup', 'simpRecognition', 'isSurveyor');

            if (optional(Auth::user()->userRole)->codename === "fercap") {
                $userGroup = AppFercapGroupHasUser::where('user_id', Auth::user()->id)->where('status', true)->pluck('group_id')->toArray();
                $surveyQuery->whereIn('fercap_group', $userGroup ?? []);
            } elseif (optional(Auth::user()->userRole)->codename === "surveyor") {
                // $surveyQuery->where('surveyor_id', Auth::user()->id);
            } else {
                // $surveyQuery->where('status', 1);
            }

            $surveys = $surveyQuery->get(['survey_id', 'description', 'start_date', 'end_date', 'status', 'fercap_group', 'recognition_id', 'id']);
            return inertia('Recognition/RecognitionDetail', [
                'resFormBack' => session('resFormBack') ?? null,
                'recognition' => $recognition,
                'surveys' => $surveys,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'Recognition not found',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $recognition = Recognition::where('recognition_id', $id)->firstOrFail();
        $rec_files = RecFile::where('recognition_id', $recognition->id)->with('getFile')->get();
        $recFiles = [];
        foreach ($rec_files as $file) {
            $recFiles[$file->file_type] = [
                'file_id' => $file->file_id,
                'file_name' => $file->getFile->original_name,
            ];
        }

        $fullboardProtocols = RecognitionHasProtocol::where('recognition_id', $recognition->id)->where('review_type', 'full_board')->pluck('number', 'protocols_id')->toArray();
        $expeditedProtocols = RecognitionHasProtocol::where('recognition_id', $recognition->id)->where('review_type', 'expedited')->pluck('number', 'protocols_id')->toArray();

        return inertia('Recognition/EditRecognitionPage', [
            'resFormBack' => session('resFormBack') ?? null,
            'recognition' => $recognition,
            'rec_files' => $recFiles,
            'fullboardProtocols' => $fullboardProtocols,
            'expeditedProtocols' => $expeditedProtocols,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RecognitionRequest $request, string $id)
    {
        $RecognitionData = $request->validated();
        try {
            $RecognitionData['status'] = 0;
            $updateRecognition = Recognition::where("id", $id)->firstOrFail();
            $updateRecognition->update($RecognitionData);

            // Example data
            // $request->common_type = [
            //     'full_board' : [
            //         protocol_id : number
            //     ],
            //     'expedited' : [
            //         protocol_id : number
            //     ],
            // ];

            if (!empty($request->common_type)) {
                foreach ($request->common_type as $typeKey => $commonTypeList) {
                    if (!empty($commonTypeList) && is_array($commonTypeList)) {
                        foreach ($commonTypeList as $key => $commonType) {
                            if (RecognitionHasProtocol::where('recognition_id', $updateRecognition->id)->where('protocols_id', $key)->where('review_type', $typeKey)->exists()) {
                                RecognitionHasProtocol::where('recognition_id', $updateRecognition->id)->where('protocols_id', $key)->where('review_type', $typeKey)->update([
                                    'number' => $commonType ?? 0,
                                ]);
                            } else {
                                RecognitionHasProtocol::create([
                                    'recognition_id' => $updateRecognition->id,
                                    'protocols_id' => $key,
                                    'review_type' => $typeKey,
                                    'number' => $commonType,
                                ]);
                            }
                        }
                    }
                }
            }

            // Example data
            // $request->rec_files = [
            //     members: [
            //         file_id: file_id,
            //         file_name: file_name,
            //     ],
            //     staffs:
            //     sops:
            //     accessments:
            // ]

            if (!empty($request->rec_files)) {
                foreach ($request->rec_files as $key => $file) {
                    if ($file !== null) {
                        if (RecFile::where('recognition_id', $updateRecognition->id)->where('file_type', $key)->exists()) {
                            RecFile::where('recognition_id', $updateRecognition->id)->where('file_type', $key)->update([
                                'file_id' => $file['file_id'],
                            ]);
                        } else {
                            RecFile::create([
                                'file_id' => $file['file_id'],
                                'recognition_id' => $updateRecognition->id,
                                'file_type' => $key
                            ]);
                        }
                    }
                }
            }

            return to_route('recognitions.index')->with('resFormBack', [
                'success' => 'Recognition updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            dd($th->getMessage());
            return back()->with('resFormBack', [
                'error' => 'An error occurred while updating the Recognition',
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
            $recognition = Recognition::where('recognition_id', $id)->firstOrFail();
            $recognition->delete();
            return to_route('recognitions.index')->with('resFormBack', [
                'success' => 'Recognition deleted successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'Recognition not found',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    private function setRecognitionStatus(string $recognitionId, int $status)
    {
        try {
            $recognition = Recognition::where('recognition_id', $recognitionId)->firstOrFail();
            $recognition->update([
                'status' => $status,
            ]);
            return back()->with('resFormBack', [
                'success' => 'Recognition status updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with('resFormBack', [
                'error' => 'Recognition not found',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function setRecognitionAllow(string $recognitionId)
    {
        $this->setRecognitionStatus($recognitionId, 1);
    }

    public function setRecognitionReject(string $recognitionId)
    {
        $this->setRecognitionStatus($recognitionId, 3);
    }
}
