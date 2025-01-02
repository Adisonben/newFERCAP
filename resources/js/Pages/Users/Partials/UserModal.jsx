import React, {useEffect} from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

const UserModal = ({
    show,
    onClose,
    onSubmit,
    data,
    setData,
    errors,
    title = "User",
    isEdit = false,
}) => {
    const [roleData, setRoleData] = React.useState(null);

    const fetchRole = async () => {
        try {
            const response = await axios.get("/api/roles");
            setRoleData(response.data);
            // setSelectedUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRole();
    }, []);

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={onSubmit} className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {isEdit ? `Edit ${title}` : `Create ${title}`}
                </h2>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />

                    <SelectInput
                        name="country"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="mt-1 block w-3/4"
                    >
                        <option value="" disabled>Select user role</option>
                        {roleData && roleData.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </SelectInput>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="text"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mt-1 block w-3/4"
                        placeholder="Please input user email."
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        value={data.ordering}
                        onChange={(e) => setData("password", e.target.value)}
                        className="mt-1 block w-3/4"
                        placeholder="Please input user password."
                    />

                    <InputError message={errors.ordering} className="mt-2" />
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

export default UserModal;
