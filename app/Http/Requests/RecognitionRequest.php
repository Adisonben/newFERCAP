<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecognitionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // general
            'institute' => 'required|string|max:255',
            'ec_name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state_province_region' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'website' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_position' => 'required|string|max:255',
            'chairperson' => 'required|string|max:255',
            'chairperson_email' => 'required|email|max:255',
            'secretary' => 'required|string|max:255',
            'secretary_email' => 'required|email|max:255',
            // protocol
            'protocol_board_review' => 'required|numeric|max:255',
            'protocol_expedited_review' => 'required|numeric|max:255',
            'protocol_board_meeting' => 'required|numeric|max:255',
            'avg_members_per_meeting' => 'required|numeric|min:1',
            'ethical_challenges' => 'required|string',
            'common_type' => 'nullable|array',
            // Other
            'propose_survey_start_date' => 'nullable|date',
            'propose_survey_end_date' => 'nullable|date|after_or_equal:propose_survey_start_date',
            // files
            'rec_files' => 'nullable|array',
        ];
    }
}
