import { TiHeartFullOutline } from "react-icons/ti";
const Footer = () => {
  return (
    <div className="mt-auto flex p-6 pt-0 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
      © {new Date().getFullYear()}. Crafted with{" "}
      <TiHeartFullOutline className="m-1 text-red-600" /> by Ilham{" "}
      {/* <p className="mt-1 flex items-center justify-center text-center text-sm text-gray-500">
        Crafted with <TiHeartFullOutline className="m-1 text-red-600" /> by
        Ilham
      </p> */}
    </div>
  );
};

export default Footer;
