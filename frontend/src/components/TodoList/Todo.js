import React from "react";
import { useState } from "react";
import { Input, Button, Col, Row } from "antd";
import axios from "../../config/axios";

export default function Todo(props) {
  const [changeInput, setChangeInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const updateTodoItem = async (id) => {
    await axios.put(`/todo-list/${id}`, {
      title: changeInput,
    });
    props.fetchData();//ทำการอัพเดตข้อมูลมาใหม่
    setIsEdit(false);//ไม่ใช้โหมดแก้ไขข้อมูล
  };

  const toggleEdit = () =>{
    setChangeInput(props.todo.title);//เรียกข้อมูลtitle จากbackend มาไว้ในsetChangeInput
    setIsEdit(true)//ใช้โหมดแก้ไขข้อมูล
  }

  //ถ้าใช้โหมดแก้ไขข้อมูล content มีค่าดังนี้
  let contents = (
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
  );
  //ทำการเช็ค ถ้า isEdit เป็น false แสดงว่าไม่ใช้โหมดแก้ไขข้อมูล ดังนั้น content มีค่าดังนี้
  if(!isEdit){
    contents = (
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
    )
  }

  return (
    <div style={{ width: "100%" }}>
      {/* เรียก contens มาแสดง */}
      {contents}
    </div>
  );
}
