import React, { useState } from "react";
import { Form, Upload, Button, Input, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const { Dragger } = Upload;
export default function New() {
  const [show, setShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  function confirm() {
    const data = form.getFieldsValue();
    const name: string = data.name;
    if (name.indexOf(" ") != -1) {
      messageApi.error("名称不能有空格！");
      return;
    }
    const fileName: string = data.file.file.name;
    const nameSplit = fileName.split(".");
    const suffix = nameSplit[nameSplit.length - 1];
    if (suffix != "zip") {
      messageApi.error("请上传zip文件！！！");
      return;
    }
    let formdata = new FormData();
    formdata.append("file", data.file.file.originFileObj);
    formdata.append("name", data.name);
    axios.post("/api/upload", formdata).then((v) => {
      messageApi.destroy();
      messageApi.loading("上传中...");
      if (v.data.result) {
        location.reload();
      } else {
        messageApi.error(v.data.reason);
      }
    });
  }
  function cancel() {
    setShow(false);
  }
  return (
    <>
      {contextHolder}
      <Modal open={show} onOk={confirm} onCancel={cancel}>
        <Form form={form}>
          <h2>上传新原型</h2>
          <Form.Item name="name" label="原型名（不要有空格!)">
            <Input />
          </Form.Item>
          <Form.Item name="file" label="zip文件" valuePropName="file">
            <Dragger multiple={false}>
              <p>点击或拖拽.zip文件到这里来上传。</p>
              <p>.zip推荐使用7-zip来压缩，其它压缩软件可能会出现乱码问题。</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        onClick={() => {
          setShow(true);
        }}
      />
    </>
  );
}
