export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          About the Project
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          This project focuses on the detection of cardiovascular abnormalities
          using <b>ECG (Electrocardiogram)</b> and <b>PCG (Phonocardiogram)</b> signals.
          It leverages modern <b>machine learning</b> and <b>deep learning</b>
          techniques to analyze heart signals and assist in the early
          identification of potential heart-related conditions.
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          The system processes raw biomedical signals by applying signal
          preprocessing techniques such as filtering, normalization, and
          resampling. PCG signals are converted into
          <b> Mel-spectrogram images</b>, while ECG signals are analyzed through
          waveform-based or image-based representations.
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          A <b>Convolutional Neural Network (MobileNetV2)</b> is used to classify
          the processed signals into two categories:
          <b> Normal</b> and <b>Abnormal</b>. The backend inference is handled by a
          <b> FastAPI</b> server, while the frontend interface is built using
          <b> Next.js</b> for real-time interaction and visualization.
        </p>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          This project is developed as an <b>academic minor project</b> and aims
          to demonstrate the practical application of AI in healthcare signal
          analysis.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-xs text-yellow-800">
          <b>Disclaimer:</b> This system is intended for educational and research
          purposes only and should not be used as a substitute for professional
          medical diagnosis.
        </div>
      </div>
    </div>
  );
}
