import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import JournalsService from "../services/JournalsService";


const NewComic = () => {
  const navigate = useNavigate();
  const [journalData, setJournalData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
    coverImage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!journalData.title || !journalData.author || !journalData.isbn) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields (Title, Author, ISBN)",
        icon: "warning",
      });
      return;
    }

    try {
      // ส่งเฉพาะ fields ที่มีค่า และแปลงประเภทข้อมูลให้ถูกต้อง
      const dataToSend = {
        title: journalData.title,
        author: journalData.author,
        category: journalData.category || undefined,
        publishYear: journalData.publishYear ? parseInt(journalData.publishYear) : undefined,
        isbn: journalData.isbn,
        series: journalData.series || undefined,
        volumeNumber: journalData.volumeNumber ? parseInt(journalData.volumeNumber) : undefined,
        illustrator: journalData.illustrator || undefined,
        colorType: journalData.colorType || undefined,
        targetAge: journalData.targetAge || undefined,
        description: journalData.description || undefined,
        coverImage: journalData.coverImage || undefined,
      };

      // ลบ fields ที่เป็น undefined
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] === undefined || dataToSend[key] === "") {
          delete dataToSend[key];
        }
      });

      console.log("Sending data:", dataToSend);
      
      const newComic = await JournalsService.createJournal(dataToSend)
      console.log("Response:", newComic);
      
      if (newComic.status === 201) {
        Swal.fire({
          title: "Success",
          text: newComic.data.message || "Comic added successfully",
          icon: "success",
        }).then(() => {
          setJournalData({
            title: "",
            author: "",
            category: "",
            publishYear: "",
            isbn: "",
            series: "",
            volumeNumber: "",
            illustrator: "",
            colorType: "",
            targetAge: "",
            description: "",
          });
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Error adding comic:", error);
      console.error("Error response:", error?.response?.data);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || error.message || "Failed to add comic",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Add New Comic
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
              value={journalData.title}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
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
              value={journalData.author}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
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
              value={journalData.category}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
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
              value={journalData.publishYear}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
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
              value={journalData.isbn}
              placeholder="978-0-7851-5612-5"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="series" className="block text-sm font-medium text-gray-700">
              Series
            </label>
            <input
              id="series"
              name="series"
              type="text"
              onChange={handleChange}
              value={journalData.series}
              placeholder="Spider-Man"
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="volumeNumber" className="block text-sm font-medium text-gray-700">
              Volume Number
            </label>
            <input
              id="volumeNumber"
              name="volumeNumber"
              type="number"
              onChange={handleChange}
              value={journalData.volumeNumber}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="illustrator" className="block text-sm font-medium text-gray-700">
              Illustrator
            </label>
            <input
              id="illustrator"
              name="illustrator"
              type="text"
              onChange={handleChange}
              value={journalData.illustrator}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="colorType" className="block text-sm font-medium text-gray-700">
              Color Type
            </label>
            <select
              id="colorType"
              name="colorType"
              onChange={handleChange}
              value={journalData.colorType}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Select color type</option>
              <option value="FULL_COLOR">Full Color</option>
            </select>
          </div>

          <div>
            <label htmlFor="targetAge" className="block text-sm font-medium text-gray-700">
              Target Age
            </label>
            <select
              id="targetAge"
              name="targetAge"
              onChange={handleChange}
              value={journalData.targetAge}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            >
              <option value="">Select target age</option>
              <option value="TEEN">Teen</option>
            </select>
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
              value={journalData.description}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              coverImage
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="text"
              onChange={handleChange}
              value={journalData.coverImage}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex btn btn-neutral"
            >
              Add Comic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewComic;