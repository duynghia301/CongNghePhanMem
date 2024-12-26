import { Metadata } from "next";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "404 Not found",
};

const ErrorPage = () => {
  return (
    <>
      <NotFound />
      <Footer/>
    </>
  );
};

export default ErrorPage;
