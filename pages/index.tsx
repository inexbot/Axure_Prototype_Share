import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import "antd/dist/reset.css";
import { List } from "antd";
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
        <div className={styles.header}>原型管理</div>
        <div className={styles.opera}>
          <New />
        </div>
        <List
          dataSource={prototypeList}
          itemLayout="horizontal"
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
      </div>
    </div>
  );
}
