import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { recognitionFileTypes } from "@/Functions/MasterDatas";

const RecognitionUploadFileModal = ({ show, onClose, rec_id, fetchFiles }) => {
    const [files, setFiles] = useState([]);
    const [errorUpload, setErrorUpload] = useState("");
    const [fileType, setFileType] = useState("");
    const [errorFileType, setErrorFileType] = useState("");

    const submitFiles = async (event) => {
        event.preventDefault();
        if (files.length === 0) {
            setErrorUpload("Please select file.");
            return;
        } else if (fileType === "") {
            setErrorFileType("Please select file type.");
            return;
        } else {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("files[]", files[i]);
            }
            formData.append("rec_id", rec_id);
            formData.append("file_type", fileType);

            const res = await axios.post("/api/recognition/upload-files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((response) => {
                setErrorUpload("");
                setErrorFileType("");
                fetchFiles();
                onClose();
            })
            .catch((error) => {
                if (error.response) {
                    setErrorUpload(error.response.data.message);
                }
            });
        }
    };
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submitFiles} className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Upload Recognition files
                </h2>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="file"
                        value="Accept file .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx "
                    />
                    <InputLabel
                        htmlFor="file"
                        value="Each file must not exceed 5MB."
                    />
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

                <div className="mt-4">
                    <InputLabel htmlFor="file_type" value="File type" />

                    <SelectInput
                        id="file_type"
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="" disabled>Select file type</option>
                        {recognitionFileTypes.length > 0 && recognitionFileTypes.map((fileType) => (
                            <option key={fileType.id} value={fileType.name}>{fileType.label}</option>
                        ))}
                    </SelectInput>

                    <InputError message={errorFileType} className="mt-2" />
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

export default RecognitionUploadFileModal;
