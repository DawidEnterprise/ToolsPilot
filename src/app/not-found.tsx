import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Page Not Found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/tools" className="btn-secondary">
          Browse Tools
        </Link>
      </div>
    </div>
  );
}
