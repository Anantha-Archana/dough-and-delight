"use client";

import { Modal, Form, Input, InputNumber, Select, Button } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;

export const EditMenuModal = ({ open, onClose, onUpdate, item }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item) {
      form.resetFields();

      let parsedPrice = [];

      if (Array.isArray(item.price)) {
        parsedPrice = item.price;
      } else if (typeof item.price === "string") {
        try {
          parsedPrice = JSON.parse(item.price);
        } catch {
          parsedPrice = [];
        }
      }

      form.setFieldsValue({
        itemName: item.itemName,
        category: item.category,
        description: item.description,
        size: parsedPrice?.[0]?.size || "1kg",
        price: parsedPrice?.[0]?.price || 0,
      });
    }
  }, [item, form]);

  const handleUpdate = async (values: any) => {
    const payload = {
      id: item.id,
      itemName: values.itemName,
      category: values.category,
      description: values.description,
      image: item.image,
      price: [
        {
          size: values.size,
          price: values.price,
        },
      ],
    };

    const res = await fetch("/api/menu/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      onUpdate();
      onClose();
    }
  };

  return (
    <Modal
      key={item?.id}
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      width={600}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Menu</h2>

      <Form layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item
          name="itemName"
          label="Item Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Select>
            <Option value="Cake">Cake</Option>
            <Option value="Dessert">Dessert</Option>
          </Select>
        </Form.Item>

        <Form.Item name="size" label="Size">
          <Select>
            <Option value="500g">500g</Option>
            <Option value="1kg">1kg</Option>
            <Option value="2kg">2kg</Option>
          </Select>
        </Form.Item>

        <Form.Item name="price" label="Price">
          <InputNumber className="w-full" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={3} />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};