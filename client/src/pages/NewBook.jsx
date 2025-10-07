import { useState } from "react";
import BooksService from "../services/BooksService";
import ComicsService from "../services/ComicsService";
import JournalsService from "../services/JournalsService";
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
    itemType: "Book", // Default to Book
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
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
        publishYear: parseInt(bookData.publishYear) || 0,
        pageCount: parseInt(bookData.pageCount) || 0,
        volumeNumber: parseInt(bookData.volumeNumber) || 0,
      };

      console.log("Sending data:", dataToSend);

      let response;
      if (bookData.itemType === 'Comic') {
        response = await ComicsService.createComic(dataToSend);
      } else if (bookData.itemType === 'Journal') {
        response = await JournalsService.createJournal(dataToSend);
      } else {
        response = await BooksService.createBook(dataToSend);
      }

      console.log("Response:", response);

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: response.data.message || `${bookData.itemType} added successfully`,
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
            itemType: "Book",
            series: "",
            volumeNumber: "",
            illustrator: "",
            colorType: "",
            targetAge: "",
          });
          navigate("/");
        });
      }
    } catch (error) {
      console.error(`Error adding ${bookData.itemType}:`, error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message || `Failed to add ${bookData.itemType}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full  space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Add New Item
          </h2>
        </div>

        {/* Item Type Selector */}
        <div className="flex justify-center">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'itemType', value: 'Book' } })}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                bookData.itemType === 'Book'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}>
              Book
            </button>
            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'itemType', value: 'Comic' } })}
              className={`px-4 py-2 text-sm font-medium ${
                bookData.itemType === 'Comic'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}>
              Comic
            </button>
            <button
              type="button"
              onClick={() => handleChange({ target: { name: 'itemType', value: 'Journal' } })}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                bookData.itemType === 'Journal'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}>
              Journal
            </button>
          </div>
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

          {bookData.itemType === 'Comic' ? (
            <>
              {/* Series */}
              <div>
                <label htmlFor="series" className="block text-sm font-medium text-gray-700">
                  Series
                </label>
                <input
                  id="series"
                  name="series"
                  type="text"
                  onChange={handleChange}
                  value={bookData.series}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Volume Number */}
              <div>
                <label htmlFor="volumeNumber" className="block text-sm font-medium text-gray-700">
                  Volume
                </label>
                <input
                  id="volumeNumber"
                  name="volumeNumber"
                  type="number"
                  onChange={handleChange}
                  value={bookData.volumeNumber}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Illustrator */}
              <div>
                <label htmlFor="illustrator" className="block text-sm font-medium text-gray-700">
                  Illustrator
                </label>
                <input
                  id="illustrator"
                  name="illustrator"
                  type="text"
                  onChange={handleChange}
                  value={bookData.illustrator}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Color Type */}
              <div>
                <label htmlFor="colorType" className="block text-sm font-medium text-gray-700">
                  Color Type
                </label>
                <input
                  id="colorType"
                  name="colorType"
                  type="text"
                  onChange={handleChange}
                  value={bookData.colorType}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Target Age */}
              <div>
                <label htmlFor="targetAge" className="block text-sm font-medium text-gray-700">
                  Target Age
                </label>
                <input
                  id="targetAge"
                  name="targetAge"
                  type="text"
                  onChange={handleChange}
                  value={bookData.targetAge}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </>
          ) : bookData.itemType === 'Journal' ? (
            <>
              {/* ISSN */}
              <div>
                <label htmlFor="issn" className="block text-sm font-medium text-gray-700">
                  ISSN
                </label>
                <input
                  id="issn"
                  name="issn"
                  type="text"
                  onChange={handleChange}
                  value={bookData.issn}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Volume */}
              <div>
                <label htmlFor="volume" className="block text-sm font-medium text-gray-700">
                  Volume
                </label>
                <input
                  id="volume"
                  name="volume"
                  type="text"
                  onChange={handleChange}
                  value={bookData.volume}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Issue */}
              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                  Issue
                </label>
                <input
                  id="issue"
                  name="issue"
                  type="text"
                  onChange={handleChange}
                  value={bookData.issue}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Publication Frequency */}
              <div>
                <label htmlFor="publicationFrequency" className="block text-sm font-medium text-gray-700">
                  Publication Frequency
                </label>
                <input
                  id="publicationFrequency"
                  name="publicationFrequency"
                  type="text"
                  onChange={handleChange}
                  value={bookData.publicationFrequency}
                  className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Publisher */}
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
            </>
          ) : (
            <>
              {/* Publisher */}
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

              {/* Edition */}
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

              {/* Page Count */}
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

              {/* Language */}
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

              {/* Genre */}
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
            </>
          )}

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
              className="flex btn btn-neutral"
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