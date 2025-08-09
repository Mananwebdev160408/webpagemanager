import React from "react";

function Loader({ size = "medium", text = "Loading..." }) {
     const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4"
  };
  return (
    <>
     <div className="bg-black h-screen w-screen flex items-center justify-center ">
         <div className="flex flex-col scale-150  items-center justify-center min-h-[200px]" role="status" aria-live="polite">
      <div
        className={`${sizeClasses[size]} rounded-full border-gray-300 border-t-blue-500 animate-spin`}
        style={{
          animation: "spin 1s linear infinite",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
      ></div>
      {text && (
        <p className="mt-4 text-sm text-gray-600 font-medium">{text}</p>
      )}
      <span className="sr-only">Loading content, please wait...</span>
    </div>
     </div>
    </>
  );
}

export default Loader;
