import React, {useState, useEffect} from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

const SurveyModal = ({
    show,
    onClose,
    onSubmit,
    data,
    setData,
    errors,
    title = "Survey",
    isEdit = false,
    processing,
}) => {
    const [fercapGroupData, setFercapGroupData] = useState([]);

    const fetchFercapGroups = async () => {
        try {
            const response = await axios.get("/api/fercap-groups");
            setFercapGroupData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFercapGroups();
    }, []);

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={onSubmit} className="px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {isEdit ? `Edit ${title}` : `Create ${title}`}
                </h2>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        type="text"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Please input survey description"
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="start_date" value="Start Date (M/D/Y)" />

                    <TextInput
                        id="start_date"
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Please input survey start date"
                    />

                    <InputError message={errors.start_date} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="end_date" value="End Date (M/D/Y)" />

                    <TextInput
                        id="end_date"
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Please input survey end date"
                    />

                    <InputError message={errors.end_date} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="fercap_group" value="Fercap Group" />

                    <SelectInput
                        id="fercap_group"
                        value={data.fercap_group}
                        onChange={(e) => setData("fercap_group", e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="" disabled>Select Fercap Group</option>
                        {fercapGroupData && fercapGroupData.map((group) => (
                            <option key={group.id} value={group.id}>{group.name} ({group.total_member} members)</option>
                        ))}
                    </SelectInput>

                    <InputError message={errors.fercap_group} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose} disabled={processing}>Cancel</SecondaryButton>

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

export default SurveyModal;
