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

export default function PublicTrainings() {
    const { trainings } = usePage<Props>().props;

    return (
        <>
            <Head title="Available Trainings" />
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
                                    href={route('check.status')}
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                >
                                    Check Status
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            📚 Available Training Programs
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Discover our comprehensive training programs designed to advance your career.
                        </p>
                    </div>

                    {trainings.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {trainings.data.map((training) => (
                                    <div key={training.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                                {training.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                                {training.description}
                                            </p>
                                            
                                            <div className="space-y-2 text-sm mb-6">
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    <span className="mr-2">📅</span>
                                                    {new Date(training.start_date).toLocaleDateString()} - {new Date(training.end_date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    <span className="mr-2">📍</span>
                                                    {training.location}
                                                </div>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    <span className="mr-2">👥</span>
                                                    {training.available_spots} of {training.capacity} spots available
                                                </div>
                                                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                                                    <span className="mr-2">💰</span>
                                                    ₦{training.price.toLocaleString()}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('public.training', training.id)}
                                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                                                >
                                                    View Details
                                                </Link>
                                                {training.available_spots > 0 ? (
                                                    <Link
                                                        href={route('register.training')}
                                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                    >
                                                        Register
                                                    </Link>
                                                ) : (
                                                    <span className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                                                        Full
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {trainings.last_page > 1 && (
                                <div className="flex justify-center">
                                    <nav className="flex items-center gap-2">
                                        {trainings.links.map((link, index) => (
                                            <span key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className={`px-3 py-2 rounded-lg transition-colors ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                                        }`}
                                                    />
                                                ) : (
                                                    <span
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className="px-3 py-2 text-gray-400 cursor-not-allowed"
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No Training Programs Available
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Check back soon for new training opportunities.
                            </p>
                            <Link
                                href={route('home')}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}