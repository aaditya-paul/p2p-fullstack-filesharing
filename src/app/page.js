"use client";

import {useState} from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // Log the response for debugging
      const text = await response.text();
      console.log("Response text:", text);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = JSON.parse(text); // Parse the response text as JSON
      setFileUrl(data.httpfilepath);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Failed to upload file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          P2P File Sharing
        </h1>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="file">
              Choose a file
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {fileUrl && (
          <div className="mt-6">
            <p className="text-sm text-gray-600">File uploaded successfully!</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
