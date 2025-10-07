import { useState } from "react";
import BooksService from "../services/BooksService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const NewBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    description: "",
    coverImage: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookData.title || !bookData.author || !bookData.isbn) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "warning",
      });
      return;
    }

    try {
      const dataToSend = {
        ...bookData,
        publishYear: parseInt(bookData.publishYear),
        pageCount: parseInt(bookData.pageCount),
      };

      console.log("Sending data:", dataToSend);
      
      const newBook = await BooksService.createBook(dataToSend);
      console.log("Response:", newBook);
      
      if (newBook.status === 201) {
        Swal.fire({
          title: "Success",
          text: newBook.data.message || "Book added successfully",
          icon: "success",
        }).then(() => {
          setBookData({
            title: "",
            author: "",
            category: "",
            publishYear: "",
            isbn: "",
            publisher: "",
            edition: "",
            pageCount: "",
            language: "",
            genre: "",
            description: "",
            coverImage: "",
            location: "",
          });
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message || "Failed to add book",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full  space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Add New Book
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              onChange={handleChange}
              value={bookData.title}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author *
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              onChange={handleChange}
              value={bookData.author}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              onChange={handleChange}
              value={bookData.category}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700">
              Publish Year
            </label>
            <input
              id="publishYear"
              name="publishYear"
              type="number"
              onChange={handleChange}
              value={bookData.publishYear}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
              ISBN *
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              required
              onChange={handleChange}
              value={bookData.isbn}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
              Publisher
            </label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              onChange={handleChange}
              value={bookData.publisher}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="edition" className="block text-sm font-medium text-gray-700">
              Edition
            </label>
            <input
              id="edition"
              name="edition"
              type="text"
              onChange={handleChange}
              value={bookData.edition}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700">
              Page Count
            </label>
            <input
              id="pageCount"
              name="pageCount"
              type="number"
              onChange={handleChange}
              value={bookData.pageCount}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <input
              id="language"
              name="language"
              type="text"
              onChange={handleChange}
              value={bookData.language}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <input
              id="genre"
              name="genre"
              type="text"
              onChange={handleChange}
              value={bookData.genre}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              onChange={handleChange}
              value={bookData.description}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="text"
              onChange={handleChange}
              value={bookData.coverImage}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              onChange={handleChange}
              value={bookData.location}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBook;
