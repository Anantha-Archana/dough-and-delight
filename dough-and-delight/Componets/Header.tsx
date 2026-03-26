"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import logo from "../public/dough-and-doughts.png";
import { AdminLoginModal } from "./LoginModal";
import { LuShoppingCart } from "react-icons/lu";

// import { useCart } from "@/app/context/CartContext";
// import { CartPopup } from "./CartPopup";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Our Menu", href: "/menu" },
  { name: "Seasonal", href: "" },
  { name: "About", href: "/aboutUs" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  // const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setIsAdmin(user?.role === "admin");
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#823920] shadow-md">
      <div className="container py-2 mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Dough & Delight"
              width={150}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white text-sm md:text-base font-medium hover:text-[#F3D6C6]"
              >
                {item.name}
              </Link>
            ))}

            {isAdmin && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#F3D6C6] text-[#823920] px-5 py-2 rounded-full font-semibold text-sm"
                >
                  Login
                </button>

                <button onClick={() => setCartOpen(true)}>
                  <div className="relative">
                    <LuShoppingCart size="25" className="text-white" />

                    {/* {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                        {totalItems}
                      </span>
                    )} */}
                  </div>
                </button>
              </div>
            )}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <IoCloseOutline size={30} /> : <IoMenuOutline size={30} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#823920] flex flex-col items-center justify-center space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <AdminLoginModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setIsAdmin(true)}
      />

      {/* <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} /> */}
    </header>
  );
};

export default Header;

// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
// import logo from "../public/dough-and-doughts.png";
// import { AdminLoginModal } from "./LoginModal";
// import { LuShoppingCart } from "react-icons/lu";

// const navItems = [
//   { name: "Home", href: "/" },
//   { name: "Our Menu", href: "/menu" },
//   { name: "Seasonal", href: "" },
//   { name: "About", href: "/aboutUs" },
//   { name: "Contact", href: "/contact" },
// ];

// const Header = () => {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "null");
//     setIsAdmin(user?.role === "admin");
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 bg-[#823920] shadow-md">
//       <div className="container py-2 mx-auto">
//         <div
//           className="flex items-center justify-between h-20"
//           data-aos="zoom-in"
//         >
//           <Link href="/" className="flex items-center">
//             <Image
//               src={logo}
//               alt="Dough & Delight"
//               width={150}
//               height={60}
//               className="object-contain"
//               priority
//             />
//           </Link>

//           <nav className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-white text-sm md:text-base font-medium hover:text-[#F3D6C6] transition"
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {isAdmin && (
//               <div className=" flex items-center gap-4">
//                 <button
//                   onClick={() => setOpen(true)}
//                   className="bg-[#F3D6C6] text-[#823920] px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-[#e9c3ad] hover:scale-105 transition-all"
//                 >
//                   Login
//                 </button>
//                 <button>
//                   <LuShoppingCart size="25" className="text-white" />
//                 </button>
//               </div>
//             )}
//           </nav>

//           <button
//             onClick={() => setOpen(!open)}
//             className="md:hidden text-white"
//             aria-label="Toggle Menu"
//           >
//             {open ? <IoCloseOutline size={30} /> : <IoMenuOutline size={30} />}
//           </button>
//         </div>
//       </div>

//       {open && (
//         <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#823920] z-40 flex flex-col items-center justify-center space-y-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="text-white text-lg font-medium hover:text-[#F3D6C6]"
//               onClick={() => setOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}

//           {isAdmin && (
//             <Link
//               href="/admin/add-menu"
//               className="text-[#F3D6C6] text-lg font-semibold border border-[#F3D6C6] px-6 py-2 rounded-full"
//               onClick={() => setOpen(false)}
//             >
//               Add Menu
//             </Link>
//           )}

//           <button className="bg-[#F3D6C6] text-[#823920] px-6 py-2 rounded-full font-semibold shadow-md">
//             Order Now
//           </button>
//         </div>
//       )}

//       <AdminLoginModal
//         open={open}
//         onClose={() => setOpen(false)}
//         onSuccess={() => setIsAdmin(true)}
//       />
//     </header>
//   );
// };

// export default Header;
