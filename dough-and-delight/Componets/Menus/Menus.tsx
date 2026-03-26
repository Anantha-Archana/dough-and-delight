"use client";

import { useState } from "react";
import { menus } from "..";
import { AddMenuModal } from "./AddMenuModal";

export const Menus = () => {
  const [active, setActive] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const handleAddItem = (values: any) => {
    setMenuItems((prev) => [...prev, values]);
    setIsModalOpen(false);
  };

  return (
    <section className="w-full bg-[#f3ebe6] py-3">
      <div className="max-w-7xl mx-auto container" data-aos="fade-in" data-aos-duration="2000">

        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div
            className="
              flex items-center gap-4
              overflow-x-auto whitespace-nowrap scroll-smooth
              md:justify-start md:overflow-visible md:whitespace-normal
            "
          >
            {menus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActive(menu.name)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
                ${
                  active === menu.name
                    ? "bg-[#e6c5b5] text-[#5b2b1d] shadow-sm"
                    : "text-[#6f3e2f] hover:text-[#5b2b1d]"
                }`}
              >
                {menu.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#823920] text-white px-6 py-2.5 rounded-full text-sm md:text-base font-medium 
            hover:bg-[#6e2f1a] transition duration-300 shadow-md whitespace-nowrap"
          >
            + Add Menu Item
          </button>
        </div>

        <AddMenuModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddItem}
        />
      </div>
    </section>
  );
};



// "use client";

// import { useState } from "react";
// import { menus } from "..";
// import { AddMenuModal } from "./AddMenuModal";

// export const Menus = () => {
//   const [active, setActive] = useState("Cakes");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [menuItems, setMenuItems] = useState<any[]>([]);

//   const handleAddItem = (values: any) => {
//     setMenuItems((prev) => [...prev, values]);
//     setIsModalOpen(false);
//   };

//   return (
//     <section className="w-full bg-[#f3ebe6] py-6">
//       <div className="max-w-7xl mx-auto container">

//         <div className="flex flex-col md:flex-row justify-between gap-6">

//           <div className="flex items-center justify-center md:justify-start gap-6 flex-wrap">
//             {menus.map((menu) => (
//                 <button
//                   key={menu.id}
//                   onClick={() => setActive(menu.name)}
//                   className={`px-5 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
//                   ${
//                   active === menu.name
//                       ? "bg-[#e6c5b5] text-[#5b2b1d] shadow-sm"
//                       : "text-[#6f3e2f] hover:text-[#5b2b1d]"
//                   }`}
//                 >
//                     {menu.name}
//                 </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-[#823920] text-white px-6 py-2.5 rounded-full text-sm md:text-base font-medium 
//             hover:bg-[#6e2f1a] transition duration-300 shadow-md"
//           >
//             + Add Menu Item
//           </button>
//         </div>

//         <AddMenuModal
//           open={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleAddItem}
//         />
//       </div>
//     </section>
//   );
// };