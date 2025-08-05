import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Training {
    id: number;
    title: string;
    start_date: string;
    location: string;
}

interface Applicant {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    registered_at: string;
    training: Training;
}

interface Props {
    applicant: Applicant;
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
    {
        title: 'Edit',
        href: '#',
    },
];

export default function EditApplicant() {
    const { applicant } = usePage<Props>().props;

    const { data, setData, put, processing, errors } = useForm({
        full_name: applicant.full_name,
        email: applicant.email,
        phone: applicant.phone,
        address: applicant.address,
        status: applicant.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('applicants.update', applicant.id));
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

    const getStatusDescription = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Application is under review';
            case 'approved':
                return 'Application has been approved';
            case 'rejected':
                return 'Application has been rejected';
            case 'completed':
                return 'Training has been completed';
            default:
                return 'Unknown status';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${applicant.full_name}'s Application`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ✏️ Edit Application - {applicant.full_name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Update applicant information and status
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        👤 Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="full_name"
                                                value={data.full_name}
                                                onChange={(e) => setData('full_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                required
                                            />
                                            {errors.full_name && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.full_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone/WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Residential Address *
                                        </label>
                                        <textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                        {errors.address && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Status Management */}
                                <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        📋 Application Status
                                    </h3>
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Status *
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        >
                                            <option value="pending">⏳ Pending</option>
                                            <option value="approved">✅ Approved</option>
                                            <option value="rejected">❌ Rejected</option>
                                            <option value="completed">🎓 Completed</option>
                                        </select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
                                        )}
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            {getStatusDescription(data.status)}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                                    >
                                        {processing ? '🔄 Updating...' : '✅ Update Application'}
                                    </button>
                                    <Link
                                        href={route('applicants.show', applicant.id)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        View Application
                                    </Link>
                                    <Link
                                        href={route('applicants.index')}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar with Training Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                🎓 Training Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Training Program</label>
                                    <p className="text-gray-900 dark:text-white font-semibold">{applicant.training.title}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</label>
                                    <p className="text-gray-900 dark:text-white">
                                        📅 {new Date(applicant.training.start_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                                    <p className="text-gray-900 dark:text-white">
                                        📍 {applicant.training.location}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Application ID</label>
                                    <p className="text-gray-900 dark:text-white">#{applicant.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Registered</label>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(applicant.registered_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</label>
                                    <div className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(applicant.status)}`}>
                                        {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Change Tips */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                💡 Status Guidelines
                            </h3>
                            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <p><strong>⏳ Pending:</strong> Under review</p>
                                <p><strong>✅ Approved:</strong> Accepted for training</p>
                                <p><strong>❌ Rejected:</strong> Not accepted</p>
                                <p><strong>🎓 Completed:</strong> Training finished</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}