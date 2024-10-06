import React from "react";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import Header from "../header";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">User Information</h2>
          <p><strong>Name:</strong> {currentUser.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;