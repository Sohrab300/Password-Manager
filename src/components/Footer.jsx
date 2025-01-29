import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col justify-center items-center fixed bottom-0 w-full">
      <div className="logo font-bold text-2xl">
        <span className="text-green-600">&lt;</span>
        PassMG<span className="text-green-600">/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with&nbsp;
        <span className="text-red-600">
          <FaHeart />
        </span>
        &nbsp;by Sohrab Sheikh
      </div>
    </div>
  );
};

export default Footer;
