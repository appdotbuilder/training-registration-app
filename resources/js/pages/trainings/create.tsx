import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Trainings',
        href: '/trainings',
    },
    {
        title: 'Create',
        href: '/trainings/create',
    },
];

export default function CreateTraining() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        capacity: '',
        price: '',
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('trainings.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Training" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📝 Create New Training</h1>
                    <p className="text-gray-600 dark:text-gray-300">Add a new training program to your offerings</p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="lg:col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Training Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="e.g., Web Development Bootcamp"
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                                )}
                            </div>

                            <div className="lg:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Describe what participants will learn, requirements, and key benefits..."
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.start_date}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    End Date *
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.end_date}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="e.g., Lagos, Nigeria or Online Training"
                                    required
                                />
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Capacity *
                                </label>
                                <input
                                    type="number"
                                    id="capacity"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="e.g., 50"
                                    min="1"
                                    required
                                />
                                {errors.capacity && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.capacity}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Price (₦) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="e.g., 150000"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>
                                )}
                            </div>

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
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                            >
                                {processing ? '🔄 Creating...' : '✅ Create Training'}
                            </button>
                            <Link
                                href={route('trainings.index')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💡 Tips for Creating Effective Trainings</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                        <div>
                            <p className="font-medium">📝 Clear Descriptions</p>
                            <p className="text-sm">Include learning objectives, prerequisites, and what participants will achieve</p>
                        </div>
                        <div>
                            <p className="font-medium">📅 Realistic Scheduling</p>
                            <p className="text-sm">Allow enough time for comprehensive coverage of topics</p>
                        </div>
                        <div>
                            <p className="font-medium">👥 Appropriate Capacity</p>
                            <p className="text-sm">Consider your resources and the need for personalized attention</p>
                        </div>
                        <div>
                            <p className="font-medium">💰 Competitive Pricing</p>
                            <p className="text-sm">Research market rates while ensuring value for participants</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}