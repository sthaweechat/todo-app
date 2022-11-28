import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Divider, Input, List, Row, Typography } from "antd";
// import _ from "lodash";
import axios from "../../config/axios";
import Todo from "./Todo";

const { Text } = Typography;

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [inputField, setInputField] = useState("");

  //เอาข้อมูลจาก backend มาแสดง
  const fetchTodoList = async () => {
    const httpResponse = await axios.get("/todo-list");
    setTodoList(httpResponse.data); //เอาค่าที่ดึงมาจาก httpResponse มาไว้ในsetTodoList
  };

  //ทำการแสดงข้อมูลที่ได้มาจาก backend
  useEffect(()=>{
    fetchTodoList();
  },[])

  // useEffect(() => {
  //   setTodoList([
  //     {
  //       id: 1,
  //       title: "Do Homework",
  //       // status: false
  //     },
  //     {
  //       id: 2,
  //       title: "Do Homework",
  //       // status: false
  //     },
  //     {
  //       id: 3,
  //       title: "Do Homework",
  //       // status: false
  //     },
  //     {
  //       id: 4,
  //       title: "Do Homework",
  //       // status: false
  //     },
  //   ]);
  // }, []);

  // //เพิ่ม todo แบบไม่เชื่อมต่อ backend
  // const addTodoItem = () => {
  //   const newTodoList = [...todoList]; // ก็อปปี้ todoList จากอันเก่ามาอันใหม่แล้วเก็บไว้ใน newTodoList
  //   //ทำการ push ของใหม่ ไว้ใน newTodoList
  //   newTodoList.push({
  //     id: _.uniqueId(), //ใช้ uniqueId จาก lodash auto++
  //     title: inputField, //นำค่าจาก inputField ที่พิมมาจาก input ไว้ใน title
  //   });
  //   setTodoList(newTodoList); // นำค่าที่ได้จาก newTodoList ไปไว้ในsetTodoList
  //   setInputField(""); //reset ค่าinput หลังจากกด add
  // };

  //เพิ่ม todo แบบเชื่อมต่อ backend
  const addTodoItem = async() => {
    await axios.post('/todo-list',{title: inputField});//ทำการเพิ่มข้อมูลtitle จาก inputField
    fetchTodoList(); //ทำการอัพเดตข้อมูลมาใหม่
  }
  //ลบ todo วิธี1
  // const deleteTodoItem = (id)=>{
  //   const newTodoList = todoList.filter(todo => todo.id !== id); //ทำการฟิลเตอร์แสดงยกเว้นไอดีที่เลือก
  //   setTodoList(newTodoList);
  // }

  // ลบ todo วิธี2 แบบไม่เชื่อม backend
  // const deleteTodoItem = (id) => {
  //   const newTodoList = [...todoList]; //ก็อปปี้ todoList จากอันเก่ามาอันใหม่แล้วเก็บไว้ใน newTodoList
  //   const targetIndex = newTodoList.findIndex((todo) => todo.id === id); //หา todoอันไหนที่มีไอดีเท่ากับที่ส่งค่ามา
  //   newTodoList.splice(targetIndex, 1); //ทำการตัด indexนั้นออก
  //   setTodoList(newTodoList);
  // };

  //ลบ todo แบบเชื่อม backend
  const deleteTodoItem = async(id) => {
    await axios.delete(`/todo-list/${id}`);//ทำการลบข้อมูล
    fetchTodoList();//ทำการอัพเดตข้อมูลมาใหม่
  };

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
              onClick={addTodoItem}
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
                {/* ทำการส่งข้อมูล deleteTodoItem ไปให้ todo โดยเรียกผ่าน delete*/}
                {/* ทำการส่งข้อมูล todo ไปให้ todo โดยเรียกผ่าน todo*/}
                {/* ทำการส่งข้อมูล fetchTodoList ไปให้ todo โดยเรียกผ่าน fetchData*/}
                <Todo delete={deleteTodoItem} todo={todo} fetchData={fetchTodoList}/>
              </List.Item>
            )}
          />
        </Row>
      </Col>
    </Row>
  );
}
