import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Applicant {
    id: number;
    full_name: string;
    email: string;
    status: string;
    registered_at: string;
}

interface Training {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
    capacity: number;
    enrolled_count: number;
    available_spots: number;
    price: number;
    status: string;
    applicants: Applicant[];
}

interface Props {
    training: Training;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Trainings',
        href: '/trainings',
    },
    {
        title: 'Details',
        href: '#',
    },
];

export default function ShowTraining() {
    const { training } = usePage<Props>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'inactive':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getApplicantStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={training.title} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            📚 {training.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(training.status)}`}>
                                {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                            </span>
                            <span className="text-gray-600 dark:text-gray-300">
                                👥 {training.enrolled_count} / {training.capacity} enrolled
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={route('trainings.edit', training.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ✏️ Edit
                        </Link>
                        <Link
                            href={route('trainings.index')}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Training Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                📖 Training Details
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                                    <p className="text-gray-900 dark:text-white whitespace-pre-line">{training.description}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</label>
                                        <p className="text-gray-900 dark:text-white">
                                            📅 {new Date(training.start_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">End Date</label>
                                        <p className="text-gray-900 dark:text-white">
                                            📅 {new Date(training.end_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                                        <p className="text-gray-900 dark:text-white">📍 {training.location}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</label>
                                        <p className="text-gray-900 dark:text-white font-semibold text-green-600 dark:text-green-400">
                                            💰 ₦{training.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Applicants List */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                👥 Applicants ({training.applicants.length})
                            </h2>
                            {training.applicants.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                                    Name
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                                    Email
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                                    Applied
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {training.applicants.map((applicant) => (
                                                <tr key={applicant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                        {applicant.full_name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                        {applicant.email}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getApplicantStatusColor(applicant.status)}`}>
                                                            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(applicant.registered_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <Link
                                                            href={route('applicants.show', applicant.id)}
                                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">👥</div>
                                    <p className="text-gray-600 dark:text-gray-300">No applicants yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📊 Training Statistics
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Total Capacity</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{training.capacity}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Enrolled</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{training.enrolled_count}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Available Spots</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">{training.available_spots}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-300">Fill Rate</span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {Math.round((training.enrolled_count / training.capacity) * 100)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full" 
                                            style={{ width: `${(training.enrolled_count / training.capacity) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h4>
                                <div className="space-y-2">
                                    <Link
                                        href={route('trainings.edit', training.id)}
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                                    >
                                        Edit Training
                                    </Link>
                                    <Link
                                        href={route('applicants.index')}
                                        className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors text-center block"
                                    >
                                        View All Applicants
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}