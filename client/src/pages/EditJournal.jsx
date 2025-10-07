// EditJournal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import JournalsService from "../services/JournalsService";

const EditJournal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [journal, setJournal] = useState({
    itemId: "",
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
    publisher: "",
    status: "",
    coverImage: "",
    description: "",
    location: "",
    addedDate: "",
  });

  useEffect(() => {
    const getJournal = async (id) => {
      try {
        const response = await JournalsService.getJournalById(id);
        if (response.status === 200) {
          setJournal(response.data.data);
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
    getJournal(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal({ ...journal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await JournalsService.updateJournal(id, journal);
      if (response.status === 200) {
        Swal.fire({
          title: "สำเร็จ",
          text: "วารสารแก้ไขเรียบร้อยแล้ว",
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
          แก้ไขวารสาร
        </h2>

        <form
          className="space-y-4 text-gray-900 rounded-2xl"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              ชื่อวารสาร
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={journal?.title}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ชื่อวารสาร"
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
              value={journal?.author}
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
              value={journal?.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="รายละเอียดวารสาร"
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
              value={journal?.publishYear}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ปีที่พิมพ์"
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
              value={journal?.publisher}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="สำนักพิมพ์"
            />
          </div>

          {/* ISSN */}
          <div>
            <label htmlFor="issn" className="block font-medium text-gray-700">
              ISSN
            </label>
            <input
              type="text"
              id="issn"
              name="issn"
              value={journal?.issn}
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
              value={journal?.volume}
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
              value={journal?.issue}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="Issue"
            />
          </div>

          {/* Publication Frequency */}
          <div>
            <label
              htmlFor="publicationFrequency"
              className="block font-medium text-gray-700"
            >
              ความถี่ในการตีพิมพ์
            </label>
            <input
              type="text"
              id="publicationFrequency"
              name="publicationFrequency"
              value={journal?.publicationFrequency}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="ความถี่ในการตีพิมพ์"
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
              value={journal?.location}
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
              value={journal?.coverImage}
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
              value={journal?.status}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="AVAILABLE">Available</option>
              <option value="BORROWED">Borrowed</option>
              <option value="LOST">Lost</option>
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

export default EditJournal;
