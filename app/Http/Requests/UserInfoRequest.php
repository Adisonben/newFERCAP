<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserInfoRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'numeric|max_digits:15|regex:/^\+?[0-9]{10,15}$/|nullable',
            'nationality' => 'string|max:255|nullable',
            'address' => 'string|max:255|nullable',
            'city' => 'string|max:255|nullable',
            'state' => 'string|max:255|nullable',
            'zip_code' => 'string|max:255|nullable',
            'country' => 'string|max:255|nullable',
            'institute' => 'string|max:255|nullable',
            'education' => 'string|max:255|nullable',
            'job_title' => 'string|max:255|nullable',
            'job_organization' => 'string|max:255|nullable',
            'ec_position' => 'string|max:255|nullable',
            'ec_name' => 'string|max:255|nullable',
            'experience' => 'string|max:255|nullable',
            'training' => 'string|max:255|nullable',
            'english_skill_reading' => 'string|max:255|nullable',
            'english_skill_speaking' => 'string|max:255|nullable',
            'english_skill_writing' => 'string|max:255|nullable',
            'local_skill_reading' => 'string|max:255|nullable',
            'local_skill_speaking' => 'string|max:255|nullable',
            'local_skill_writing' => 'string|max:255|nullable',
            'other_languages' => 'string|max:255|nullable',
        ];
    }
}
