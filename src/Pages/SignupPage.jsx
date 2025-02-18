import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

const SignupPage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            role_id: "3" // Customer role as default
        }
    });

    const selectedRole = watch('role_id');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/roles');
                setRoles(response.data);
            } catch (err) {
                setError('Failed to fetch roles');
            }
        };
        fetchRoles();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        try {
            if (data.role_id === "2") { // Store role
                data.store = {
                    name: data.store_name,
                    phone: data.store_phone,
                    tax_no: data.store_tax_no,
                    bank_account: data.store_bank_account
                };
            }
            
            // Clean up extra fields not needed in the API
            delete data.confirmPassword;
            delete data.store_name;
            delete data.store_phone;
            delete data.store_tax_no;
            delete data.store_bank_account;

            await api.post('/signup', data);
            reset();
            alert('You need to click link in email to activate your account!');
            history.goBack();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow">
            <div className="flex min-h-screen">
                <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" 
                    style={{backgroundImage: `url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80")`}}>
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Join Our Community</h2>
                            <p className="max-w-xl mt-3 text-gray-300">
                                Create an account and get access to exclusive deals, personalized recommendations, and much more!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                                <p className="mt-2 text-center text-sm text-gray-600">Join us today and explore amazing products</p>
                            </div>

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('name', {
                                                    required: 'Name is required',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Name must be at least 3 characters'
                                                    }
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="Enter your full name"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address'
                                                    }
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                placeholder="Enter your email"
                                                type="email"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('password', {
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Password must be at least 8 characters'
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                                                    }
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                type="password"
                                                placeholder="Create a strong password"
                                            />
                                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('confirmPassword', {
                                                    validate: value => value === watch('password') || 'Passwords do not match'
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                type="password"
                                                placeholder="Confirm your password"
                                            />
                                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Account Type</label>
                                        <div className="mt-1">
                                            <select
                                                {...register('role_id')}
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                {roles.map(role => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {selectedRole === "2" && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_name', {
                                                            required: 'Store name is required',
                                                            minLength: {
                                                                value: 3,
                                                                message: 'Store name must be at least 3 characters'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="Enter store name"
                                                    />
                                                    {errors.store_name && <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Store Phone</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_phone', {
                                                            required: 'Store phone is required',
                                                            pattern: {
                                                                value: /^(\+90|0)?[0-9]{10}$/,
                                                                message: 'Please enter a valid Turkish phone number'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="Enter store phone"
                                                    />
                                                    {errors.store_phone && <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_tax_no', {
                                                            required: 'Tax ID is required',
                                                            pattern: {
                                                                value: /^T\d{4}V\d{6}$/,
                                                                message: 'Tax ID must match pattern TXXXXVXXXXXX'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="TXXXXVXXXXXX"
                                                    />
                                                    {errors.store_tax_no && <p className="mt-1 text-sm text-red-600">{errors.store_tax_no.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Bank Account (IBAN)</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_bank_account', {
                                                            required: 'IBAN is required',
                                                            pattern: {
                                                                value: /^TR\d{2}[0-9A-Z]{5}[0-9A-Z]{17}$/,
                                                                message: 'Please enter a valid Turkish IBAN'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        placeholder="Enter IBAN"
                                                    />
                                                    {errors.store_bank_account && <p className="mt-1 text-sm text-red-600">{errors.store_bank_account.message}</p>}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : null}
                                        Create Account
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <div>
                                            <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook h-5 w-5 text-blue-600">
                                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                </svg>
                                                <span className="ml-2">Facebook</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter h-5 w-5 text-blue-400">
                                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                                </svg>
                                                <span className="ml-2">Twitter</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                        Sign in
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignupPage;
