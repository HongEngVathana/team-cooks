import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#d5ecdc] shadow-xs relative bg-[#ebf7ef]">
      {/* Desktop/Tablet Banner (Pixel-Perfect from reference) */}
      <img
        src="/hero-banner-full.png"
        alt="Our Kitchen Schedule - A fair and organized plan for a happy home. Good Food Good Mood!"
        className="w-full h-auto object-cover hidden md:block"
      />

      {/* Clean, Mobile-Optimized Hero Banner (< 768px) */}
      <div className="block md:hidden p-3.5 bg-gradient-to-br from-[#ebf7ef] via-[#f0faf3] to-[#def2e3]">
        <div className="flex items-center gap-3">
          <img
            src="/kitchen-left.png"
            alt="Kitchen scene"
            className="w-20 h-20 object-cover rounded-xl shadow-xs shrink-0 border border-white"
          />
          <div className="min-w-0 flex-1">
            <span className="inline-block text-[10px] font-bold text-[#1A8D5F] bg-[#1A8D5F]/10 px-2 py-0.5 rounded-full mb-1">
              Annual Schedule
            </span>
            <h2 className="text-base font-black text-[#113e2e] tracking-tight leading-tight">
              Our Kitchen Schedule
            </h2>
            <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
              A fair and organized plan for a happy home 😁
            </p>
          </div>
        </div>

        {/* Good Food Good Mood script badge on mobile */}
        <div className="mt-2.5 pt-2 border-t border-[#d4edd9] flex items-center justify-between text-xs font-semibold">
          <span className="font-handwriting text-[#1A8D5F] text-base font-bold">
            Good Food Good Mood! ✨
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            2026 Rotation
          </span>
        </div>
      </div>
    </div>
  );
};
