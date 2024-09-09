import Home from "./homepage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
};

const Homepage = async () => {
  return <Home />;
};

export default Homepage;
