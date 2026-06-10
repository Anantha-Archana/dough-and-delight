"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import Image from "next/image";

const contactBackgroundImage = "/contact-background-img.png";

export const ContactModal = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });

    AOS.refresh();
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      alert("Please enter a valid name (only letters and spaces are allowed).");
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      if (data.success) {
        alert("Message sent successfully ✅");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden cursor-pointer"
      data-aos="fade-in"
    >
      <div className="absolute inset-0">
        <Image
          src={contactBackgroundImage}
          alt="Contact background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf4ee]/40 via-[#fdf4ee]/30 to-[#fdf4ee]/50" />

      <div className="relative z-10 flex items-center justify-center px-4 py-20 font-['Comic_Sans_MS',cursive]">
        <div
          className="w-full max-w-5xl rounded-3xl shadow-2xl px-6 md:px-14 py-14
          bg-gradient-to-b from-[#fffdfb] via-[#fff8f2] to-[#fde9dc]"
        >
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-3xl md:text-5xl font-bold text-[#5b2b1d] mb-3 font-cursive">
              Contact Us
            </h1>

            <p className="text-[#7a4a3b] text-base md:text-lg">
              We’d love to hear from you 🍰
            </p>

            <div className="w-24 h-[2px] bg-[#d8b7a3] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div
              className="rounded-2xl p-6 border border-[#f0dccc]
              bg-gradient-to-b from-[#fffaf6] to-[#fdeee2] shadow-md"
              data-aos="fade-right"
            >
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5b2b1d]">
                  📍 Address
                </h3>
                <p className="text-[#7a4a3b] mt-2">
                  Home Baker, Kalugumalai, India
                </p>
              </div>

              <div className="h-px bg-[#e6cbb8] my-5" />

              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5b2b1d]">
                  📞 Phone
                </h3>
                <p className="text-[#7a4a3b] mt-2">+91 6369573998</p>
              </div>

              <div className="h-px bg-[#e6cbb8] my-5" />

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-[#5b2b1d]">
                  ✉️ Email
                </h3>
                <p className="text-[#7a4a3b] mt-2">
                  doughanddelight@gmail.com
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl p-6 border border-[#f0dccc]
              bg-gradient-to-b from-[#fffaf6] to-[#fdeee2] shadow-md"
              data-aos="fade-left"
            >
              <form className="space-y-4" onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6cbb8]
                  focus:outline-none focus:ring-2 focus:ring-[#d8b7a3]"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6cbb8]
                  focus:outline-none focus:ring-2 focus:ring-[#d8b7a3]"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6cbb8]
                  focus:outline-none focus:ring-2 focus:ring-[#d8b7a3]"
                  maxLength={10}
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#e6cbb8]
                  focus:outline-none focus:ring-2 focus:ring-[#d8b7a3]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-[#7a4a3b] text-white py-3 rounded-xl
                  font-semibold hover:bg-[#5b2b1d] transition cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
