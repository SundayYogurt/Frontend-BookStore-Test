// ActivityCard.jsx
import React from "react";
import BooksService from "../services/booksService";
import Swal from "sweetalert2";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const handleDelete = async () => {
    try {
      const response = await BooksService.deleteBook(book.id);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Deleted ${book.name}`,
          text: "This activity has been deleted",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
        text:
          error.response?.message ||
          error.message ||
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  console.log(`bookCard ... ${book?.data}`);

  return (
    <div className="card w-96 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h2 className="card-title text-lg font-bold">{book?.title}</h2>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-gray-700">{book?.author}</p>
        <p className="text-gray-500 text-sm">📍 {book?.publishYear}</p>
        <p className="text-gray-500 text-sm">📍 {book?.isbn}</p>
        <p className="text-gray-500 text-sm">📍 {book?.status}</p>
        <p className="text-gray-500 text-sm">📍 {book?.description}</p>
        <p className="text-gray-500 text-sm">📍{book?.coverImage} </p>
        <p className="text-gray-500 text-sm">📍 {book?.location}</p>
        <p className="text-gray-500 text-sm">
          📅 {new Date(book?.addedDate).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">📍 {book?.itemType}</p>
        <p className="text-gray-500 text-sm">📍 {book?.publisher}</p>
        <p className="text-gray-500 text-sm">📍 {book?.edition}</p>
        <p className="text-gray-500 text-sm">📍 {book?.pageCount}</p>
        <p className="text-gray-500 text-sm">📍 {book?.language}</p>
        <p className="text-gray-500 text-sm">📍 {book?.genre}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          <>
            <Link
              to={`/edit-book/${book?.itemId}`}
              className="btn btn-warning flex-1 text-white"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error flex-1 text-white"
            >
              Delete
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
