"use client";
import { useState } from "react";

export default function DetectPCG() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleDetect = async () => {
        if (!file) return alert("Please upload a PCG audio file");

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("http://127.0.0.1:8000/pcg/detect", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
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
                    Detect PCG
                </h2>

                <p className="mb-6 text-gray-600 text-sm">
                    Upload PCG audio file (heart sound) for detection.
                </p>

                {/* Audio File Upload */}
                <label className="block w-full mb-6">
                    <span className="sr-only">Choose PCG audio file</span>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
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
                    <div className="mt-6 bg-teal-50 p-4 rounded-md text-sm">
                        <p><b>Prediction:</b> {result.prediction}</p>
                        <p><b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%</p>
                    </div>
                )}

            </div>

        </div>
    );
}
