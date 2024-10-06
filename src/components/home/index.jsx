import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import Header from "../header";
import { firestore, storage } from "../../firebase/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Home = () => {
  const { currentUser } = useAuth();
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "images"), (snapshot) => {
      const urls = snapshot.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
        path: doc.data().path,
      }));
      setImgUrls(urls);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, path) => {
    try {
      console.log(`Deleting image with id: ${id} and path: ${path}`);

      // Видалення з Firestore
      deleteDoc(doc(firestore, "images", id));
      console.log(`Deleted document with id: ${id} from Firestore`);

      // Логування референсу
      const imgRef = ref(storage, path);
      console.log(`Reference for storage deletion: ${imgRef}`);

      // Видалення з Firebase Storage
      deleteObject(imgRef);
      console.log(`Deleted image from Firebase Storage with path: ${path}`);

      // Оновлення стану (видалення зі списку)
      setImgUrls((prevUrls) => prevUrls.filter((img) => img.id !== id));
      console.log(`Updated local state, removed image with id: ${id}`);
    } catch (error) {
      console.error("Error during deletion process: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="text-2xl font-bold pt-14">
        Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {imgUrls.map(({ id, url, path }) => (
          <div key={id} className="relative flex justify-center items-center">
            <img src={url} alt="Uploaded" className="max-w-full h-auto" />
            <button
              onClick={() => handleDelete(id, path)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
