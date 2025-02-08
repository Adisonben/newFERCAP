import React, { useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Autocomplete, TextField } from "@mui/material";

const InfoForm = ({ data, setData, errors }) => {
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

                <InputError className="mt-2" message={errors.institute} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="ec_name" value="Ethic Committee Name" />

                <TextInput
                    id="ec_name"
                    className="mt-1 block w-full"
                    value={data.ec_name}
                    onChange={(e) => setData("ec_name", e.target.value)}
                    required
                    autoComplete="ec_name"
                />

                <InputError className="mt-2" message={errors.ec_name} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="address" value="Address" />

                <TextInput
                    id="address"
                    className="mt-1 block w-full"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    required
                    autoComplete="address"
                />

                <InputError className="mt-2" message={errors.address} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="city" value="City" />

                <TextInput
                    id="city"
                    className="mt-1 block w-full"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    required
                    autoComplete="city"
                />

                <InputError className="mt-2" message={errors.city} />
            </div>
            <div className="mb-4">
                <InputLabel
                    htmlFor="state_province_region"
                    value="State / Province / Region"
                />

                <TextInput
                    id="state_province_region"
                    className="mt-1 block w-full"
                    value={data.state_province_region}
                    onChange={(e) =>
                        setData("state_province_region", e.target.value)
                    }
                    required
                    autoComplete="state_province_region"
                />

                <InputError
                    className="mt-2"
                    message={errors.state_province_region}
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="zip_code" value="Zip Code / Postal Code" />

                <TextInput
                    id="zip_code"
                    className="mt-1 block w-full"
                    value={data.zip_code}
                    onChange={(e) => setData("zip_code", e.target.value)}
                    required
                    autoComplete="zip_code"
                />

                <InputError className="mt-2" message={errors.zip_code} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="country" value="Country" />

                <Autocomplete
                    disablePortal
                    id="country"
                    value={data.country}
                    options={countries}
                    size="small"
                    className="mt-1 block w-full"
                    onChange={(event, newValue) =>
                        setData("country", newValue)
                    }
                    renderInput={(params) => <TextField {...params} />}
                />

                <InputError className="mt-2" message={errors.country} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="phone" value="Phone" />

                <TextInput
                    id="phone"
                    className="mt-1 block w-full"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    required
                    autoComplete="phone"
                />

                <InputError className="mt-2" message={errors.phone} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="website" value="Website" />

                <TextInput
                    id="website"
                    className="mt-1 block w-full"
                    value={data.website}
                    onChange={(e) => setData("website", e.target.value)}
                    required
                    autoComplete="website"
                />

                <InputError className="mt-2" message={errors.website} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="contact_person" value="Contact Person" />

                <TextInput
                    id="contact_person"
                    className="mt-1 block w-full"
                    value={data.contact_person}
                    onChange={(e) => setData("contact_person", e.target.value)}
                    required
                    autoComplete="contact_person"
                />

                <InputError className="mt-2" message={errors.contact_person} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="contact_email" value="Contact Email" />

                <TextInput
                    id="contact_email"
                    className="mt-1 block w-full"
                    value={data.contact_email}
                    onChange={(e) => setData("contact_email", e.target.value)}
                    required
                    autoComplete="contact_email"
                />

                <InputError className="mt-2" message={errors.contact_email} />
            </div>
            <div className="mb-4">
                <InputLabel
                    htmlFor="contact_position"
                    value="Contact Position"
                />

                <TextInput
                    id="contact_position"
                    className="mt-1 block w-full"
                    value={data.contact_position}
                    onChange={(e) =>
                        setData("contact_position", e.target.value)
                    }
                    required
                    autoComplete="contact_position"
                />

                <InputError
                    className="mt-2"
                    message={errors.contact_position}
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="chairperson" value="Chairperson" />

                <TextInput
                    id="chairperson"
                    className="mt-1 block w-full"
                    value={data.chairperson}
                    onChange={(e) => setData("chairperson", e.target.value)}
                    required
                    autoComplete="chairperson"
                />

                <InputError className="mt-2" message={errors.chairperson} />
            </div>
            <div className="mb-4">
                <InputLabel
                    htmlFor="chairperson_email"
                    value="Chairperson Email"
                />

                <TextInput
                    id="chairperson_email"
                    className="mt-1 block w-full"
                    value={data.chairperson_email}
                    onChange={(e) =>
                        setData("chairperson_email", e.target.value)
                    }
                    required
                    autoComplete="chairperson_email"
                />

                <InputError
                    className="mt-2"
                    message={errors.chairperson_email}
                />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="secretary" value="Secretary" />

                <TextInput
                    id="secretary"
                    className="mt-1 block w-full"
                    value={data.secretary}
                    onChange={(e) => setData("secretary", e.target.value)}
                    required
                    autoComplete="secretary"
                />

                <InputError className="mt-2" message={errors.secretary} />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="secretary_email" value="Secretary Email" />

                <TextInput
                    id="secretary_email"
                    className="mt-1 block w-full"
                    value={data.secretary_email}
                    onChange={(e) => setData("secretary_email", e.target.value)}
                    required
                    autoComplete="secretary_email"
                />

                <InputError className="mt-2" message={errors.secretary_email} />
            </div>
        </>
    );
};

export default InfoForm;
