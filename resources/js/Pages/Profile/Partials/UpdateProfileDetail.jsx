import React, { useEffect } from "react";
import "../../../css/form.css";
import ProfileInfoForm from "@/Components/ProfileInfoForm";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

const UpdateProfileDetail = ({
    otherClassName = "",
    countries,
    nationalities,
    userInfoData,
}) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
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
            education: "",
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
            other_languages: "",
        });

    useEffect(() => {
        setData(userInfoData);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        patch(route("user.info.update"));
    };

    return (
        <section className={otherClassName}>
            <header>
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Profile Information
                    </h2>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Saved.
                        </p>
                    </Transition>
                </div>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information.
                </p>
            </header>

            <ProfileInfoForm
                countries={countries}
                nationalities={nationalities}
                submit={submit}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                recentlySuccessful={recentlySuccessful}
            />
        </section>
    );
};

export default UpdateProfileDetail;
