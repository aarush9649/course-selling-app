
// Courses.jsx
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API call
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; // Import menu and close icons
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle

  console.log("courses: ", courses);

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/courses/courses",
          { withCredentials: true }
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-100 w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex justify-between items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center text-blue-500">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full"
                >
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-6">
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-full px-4 py-2 pr-10 h-10 focus:outline-none"
              />
              <FiSearch className="absolute right-3 text-gray-600" />
            </div>
            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {/* Courses Section */}
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">
              No course posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  {course.image?.url ? (
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="rounded mb-4"
                    />
                  ) : (
                    <div className="h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
                      <p className="text-gray-500">No Image Available</p>
                    </div>
                  )}
                  <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">
                      ₹{course.price}{" "}
                      <span className="text-gray-500 line-through">5999</span>
                    </span>
                    <span className="text-green-600">20% off</span>
                  </div>

                  {/* Buy page */}
                  <Link
                    to={`/buy/${course._id}`}
                    className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;
