import React from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import UserSelection from "./UserSelection";

const GroupModal = ({
    show,
    onClose,
    onSubmit,
    data,
    setData,
    errors,
    title = "FERCAP Group",
    isEdit = false,
    selectedList = [],
    setSellectedList,
}) => {
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={onSubmit} className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {isEdit ? `Edit ${title}` : `Create ${title}`}
                </h2>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Group name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Please input Group name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel value="Select user" />
                    <UserSelection selectedList={selectedList} setData={setSellectedList} />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

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

export default GroupModal;
