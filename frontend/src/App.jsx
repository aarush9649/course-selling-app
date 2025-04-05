import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/signup";
import { Toaster } from "react-hot-toast";
import Courses from "./components/Courses";
import Buy from "./components/Buy";
import Purchases from "./components/Purchases";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import CourseCreate from "./admin/CourseCreate";
import UpdateCourse from "./admin/UpdateCourse";
import OurCourses from "./admin/OurCourses";
import { Navigate } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51R8zaWChRNJW2MzptVW97zeggJBe50KYZUFwRSnoPyFuKTf5dBXzbeSL5SMqIJHxKRLyaLu4xxi6Jh660isMDoXY00fYp3OGfK"); // Replace with your actual Stripe public key

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        
        {/* Wrap the Buy component inside Elements provider */}
        <Route
          path="/buy/:courseId"
          element={
            <Elements stripe={stripePromise}>
              <Buy />
            </Elements>
          }
        />

        <Route path="/purchases" element={user?<Purchases /> :<Navigate to={"/login"}/>} />



        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
        />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="/admin/our-courses" element={<OurCourses/>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
