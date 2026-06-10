"use client";

import { useEffect, useState } from "react";

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  endOfMonth,
  format,
} from "date-fns";

const HurrySection = () => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [monthName, setMonthName] = useState("");

  useEffect(() => {

    const updateTimer = () => {

      const now = new Date();

      const endDate = endOfMonth(now);

      setMonthName(format(endDate, "MMMM"));

      const totalDays = differenceInDays(endDate, now);

      const totalHours =
        differenceInHours(endDate, now) % 24;

      const totalMinutes =
        differenceInMinutes(endDate, now) % 60;

      const totalSeconds =
        differenceInSeconds(endDate, now) % 60;

      setTimeLeft({
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
      });

    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <section className="relative overflow-hidden py-10 px-4">

      <div className="absolute inset-0 bg-gradient-to-br from-[#fff7ef] via-[#f8efe5] to-[#f3dfcf]" />

      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-[#f5d2bb]/30 blur-3xl rounded-full" />

      <div className="absolute top-10 left-10 w-16 h-16 border border-[#ddb89b]/20 rounded-full" />

      <div className="absolute bottom-10 right-10 w-20 h-20 border border-[#ddb89b]/20 rounded-full" />

      <div className="relative max-w-3xl mx-auto">

        <div className="bg-white/80 backdrop-blur-md border border-[#ecd7c3] rounded-[24px] shadow-lg px-5 md:px-8 py-8 text-center">

          <div className="flex items-center justify-center gap-3 mb-4">

            <div className="w-12 md:w-16 h-[1px] bg-[#cfa786]" />

            <span className="text-[#8B2E1E] text-sm">
              ✨
            </span>

            <div className="w-12 md:w-16 h-[1px] bg-[#cfa786]" />

          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#8B2E1E] leading-snug">

            Hurry! Only{" "}

            <span className="text-[#c7462d]">
              {timeLeft.days} Days Left
            </span>

          </h2>

          <p className="mt-3 text-[#5d4638] text-xs md:text-sm leading-relaxed max-w-xl mx-auto">

            Don’t miss our limited-time seasonal delights.
            Grab your festive favorites before the offer disappears!

          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">

            <div className="bg-[#fffaf5] border border-[#ecd7c3] rounded-xl py-4 shadow-sm hover:shadow-md transition duration-300">

              <h3 className="text-2xl md:text-3xl font-semibold text-[#8B2E1E]">
                {timeLeft.days}
              </h3>

              <p className="mt-1 text-[10px] md:text-xs uppercase tracking-wide text-[#8c6a58]">
                Days
              </p>

            </div>

            <div className="bg-[#fffaf5] border border-[#ecd7c3] rounded-xl py-4 shadow-sm hover:shadow-md transition duration-300">

              <h3 className="text-2xl md:text-3xl font-semibold text-[#8B2E1E]">
                {timeLeft.hours}
              </h3>

              <p className="mt-1 text-[10px] md:text-xs uppercase tracking-wide text-[#8c6a58]">
                Hours
              </p>

            </div>

            <div className="bg-[#fffaf5] border border-[#ecd7c3] rounded-xl py-4 shadow-sm hover:shadow-md transition duration-300">

              <h3 className="text-2xl md:text-3xl font-semibold text-[#8B2E1E]">
                {timeLeft.minutes}
              </h3>

              <p className="mt-1 text-[10px] md:text-xs uppercase tracking-wide text-[#8c6a58]">
                Minutes
              </p>

            </div>

            <div className="bg-[#fffaf5] border border-[#ecd7c3] rounded-xl py-4 shadow-sm hover:shadow-md transition duration-300">

              <h3 className="text-2xl md:text-3xl font-semibold text-[#8B2E1E]">
                {timeLeft.seconds}
              </h3>

              <p className="mt-1 text-[10px] md:text-xs uppercase tracking-wide text-[#8c6a58]">
                Seconds
              </p>

            </div>

          </div>

          <button className="mt-8 bg-gradient-to-r from-[#8B2E1E] to-[#c7462d] hover:scale-105 hover:shadow-xl transition duration-300 text-white px-8 py-2.5 rounded-xl font-medium text-sm md:text-base shadow-md">

            Order Now

          </button>

          <p className="mt-4 text-[10px] md:text-xs text-[#8c6a58] italic">

            Seasonal specials available until the end of {monthName}.

          </p>

        </div>

      </div>
    </section>
  );
};

export default HurrySection;



// "use client";

// import { useEffect, useState } from "react";

// const HurrySection = () => {

//   const now = new Date();

//   const targetDate = new Date(
//     now.getFullYear(),
//     now.getMonth() + 1,
//     0,
//     23,
//     59,
//     59
//   ).getTime();

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {

//       const currentTime = new Date().getTime();

//       const difference = targetDate - currentTime;

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(
//             difference / (1000 * 60 * 60 * 24)
//           ),

//           hours: Math.floor(
//             (difference % (1000 * 60 * 60 * 24)) /
//               (1000 * 60 * 60)
//           ),

//           minutes: Math.floor(
//             (difference % (1000 * 60 * 60)) /
//               (1000 * 60)
//           ),

//           seconds: Math.floor(
//             (difference % (1000 * 60)) / 1000
//           ),
//         });
//       } else {

//         window.location.reload();
//       }

//     }, 1000);

//     return () => clearInterval(timer);

//   }, [targetDate]);

//   return (
//     <section className="relative py-10 px-4 overflow-hidden">

//       <div className="absolute inset-0 bg-gradient-to-b from-[#f8f1e7] to-[#f3e4d3]" />

//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-[#f6d2b8]/30 blur-3xl rounded-full" />

//       <div className="relative max-w-2xl mx-auto text-center">

//         <div className="flex items-center justify-center gap-3 mb-4">

//           <div className="w-12 md:w-16 h-[1px] bg-[#c9a27e]" />

//           <span className="text-[#8B2E1E] text-sm">
//             ✨
//           </span>

//           <div className="w-12 md:w-16 h-[1px] bg-[#c9a27e]" />

//         </div>

//         <h2 className="text-2xl md:text-3xl font-bold text-[#8B2E1E] leading-snug">
//           Hurry! Only{" "}

//           <span className="text-[#b63b24]">
//             {timeLeft.days} Days Left!
//           </span>

//         </h2>

//         <p className="mt-3 text-[#5c4033] text-sm md:text-[15px] leading-relaxed max-w-lg mx-auto">
//           Don’t miss our limited-time seasonal delights.
//           Order your festive favorites before the offer ends!
//         </p>

//         <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">

//           <div className="bg-white shadow-md rounded-xl px-4 py-3 min-w-[78px] border border-[#ecd7c3]">

//             <h3 className="text-xl md:text-2xl font-bold text-[#8B2E1E]">
//               {timeLeft.days}
//             </h3>

//             <p className="text-[11px] text-gray-500 mt-1">
//               Days
//             </p>

//           </div>

//           <div className="bg-white shadow-md rounded-xl px-4 py-3 min-w-[78px] border border-[#ecd7c3]">

//             <h3 className="text-xl md:text-2xl font-bold text-[#8B2E1E]">
//               {timeLeft.hours}
//             </h3>

//             <p className="text-[11px] text-gray-500 mt-1">
//               Hours
//             </p>

//           </div>

//           <div className="bg-white shadow-md rounded-xl px-4 py-3 min-w-[78px] border border-[#ecd7c3]">

//             <h3 className="text-xl md:text-2xl font-bold text-[#8B2E1E]">
//               {timeLeft.minutes}
//             </h3>

//             <p className="text-[11px] text-gray-500 mt-1">
//               Minutes
//             </p>

//           </div>

//           <div className="bg-white shadow-md rounded-xl px-4 py-3 min-w-[78px] border border-[#ecd7c3]">

//             <h3 className="text-xl md:text-2xl font-bold text-[#8B2E1E]">
//               {timeLeft.seconds}
//             </h3>

//             <p className="text-[11px] text-gray-500 mt-1">
//               Seconds
//             </p>

//           </div>

//         </div>

//         <button className="mt-7 bg-gradient-to-r from-[#8B2E1E] to-[#b63b24] hover:scale-105 transition duration-300 text-white px-7 py-2.5 rounded-xl font-semibold text-sm md:text-base shadow-md">
//           Order Now
//         </button>

//         <p className="mt-4 text-[10px] md:text-xs text-[#8a6b5c] italic">
//           Seasonal specials available until this month ends.
//         </p>

//       </div>
//     </section>
//   );
// };

// export default HurrySection;