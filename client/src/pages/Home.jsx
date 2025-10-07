import React, { useEffect, useState, useRef } from "react";
import BooksService from "../services/BooksService";
//BookService edit
import ComicService from "../services/ComicsService";
import Swal from "sweetalert2";
import BookCard from "../components/BookCard";
import ComicCard from "../components/ComicCard";
import JournalCard from "../components/JournalCard";
import JournalsService from "../services/JournalsService";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [comics, setComics] = useState([]);
  const [journals, setJournals] = useState([]);
  const targetRef = useRef(null);

  // ฟังก์ชัน scroll
  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // โหลดข้อมูลจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBooks = await BooksService.getAllBooks();
        const responseComics = await ComicService.getAllComics();
        const responseJournals = await JournalsService.getAllJournals();

        setBooks(responseBooks.status === 200 ? responseBooks.data : []);
        setComics(responseComics.status === 200 ? responseComics.data : []);
        setJournals(
          responseJournals.status === 200 ? responseJournals.data : []
        );
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

    fetchData();
  }, []);

  return (
    <>
      <div
        className="hero max-h-screen"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome!</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-neutral" onClick={handleScroll}>
              Read!
            </button>
          </div>
        </div>
      </div>
      <div className="px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-4 mt-4">
          หมวดหมู่ หนังสือ
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={targetRef}
        >
          {books?.length > 0 ? (
            books?.map((book) => (
              <BookCard key={book.itemId} book={book} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              ไม่มีหนังสือในขณะนี้
            </p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-200 mb-4 mt-4">
        หมวดหมู่ การ์ตูน
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {comics?.length > 0 ? (
          comics?.map((comic) => (
            <ComicCard key={comic.itemId} comic={comic} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            ไม่มีหนังสือ การ์ตูนในขณะนี้
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-200 mb-4 mt-8">
          หมวดหมู่ วารสาร
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals?.length > 0 ? (
          journals?.map((journal) => (
            <JournalCard key={journal.itemId} journal={journal} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            ไม่มีวารสารในขณะนี้
          </p>
        )}
      </div>
    </>
  );
};

export default Books;
