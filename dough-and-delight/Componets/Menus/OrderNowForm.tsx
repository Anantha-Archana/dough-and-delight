"use client";

import { useState } from "react";
import { Modal, Input, Button } from "antd";
import { useCart } from "@/app/context/cardContext";
import Image from "next/image";
import {
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

export const OrderNowForm = ({ open, onClose }: any) => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout">("cart");

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (sum: number, item: any) =>
      sum + (Number(item.price) || 0) * (item.quantity || 0),
    0
  );

  const delivery = 50;
  const total = subtotal + delivery;

  const placeOrder = async () => {
    if (
      !form.customerName ||
      !form.phone ||
      !form.address
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          cart,
          total,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Order placed successfully");

        clearCart();

        setForm({
          customerName: "",
          phone: "",
          address: "",
        });

        setStep("cart");

        onClose();
      } else {
        alert(data.error || "Order failed");
      }
    } catch (error) {
      console.error("ORDER ERROR:", error);

      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width="100%"
      style={{ maxWidth: 520 }}
    >
      <div className="bg-[#f7f3f0] rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-[#5b2b1d]">
            {step === "cart" ? "Your Cart" : "Checkout"}
          </h2>

          <span className="bg-[#8b5e4b] text-white text-xs px-2 py-1 rounded-full">
            {cart.length}
          </span>
        </div>

        <div className="p-4 md:p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          {step === "cart" && (
            <>
              <p className="text-sm text-gray-500">
                You have {cart.length} items
              </p>

              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="relative flex items-center justify-between bg-white p-3 md:p-4 rounded-2xl shadow-sm"
                >
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  >
                    <CloseOutlined />
                  </button>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 relative">
                      <Image
                        src={
                          item.image?.startsWith("/")
                            ? item.image
                            : `/${item.image}`
                        }
                        alt={item.itemName}
                        fill
                        className="object-contain rounded-xl"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-[#5b2b1d]">
                        {item.itemName}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.size}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹ {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#8b5e4b] text-white px-3 py-1 rounded-full">
                    <button onClick={() => decreaseQty(item.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-white p-4 rounded-2xl shadow-sm text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹ {delivery}</span>
                </div>

                <div className="flex justify-between font-semibold text-[#5b2b1d]">
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setStep("checkout")}
                className={`w-full py-3 rounded-full text-white font-medium ${
                  cart.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#8b5e4b] to-[#c08a5a]"
                }`}
              >
                Proceed to Checkout
              </button>
            </>
          )}

          {step === "checkout" && (
            <>
              <div className="bg-white p-5 rounded-2xl shadow-sm space-y-4">

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Full Name
                  </label>

                  <Input
                    prefix={<UserOutlined />}
                    value={form.customerName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        customerName: e.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Address
                  </label>

                  <Input.TextArea
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter delivery address"
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Phone Number
                  </label>

                  <Input
                    prefix={<PhoneOutlined />}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter phone number"
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <Button
                loading={loading}
                onClick={placeOrder}
                type="primary"
                className="w-full h-11 rounded-full bg-gradient-to-r from-[#8b5e4b] to-[#c08a5a]"
              >
                Place Order
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};