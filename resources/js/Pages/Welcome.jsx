import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { userMenu } from "@/Layouts/menuData";
import PermissionGuard from "@/Components/PermissionGuard";

export default function Welcome({ auth }) {
    const menuColors = [
        "bg-red-100",
        "bg-orange-100",
        "bg-amber-100",
        "bg-yellow-100",
        "bg-lime-100",
        "bg-green-100",
        "bg-teal-100",
        "bg-cyan-100",
        "bg-blue-100",
        "bg-purple-100"
      ];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Welcome
                </h2>
            }
        >
            <Head title="Welcome" />

            <div className="p-4 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center mb-4">
                    <img
                        src="/images/fercaplogo.png"
                        alt=""
                        className="h-full max-h-28 fill-current text-gray-500"
                    />
                    <h4 className="text-4xl text-bold font-semibold text-gray-800 dark:text-gray-200">
                        Welcome in, {auth?.user?.full_name || User}!
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Great to see you. Let's manage your Recognition & Surveys with ease.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 mb-4">
                        {userMenu.map((menu, index) => (
                            <PermissionGuard
                                key={index}
                                permissionName={menu["perm"]}
                                userRole={auth?.role_name}
                            >
                                <Link href={menu["path"]} className="w-full">
                                <div
                                    className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 border hover:shadow-lg"
                                >
                                    <div className={`p-4 text-gray-900 dark:text-gray-100 ${menuColors[index % 10]}`}>
                                        <div className="flex justify-center mb-2">
                                            <p className={`text-xl font-bold rounded-full p-2`}>
                                                {menu["icon"]}
                                            </p>
                                        </div>
                                        <div className="flex justify-center">
                                            <p className="text-xl font-bold">
                                                {menu["label"]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            </PermissionGuard>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
