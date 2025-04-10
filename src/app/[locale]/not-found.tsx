import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl mt-4">¡Página no encontrada!</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}