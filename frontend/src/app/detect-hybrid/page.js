"use client";
import { useState } from "react";

export default function DetectECG() {
    const [ecgFile, setEcgFile] = useState(null);
    const [pcgFile, setPcgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleDetect = async () => {
        if (!ecgFile || !pcgFile) {
            return alert("Please upload both ECG and PCG files");
        }

        const formData = new FormData();
        formData.append("ecg", ecgFile);
        formData.append("pcg", pcgFile);

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://127.0.0.1:8000/hybrid/detect", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log(data)
            setResult(data);
        } catch (err) {
            alert("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    Detect in Hybrid Mode
                </h2>

                <p className="mb-6 text-gray-600 text-sm">
                    Upload ECG & PCG signal or image for detection.
                </p>

                {/* File Upload */}
                <label className="block w-full mb-6">
                    <span className="block mb-2 text-sm font-medium text-gray-700">
                        Upload ECG File
                    </span>
                    <input
                        type="file"
                        onChange={(e) => setEcgFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
                    />
                </label>

                {/* PCG Upload */}
                <label className="block w-full mb-6">
                    <span className="block mb-2 text-sm font-medium text-gray-700">
                        Upload PCG File
                    </span>
                    <input
                        type="file"
                        onChange={(e) => setPcgFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-purple-50 file:text-purple-700
            hover:file:bg-purple-100
            cursor-pointer"
                    />
                </label>

                {/* Detect Button */}
                <button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition"
                    onClick={handleDetect}
                    disabled={loading}
                >
                    {loading ? "Detecting..." : "Detect"}
                </button>

                {result && (
                    <div className="bg-teal-50 p-4 rounded-md text-sm">
                        <p><b>Prediction:</b> {result.predicted_class}</p>
                        <p><b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%</p>
                        <div className="">
                            <b>Probabilities:</b>
                            <ul className="ml-4 list-disc">
                                {Object.entries(result.probabilities).map(([label, prob]) => (
                                    <li key={label}>
                                        {label}: {(prob * 100).toFixed(2)}%
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
