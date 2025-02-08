import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ErrorPage({ status }) {
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Error {status}
                </h2>
            }
        >
            <Head title={`Error ${status}`} />

            <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
                <p className="text-lg text-gray-600 mb-4">{description}</p>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        </AuthenticatedLayout>
    );
}
