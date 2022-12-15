import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import "antd/dist/reset.css";
import { List, Row, Col } from "antd";
import axios from "axios";
import { Rename, Delete, New, Update } from "../components";

export default function Home() {
  const [prototypeList, setPrototypeList] = useState([]);
  const [LOCAL_DOMAIN, setLOCAL_DOMAIN] = useState("");

  useEffect(() => {
    getList();
  }, []);
  async function getList() {
    const _domain = await axios.get("/api/env?type=LOCAL_DOMAIN");
    setLOCAL_DOMAIN(_domain.data.env);
    const _list = await axios.get("/api/getList");
    setPrototypeList(_list.data.names);
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Row>
          <Col span={24} style={{ fontSize: 24, margin: "24px 0 24px 0" }}>
            原型管理
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginBottom: "24px" }}>
            <New />
          </Col>
          <Col span={24}>
            <List
              footer={<div>iNexBot</div>}
              dataSource={prototypeList}
              itemLayout="horizontal"
              bordered
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Update name={item} key="update" />,
                    <Rename name={item} key="rename" />,
                    <Delete name={item} key="delete" />,
                  ]}
                >
                  <a
                    href={`http://${LOCAL_DOMAIN}/prototype/${item}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item}
                  </a>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
