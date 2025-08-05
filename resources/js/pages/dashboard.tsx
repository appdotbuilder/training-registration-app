import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Stats {
    totalTrainings: number;
    totalApplicants: number;
    pendingApplicants: number;
    upcomingTrainings: number;
}

interface Props {
    stats: Stats;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { stats } = usePage<Props>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">🎓 Welcome to TrainingHub Admin</h1>
                    <p className="text-blue-100">Manage your training programs and track applicant registrations</p>
                </div>

                {/* Stats Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Trainings</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTrainings}</p>
                            </div>
                            <div className="text-3xl">📚</div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applicants</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalApplicants}</p>
                            </div>
                            <div className="text-3xl">👥</div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Applications</p>
                                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.pendingApplicants}</p>
                            </div>
                            <div className="text-3xl">⏳</div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Trainings</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.upcomingTrainings}</p>
                            </div>
                            <div className="text-3xl">🚀</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Quick Actions</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href={route('trainings.create')}
                            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                        >
                            📝 Create Training
                        </Link>
                        <Link
                            href={route('trainings.index')}
                            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-center block"
                        >
                            📚 Manage Trainings
                        </Link>
                        <Link
                            href={route('applicants.index')}
                            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center block"
                        >
                            👥 View Applicants
                        </Link>
                        <Link
                            href={route('applicants.export')}
                            className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center block"
                        >
                            📊 Export Data
                        </Link>
                    </div>
                </div>

                {/* Management Sections */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 Training Management</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Active Trainings</span>
                                <Link href={route('trainings.index')} className="text-blue-600 hover:text-blue-700">
                                    Manage →
                                </Link>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Create New Training</span>
                                <Link href={route('trainings.create')} className="text-blue-600 hover:text-blue-700">
                                    Create →
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">👥 Applicant Management</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Review Applications</span>
                                <Link href={route('applicants.index')} className="text-blue-600 hover:text-blue-700">
                                    Review →
                                </Link>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="text-gray-700 dark:text-gray-300">Export Applicant Data</span>
                                <Link href={route('applicants.export')} className="text-blue-600 hover:text-blue-700">
                                    Export →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Admin Tips</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                        <div>
                            <p className="font-medium">📝 Creating Trainings</p>
                            <p className="text-sm">Set clear dates, locations, and capacity limits for better organization</p>
                        </div>
                        <div>
                            <p className="font-medium">✅ Managing Applications</p>
                            <p className="text-sm">Review applications promptly and update statuses to keep applicants informed</p>
                        </div>
                        <div>
                            <p className="font-medium">📊 Data Export</p>
                            <p className="text-sm">Export applicant data regularly for backup and analysis purposes</p>
                        </div>
                        <div>
                            <p className="font-medium">📧 Communication</p>
                            <p className="text-sm">Keep applicants updated on their status to maintain good relationships</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
