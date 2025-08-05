import { Head, Link, usePage } from '@inertiajs/react';

interface Training {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    location: string;
    price: number;
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

export default function ShowApplicant() {
    const { applicant } = usePage<Props>().props;

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
            <Head title="Registration Confirmation" />
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
                                    href={route('check.status')}
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Check Status
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Success Message */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🎉</div>
                            <div>
                                <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                                    Registration Submitted Successfully!
                                </h2>
                                <p className="text-green-700 dark:text-green-300">
                                    Thank you for registering! We've received your application and will review it shortly. 
                                    You'll receive an email notification once your status is updated.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registration Details */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                📋 Registration Details
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                Registration ID: #{applicant.id}
                            </p>
                        </div>

                        <div className="p-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        👤 Personal Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                            <p className="text-gray-900 dark:text-white">{applicant.full_name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                                            <p className="text-gray-900 dark:text-white">{applicant.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone/WhatsApp</label>
                                            <p className="text-gray-900 dark:text-white">{applicant.phone}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
                                            <p className="text-gray-900 dark:text-white whitespace-pre-line">{applicant.address}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Training Information */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        🎓 Training Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Training Program</label>
                                            <p className="text-gray-900 dark:text-white font-semibold">{applicant.training.title}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</label>
                                            <p className="text-gray-900 dark:text-white">
                                                {new Date(applicant.training.start_date).toLocaleDateString()} - {new Date(applicant.training.end_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                                            <p className="text-gray-900 dark:text-white">{applicant.training.location}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Training Fee</label>
                                            <p className="text-gray-900 dark:text-white font-semibold text-green-600 dark:text-green-400">
                                                ₦{applicant.training.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Registration Date</label>
                                            <p className="text-gray-900 dark:text-white">
                                                {new Date(applicant.registered_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Section */}
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                            Current Status
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            Last updated: {new Date(applicant.registered_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(applicant.status)}`}>
                                        {getStatusIcon(applicant.status)} {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                    </div>
                                </div>

                                {/* Status-specific messages */}
                                <div className="mt-4">
                                    {applicant.status === 'pending' && (
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                            <p className="text-yellow-800 dark:text-yellow-200">
                                                ⏳ <strong>Under Review:</strong> Your application is being reviewed by our team. 
                                                We'll send you an email notification once a decision has been made.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            📝 What's Next?
                        </h3>
                        <div className="space-y-2 text-gray-700 dark:text-gray-300">
                            <p>✅ Your registration has been submitted and is now under review</p>
                            <p>📧 You'll receive email updates about your application status</p>
                            <p>💰 If approved, you'll receive payment instructions</p>
                            <p>📱 You can check your status anytime using your email address</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Link
                            href={route('check.status')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                        >
                            🔍 Check Status Again
                        </Link>
                        <Link
                            href={route('public.trainings')}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors text-center"
                        >
                            Browse Other Trainings
                        </Link>
                        <Link
                            href={route('home')}
                            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors text-center"
                        >
                            Back to Home
                        </Link>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            📞 Need Help?
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                                <p>support@traininghub.com</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Phone Support</p>
                                <p>+234 123 456 7890</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">WhatsApp</p>
                                <p>+234 123 456 7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}