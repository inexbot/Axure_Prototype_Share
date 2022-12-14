import { Button, Upload, Modal, Form, message } from "antd";
import React, { useState } from "react";
import axios from "axios";

const { Dragger } = Upload;

interface props {
  name: string;
}

export default function Update(props: props) {
  const [show, setShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  function upload() {
    const data = form.getFieldsValue();
    const fileName: string = data.file.file.name;
    const nameSplit = fileName.split(".");
    const suffix = nameSplit[nameSplit.length - 1];
    if (suffix != "zip") {
      messageApi.error("请上传zip文件！！！");
      return;
    }
    let formdata = new FormData();
    formdata.append("file", data.file.file.originFileObj);
    formdata.append("name", props.name);
    axios.post("/api/update", formdata).then((v) => {
      messageApi.loading("上传中...");
      if (v.data.result) {
        location.reload();
      } else {
        messageApi.destroy();
        messageApi.error(v.data.reason);
      }
    });
  }
  return (
    <>
      {contextHolder}
      <Modal
        title="原型更新"
        open={show}
        onOk={upload}
        onCancel={() => {
          setShow(false);
        }}
      >
        <p>请选择更新的文件</p>
        <Form form={form}>
          <Form.Item name="file" label="zip文件" valuePropName="file">
            <Dragger multiple={false}>
              <p>点击或拖拽.zip文件到这里来上传。</p>
              <p>.zip推荐使用7-zip来压缩，其它压缩软件可能会出现乱码问题。</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        更新
      </Button>
    </>
  );
}
