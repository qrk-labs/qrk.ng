import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-primary hover:text-primary/80">
        Return Home
      </Link>
    </main>
  );
}
