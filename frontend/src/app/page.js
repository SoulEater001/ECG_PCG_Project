import Image from "next/image";


export default function Home() {
  return (
    <main className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">
        ECG & PCG Disease Detection
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto">
        This web application helps in detecting heart-related
        abnormalities using ECG and PCG signals with the help
        of Machine Learning.
      </p>
    </main>
  );
}

