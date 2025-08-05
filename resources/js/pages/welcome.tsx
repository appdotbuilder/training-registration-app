import { type SharedData } from '@/types';
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

interface Props extends SharedData {
    trainings: Training[];
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth, trainings } = usePage<Props>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Navigation */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    🎓 TrainingHub
                                </h1>
                            </div>
                            <nav className="flex items-center gap-4">
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
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Advance Your Career with 
                            <span className="text-blue-600"> Professional Training</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            🚀 Join thousands of professionals who have transformed their careers through our 
                            comprehensive training programs. Expert instructors, hands-on projects, and industry recognition.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('public.trainings')}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                📚 Browse All Trainings
                            </Link>
                            <Link
                                href={route('register.training')}
                                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                ✅ Register Now
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white/50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            🌟 Why Choose Our Training Programs?
                        </h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">👨‍🏫</div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Expert Instructors
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Learn from industry professionals with years of real-world experience
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🏆</div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Industry Recognition
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Get certificates valued by top employers and boost your career prospects
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-4xl mb-4">🤝</div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Career Support
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Ongoing support, networking opportunities, and job placement assistance
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Trainings */}
                {trainings.length > 0 && (
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                                🔥 Featured Upcoming Trainings
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {trainings.map((training) => (
                                    <div key={training.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                        <div className="p-6">
                                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                {training.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                                {training.description}
                                            </p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    <span className="mr-2">📅</span>
                                                    {new Date(training.start_date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    <span className="mr-2">📍</span>
                                                    {training.location}
                                                </div>
                                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                    <span className="mr-2">👥</span>
                                                    {training.available_spots} spots available
                                                </div>
                                                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                                                    <span className="mr-2">💰</span>
                                                    ₦{training.price.toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <Link
                                                    href={route('public.training', training.id)}
                                                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
                                                >
                                                    View Details & Register
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-12">
                                <Link
                                    href={route('public.trainings')}
                                    className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                                >
                                    View All Trainings →
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-blue-600 dark:bg-blue-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold text-white mb-6">
                            🎯 Ready to Transform Your Career?
                        </h3>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join our community of successful professionals. Register for a training today 
                            and take the next step in your career journey.
                        </p>
                        <Link
                            href={route('register.training')}
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            🚀 Start Your Journey Now
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold mb-4">🎓 TrainingHub</h4>
                                <p className="text-gray-400">
                                    Empowering professionals with world-class training programs.
                                </p>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-4">Quick Links</h5>
                                <div className="space-y-2">
                                    <Link href={route('public.trainings')} className="block text-gray-400 hover:text-white">
                                        All Trainings
                                    </Link>
                                    <Link href={route('check.status')} className="block text-gray-400 hover:text-white">
                                        Check Status
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-4">Support</h5>
                                <div className="space-y-2">
                                    <span className="block text-gray-400">📧 support@traininghub.com</span>
                                    <span className="block text-gray-400">📞 +234 123 456 7890</span>
                                </div>
                            </div>
                            <div>
                                <h5 className="font-semibold mb-4">Connect</h5>
                                <p className="text-gray-400">
                                    Follow us for updates and career tips
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 TrainingHub. Built with ❤️ by app.build</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}