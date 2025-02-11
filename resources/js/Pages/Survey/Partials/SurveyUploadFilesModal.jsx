import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

const SurveyUploadFilesModal = ({ show, onClose, survey_id, getSurveyFiles }) => {
    const [files, setFiles] = useState([]);
    const [errorUpload, setErrorUpload] = useState("");

    const submitFiles = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files[]", files[i]);
        }
        formData.append("survey_id", survey_id);

        const res = await axios.post("/api/survey/upload-files/public", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            setErrorUpload("");
            onClose();
            getSurveyFiles();
        })
        .catch((error) => {
            if (error.response) {
                setErrorUpload(error.response.data.message);
            }
        });
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form
                onSubmit={submitFiles}
                className="px-6 py-4"
            >
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Upload Survey files
                </h2>

                <div className="mt-4">
                    <InputLabel htmlFor="file" value="Accept file .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx " />
                    <InputLabel htmlFor="file" value="Each file must not exceed 5MB." />
                    <TextInput
                        id="file"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,"
                        // value={data.password}
                        className="mt-1 block w-full"
                        // isFocused={true}
                        onChange={(e) => setFiles(e.target.files)}
                    />

                    <InputError message={errorUpload} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton type="button" onClick={onClose}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className="ms-3"
                        // disabled={processing}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default SurveyUploadFilesModal;
