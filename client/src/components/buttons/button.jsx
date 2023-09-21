import React from "react";

export default function Button({ text, onClick, className }) {
  return (
    <button
      className={`text-white bg-orange rounded-full px-6 py-2 font-bold transition duration-300 ease-in-out hover:bg-blue hover:text-white ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
