import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Training {
    id: number;
    title: string;
    description: string;
    start_date: string;
    location: string;
    capacity: number;
    enrolled_count: number;
    available_spots: number;
    price: number;
}

interface Props {
    trainings: Training[];
    [key: string]: unknown;
}

export default function CreateApplicant() {
    const { trainings } = usePage<Props>().props;

    const { data, setData, post, processing, errors } = useForm({
        training_id: '',
        full_name: '',
        email: '',
        phone: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register.store'));
    };

    const selectedTraining = trainings.find(t => t.id.toString() === data.training_id);

    return (
        <>
            <Head title="Register for Training" />
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            📝 Register for Training
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Fill out the form below to register for a training program. We'll review your 
                            application and notify you of your registration status.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Training Selection */}
                                    <div>
                                        <label htmlFor="training_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Select Training Program *
                                        </label>
                                        <select
                                            id="training_id"
                                            value={data.training_id}
                                            onChange={(e) => setData('training_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        >
                                            <option value="">Choose a training program...</option>
                                            {trainings.map((training) => (
                                                <option key={training.id} value={training.id}>
                                                    {training.title} - {new Date(training.start_date).toLocaleDateString()} ({training.available_spots} spots left)
                                                </option>
                                            ))}
                                        </select>
                                        {errors.training_id && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.training_id}</p>
                                        )}
                                    </div>

                                    {/* Personal Information */}
                                    <div className="grid md:grid-cols-2 gap-6">
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
                                                placeholder="Enter your full name"
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
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone/WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="+234 123 456 7890"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Residential Address *
                                        </label>
                                        <textarea
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Enter your full residential address"
                                            required
                                        />
                                        {errors.address && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                                        >
                                            {processing ? '🔄 Submitting...' : '🚀 Submit Registration'}
                                        </button>
                                        <Link
                                            href={route('public.trainings')}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Training Details Sidebar */}
                        <div className="lg:col-span-1">
                            {selectedTraining ? (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        📋 Selected Training
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {selectedTraining.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
                                                {selectedTraining.description}
                                            </p>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <span className="mr-2">📅</span>
                                                {new Date(selectedTraining.start_date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <span className="mr-2">📍</span>
                                                {selectedTraining.location}
                                            </div>
                                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                                                <span className="mr-2">👥</span>
                                                {selectedTraining.available_spots} spots available
                                            </div>
                                            <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                                                <span className="mr-2">💰</span>
                                                ₦{selectedTraining.price.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Select a training program to see details here
                                    </p>
                                </div>
                            )}

                            {/* Help Section */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    ❓ Need Help?
                                </h3>
                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <p>📧 Email: support@traininghub.com</p>
                                    <p>📞 Phone: +234 123 456 7890</p>
                                    <p>💬 WhatsApp: +234 123 456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}