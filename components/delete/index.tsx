import React, { useState } from "react";
import { Modal, message, Input, Form, Button } from "antd";
import axios from "axios";

interface props {
  name: string;
}

export default function DeleteModal(props: props) {
  const [show, setShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  async function onOk() {
    const name = form.getFieldValue("name");
    if (name != props.name) {
      messageApi.error("名称不对！");
      return;
    }
    const res = await axios.get(`/api/delete?name=${props.name}`);
    if (!res.data.result) {
      messageApi.error(res.data.reason);
    } else {
      location.reload();
      setShow(false);
    }
  }
  function onCancel() {
    setShow(false);
  }
  return (
    <>
      {contextHolder}
      <Modal open={show} onOk={onOk} onCancel={onCancel}>
        <p>
          正在删除 <span style={{ color: "#FF0000" }}>{props.name}</span>{" "}
          ，请输入该名称来确认删除。
        </p>
        <Form form={form}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="dashed"
        onClick={() => {
          setShow(true);
        }}
      >
        删除
      </Button>
    </>
  );
}
