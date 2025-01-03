import React, { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Autocomplete, TextField } from "@mui/material";

const InfoForm = ({ data, setData }) => {
    const [countries, setCountries] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get("/api/countries");
            setCountries(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <>
            <form action="">
                <div className="mb-4">
                    <InputLabel htmlFor="institute" value="Institute" />

                    <TextInput
                        id="institute"
                        className="mt-1 block w-full"
                        value={data.institute}
                        onChange={(e) => setData("institute", e.target.value)}
                        required
                        autoComplete="institute"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="ec_name" value="ec_name" />

                    <TextInput
                        id="ec_name"
                        className="mt-1 block w-full"
                        value={data.ec_name}
                        onChange={(e) => setData("ec_name", e.target.value)}
                        required
                        autoComplete="ec_name"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="address" value="address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        required
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="city" value="city" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData("city", e.target.value)}
                        required
                        autoComplete="city"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="state_province_region"
                        value="state_province_region"
                    />

                    <TextInput
                        id="state_province_region"
                        className="mt-1 block w-full"
                        value={data.state_province_region}
                        onChange={(e) => setData("state_province_region", e.target.value)}
                        required
                        autoComplete="state_province_region"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="zip_code" value="zip_code" />

                    <TextInput
                        id="zip_code"
                        className="mt-1 block w-full"
                        value={data.zip_code}
                        onChange={(e) => setData("zip_code", e.target.value)}
                        required
                        autoComplete="zip_code"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="country" value="country" />

                    <Autocomplete
                        disablePortal
                        id="country"
                        options={countries}
                        size="small"
                        className="mt-1 block w-full"
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="phone" value="phone" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="website" value="website" />

                    <TextInput
                        id="website"
                        className="mt-1 block w-full"
                        value={data.website}
                        onChange={(e) => setData("website", e.target.value)}
                        required
                        autoComplete="website"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="contact_person"
                        value="contact_person"
                    />

                    <TextInput
                        id="contact_person"
                        className="mt-1 block w-full"
                        value={data.contact_person}
                        onChange={(e) => setData("contact_person", e.target.value)}
                        required
                        autoComplete="contact_person"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="contact_email" value="contact_email" />

                    <TextInput
                        id="contact_email"
                        className="mt-1 block w-full"
                        value={data.contact_email}
                        onChange={(e) => setData("contact_email", e.target.value)}
                        required
                        autoComplete="contact_email"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="contact_position"
                        value="contact_position"
                    />

                    <TextInput
                        id="contact_position"
                        className="mt-1 block w-full"
                        value={data.contact_position}
                        onChange={(e) => setData("contact_position", e.target.value)}
                        required
                        autoComplete="contact_position"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="chairperson" value="chairperson" />

                    <TextInput
                        id="chairperson"
                        className="mt-1 block w-full"
                        value={data.chairperson}
                        onChange={(e) => setData("chairperson", e.target.value)}
                        required
                        autoComplete="chairperson"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="chairperson_email"
                        value="chairperson_email"
                    />

                    <TextInput
                        id="chairperson_email"
                        className="mt-1 block w-full"
                        value={data.chairperson_email}
                        onChange={(e) => setData("chairperson_email", e.target.value)}
                        required
                        autoComplete="chairperson_email"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="secretary" value="secretary" />

                    <TextInput
                        id="secretary"
                        className="mt-1 block w-full"
                        value={data.secretary}
                        onChange={(e) => setData("secretary", e.target.value)}
                        required
                        autoComplete="secretary"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
                <div className="mb-4">
                    <InputLabel
                        htmlFor="secretary_email"
                        value="secretary_email"
                    />

                    <TextInput
                        id="secretary_email"
                        className="mt-1 block w-full"
                        value={data.secretary_email}
                        onChange={(e) => setData("secretary_email", e.target.value)}
                        required
                        autoComplete="secretary_email"
                    />

                    <InputError className="mt-2" message={""} />
                </div>
            </form>
        </>
    );
};

export default InfoForm;
