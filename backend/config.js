import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY ="sk_test_51R8zaWChRNJW2Mzp8Mvs8sDb6Pg6bm1Dqb2NuzkvFiYp9lxGXWVtpKrxHv7mnLV3RJ4EdyRvzyxoumVCwtON6TH100zMBLB9Fa";

export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
};
