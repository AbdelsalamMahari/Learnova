import React from "react";

export default function Button({ text, onClick, className }) {
  return (
    <button
      className={`text-white bg-orange rounded-full px-6 py-2  font-bold ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
