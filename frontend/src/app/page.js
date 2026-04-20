import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-gray-50 min-h-screen flex flex-col items-center">

      {/* Hero Section */}
      <div className="text-center mb-12 max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          ECG & PCG Disease Detection
        </h2>
        <p className="text-gray-600 mb-6">
          Detect heart-related abnormalities accurately using ECG and PCG signals with Machine Learning.
          This system is designed for early diagnosis and improved healthcare insights.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/detect-ecg"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition"
          >
            Detect ECG
          </Link>
          <Link
            href="/detect-pcg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Detect PCG
          </Link>
          <Link
            href="/detect-hybrid"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition"
          >
            Hybrid Mode
          </Link>
        </div>
      </div>

      {/* Illustration */}
      <div className="mb-12">
        <Image
          src="/heart.jpg"
          alt="Heart illustration"
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">ECG Detection</h3>
          <p className="text-gray-600 text-sm">
            Upload ECG signals or images and get real-time predictions with confidence scores.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">PCG Detection</h3>
          <p className="text-gray-600 text-sm">
            Analyze heart sound files (PCG) to detect abnormalities quickly and accurately.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Early Diagnosis</h3>
          <p className="text-gray-600 text-sm">
            Receive fast feedback for early intervention, improving health outcomes and awareness.
          </p>
        </div>
      </div>
    </main>
  );
}

