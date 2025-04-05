
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// // import { loadStripe } from "@stripe/stripe-js";
// // import { Elements } from "@stripe/react-stripe-js";
// // const stripePromise = loadStripe(
// //   "pk_test_51QcX6kECbgbmkR5t9WMBO1TvT9crEjYpZkGKESyLMPC8FSUVxHgJzs1C9MDQJnfnfndQCCXwhOknoZmuRqRgwooc00g4hRBXcw"
// // );

// createRoot(document.getElementById("root")).render(
//   <Elements stripe={stripePromise}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Elements>
// );

// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// // Make sure to replace with your actual Stripe public key
// const stripePromise = loadStripe("pk_test_51QcX6kECbgbmkR5t9WMBO1TvT9crEjYpZkGKESyLMPC8FSUVxHgJzs1C9MDQJnfnfndQCCXwhOknoZmuRqRgwooc00g4hRBXcw");

// createRoot(document.getElementById("root")).render(
//   <Elements stripe={stripePromise}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Elements>
// );

import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
const stripePromise=loadStripe("pk_test_51R8zaWChRNJW2MzptVW97zeggJBe50KYZUFwRSnoPyFuKTf5dBXzbeSL5SMqIJHxKRLyaLu4xxi6Jh660isMDoXY00fYp3OGfK")

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);