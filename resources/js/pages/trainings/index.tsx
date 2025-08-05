import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

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
    applicants_count: number;
}

interface PaginationData {
    data: Training[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    trainings: PaginationData;
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
];

export default function TrainingsIndex() {
    const { trainings } = usePage<Props>().props;

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            router.delete(route('trainings.destroy', id));
        }
    };

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Trainings" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📚 Training Management</h1>
                        <p className="text-gray-600 dark:text-gray-300">Create and manage your training programs</p>
                    </div>
                    <Link
                        href={route('trainings.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ➕ Create Training
                    </Link>
                </div>

                {/* Trainings List */}
                {trainings.data.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Training
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Schedule
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Enrollment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {trainings.data.map((training) => (
                                        <tr key={training.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {training.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                                        {training.description}
                                                    </p>
                                                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <span>📍 {training.location}</span>
                                                        <span className="ml-4">💰 ₦{training.price.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                <div>
                                                    <p>📅 {new Date(training.start_date).toLocaleDateString()}</p>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        to {new Date(training.end_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div>
                                                    <p className="text-gray-900 dark:text-white">
                                                        👥 {training.enrolled_count} / {training.capacity}
                                                    </p>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        {training.available_spots} available
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(training.status)}`}>
                                                    {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('trainings.show', training.id)}
                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('trainings.edit', training.id)}
                                                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(training.id, training.title)}
                                                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {trainings.last_page > 1 && (
                            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-center">
                                    <nav className="flex items-center gap-2">
                                        {trainings.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600'
                                                        }`}
                                                    />
                                                ) : (
                                                    <span
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className="px-3 py-2 text-gray-400 cursor-not-allowed text-sm"
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Training Programs Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Create your first training program to get started.
                        </p>
                        <Link
                            href={route('trainings.create')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ➕ Create Your First Training
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}