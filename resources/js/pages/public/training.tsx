import { Head, Link, usePage } from '@inertiajs/react';

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
}

interface Props {
    training: Training;
    [key: string]: unknown;
}

export default function PublicTraining() {
    const { training } = usePage<Props>().props;

    return (
        <>
            <Head title={training.title} />
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
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-8">
                            <div className="mb-6">
                                <Link
                                    href={route('public.trainings')}
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    ← Back to All Trainings
                                </Link>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                {training.title}
                            </h1>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                            📖 Program Overview
                                        </h2>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                            {training.description}
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                            ✨ What You'll Learn
                                        </h2>
                                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1">🎯</span>
                                                Industry-relevant skills and techniques
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1">💼</span>
                                                Practical, hands-on project experience
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1">🏆</span>
                                                Professional certification upon completion
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1">🤝</span>
                                                Networking opportunities with peers and experts
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                            📋 Training Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                                    <span className="mr-2">📅</span>
                                                    <span className="font-medium">Duration</span>
                                                </div>
                                                <div className="text-gray-900 dark:text-white">
                                                    {new Date(training.start_date).toLocaleDateString()} - {new Date(training.end_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                                    <span className="mr-2">📍</span>
                                                    <span className="font-medium">Location</span>
                                                </div>
                                                <div className="text-gray-900 dark:text-white">
                                                    {training.location}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                                    <span className="mr-2">👥</span>
                                                    <span className="font-medium">Availability</span>
                                                </div>
                                                <div className="text-gray-900 dark:text-white">
                                                    {training.available_spots} of {training.capacity} spots available
                                                </div>
                                                {training.available_spots <= 5 && training.available_spots > 0 && (
                                                    <div className="text-orange-600 dark:text-orange-400 text-sm font-medium mt-1">
                                                        ⚡ Only {training.available_spots} spots left!
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                                                    <span className="mr-2">💰</span>
                                                    <span className="font-medium">Investment</span>
                                                </div>
                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                    ₦{training.price.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {training.available_spots > 0 ? (
                                        <Link
                                            href={route('register.training')}
                                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold inline-block"
                                        >
                                            🚀 Register Now
                                        </Link>
                                    ) : (
                                        <div className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg text-center font-semibold">
                                            😔 Training Full
                                        </div>
                                    )}

                                    <div className="mt-4 text-center">
                                        <Link
                                            href={route('check.status')}
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                                        >
                                            Already registered? Check your status →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            🎯 Why This Training Matters
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    🚀 Career Advancement
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Gain the skills and credentials needed to advance in your career and increase your earning potential.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    🌐 Industry Network
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Connect with like-minded professionals and build relationships that last beyond the training.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}