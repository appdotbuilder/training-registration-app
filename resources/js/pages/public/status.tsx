import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Training {
    id: number;
    title: string;
    start_date: string;
    location: string;
}

interface Application {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    status: string;
    registered_at: string;
    training: Training;
}

interface Props {
    applications?: Application[];
    email?: string;
    [key: string]: unknown;
}

export default function CheckStatus() {
    const { applications, email } = usePage<Props>().props;

    const { data, setData, get, processing } = useForm({
        email: email || '',
        training_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        get(route('check.status.post'));
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
        <>
            <Head title="Check Registration Status" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <Link href={route('home')} className="text-2xl font-bold text-gray-900 dark:text-white">
                                🎓 TrainingHub
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link
                                    href={route('home')}
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={route('public.trainings')}
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    All Trainings
                                </Link>
                                <Link
                                    href={route('register.training')}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Register Now
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            🔍 Check Registration Status
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Enter your email address to check the status of your training registrations.
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                        <form onSubmit={submit} className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                            >
                                {processing ? '🔄 Checking...' : '🔍 Check Status'}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    {applications && (
                        <div className="space-y-6">
                            {applications.length > 0 ? (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        📋 Your Applications ({applications.length})
                                    </h2>
                                    {applications.map((application) => (
                                        <div key={application.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                        {application.training.title}
                                                    </h3>
                                                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                        <div className="flex items-center">
                                                            <span className="mr-2">👤</span>
                                                            {application.full_name}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="mr-2">📧</span>
                                                            {application.email}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="mr-2">📞</span>
                                                            {application.phone}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="mr-2">📅</span>
                                                            Training starts: {new Date(application.training.start_date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="mr-2">📍</span>
                                                            {application.training.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="mr-2">🕒</span>
                                                            Applied: {new Date(application.registered_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
                                                    {getStatusIcon(application.status)} {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                </div>
                                            </div>

                                            {/* Status-specific messages */}
                                            <div className="mt-4 p-4 rounded-lg">
                                                {application.status === 'pending' && (
                                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                                        <p className="text-yellow-800 dark:text-yellow-200">
                                                            ⏳ <strong>Application Under Review</strong><br />
                                                            Your application is being reviewed by our team. We'll notify you via email once a decision has been made.
                                                        </p>
                                                    </div>
                                                )}
                                                {application.status === 'approved' && (
                                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                                        <p className="text-green-800 dark:text-green-200">
                                                            🎉 <strong>Congratulations! Application Approved</strong><br />
                                                            You have been accepted for this training. Please check your email for further instructions and payment details.
                                                        </p>
                                                    </div>
                                                )}
                                                {application.status === 'rejected' && (
                                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                                        <p className="text-red-800 dark:text-red-200">
                                                            😔 <strong>Application Not Successful</strong><br />
                                                            Unfortunately, we cannot accept your application at this time. Please consider applying for other available trainings.
                                                        </p>
                                                    </div>
                                                )}
                                                {application.status === 'completed' && (
                                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                                        <p className="text-blue-800 dark:text-blue-200">
                                                            🎓 <strong>Training Completed</strong><br />
                                                            Congratulations on completing the training! Your certificate should be available for download or will be sent to you soon.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        No Applications Found
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        We couldn't find any training applications for <strong>{email}</strong>
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href={route('register.training')}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Register for Training
                                        </Link>
                                        <Link
                                            href={route('public.trainings')}
                                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Browse Trainings
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}