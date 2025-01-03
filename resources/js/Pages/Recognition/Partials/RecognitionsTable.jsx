import React from "react";
import { Chip, Stack, Button } from "@mui/material";
import { Edit, Delete, PowerSettingsNew } from "@mui/icons-material";

const RecognitionsTable = ({ recognitions = [] }) => {
    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border">
                <thead className="bg-gray-700 dark:bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Ordering
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider dark:text-gray-300"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {recognitions?.length > 0 ? (
                        recognitions.map((recognition, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                    recognition Name
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    recognition Ordering
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    <Chip
                                        label={
                                            recognition.status
                                                ? "Active"
                                                : "Disabled"
                                        }
                                        color={
                                            recognition.status
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Stack spacing={1} direction="row">
                                        <Button
                                            variant="contained"
                                            startIcon={<Edit />}
                                            size="small"
                                            // onClick={() =>
                                            //     handleEdit(protocolType)
                                            // }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<Delete />}
                                            color="error"
                                            size="small"
                                            // onClick={() =>
                                            //     handleDeleteShow(protocolType)
                                            // }
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<PowerSettingsNew />}
                                            color="info"
                                            size="small"
                                            // onClick={() =>
                                            //     toggleStatus(protocolType.id)
                                            // }
                                        >
                                            Disable
                                        </Button>
                                    </Stack>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default RecognitionsTable;
