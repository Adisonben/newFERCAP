import React from "react";
import Modal from "./Modal";
import DangerButton from "./DangerButton";
import SecondaryButton from "./SecondaryButton";

const DeleteModal = ({ show, onClose, onSubmit, title = "" }) => {
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={onSubmit} className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Are you sure you want to delete this {title}?
                </h2>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>

                    <DangerButton
                        className="ms-3"
                    >
                        Delete {title}
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
};

export default DeleteModal;
