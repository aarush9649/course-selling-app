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


const stripePromise = loadStripe("pk_test_51R8zaWChRNJW2MzptVW97zeggJBe50KYZUFwRSnoPyFuKTf5dBXzbeSL5SMqIJHxKRLyaLu4xxi6Jh660isMDoXY00fYp3OGfK"); // Replace with your actual Stripe public key

function App() {
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

        <Route path="/purchases" element={<Purchases />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
