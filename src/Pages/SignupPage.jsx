import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
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
            role_id: "1" // Customer role as default
        }
    });

    const selectedRole = watch('role_id');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await api.get('/roles');
                const customerRole = response.data.find(role => role.name.toLowerCase() === 'customer');
                if (customerRole) {
                    const sortedRoles = [
                        customerRole,
                        ...response.data.filter(role => role.id !== customerRole.id)
                    ];
                    setRoles(sortedRoles);
                } else {
                    setRoles(response.data);
                }
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

            const response = await api.post('/signup', data);
            reset();
            toast.success('Hesabınız başarıyla oluşturuldu! Lütfen e-posta adresinize gelen aktivasyon linkine tıklayın.');
            history.push('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Kayıt sırasında bir hata oluştu';
            setError(errorMessage);
            toast.error(errorMessage);
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
                            <h2 className="text-4xl font-bold text-white">Topluluğumuza Katılın</h2>
                            <p className="max-w-xl mt-3 text-gray-300">
                                Hesap oluşturun ve özel teklifler, kişiselleştirilmiş öneriler ve çok daha fazlasına erişin!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-1/2">
                    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Hesap Oluştur</h2>
                                <p className="mt-2 text-center text-sm text-gray-600">Bugün bize katılın ve harika ürünleri keşfedin</p>
                            </div>

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('name', {
                                                    required: 'Ad Soyad zorunludur',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Ad Soyad en az 3 karakter olmalıdır'
                                                    }
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                placeholder="Adınızı ve soyadınızı girin"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">E-posta</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('email', {
                                                    required: 'E-posta zorunludur',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Geçersiz e-posta adresi'
                                                    }
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                placeholder="E-posta adresinizi girin"
                                                type="email"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Şifre</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('password', {
                                                    required: 'Şifre zorunludur',
                                                    minLength: {
                                                        value: 8,
                                                        message: 'Şifre en az 8 karakter olmalıdır'
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                        message: 'Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'
                                                    }
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                type="password"
                                                placeholder="Güçlü bir şifre oluşturun"
                                            />
                                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
                                        <div className="mt-1">
                                            <input
                                                {...register('confirmPassword', {
                                                    validate: value => value === watch('password') || 'Şifreler eşleşmiyor'
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                type="password"
                                                placeholder="Şifrenizi tekrar girin"
                                            />
                                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Hesap Tipi</label>
                                        <div className="mt-1">
                                            <select
                                                {...register('role_id')}
                                                defaultValue="1"
                                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            >
                                                {roles.map(role => (
                                                    <option key={role.id} value={role.id}>
                                                        {role.name === 'Customer' ? 'Müşteri' : role.name === 'Store' ? 'Mağaza' : role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {selectedRole === "2" && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Mağaza Adı</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_name', {
                                                            required: 'Mağaza adı zorunludur',
                                                            minLength: {
                                                                value: 3,
                                                                message: 'Mağaza adı en az 3 karakter olmalıdır'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                        placeholder="Mağaza adını girin"
                                                    />
                                                    {errors.store_name && <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Mağaza Telefonu</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_phone', {
                                                            required: 'Mağaza telefonu zorunludur',
                                                            pattern: {
                                                                value: /^(\+90|0)?[0-9]{10}$/,
                                                                message: 'Lütfen geçerli bir Türk telefon numarası girin'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                        placeholder="Mağaza telefonunu girin"
                                                    />
                                                    {errors.store_phone && <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Vergi Numarası</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_tax_no', {
                                                            required: 'Vergi numarası zorunludur',
                                                            pattern: {
                                                                value: /^[0-9]{10}$/,
                                                                message: 'Geçerli bir vergi numarası girin'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                        placeholder="Vergi numarasını girin"
                                                    />
                                                    {errors.store_tax_no && <p className="mt-1 text-sm text-red-600">{errors.store_tax_no.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Banka Hesabı</label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register('store_bank_account', {
                                                            required: 'Banka hesabı zorunludur',
                                                            pattern: {
                                                                value: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/,
                                                                message: 'Geçerli bir IBAN numarası girin'
                                                            }
                                                        })}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                        placeholder="IBAN numarasını girin"
                                                    />
                                                    {errors.store_bank_account && <p className="mt-1 text-sm text-red-600">{errors.store_bank_account.message}</p>}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                                loading
                                                    ? 'bg-orange-300 cursor-not-allowed'
                                                    : 'bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                                            }`}
                                        >
                                            {loading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignupPage;
