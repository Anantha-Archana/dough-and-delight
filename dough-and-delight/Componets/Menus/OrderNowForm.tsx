"use client";

import { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Col,
  message,
} from "antd";
import dayjs from "dayjs";

interface OrderNowFormProps {
  open: boolean;
  onClose: () => void;
  orderItem: any;
}

export const OrderNowForm = ({
  open,
  onClose,
  orderItem,
}: OrderNowFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (orderItem) {
      form.setFieldsValue({
        itemName: orderItem.itemName,
      });
    }
  }, [orderItem, form]);

  const handleFinish = async (values: any) => {
    const finalData = {
      ...values,
      orderDate: values.orderDate
        ? values.orderDate.format("YYYY-MM-DD")
        : null,
      item: orderItem,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();

      if (res.ok) {
        message.success("Order placed successfully 🎉");
        form.resetFields();
        onClose();
      } else {
        message.error(result.error || "Failed to place order");
      }
    } catch {
      message.error("Server error");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={720}
      closeIcon={<span className="text-lg text-[#8b5e4b]">✕</span>}
      className="rounded-2xl overflow-hidden"
      title={null}
    >
      <div className="text-center border-b border-[#ead2c4] pb-4 pt-2 bg-[#fffaf7]">
        <h2 className="text-2xl font-bold text-[#6f3e2f]">
          🎂 Cake Order Form
        </h2>
        <p className="text-[#8b5e4b] text-sm mt-1">
          Customize your perfect cake
        </p>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-5 py-5 bg-gradient-to-br from-[#f6ebe4] via-[#f4e1d6] to-[#ead2c4]">

        <div className="bg-[#fffaf7] rounded-2xl p-5 shadow-sm border border-[#e6cfc2]">

          <Form form={form} layout="vertical" onFinish={handleFinish}>

            <h3 className="text-[#6f3e2f] font-semibold mb-3">Cake Name</h3>
            <Form.Item name="itemName">
              <Input disabled className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
            </Form.Item>

            <div className="h-[1px] bg-[#ead2c4] my-5" />

            <h3 className="text-[#6f3e2f] font-semibold mb-3">Customer Details</h3>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Customer Name"
                  name="customerName"
                  rules={[{ required: true, message: "Enter your name" }]}
                >
                  <Input className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { required: true, message: "Enter phone number" },
                    { pattern: /^[0-9]{10}$/, message: "Enter valid number" },
                  ]}
                >
                  <Input className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
                </Form.Item>
              </Col>
            </Row>

            <div className="h-[1px] bg-[#ead2c4] my-5" />

            <h3 className="text-[#6f3e2f] font-semibold mb-3">Order Details</h3>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Order Date"
                  name="orderDate"
                  rules={[{ required: true, message: "Select date" }]}
                >
                  <DatePicker
                    className="w-full bg-[#fff5ef] border border-[#e6cfc2] rounded-md"
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Cake Size"
                  name="size"
                  rules={[{ required: true, message: "Enter size" }]}
                >
                  <Input className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Flavour"
                  name="flavour"
                  rules={[{ required: true, message: "Enter flavour" }]}
                >
                  <Input className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Colour Theme" name="colour">
                  <Input className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
                </Form.Item>
              </Col>
            </Row>

            <div className="h-[1px] bg-[#ead2c4] my-5" />

            <h3 className="text-[#6f3e2f] font-semibold mb-3">Delivery Details</h3>

            <Form.Item
              label="Delivery Address"
              name="address"
              rules={[{ required: true, message: "Enter address" }]}
            >
              <Input.TextArea rows={2} className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md" />
            </Form.Item>

            <Form.Item
              label="Message on Cake"
              name="message"
              rules={[{ required: true, message: "Enter message" }]}
            >
              <Input className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md py-2" />
            </Form.Item>

            <Form.Item label="Special Instructions" name="instructions">
              <Input.TextArea rows={2} className="bg-[#fff5ef] border border-[#e6cfc2] rounded-md" />
            </Form.Item>

            <div className="flex gap-4 mt-5">
              <Button
                onClick={onClose}
                className="w-full h-10 rounded-md border border-[#d2b4a6] text-[#6f3e2f] bg-[#f3e2d8]"
              >
                Cancel
              </Button>

              <Button
                htmlType="submit"
                className="w-full h-10 rounded-md bg-[#6f3e2f] text-white font-semibold hover:bg-[#5a2e1f]"
              >
                Place Order 🍰
              </Button>
            </div>

          </Form>

        </div>
      </div>
    </Modal>
  );
};


