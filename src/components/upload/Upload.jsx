import React, { useState } from "react";
import { storage, firestore } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";

const Upload = () => {
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (img !== null) {
      const imgPath = `files/${v4()}`;
      const imgRef = ref(storage, imgPath);
      const uploadTask = uploadBytesResumable(imgRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setMessage("Error uploading image. Please try again.");
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(firestore, "images"), { url, path: imgPath });
          setImg(null);
          setPreview("");
          setProgress(0);
          setMessage("Image uploaded successfully!");
        }
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setPreview(URL.createObjectURL(file));
      setMessage(""); // Clear any previous messages
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          Select Image
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="w-full h-auto" />
        </div>
      )}
      {progress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Upload
      </button>
      {message && (
        <div className={`mt-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Upload;