import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import Upload from "../upload/Upload";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/home">Photo Gallery</Link>
      </div>
      <nav className="flex space-x-4">
        <button onClick={openModal} className="hover:underline">
          Upload
        </button>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </nav>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Upload />
      </Modal>
    </header>
  );
};

export default Header;
