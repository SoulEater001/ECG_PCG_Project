import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-teal-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold tracking-wide">
        CardioDetect
      </h1>

      <div className="space-x-6 text-sm font-medium">
        <Link href="/" className="hover:text-teal-200 transition">
          Home
        </Link>
        <Link href="/detect-ecg" className="hover:text-teal-200 transition">
          Detect ECG
        </Link>
        <Link href="/detect-pcg" className="hover:text-teal-200 transition">
          Detect PCG
        </Link>
        <Link href="/about" className="hover:text-teal-200 transition">
          About
        </Link>
      </div>
    </nav>
  );
}
