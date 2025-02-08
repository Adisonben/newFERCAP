import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { TextField, Divider, Autocomplete, Box } from "@mui/material";
import "../css/form.css";

const ProfileInfoForm = ({
    countries,
    nationalities,
    submit,
    data,
    setData,
    errors,
    processing,
    recentlySuccessful,
}) => {
    const nationalOptions = nationalities?.map((nation) => {
        return {
            label: nation.name,
        };
    });

    const countryOptions = countries?.map((country) => {
        return {
            label: country.name,
            code: country.code,
        };
    });
    return (
        <form
            onSubmit={submit}
            className="mt-6 space-y-6"
        >
            <div className="flex gap-2 flex-wrap">
                <TextField
                    required
                    id="first_name"
                    label="First Name"
                    variant="outlined"
                    className="flex-auto"
                    value={data.first_name}
                    onChange={(e) => setData("first_name", e.target.value)}
                    error={errors.first_name}
                    helperText={errors.first_name}
                />
                <TextField
                    required
                    id="last_name"
                    label="Last Name"
                    variant="outlined"
                    className="flex-auto"
                    value={data.last_name}
                    onChange={(e) => setData("last_name", e.target.value)}
                    error={errors.last_name}
                    helperText={errors.last_name}
                />
            </div>
            <div className="mt-4 mb-5 flex gap-2 flex-wrap">
                <TextField
                    id="phone"
                    label="Phone"
                    variant="outlined"
                    className="flex-auto"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    error={errors.phone}
                    helperText={errors.phone}
                />
                <Autocomplete
                    id="nationality"
                    autoHighlight
                    value={{ label: data.nationality }}
                    onChange={(event, newValue) => setData("nationality", newValue.label)}
                    className="flex-auto"
                    options={nationalOptions}
                    sx={{ minWidth: 200 }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Nationality"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: "new-password", // disable autocomplete and autofill
                                },
                            }}
                        />
                    )}
                />
            </div>
            <Divider />
            <div className="mt-5 flex gap-2 flex-wrap">
                <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    className="flex-auto"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    error={errors.address}
                    helperText={errors.address}
                />
            </div>
            <div className="mt-4 mb-4 flex gap-2 flex-wrap">
                <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    className="flex-auto"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    error={errors.city}
                    helperText={errors.city}
                />
                <TextField
                    id="state"
                    label="State"
                    variant="outlined"
                    className="flex-auto"
                    value={data.state}
                    onChange={(e) => setData("state", e.target.value)}
                    error={errors.state}
                    helperText={errors.state}
                />
                <TextField
                    id="zip_code"
                    label="Zip Code"
                    variant="outlined"
                    className="flex-auto"
                    value={data.zip_code}
                    onChange={(e) => setData("zip_code", e.target.value)}
                    error={errors.zip_code}
                    helperText={errors.zip_code}
                />
                <Autocomplete
                    id="country"
                    autoHighlight
                    value={{ label: data.country }}
                    options={countryOptions}
                    className="flex-auto"
                    sx={{ minWidth: 200 }}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, newValue) =>
                        setData("country", newValue.label)
                    }
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                sx={{
                                    "& > img": {
                                        mr: 2,
                                        flexShrink: 0,
                                    },
                                }}
                                {...optionProps}
                            >
                                <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt=""
                                />
                                {option.label} ({option.code})
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Country"
                            slotProps={{
                                htmlInput: {
                                    ...params.inputProps,
                                    autoComplete: "new-password", // disable autocomplete and autofill
                                },
                            }}
                        />
                    )}
                />
            </div>

            <Divider />

            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="institute"
                    label="Institute"
                    variant="outlined"
                    className="flex-auto"
                    value={data.institute}
                    onChange={(e) => setData("institute", e.target.value)}
                    error={errors.institute}
                    helperText={errors.institute}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="education"
                    label="Education"
                    multiline
                    rows={4}
                    className="flex-auto"
                    value={data.education}
                    onChange={(e) => setData("education", e.target.value)}
                    error={errors.education}
                    helperText={errors.education}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="job_title"
                    label="Job Title"
                    variant="outlined"
                    className="flex-auto"
                    value={data.job_title}
                    onChange={(e) => setData("job_title", e.target.value)}
                    error={errors.job_title}
                    helperText={errors.job_title}
                />
                <TextField
                    id="job_organization"
                    label="Job Organization"
                    variant="outlined"
                    className="flex-auto"
                    value={data.job_organization}
                    onChange={(e) => setData("job_organization", e.target.value)}
                    error={errors.job_organization}
                    helperText={errors.job_organization}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="ec_position"
                    label="Ec Position"
                    variant="outlined"
                    className="flex-auto"
                    value={data.ec_position}
                    onChange={(e) => setData("ec_position", e.target.value)}
                    error={errors.ec_position}
                    helperText={errors.ec_position}
                />
                <TextField
                    id="ec_name"
                    label="Ec Name"
                    variant="outlined"
                    className="flex-auto"
                    value={data.ec_name}
                    onChange={(e) => setData("ec_name", e.target.value)}
                    error={errors.ec_name}
                    helperText={errors.ec_name}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="experience"
                    label="Experience"
                    multiline
                    rows={4}
                    className="flex-auto"
                    value={data.experience}
                    onChange={(e) => setData("experience", e.target.value)}
                    error={errors.experience}
                    helperText={errors.experience}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="training"
                    label="Training"
                    multiline
                    rows={4}
                    className="flex-auto"
                    value={data.training}
                    onChange={(e) => setData("training", e.target.value)}
                    error={errors.training}
                    helperText={errors.training}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="english_skill_reading"
                    label="English Skill Reading"
                    variant="outlined"
                    className="flex-auto"
                    value={data.english_skill_reading}
                    onChange={(e) => setData("english_skill_reading", e.target.value)}
                    error={errors.english_skill_reading}
                    helperText={errors.english_skill_reading}
                />
                <TextField
                    id="english_skill_speaking"
                    label="English Skill Speaking"
                    variant="outlined"
                    className="flex-auto"
                    value={data.english_skill_speaking}
                    onChange={(e) => setData("english_skill_speaking", e.target.value)}
                    error={errors.english_skill_speaking}
                    helperText={errors.english_skill_speaking}
                />
                <TextField
                    id="english_skill_writing"
                    label="English Skill Writing"
                    variant="outlined"
                    className="flex-auto"
                    value={data.english_skill_writing}
                    onChange={(e) => setData("english_skill_writing", e.target.value)}
                    error={errors.english_skill_writing}
                    helperText={errors.english_skill_writing}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="local_skill_reading"
                    label="Local Skill Reading"
                    variant="outlined"
                    className="flex-auto"
                    value={data.local_skill_reading}
                    onChange={(e) => setData("local_skill_reading", e.target.value)}
                    error={errors.local_skill_reading}
                    helperText={errors.local_skill_reading}
                />
                <TextField
                    id="local_skill_speaking"
                    label="Local Skill Speaking"
                    variant="outlined"
                    className="flex-auto"
                    value={data.local_skill_speaking}
                    onChange={(e) => setData("local_skill_speaking", e.target.value)}
                    error={errors.local_skill_speaking}
                    helperText={errors.local_skill_speaking}
                />
                <TextField
                    id="local_skill_writing"
                    label="Local Skill Writing"
                    variant="outlined"
                    className="flex-auto"
                    value={data.local_skill_writing}
                    onChange={(e) => setData("local_skill_writing", e.target.value)}
                    error={errors.local_skill_writing}
                    helperText={errors.local_skill_writing}
                />
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
                <TextField
                    id="other_languages"
                    label="Other Languages"
                    variant="outlined"
                    className="flex-auto"
                    value={data.other_languages}
                    onChange={(e) => setData("other_languages", e.target.value)}
                    error={errors.other_languages}
                    helperText={errors.other_languages}
                />
            </div>
            <div className="flex items-center gap-4">
                <PrimaryButton
                    disabled={processing}
                >
                    Save
                </PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    );
};

export default ProfileInfoForm;
