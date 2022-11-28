import React from "react";
import { useState } from "react";
import { Input, Button, Col, Row } from "antd";
import axios from "axios";

export default function Todo(props) {
  const [changeInput, setChangeInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const updateTodoItem = async (id) => {
    await axios.put(`http://localhost:8000/todo-list/${id}`, {
      title: changeInput,
    });
    props.fetchData();
    setIsEdit(false);
  };

  const toggleEdit = () =>{
    setChangeInput(props.todo.title);
    setIsEdit(true)
  }

  return (
    <div style={{ width: "100%" }}>
      {/* กำหนดว่าทำการกดแก้ไขหรือไม่ */}
      {/* ใช่ */}
      {isEdit ? (
        <Row style={{ width: "100%" }}>
          <Col span={20}>
            <Row justify="start">
              <Input
                value={changeInput}
                onChange={(e) => setChangeInput(e.target.value)}
              />
            </Row>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={() => updateTodoItem(props.todo.id)}
            >
              Done
            </Button>
          </Col>
        </Row>
      ) : 
      (
        <Row style={{ width: "100%" }}>
          <Col span={16}>
            <Row justify="start">
              {props.todo.title}
              {/* {`onClick={()=>deleteTodoItem(${todo.id})}`} */}
            </Row>
          </Col>
          <Col span={4}>
            <Button style={{borderColor: "orange",color:"orange"}} onClick={() => toggleEdit()}>
              Edit
            </Button>
            </Col>
            <Col span={4}>
            <Button danger onClick={() => props.delete(props.todo.id)}>
              Delete
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}
