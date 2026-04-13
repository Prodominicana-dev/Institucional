"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function InfoPopup({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setOpen(true), 50);
    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    document.body.style.overflow = "unset";
    setTimeout(() => setOpen(false), 400);
  };

  if (!open) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 transition-all duration-500 ease-out ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md transition-all duration-500 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />
      
      <div 
        className={`relative w-full max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-500 ease-out ${
          isClosing 
            ? "opacity-0 scale-90 translate-y-8" 
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <div className="hidden sm:block absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl blur-lg opacity-30 animate-pulse" />
        
        <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
          
          <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />
          
          <div className="relative px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-4 sm:pb-6">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
            >
              <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>

            <div className="flex justify-center mb-3 sm:mb-5">
              <div className="relative">
                <div className="hidden sm:block absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-3 sm:p-4 rounded-full shadow-lg shadow-blue-500/30">
                  <svg 
                    className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Aviso Importante
            </h2>
            <div className="flex justify-center mt-2 sm:mt-3">
              <div className="h-0.5 sm:h-1 w-12 sm:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
          </div>

          <div className="px-4 sm:px-6 md:px-10 pb-4 sm:pb-6 max-h-[40vh] sm:max-h-[45vh] md:max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {children}
          </div>

          <div className="px-4 sm:px-6 md:px-10 py-4 sm:py-5 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200/50">
            <button
              onClick={handleClose}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 px-6 sm:px-8 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              <span className="relative z-10">Entendido</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}