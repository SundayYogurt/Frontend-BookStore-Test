// Editbook.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import BooksService from "../services/BooksService";
import ComicsService from "../services/ComicsService";
import JournalsService from "../services/JournalsService";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState({
    itemId: "",
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    status: "",
    coverImage: "",
    description: "",
    location: "",
    addedDate: "",
    itemType: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
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

  // ดึงข้อมูล book ตาม id
  useEffect(() => {
    const getBook = async (id) => {
      try {
        const response = await BooksService.getBookById(id);
        if (response.status === 200) {
          setBook(response.data.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          text: error?.response?.data?.message || error.message,
          confirmButtonText: "ตกลง",
        });
      }
    };
    getBook(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (book.itemType === 'Comic') {
        response = await ComicsService.updateComic(id, book);
      } else if (book.itemType === 'Journal') {
        response = await JournalsService.updateJournal(id, book);
      } else {
        response = await BooksService.updateBook(id, book);
      }

      if (response.status === 200) {
        Swal.fire({
          title: "สำเร็จ",
          text: "กิจกรรมแก้ไขเรียบร้อยแล้ว",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      Swal.fire({
        title: "แก้ไขล้มเหลว",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-screen max-w-lg space-y-8 rounded-2xl bg-gray-200 p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          แก้ไขหนังสือ
        </h2>

        <form
          className="space-y-4 text-gray-900 rounded-2xl"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              ชื่อหนังสือ
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book?.title}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ชื่อหนังสือ"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block font-medium text-gray-700">
              ผู้แต่ง
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book?.author}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ผู้แต่ง"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              รายละเอียด
            </label>
            <textarea
              id="description"
              name="description"
              value={book?.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="รายละเอียดหนังสือ"
            />
          </div>

          {/* Publish Year */}
          <div>
            <label
              htmlFor="publishYear"
              className="block font-medium text-gray-700"
            >
              ปีที่พิมพ์
            </label>
            <input
              type="number"
              id="publishYear"
              name="publishYear"
              value={book?.publishYear}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ปีที่พิมพ์"
            />
          </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block font-medium text-gray-700">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={book?.isbn}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ISBN"
            />
          </div>

          {book.itemType === 'Comic' ? (
            <>
              {/* Series */}
              <div>
                <label htmlFor="series" className="block font-medium text-gray-700">
                  Series
                </label>
                <input
                  type="text"
                  id="series"
                  name="series"
                  value={book?.series}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Series"
                />
              </div>

              {/* Volume Number */}
              <div>
                <label htmlFor="volumeNumber" className="block font-medium text-gray-700">
                  Volume
                </label>
                <input
                  type="number"
                  id="volumeNumber"
                  name="volumeNumber"
                  value={book?.volumeNumber}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Volume Number"
                />
              </div>

              {/* Illustrator */}
              <div>
                <label htmlFor="illustrator" className="block font-medium text-gray-700">
                  Illustrator
                </label>
                <input
                  type="text"
                  id="illustrator"
                  name="illustrator"
                  value={book?.illustrator}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Illustrator"
                />
              </div>

              {/* Color Type */}
              <div>
                <label htmlFor="colorType" className="block font-medium text-gray-700">
                  Color Type
                </label>
                <input
                  type="text"
                  id="colorType"
                  name="colorType"
                  value={book?.colorType}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Color Type"
                />
              </div>

              {/* Target Age */}
              <div>
                <label htmlFor="targetAge" className="block font-medium text-gray-700">
                  Target Age
                </label>
                <input
                  type="text"
                  id="targetAge"
                  name="targetAge"
                  value={book?.targetAge}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Target Age"
                />
              </div>
            </>
          ) : book.itemType === 'Journal' ? (
            <>
              {/* ISSN */}
              <div>
                <label htmlFor="issn" className="block font-medium text-gray-700">
                  ISSN
                </label>
                <input
                  type="text"
                  id="issn"
                  name="issn"
                  value={book?.issn}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="ISSN"
                />
              </div>

              {/* Volume */}
              <div>
                <label htmlFor="volume" className="block font-medium text-gray-700">
                  Volume
                </label>
                <input
                  type="text"
                  id="volume"
                  name="volume"
                  value={book?.volume}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Volume"
                />
              </div>

              {/* Issue */}
              <div>
                <label htmlFor="issue" className="block font-medium text-gray-700">
                  Issue
                </label>
                <input
                  type="text"
                  id="issue"
                  name="issue"
                  value={book?.issue}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="Issue"
                />
              </div>

              {/* Publication Frequency */}
              <div>
                <label htmlFor="publicationFrequency" className="block font-medium text-gray-700">
                  Publication Frequency
                </label>
                <input
                  type="text"
                  id="publicationFrequency"
                  name="publicationFrequency"
                  value={book?.publicationFrequency}
                  onChange={handleChange}
                  className="mt-1 w.full rounded border border-gray-300 px-3 py-2"
                  placeholder="Publication Frequency"
                />
              </div>

              {/* Publisher */}
              <div>
                <label
                  htmlFor="publisher"
                  className="block font-medium text-gray-700"
                >
                  สำนักพิมพ์
                </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={book?.publisher}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="สำนักพิมพ์"
                />
              </div>
            </>
          ) : (
            <>
              {/* Publisher */}
              <div>
                <label
                  htmlFor="publisher"
                  className="block font-medium text-gray-700"
                >
                  สำนักพิมพ์
                </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={book?.publisher}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="สำนักพิมพ์"
                />
              </div>

              {/* Page Count */}
              <div>
                <label
                  htmlFor="pageCount"
                  className="block font-medium text-gray-700"
                >
                  จำนวนหน้า
                </label>
                <input
                  type="number"
                  id="pageCount"
                  name="pageCount"
                  value={book?.pageCount}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="จำนวนหน้า"
                />
              </div>

              {/* Genre */}
              <div>
                <label htmlFor="genre" className="block font-medium text-gray-700">
                  ประเภท
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  value={book?.genre}
                  onChange={handleChange}
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
                  placeholder="ประเภทหนังสือ"
                />
              </div>
            </>
          )}


          {/* Language */}
          <div>
            <label
              htmlFor="language"
              className="block font-medium text-gray-700"
            >
              ภาษา
            </label>
            <input
              type="text"
              id="language"
              name="language"
              value={book?.language}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ภาษา"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block font-medium text-gray-700"
            >
              ตำแหน่งที่เก็บ
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={book?.location}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ตำแหน่งที่เก็บ"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label
              htmlFor="coverImage"
              className="block font-medium text-gray-700"
            >
              URL ภาพปก
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={book?.coverImage}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="URL ภาพปก"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block font-medium text-gray-700">
              สถานะ
            </label>
            <select
              id="status"
              name="status"
              value={book?.status}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <button
            type="submit"
            className=" btn btn-primary w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
