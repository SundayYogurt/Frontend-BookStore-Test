import { useParams, useNavigate } from "react-router";
import ComicsService from "../services/ComicsService";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const EditComic = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comicData, setComicData] = useState({
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
    coverImage: "",
  });

  useEffect(() => {
    const EditComic = async (id) => {
      try {
        const resp = await ComicsService.getComicById(id);
        console.log(resp.data.data);
        if (resp.status === 200) {
          setComicData(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get Comic",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    EditComic(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setComicData({ ...comicData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...comicData,
        publishYear: parseInt(comicData.publishYear) || 0,
        volumeNumber: parseInt(comicData.volumeNumber) || 0,
      };

      const resp = await ComicsService.updateComic(id, dataToSend);
      if (resp.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Comic updated successfully!",
          icon: "success",
        }).then(() => {
          setComicData({
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
            coverImage: "",
          });
          navigate("/");
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error",
        text: e?.response?.data?.message || "Failed to update comic",
        icon: "error",
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full space-y-8 rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Update Comic
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                onChange={handleChange}
                value={comicData.title}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author *
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                onChange={handleChange}
                value={comicData.author}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                onChange={handleChange}
                value={comicData.category}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="publishYear"
                className="block text-sm font-medium text-gray-700"
              >
                Publish Year
              </label>
              <input
                id="publishYear"
                name="publishYear"
                type="number"
                onChange={handleChange}
                value={comicData.publishYear}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="isbn"
                className="block text-sm font-medium text-gray-700"
              >
                ISBN *
              </label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                required
                onChange={handleChange}
                value={comicData.isbn}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="series"
                className="block text-sm font-medium text-gray-700"
              >
                Series
              </label>
              <input
                id="series"
                name="series"
                type="text"
                onChange={handleChange}
                value={comicData.series}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="volumeNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Volume Number
              </label>
              <input
                id="volumeNumber"
                name="volumeNumber"
                type="number"
                onChange={handleChange}
                value={comicData.volumeNumber}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="illustrator"
                className="block text-sm font-medium text-gray-700"
              >
                Illustrator
              </label>
              <input
                id="illustrator"
                name="illustrator"
                type="text"
                onChange={handleChange}
                value={comicData.illustrator}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="colorType"
                className="block text-sm font-medium text-gray-700"
              >
                Color Type
              </label>
              <select
                id="colorType"
                name="colorType"
                onChange={handleChange}
                value={comicData.colorType}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              >
                <option value="">Select color type</option>
                <option value="FULL_COLOR">Full Color</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="targetAge"
                className="block text-sm font-medium text-gray-700"
              >
                Target Age
              </label>
              <select
                id="targetAge"
                name="targetAge"
                onChange={handleChange}
                value={comicData.targetAge}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              >
                <option value="">Select target age</option>
                <option value="TEEN">Teen</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                onChange={handleChange}
                value={comicData.description}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700"
              >
                coverImage
              </label>
              <textarea
                id="coverImage"
                name="coverImage"
                onChange={handleChange}
                value={comicData.coverImage}
                className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex-1 btn btn-error"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn btn-neutral">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditComic;
