"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { NextResponse } from "next/server";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
export default function Home() {
  const params = useParams();
  console.log(params);
  const [loader, setloader] = useState(false);
  const [bookmark, setbookmark] = useState({
    name: "",
    url: "",
    description: "",
  });

  const getallbookmarks = async () => {
    try {
      setloader(true);
      const axiosres = await axios.get(`/api/get-all-bookmarks/${params.id}`);
      if (!axiosres) {
        toast.error("axios side error");
        return NextResponse({ message: "axios side error" });
      }
      toast.success("Bookmarks fetched successfully");
      console.log(axiosres);
      setAllbookmarks(axiosres.data.allbookmarks);
    } catch (error) {
      console.log(error);
    }finally {
      setloader(false);
    }
  };
  const [allbookmarks, setAllbookmarks] = useState([]);
  useEffect(() => {
    getallbookmarks();
    authhandler();
  }, []);
  const authhandler = async () => {
    try {
      setloader(true);
      const axiosres = await axios.get("/api/user/auth");
      if (!axiosres) {
        toast.error("axios side error");
        return NextResponse({ message: "axios side error" });
      }
      console.log(axiosres);
      if (axiosres.data.auth === false) router.push("/login");
      toast.success("Authenticated successfully");
    } catch (error) {
      console.log(error);
    }finally {
      setloader(false);
    }
  };
  const router = useRouter();
  const logouthandler = async () => {
    try {
      setloader(true);
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
    }finally {
      setloader(false);
    }
  };
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      setloader(true);
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
    }finally {
      setloader(false);
    }
  };
  const deletehandler = async (id) => {
    try {
      setloader(true);
      const axiosres = await axios.get(`/api/delete-a-bookmark/${id}`);
      if (!axiosres) {
        toast.error("axios side error");
        return NextResponse({ message: "axios side error" });
      }
      toast.success("Bookmark deleted successfully");
      console.log(axiosres);
      getallbookmarks();
    } catch (error) {
      console.log(error);
    }finally {
      setloader(false);
    }
  };
  return loader?(
    <Loader/>
  ):(
    <>
      <div className="h-screen overflow-scroll overflow-x-hidden w-full bg-black  flex flex-col items-center justify-center antialiased">
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
            className="input  my-4 flex sm:flex-row flex-col justify-center items-center gap-5  "
          >
            <div className="flex flex-col gap-7  ">
              <div className="sm:flex-row flex flex-col gap-4">
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
            <div className="max-w-5xl mx-auto px-8">
              <HoverEffect items={allbookmarks} deletehandler={deletehandler} />
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
}
