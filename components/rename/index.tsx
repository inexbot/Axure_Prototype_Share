import { useState } from "react";
import { Modal, Input, Form, message, Button } from "antd";
import axios from "axios";
interface props {
  name: string;
}
export default function Rename(props: props) {
  const [show, setShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  async function onOk() {
    const newName = form.getFieldValue("newName");
    if (newName.indexOf(" ") != -1) {
      messageApi.error("名称不能有空格！");
      return;
    }
    const res = await axios.get(
      `/api/rename?name=${props.name}&newName=${newName}`
    );
    if (res.data.result) {
      messageApi.success("重命名成功！");
      setShow(false);
      location.reload();
    } else {
      messageApi.error(res.data.reason);
    }
  }
  function onCancel() {
    setShow(false);
  }
  return (
    <>
      {contextHolder}
      <Modal open={show} onOk={onOk} onCancel={onCancel}>
        <p>请输入新名字</p>
        <Form form={form}>
          <Form.Item name="newName" label="新名字（不要有空格!）">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="default"
        onClick={() => {
          setShow(true);
        }}
      >
        重命名
      </Button>
    </>
  );
}
