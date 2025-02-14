import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import { ArrowUpward, Article } from "@mui/icons-material";
import SurveyCalendar from "@/Components/SurveyCalendar";

export default function Dashboard({
    total_recognition,
    total_ongoing_surveys,
    total_ec_member,
    total_surveyor_member,

    inc_recognition,
    inc_ongoing_surveys,
    inc_ec_member,
    inc_surveyor_member,

    lastest_surveys,
}) {
    const dashboard_data = [
        {
            title: "Total Recognition",
            value: total_recognition || 0,
            inc_rate:
                Math.floor((inc_recognition * 100) / total_recognition) || 0,
        },
        {
            title: "Ongoing Surrveys",
            value: total_ongoing_surveys || 0,
            inc_rate:
                Math.floor(
                    (inc_ongoing_surveys * 100) / total_ongoing_surveys
                ) || 0,
        },
        {
            title: "Total EC Members",
            value: total_ec_member || 0,
            inc_rate: Math.floor((inc_ec_member * 100) / total_ec_member) || 0,
        },
        {
            title: "Total Surveyors",
            value: total_surveyor_member || 0,
            inc_rate:
                Math.floor(
                    (inc_surveyor_member * 100) / total_surveyor_member
                ) || 0,
        },
    ];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-4">
                {dashboard_data.map((item, index) => (
                    <Card key={index} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                gutterBottom
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                {item.title}
                            </Typography>
                            <div className="flex items-center gap-2">
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {item.value.toLocaleString()}
                                </Typography>
                                <Chip
                                    icon={<ArrowUpward />}
                                    label={item.inc_rate + "%"}
                                    size="small"
                                    color="success"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                <div className="xl:col-span-2 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border w-full lg:w-3/5 p-4">
                    <h2 className="text-xl font-bold">Surveys Schedule</h2>
                    <SurveyCalendar />
                </div>
                <div className="xl:col-span-2 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border w-full lg:w-2/5 p-4">
                    <h2 className="text-xl font-bold mb-2">Lastest Surveys</h2>
                    {lastest_surveys.map((survey) => (
                        <div className="bg-gray-100 px-3 rounded-lg mb-2 flex justify-between items-center" key={survey.id}>
                            <div className="flex gap-2 border-gray-100 py-2 text-sm">
                                <div className="text-gray-500 text-xl">
                                    <Article />
                                </div>
                                <div className="text-gray-900">
                                    <h2><b>{survey.simp_recognition?.institute}</b> <span className="text-xs ms-2">{(new Date(survey.created_at)).toLocaleString()}</span></h2>
                                    <p className="text-xs text-gray-500">{ survey.description }</p>
                                </div>
                            </div>
                            <div>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
