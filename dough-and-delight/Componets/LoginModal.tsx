"use client";

import { Modal, Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal = ({ open, onClose, onSuccess }: Props) => {
  const [form] = Form.useForm();

  const handleLogin = async (values: any) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        message.success("Welcome back, Admin!");

        form.resetFields();
        onSuccess();
        onClose();
      } else {
        message.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={380}
      className="rounded-2xl"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#823920]">Admin Login</h2>
        <p className="text-sm text-gray-500 mt-1">
          Access Dough & Delight dashboard
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
        className="space-y-4"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Admin email"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Password"
            className="rounded-lg"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          size="large"
          className="
            w-full
            bg-[#823920]
            text-white
            rounded-full
            font-semibold
            hover:bg-[#6f2f1b]
            transition-all
          "
        >
          Login
        </Button>
      </Form>
    </Modal>
  );
};



// "use client";

// import { Modal, Form, Input, Button, message } from "antd";
// import { MailOutlined, LockOutlined } from "@ant-design/icons";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export const AdminLoginModal = ({ open, onClose, onSuccess }: Props) => {
//   const [form] = Form.useForm();

//   const handleLogin = (values: any) => {
//     const { email, password } = values;

//     if (email === "admin@doughdelight.com" && password === "admin123") {
//       localStorage.setItem("user", JSON.stringify({ role: "admin" }));
//       message.success("Welcome back, Admin!");
//       onSuccess();
//       onClose();
//     } else {
//       message.error("Invalid admin credentials");
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       centered
//       width={380}
//       className="rounded-2xl"
//     >
//       <div className="text-center mb-6">
//         <h2 className="text-2xl font-bold text-[#823920]">Admin Login</h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Access Dough & Delight dashboard
//         </p>
//       </div>

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleLogin}
//         className="space-y-4"
//       >
//         <Form.Item
//           name="email"
//           rules={[{ required: true, message: "Please enter email" }]}
//         >
//           <Input
//             size="large"
//             prefix={<MailOutlined className="text-gray-400" />}
//             placeholder="Admin email"
//             className="rounded-lg"
//           />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please enter password" }]}
//         >
//           <Input.Password
//             size="large"
//             prefix={<LockOutlined className="text-gray-400" />}
//             placeholder="Password"
//             className="rounded-lg"
//           />
//         </Form.Item>

//         <Button
//           htmlType="submit"
//           size="large"
//           className="
//               w-full
//               bg-[#823920]
//               text-white
//               rounded-full
//               font-semibold
//               hover:bg-[#6f2f1b]
//               transition-all
//           "
//         >
//           Login
//         </Button>
//       </Form>
//     </Modal>
//   );
// };
