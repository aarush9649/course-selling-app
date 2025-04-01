
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";

function Home() {
    const [courses, setCourses] = useState([]);  // State initialized
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State initialized

   // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:4001/api/v1/courses/courses", {
                    withCredentials: true,
                });
                console.log("API Response:", response.data.courses); // Debugging step
                setCourses(response.data.courses || []); // Ensuring data is an array
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };
        fetchCourses();
    }, []);

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
          toast.error(error.response.data.errors || "Error in logging out");
        }
      };

    
  const settings = {
    dots: true,
    infinite: courses.length>4,
    speed: 500,
    slidesToShow: Math.min(4,courses.length),
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

    return (
        <div className="bg-gradient-to-r from-blue-300 to-white ">
            <div className="h-[1250px] md:h-[1050px] text-white container mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              SmartLearn
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-blue-700 text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-blue-700 text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-blue-700 text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>


                {/* Main Section */}
                <section className="text-center py-20">
                    <h1 className="text-4xl font-semibold text-orange-500">SmartLearn</h1>
                    <p className="text-gray-800 mt-2">Empowering Learning Through Innovation</p>
                    <div className="space-x-6 mt-8">
                 <Link
              to={"/courses"}
              className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore courses
            </Link>
            <Link
              
              className="bg-white text-black  p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white"
            >
              Courses videos
            </Link>
                    </div>
                </section>

                {/* Popular Courses */}
                <section className="text-center py-20">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Popular Courses</h2>
                    {courses.length > 0 ? (
                        <Slider {...settings}>
                            {courses.map((course) => (
                                <div key={course?._id || Math.random()} className="p-4 flex-shrink-0 w-64">
                                    <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                                        <div className="bg-orange-300 rounded-lg overflow-hidden">
                         <img 
                          className="h-32 w-full object-contain" 
                          src={course.image?.url || "https://via.placeholder.com/150"}  // Default image
                           alt={course?.title || "Course Image"} 
                           onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // Agar image fail ho jaye
                          />

                                   <div className="p-6 text-center">
                                                <h2 className="text-xl font-bold text-white">{course?.title || "No Title Available"}</h2>
                                                <Link to={`/buy/${course?._id}`} className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 duration-300">
                                                    Enroll Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="text-gray-600">No courses available at the moment.</p>
                    )}
                </section>

                <hr />

                {/* Footer */}
                <footer className="my-8">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Logo & Social Media */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center space-x-2">
                                <img src={logo} alt="SmartLearn Logo" className="w-10 h-10 rounded-full" />
                                <h1 className="text-3xl text-blue-900">SmartLearn</h1>
                            </div>
                            <div className="mt-3 ml-2 md:ml-8">
                                <p className="mb-2 text-blue-800">Follow Us</p>
                                <div className="flex space-x-4">
                                    <a href="#"><FaFacebook className="text-2xl hover:text-blue-400 duration-300" /></a>
                                    <a href="#"><FaInstagram className="text-2xl hover:text-pink-600 duration-300" /></a>
                                    <a href="#"><FaXTwitter className="text-2xl hover:text-blue-600 duration-300" /></a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="items-center flex flex-col">
                            <h3 className="text-lg font-semibold mb-4 text-orange-700">Connect</h3>
                            <ul className="space-y-2 text-gray-800">
                                <li className="hover:text-blue-700 cursor-pointer duration-300">LinkedIn - Avanish Kumar Vishwakarma</li>
                                <li className="hover:text-blue-700 cursor-pointer duration-300">GitHub - aarush9649</li>
                                <li className="hover:text-blue-700 cursor-pointer duration-300">Telegram - aarush9649</li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="items-center flex flex-col">
                            <h3 className="text-lg font-semibold mb-4 text-orange-700">Copyright &#169; 2025</h3>
                            <ul className="space-y-2 text-gray-800">
                                <li className="hover:text-blue-700 cursor-pointer duration-300">Terms & Conditions</li>
                                <li className="hover:text-blue-700 cursor-pointer duration-300">Privacy Policy</li>
                                <li className="hover:text-blue-700 cursor-pointer duration-300">Refund & Cancellation</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;
