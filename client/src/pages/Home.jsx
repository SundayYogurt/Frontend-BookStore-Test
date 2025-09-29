import React, { useEffect, useState } from "react";
import booksService from "../services/booksService";
import Swal from "sweetalert2";
import BookCard from "../components/BookCard";
const Books = () => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await booksService.getAllBooks([]);

        if (response.status === 200) {
          setBook(response.data);
          console.log(`response : ${response?.data}`);
        }
      } catch (error) {
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

    fetchData();
  }, []);

  console.log("data: " + book?.data?.itemId);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
      {book?.data?.length > 0 ? (
        book?.data?.map((book) => (
          <BookCard key={book?.data?.itemId} book={book} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          ไม่มีหนังสือในขณะนี้
        </p>
      )}
    </div>
  );
};

export default Books;
