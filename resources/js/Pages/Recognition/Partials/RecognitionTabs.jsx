import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RecognitionFiles from "./RecognitionFiles";
import AnnualProgressFiles from "./AnnualProgressFiles";
import { Button } from "@mui/material";
import RecognitionUploadFileModal from "./RecognitionUploadFileModal";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const RecognitionTabs = ({ recognition_id, recognition_status }) => {
    const [value, setValue] = useState(0);
    const [showUploadFilesModal, setShowUploadFilesModal] = useState(false);
    const [toggleFetch, setToggleFetch] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className="flex justify-between items-center pe-5">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Recognition Files" {...a11yProps(0)} />
                        {recognition_status === 2 && (
                            <Tab
                                label="Annual Progress Reports"
                                {...a11yProps(1)}
                            />
                        )}
                    </Tabs>
                </Box>
                {recognition_status !== 0 && recognition_status !== 3 && (
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => setShowUploadFilesModal(true)}
                    >
                        Add file
                    </Button>
                )}
            </div>
            <CustomTabPanel value={value} index={0}>
                <RecognitionFiles
                    rec_id={recognition_id}
                    toggleFetch={toggleFetch}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <AnnualProgressFiles
                    rec_id={recognition_id}
                    toggleFetch={toggleFetch}
                />
            </CustomTabPanel>
            <RecognitionUploadFileModal
                show={showUploadFilesModal}
                onClose={() => setShowUploadFilesModal(false)}
                rec_id={recognition_id}
                rec_status={recognition_status}
                setToggleFetch={() => setToggleFetch(!toggleFetch)}
            />
        </div>
    );
};

export default RecognitionTabs;
