'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/admin/dashboard');
  };

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Page Not Found</h2>
      <h3 className='text-center'>The page you are looking for does not exist or is under construction.</h3>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={handleRedirect}
      >
        Go to Dashboard
      </button>
    </main>
  );
}