// "use client";

// import { Button, DatePicker, Form, Input, Modal, Row, Col } from "antd";

// interface OrderNowFormProps {
//   open: boolean;
//   onClose: () => void;
//   orderItem: any;
//   onSubmit: (values: any) => void;
// }

// export const OrderNowForm = ({
//   open,
//   onClose,
//   orderItem,
//   onSubmit,
// }: OrderNowFormProps) => {
//   const [form] = Form.useForm();

//   const handleFinish = (values: any) => {
//     const finalData = {
//       ...values,
//       item: orderItem,
//     };

//     onSubmit(finalData);
//     form.resetFields();
//     onClose();
//   };

//   return (
//     <Modal
//         open={open}
//         onCancel={onClose}
//         footer={null}
//         centered
//         width={700}
//         styles={{
//         body: {
//             maxHeight: "70vh",
//             overflowY: "auto",
//             padding: "20px",
//         },
//     }}
//       title={
//         <h2 className="text-xl font-bold text-center">
//           Cake Order Form
//         </h2>
//       }
//     >
//       <Form form={form} layout="vertical" onFinish={handleFinish}>

//         <Form.Item label="Cake Name">
//           <Input value={orderItem?.itemName} disabled />
//         </Form.Item>

//         <Row gutter={16}>
//             <Col span={12}>
//                 <Form.Item
//                     label="Customer Name"
//                     name="customerName"
//                     rules={[{ required: true, message: "Enter name" }]}
//                 >
//                     <Input placeholder="Enter your name" />
//                 </Form.Item>
//             </Col>

//             <Col span={12}>
//                 <Form.Item
//                     label="Phone Number"
//                     name="phone"
//                     rules={[{ required: true, message: "Enter phone number" }]}
//                 >
//                     <Input placeholder="Enter phone number" />
//                 </Form.Item>
//             </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               label="Order Date"
//               name="orderDate"
//               rules={[{ required: true, message: "Select date" }]}
//             >
//               <DatePicker className="w-full" />
//             </Form.Item>
//           </Col>

//           <Col span={12}>
//             <Form.Item label="Cake Size" name="size" rules={[{ required: true, message: "Enter cake size" }]}>
//               <Input placeholder="1kg / 2kg / 500g..." />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Flavour" name="flavour" rules={[{ required: true, message: "Enter flavour" }]}>
//               <Input placeholder="Chocolate / Vanilla..." />
//             </Form.Item>
//           </Col>

//           <Col span={12}>
//             <Form.Item label="Colour Theme" name="colour">
//               <Input placeholder="Pink & White" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item label="Address" name="address" rules={[{ required: true, message: "Enter delivery address" }]}>
//           <Input.TextArea rows={2} placeholder="Enter address" />
//         </Form.Item>

//         <Form.Item label="Message on Cake" name="message" rules={[{ required: true, message: "Enter message for the cake" }]}>
//           <Input placeholder="Happy Birthday..." />
//         </Form.Item>

//         <Form.Item label="Special Instructions" name="instructions">
//           <Input.TextArea rows={3} placeholder="Eggless, less sugar..." />
//         </Form.Item>

//         <div className="flex gap-3 mt-4">
//           <Button onClick={onClose} className="w-full">
//             Cancel
//           </Button>

//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-full bg-amber-900"
//           >
//             Submit Order
//           </Button>
//         </div>

//       </Form>
//     </Modal>
//   );
// };