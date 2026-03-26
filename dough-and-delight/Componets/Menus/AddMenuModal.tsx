"use client";

import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Upload,
  Button,
} from "antd";
import {
  CloseOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { menus, priceVariants } from "..";

const { TextArea } = Input;
const { Option } = Select;

interface AddMenuModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

export const AddMenuModal = ({
  open,
  onClose,
  onSubmit,
}: AddMenuModalProps) => {
  const [form] = Form.useForm();
  const [pricingType, setPricingType] = useState("single");

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        form.resetFields();

        form.setFieldsValue({
          image: [],
          variants: [],
          price: undefined,
        });
        setPricingType("single");

        onClose();
        onSubmit(values);
      } else {
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered
      width={800}
      closable={false}
      maskClosable={false}
      rootClassName="bakery-modal"
      wrapClassName="bakery-modal-wrap"
    >
      <div className="bg-[#f3e5d8] border border-[#d7c2b1] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[85vh] p-0 m-0">
        <div className="relative bg-[#ead7c5] border-b border-[#d7c2b1] text-center shrink-0 py-5">
          <h2 className="text-2xl font-semibold text-[#5a3e2b]">
            Add New Menu Item
          </h2>
          <p className="text-sm text-[#7a5a44] mt-1">
            Fill the details below to add a new bakery item
          </p>

          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-[#7a5a44] hover:text-[#3d2a1f]"
          >
            <CloseOutlined />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 bg-[#f7efe6]">
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            requiredMark={false}
            initialValues={{
              pricingType: "single",
              bestSeller: "yes",
            }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Form.Item
                label="Item Name"
                name="itemName"
                rules={[{ required: true, message: "Enter item name" }]}
              >
                <Input className="!bg-[#efe4d8] !rounded-lg !h-10 !border-[#d6c2b1]" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Select category" }]}
              >
                <Select className="!rounded-lg">
                  {menus.map((menu) => (
                    <Option key={menu.id} value={menu.name}>
                      {menu.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Form.Item label="Pricing Type" name="pricingType">
                <Radio.Group
                  onChange={(e) => setPricingType(e.target.value)}
                  value={pricingType}
                  className="flex gap-6"
                >
                  <Radio value="single">Single Price</Radio>
                  <Radio value="multiple">Multiple Variants</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Best Seller" name="bestSeller">
                <Radio.Group className="flex gap-6">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <div className="border-t border-dashed border-[#d7c2b1] my-6"></div>

            {pricingType === "single" && (
              <Form.Item
                label="Price (₹)"
                name="price"
                rules={[{ required: true, message: "Enter price" }]}
              >
                <InputNumber className="!w-full !bg-[#efe4d8] !rounded-lg !h-10 !border-[#d6c2b1]" />
              </Form.Item>
            )}

            {pricingType === "multiple" && (
              <Form.List name="variants">
                {(fields, { add, remove }) => (
                  <>
                    <div className="mb-3 font-medium text-[#5a3e2b]">
                      Pricing Variants
                    </div>

                    {fields.map(({ key, name, ...restField }) => (
                      <div
                        key={key}
                        className="grid grid-cols-5 gap-4 mb-4 items-center"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "size"]}
                          className="col-span-2"
                          rules={[{ required: true }]}
                        >
                          <Select placeholder="Select Size">
                            {priceVariants.map((variant) => (
                              <Option key={variant} value={variant}>
                                {variant}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "price"]}
                          className="col-span-2"
                          rules={[{ required: true }]}
                        >
                          <InputNumber
                            placeholder="Price"
                            className="!w-full"
                          />
                        </Form.Item>

                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </div>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="w-full !border-dashed !border-[#d7c2b1]"
                    >
                      Add Variant
                    </Button>
                  </>
                )}
              </Form.List>
            )}

            <div className="border-t border-dashed border-[#d7c2b1] my-6"></div>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Enter description" }]}
            >
              <TextArea
                rows={4}
                className="!bg-[#efe4d8] !rounded-lg !border-[#d6c2b1]"
              />
            </Form.Item>

            <div className="border-t border-dashed border-[#d7c2b1] my-6"></div>

            <Form.Item
              label="Upload Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e: any) =>
                Array.isArray(e) ? e : e?.fileList
              }
              rules={[{ required: true, message: "Upload image" }]}
            >
              <Upload.Dragger
                beforeUpload={() => false}
                maxCount={1}
                className="!bg-[#efe4d8] !border-dashed !border-[#d6c2b1] !rounded-xl"
              >
                <div className="py-6 text-center">
                  <UploadOutlined className="text-3xl text-[#7a5a44]" />
                  <p className="mt-2 font-medium text-[#5a3e2b]">
                    Upload Image
                  </p>
                  <p className="text-sm text-[#7a5a44]">
                    Click or drag file to upload
                  </p>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </Form>
        </div>

        <div className="flex justify-end gap-4 px-8 py-4 border-t border-[#d7c2b1] bg-[#f3e5d8] shrink-0">
          <Button onClick={onClose} className="!rounded-lg !px-8 !h-10">
            Cancel
          </Button>

          <Button
            onClick={() => form.submit()}
            className="!rounded-lg !px-8 !h-10 !bg-gradient-to-r !from-[#8b5a3c] !to-[#5a3e2b] !text-white !border-none hover:!opacity-90"
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
