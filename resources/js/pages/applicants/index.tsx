import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface Training {
    id: number;
    title: string;
    start_date: string;
}

interface Applicant {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    registered_at: string;
    training: Training;
}

interface PaginationData {
    data: Applicant[];
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
    applicants: PaginationData;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Applicants',
        href: '/applicants',
    },
];

export default function ApplicantsIndex() {
    const { applicants } = usePage<Props>().props;

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the application from "${name}"? This action cannot be undone.`)) {
            router.delete(route('applicants.destroy', id));
        }
    };

    const getStatusColor = (status: string) => {
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'approved':
                return '✅';
            case 'rejected':
                return '❌';
            case 'completed':
                return '🎓';
            default:
                return '❓';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Applicants" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">👥 Applicant Management</h1>
                        <p className="text-gray-600 dark:text-gray-300">Review and manage training applications</p>
                    </div>
                    <Link
                        href={route('applicants.export')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        📊 Export Data
                    </Link>
                </div>

                {/* Applicants List */}
                {applicants.data.length > 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Applicant
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Training
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Applied
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {applicants.data.map((applicant) => (
                                        <tr key={applicant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {applicant.full_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        ID: #{applicant.id}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {applicant.training.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        📅 {new Date(applicant.training.start_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div>
                                                    <p className="text-gray-900 dark:text-white">📧 {applicant.email}</p>
                                                    <p className="text-gray-500 dark:text-gray-400">📞 {applicant.phone}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(applicant.status)}`}>
                                                    {getStatusIcon(applicant.status)} {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(applicant.registered_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('applicants.show', applicant.id)}
                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('applicants.edit', applicant.id)}
                                                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(applicant.id, applicant.full_name)}
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
                        {applicants.last_page > 1 && (
                            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-center">
                                    <nav className="flex items-center gap-2">
                                        {applicants.links.map((link, index) => (
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
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Applications Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Applications will appear here once people start registering for your trainings.
                        </p>
                        <Link
                            href={route('trainings.index')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            📚 Manage Trainings
                        </Link>
                    </div>
                )}

                {/* Quick Stats */}
                {applicants.data.length > 0 && (
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{applicants.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Total Applications</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                    {applicants.data.filter(a => a.status === 'pending').length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">⏳ Pending</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {applicants.data.filter(a => a.status === 'approved').length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">✅ Approved</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {applicants.data.filter(a => a.status === 'completed').length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">🎓 Completed</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}