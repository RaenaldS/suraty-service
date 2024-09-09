import { Metadata } from "next";
import Homepage from "./frontend/homepage/page";

export const metadata: Metadata = {
  title: "Homepage",
};

const Home = () => {
 

  return <Homepage />;
};

export default Home;
