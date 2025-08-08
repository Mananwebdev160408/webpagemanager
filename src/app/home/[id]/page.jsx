"use client";
import { NextResponse } from "next/server";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
export default function Home() {
  const params = useParams();
  console.log(params);
  const [bookmark, setbookmark] = useState({
    name: "",
    url: "",
    description: "",
  });

  const getallbookmarks = async () => {
    const axiosres = await axios.get(`/api/get-all-bookmarks/${params.id}`);
    if (!axiosres) {
      toast.error("axios side error");
      return NextResponse({ message: "axios side error" });
    }
    toast.success("Bookmarks fetched successfully");
    console.log(axiosres);
    setAllbookmarks(axiosres.data.allbookmarks);
  };
  const [allbookmarks, setAllbookmarks] = useState([]);
  useEffect(() => {
    getallbookmarks();
    authhandler();
  }, []);
  const authhandler = async () => {
    const axiosres = await axios.get("/api/user/auth");
    if (!axiosres) {
      toast.error("axios side error");
      return NextResponse({ message: "axios side error" });
    }
    console.log(axiosres);
    if (axiosres.data.auth === false) router.push("/login");
    toast.success("Authenticated successfully");
  };
  const router = useRouter();
  const logouthandler = async () => {
    try {
      const axiores = await axios.get("/api/user/logout");
      if (!axiores) {
        toast.error("axios side error");
        return NextResponse({ message: "axios side error" });
      }
      toast.success("Logout successful");
      console.log(axiores);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const axiosres = await axios.post(
        `/api/add-a-link/${params.id}`,
        bookmark
      );
      if (!axiosres) {
        toast.error("axios side error");
        return NextResponse({ message: "axios side error" });
      }
      toast.success("Bookmark added successfully");
      console.log(axiosres);
      setbookmark({ name: "", url: "", description: "" });
      getallbookmarks();
    } catch (error) {
      console.log(error);
    }
  };
  const deletehandler = async (id) => {
    const axiosres = await axios.get(`/api/delete-a-bookmark/${id}`);
    if (!axiosres) {
      toast.error("axios side error");
      return NextResponse({ message: "axios side error" });
    }
    toast.success("Bookmark deleted successfully");
    console.log(axiosres);
    getallbookmarks();
  };
  return (
    <>
      <div className="h-screen w-full bg-black   relative flex flex-col items-center justify-center antialiased">
        <div className=" z-50 text-white w-screen h-screen px-10 py-5 ">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="nav flex  justify-between items-center">
            <h1 className="text-3xl font-medium">Link Manager</h1>
            <button
              onClick={logouthandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
          <form
            onSubmit={submithandler}
            className="input  my-4 flex justify-center items-center gap-5  "
          >
            <div className="flex flex-col gap-7  ">
              <div className="flex gap-4">
                <input
                  type="text"
                  className="bg-transparent border border-white px-4 py-2 rounded-lg"
                  placeholder="Name"
                  value={bookmark.name}
                  onChange={(e) =>
                    setbookmark({ ...bookmark, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="bg-transparent border border-white px-4 py-2 rounded-lg"
                  placeholder="URL"
                  value={bookmark.url}
                  onChange={(e) =>
                    setbookmark({ ...bookmark, url: e.target.value })
                  }
                />
              </div>
              <textarea
                className="bg-transparent border border-white px-4 py-2 rounded-lg resize-none h-24"
                placeholder="Description"
                onChange={(e) =>
                  setbookmark({ ...bookmark, description: e.target.value })
                }
                value={bookmark.description}
              ></textarea>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Bookmark
            </button>
          </form>
          <div className="main  ">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">URL</th>
                  <th className="p-4">Description</th>
                  <th className="p-4"> </th>
                </tr>
              </thead>
              <tbody>
                {allbookmarks?.map((bookmark) => (
                  <tr key={bookmark._id}>
                    <td className="p-4">{bookmark.name}</td>
                    <td className="p-4">
                      <a href={bookmark.url} target="_blank">
                        {bookmark.url}
                      </a>
                    </td>
                    <td className="p-4">{bookmark.description}</td>
                    <td className="p-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer "
                        onClick={() => deletehandler(bookmark._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}
