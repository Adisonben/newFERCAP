import UncompleteLayout from "@/Layouts/UncompleteLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField, Divider, Autocomplete, Box, Alert } from "@mui/material";
import "../css/form.css";

export default function FillMoreInfo({ nationalities, countries }) {
    const { flash } = usePage().props; // Access flash messages
    const [error, seterror] = useState(flash.error);

    useEffect(() => {
        seterror(flash.error)
    }, []);

    const nationalOptions = nationalities.map((nation) => {
        return {
            label: nation.name,
        };
    });
    const countryOptions = countries.map((country) => {
        return {
            label: country.name,
            code: country.code,
        };
    });
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        phone: "",
        nationality: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        institute: "",
        education:"",
        job_title: "",
        job_organization: "",
        ec_position: "",
        ec_name: "",
        experience: "",
        training: "",
        english_skill_reading: "",
        english_skill_speaking: "",
        english_skill_writing: "",
        local_skill_reading: "",
        local_skill_speaking: "",
        local_skill_writing: "",
        other_languages: ""
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("user.info.store"), {
            onFinish: () => seterror(flash.error)
        });
    };

    return (
        <UncompleteLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Fill info
                </h2>
            }
        >
            <Head title="More Info" />

            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-center pt-4">
                        <img src="/images/fercaplogo.png" alt="" />
                    </div>
                    <div className="text-center text-xl pb-4">
                        Please enter your account details.
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={submit}
                            className="p-6 text-gray-900 dark:text-gray-100"
                        >
                            {error && <Alert className="mb-4" severity="error" onClose={() => seterror("")}>Something went wrong. Please try again later.</Alert>}
                            <div className="flex gap-2 flex-wrap">
                                <TextField
                                    required
                                    id="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.first_name}
                                    onChange={(e) => setData("first_name", e.target.value)}
                                    name="first_name"
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
                                    name="last_name"
                                    error={errors.last_name}
                                    helperText={errors.last_name}
                                />
                            </div>
                            <div className="mt-4 mb-5 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Phone"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    name="phone"
                                    error={errors.phone}
                                    helperText={errors.phone}
                                />
                                <Autocomplete
                                    autoHighlight
                                    onChange={(event, newValue) => setData("nationality", newValue.label)}
                                    className="flex-auto"
                                    options={nationalOptions}
                                    sx={{ minWidth: 200 }}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose a Nationality"
                                            slotProps={{
                                                htmlInput: {
                                                    ...params.inputProps,
                                                    autoComplete:
                                                        "new-password", // disable autocomplete and autofill
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <Divider />
                            <div className="mt-5 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    name="address"
                                    error={errors.address}
                                    helperText={errors.address}
                                />
                            </div>
                            <div className="mt-4 mb-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="City"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.city}
                                    onChange={(e) => setData("city", e.target.value)}
                                    name="city"
                                    error={errors.city}
                                    helperText={errors.city}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="State"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.state}
                                    onChange={(e) => setData("state", e.target.value)}
                                    name="state"
                                    error={errors.state}
                                    helperText={errors.state}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Zip Code"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.zip_code}
                                    onChange={(e) => setData("zip_code", e.target.value)}
                                    name="zip_code"
                                    error={errors.zip_code}
                                    helperText={errors.zip_code}
                                />
                                <Autocomplete
                                    autoHighlight
                                    options={countryOptions}
                                    className="flex-auto"
                                    sx={{ minWidth: 200 }}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, newValue) => setData("country", newValue.label)}
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
                                            label="Choose a country"
                                            slotProps={{
                                                htmlInput: {
                                                    ...params.inputProps,
                                                    autoComplete:
                                                        "new-password", // disable autocomplete and autofill
                                                },
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <Divider />
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Institute"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.institute}
                                    onChange={(e) => setData("institute", e.target.value)}
                                    name="institute"
                                    error={errors.institute}
                                    helperText={errors.institute}
                                />
                                {/* <TextField
                                    id="outlined-basic"
                                    label="Education"
                                    variant="outlined"
                                    className="flex-auto"
                                /> */}
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Education"
                                    multiline
                                    rows={4}
                                    className="flex-auto"
                                    value={data.education}
                                    onChange={(e) => setData("education", e.target.value)}
                                    name="education"
                                    error={errors.education}
                                    helperText={errors.education}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Job Title"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.job_title}
                                    onChange={(e) => setData("job_title", e.target.value)}
                                    name="job_title"
                                    error={errors.job_title}
                                    helperText={errors.job_title}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Job Organization"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.job_organization}
                                    onChange={(e) => setData("job_organization", e.target.value)}
                                    name="job_organization"
                                    error={errors.job_organization}
                                    helperText={errors.job_organization}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Ec Position"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.ec_position}
                                    onChange={(e) => setData("ec_position", e.target.value)}
                                    name="ec_position"
                                    error={errors.ec_position}
                                    helperText={errors.ec_position}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Ec Name"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.ec_name}
                                    onChange={(e) => setData("ec_name", e.target.value)}
                                    name="ec_name"
                                    error={errors.ec_name}
                                    helperText={errors.ec_name}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Experience"
                                    multiline
                                    rows={4}
                                    className="flex-auto"
                                    value={data.experience}
                                    onChange={(e) => setData("experience", e.target.value)}
                                    name="experience"
                                    error={errors.experience}
                                    helperText={errors.experience}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Training"
                                    multiline
                                    rows={4}
                                    className="flex-auto"
                                    value={data.training}
                                    onChange={(e) => setData("training", e.target.value)}
                                    name="training"
                                    error={errors.training}
                                    helperText={errors.training}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="English Skill Reading"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.english_skill_reading}
                                    onChange={(e) => setData("english_skill_reading", e.target.value)}
                                    name="english_skill_reading"
                                    error={errors.english_skill_reading}
                                    helperText={errors.english_skill_reading}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="English Skill Speaking"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.english_skill_speaking}
                                    onChange={(e) => setData("english_skill_speaking", e.target.value)}
                                    name="english_skill_speaking"
                                    error={errors.english_skill_speaking}
                                    helperText={errors.english_skill_speaking}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="English Skill Writing"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.english_skill_writing}
                                    onChange={(e) => setData("english_skill_writing", e.target.value)}
                                    name="english_skill_writing"
                                    error={errors.english_skill_writing}
                                    helperText={errors.english_skill_writing}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Local Skill Reading"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.local_skill_reading}
                                    onChange={(e) => setData("local_skill_reading", e.target.value)}
                                    name="local_skill_reading"
                                    error={errors.local_skill_reading}
                                    helperText={errors.local_skill_reading}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Local Skill Speaking"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.local_skill_speaking}
                                    onChange={(e) => setData("local_skill_speaking", e.target.value)}
                                    name="local_skill_speaking"
                                    error={errors.local_skill_speaking}
                                    helperText={errors.local_skill_speaking}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Local Skill Writing"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.local_skill_writing}
                                    onChange={(e) => setData("local_skill_writing", e.target.value)}
                                    name="local_skill_writing"
                                    error={errors.local_skill_writing}
                                    helperText={errors.local_skill_writing}
                                />
                            </div>
                            <div className="mt-4 flex gap-2 flex-wrap">
                                <TextField
                                    id="outlined-basic"
                                    label="Other Languages"
                                    variant="outlined"
                                    className="flex-auto"
                                    value={data.other_languages}
                                    onChange={(e) => setData("other_languages", e.target.value)}
                                    name="other_languages"
                                    error={errors.other_languages}
                                    helperText={errors.other_languages}
                                />
                            </div>
                            <div className="mt-4 flex justify-center gap-2">
                                <Link href={route("logout")} method="post" as="button"
                                    className='inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800'
                                >
                                    Logout
                                </Link>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    color="error"
                                    loading={processing}
                                    onClick={() => reset()}
                                >
                                    Reset
                                </Button>
                                <Button variant="contained" type="submit" loading={processing}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UncompleteLayout>
    );
}
