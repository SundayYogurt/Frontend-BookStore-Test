// JournalCard.jsx
import React, { useState } from "react";
import { Link } from "react-router";
import JournalsService from "../services/JournalsService";
import Swal from "sweetalert2";

const JournalCard = ({ journal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await JournalsService.deleteJournal(id);

      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Deleted ${journal?.title}`,
          text: "This journal has been deleted",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
        text:
          error.response?.data?.message ||
          error.message ||
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const description = journal?.description || "";
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  const getStatusClass = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "BORROWED":
        return "bg-yellow-100 text-yellow-800";
      case "LOST":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 hover:shadow-2xl flex flex-col">
      <img
        className="w-full h-56 object-cover"
        src={journal?.coverImage || "https://via.placeholder.com/400x200"}
        alt={`Cover for ${journal?.title}`}
      />

      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{journal?.title}</h2>

        <div className="flex items-center mb-4">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(
              journal?.status
            )}`}
          >
            {journal?.status}
          </span>
          <span className="text-gray-600 text-sm ml-3">By {journal?.author}</span>
        </div>

        <p className="text-gray-700 mb-4">
          {isExpanded ? description : truncatedDescription}
        </p>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600 mb-4">
            <p>
              <strong className="font-medium text-gray-800">Category:</strong>{" "}
              {journal?.category}
            </p>
            <p>
              <strong className="font-medium text-gray-800">Year:</strong>{" "}
              {journal?.publishYear}
            </p>
            <p>
              <strong className="font-medium text-gray-800">ISSN:</strong>{" "}
              {journal?.issn}
            </p>
            <p>
              <strong className="font-medium text-gray-800">Volume:</strong>{" "}
              {journal?.volume}
            </p>
            <p>
              <strong className="font-medium text-gray-800">Issue:</strong>{" "}
              {journal?.issue}
            </p>
            <p>
              <strong className="font-medium text-gray-800">Frequency:</strong>{" "}
              {journal?.publicationFrequency}
            </p>
            <p>
              <strong className="font-medium text-gray-800">Publisher:</strong>{" "}
              {journal?.publisher}
            </p>
            <p>
              <strong className="font-medium text-gray-800">Location:</strong>{" "}
              {journal?.location}
            </p>
            <p className="col-span-2">
              <strong className="font-medium text-gray-800">Added on:</strong>{" "}
              {new Date(journal?.addedDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 border-t border-gray-200 pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-link p-0 h-auto min-h-0 text-indigo-600 hover:text-indigo-800 font-semibold no-underline hover:no-underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
          <div className="flex-grow"></div>
          <Link
            to={`/edit-journal/${journal?.itemId}`}
            className="btn btn-sm btn-warning text-white"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(journal?.itemId)}
            className="btn btn-sm btn-error text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
