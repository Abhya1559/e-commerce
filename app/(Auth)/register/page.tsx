'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (['street', 'city', 'state', 'postalCode', 'country'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccess(data.message);
        router.push('/api/login');
      } else {
        setError(data.message || 'something went wrong');
      }
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      // setFormData('');
      setLoading(false);
    }
  };
  return (
    <div className="mt-5 flex min-h-[calc(100vh-86px)] flex-col items-center justify-center gap-4 px-4">
      <div className="w-full max-w-2xl rounded-2xl border p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 font-semibold">
          <Link
            href="/"
            className="mb-4 flex items-center justify-center font-serif text-3xl font-semibold text-gray-800"
          >
            Sports.Co.India
          </Link>

          <div>
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              onChange={handleChange}
              id="name"
              name="name"
              value={formData.name}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              placeholder="Enter password"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="street">Street</label>
              <Input
                id="street"
                onChange={handleChange}
                value={formData.address.street}
                name="street"
                placeholder="Street address"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="city">City</label>
              <Input
                id="city"
                onChange={handleChange}
                value={formData.address.city}
                name="city"
                placeholder="City"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="state">State</label>
              <Input
                id="state"
                onChange={handleChange}
                value={formData.address.state}
                name="state"
                placeholder="State"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="postalCode">Postal Code</label>
              <Input
                id="postalCode"
                name="postalCode"
                onChange={handleChange}
                value={formData.address.postalCode}
                placeholder="Postal Code"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="country">Country</label>
              <Input
                id="country"
                name="country"
                onChange={handleChange}
                value={formData.address.country}
                placeholder="Country"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <div className="mt-4 flex flex-col items-center justify-center gap-4">
            <Button className="w-full cursor-pointer" type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>

            <Link
              href="/login"
              className="text-sm font-semibold text-gray-600 transition hover:text-gray-900"
            >
              Already have an account?
            </Link>

            <Button
              variant="outline"
              className="flex w-full cursor-pointer items-center justify-center gap-2"
            >
              <FaGoogle className="h-5 w-5" />
              Signup with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
