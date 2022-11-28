import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Divider, Input, List, Row, Typography } from "antd";
import _ from "lodash";
const { Text } = Typography;

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [inputField, setInputField] = useState("");
  useEffect(() => {
    setTodoList([
      {
        id: 1,
        title: "Do Homework",
        // status: false
      },
      {
        id: 2,
        title: "Do Homework",
        // status: false
      },
      {
        id: 3,
        title: "Do Homework",
        // status: false
      },
      {
        id: 4,
        title: "Do Homework",
        // status: false
      },
    ]);
  }, []);



  return (
    <Row justify="center">
      <Col>
        <Row>
          <Text type="warning">กรุณาใส่ Todo ที่ต้องการเพิ่ม</Text>
        </Row>
        <Row>
          <Col span={20}>
            <Input
              value={inputField}
              onChange={(e) => setInputField(e.target.value)}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              style={{ width: "100%" }}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <List
            style={{ minWidth: 500 }}
            header={<div>Todo List</div>}
            bordered
            dataSource={todoList}
            renderItem={(todo) => (
              <List.Item>
                <Row style={{ width: "100%" }}>
                  <Col span={20}>
                    <Row justify="start">
                      {todo.title}

                      </Row>
                  </Col>
                  <Col span={4}>
                    <Row justify="end">
                      <Button danger >Delete</Button>
                    </Row>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Row>
      </Col>
    </Row>
  );
}
