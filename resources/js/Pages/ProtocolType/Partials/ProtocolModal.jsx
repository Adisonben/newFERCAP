import React from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

const ProtocolModal = ({
    show,
    onClose,
    onSubmit,
    data,
    setData,
    errors,
    title = "Protocol Type",
    isEdit = false,
    processing
}) => {
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={onSubmit} className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {isEdit ? `Edit ${title}` : `Create ${title}`}
                </h2>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-3/4"
                        placeholder="Please input Protocol type name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="ordering" value="Ordering" />

                    <TextInput
                        id="ordering"
                        type="number"
                        name="ordering"
                        value={data.ordering}
                        onChange={(e) => setData("ordering", e.target.value)}
                        className="mt-1 block w-3/4"
                        placeholder="Please input ordering"
                    />

                    <InputError message={errors.ordering} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className="ms-3"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
};

export default ProtocolModal;
