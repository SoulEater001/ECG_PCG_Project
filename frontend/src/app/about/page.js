export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          About the Project
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed">
          This minor project focuses on detecting cardiovascular
          diseases using ECG (Electrocardiogram) and PCG
          (Phonocardiogram) signals. The system applies machine
          learning techniques to analyze medical signals and
          assist in the early diagnosis of heart-related conditions.
        </p>
      </div>

    </div>
  );
}
