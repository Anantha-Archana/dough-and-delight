"use client";

import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Radio,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { TextArea } = Input;
const { Option } = Select;

export const EditMenuModal = ({ open, onClose, onUpdate, item }: any) => {
  const [form] = Form.useForm();
  const [pricingType, setPricingType] = useState("single");

  useEffect(() => {
    if (open && item) {
      let parsedPrice: any[] = [];

      if (Array.isArray(item.price)) {
        parsedPrice = item.price;
      }

      else if (typeof item.price === "string") {
        try {
          const parsed = JSON.parse(item.price);

          if (Array.isArray(parsed)) {
            parsedPrice = parsed;
          } else {
            parsedPrice = [{ size: "Regular", price: Number(parsed) }];
          }
        } catch {
          parsedPrice = [{ size: "Regular", price: Number(item.price) }];
        }
      }

      else if (typeof item.price === "number") {
        parsedPrice = [{ size: "Regular", price: item.price }];
      }

      if (!parsedPrice.length) {
        parsedPrice = [{ size: "Regular", price: 0 }];
      }

      const type = parsedPrice.length > 1 ? "multiple" : "single";
      setPricingType(type);

      form.setFieldsValue({
        itemName: item.itemName,
        category: item.category,
        description: item.description,
        pricingType: type,
        price: parsedPrice[0]?.price || 0,
        variants: parsedPrice,
        image: item.image
          ? [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: item.image,
              },
            ]
          : [],
      });
    }
  }, [open, item, form]);

  const handleUpdate = async (values: any) => {
    try {
      let pricePayload = [];

      if (values.pricingType === "single") {
        pricePayload = [
          {
            size: "Regular",
            price: values.price,
          },
        ];
      } else {
        pricePayload = values.variants;
      }

      // Handle image
      let imagePath = item.image;

      if (values.image && values.image.length > 0) {
        const file = values.image[0];

        if (file.url) {
          imagePath = file.url;
        } else {
          imagePath = file.name;
        }
      }

      const payload = {
        id: item.id,
        itemName: values.itemName,
        category: values.category,
        description: values.description,
        image: imagePath,
        price: pricePayload,
      };

      const res = await fetch("/api/menu/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        message.error("Update failed (check API)");
        return;
      }

      const data = await res.json();

      if (data.success) {
        message.success("Menu updated successfully");
        onUpdate();
        form.resetFields();
        onClose();
      } else {
        message.error("Update failed");
      }
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={600}>
      <h2 className="text-xl font-semibold mb-4">Edit Menu</h2>

      <Form form={form} layout="vertical" onFinish={handleUpdate}>
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

        <Form.Item name="pricingType" label="Pricing Type">
          <Radio.Group onChange={(e) => setPricingType(e.target.value)}>
            <Radio value="single">Single</Radio>
            <Radio value="multiple">Multiple</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Single Price */}
        {pricingType === "single" && (
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
        )}

        {/* Multiple */}
        {pricingType === "multiple" && (
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex gap-2 mb-2">
                    <Form.Item
                      {...restField}
                      name={[name, "size"]}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Size" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      rules={[{ required: true }]}
                    >
                      <InputNumber placeholder="Price" />
                    </Form.Item>

                    <Button danger onClick={() => remove(name)}>
                      X
                    </Button>
                  </div>
                ))}

                <Button onClick={() => add()}>Add Variant</Button>
              </>
            )}
          </Form.List>
        )}

        <Form.Item name="description" label="Description">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) =>
            Array.isArray(e) ? e : e?.fileList
          }
        >
          <Upload.Dragger beforeUpload={() => false} maxCount={1}>
            <p className="text-center">
              <UploadOutlined /> Upload Image
            </p>
          </Upload.Dragger>
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