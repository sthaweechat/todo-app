// const { uniqueId } = require("lodash");

const db = require("../models");
// let todoList = [];

const getTodoList = async (req, res) => {
  const todoList = await db.TodoList.findAll();
  res.status(200).send(todoList);
};

const addTodoList = async (req, res) => {
  const newTodo = await db.TodoList.create({
    title: req.body.title,
    // id: Number(uniqueId()),
    // title: req.body.title
  });

  // todoList.push(newTodo);

  res.status(201).send(newTodo);
};

const deleteTodoList = async (req, res) => {
  const targetId = Number(req.params.id);
  // todoList = todoList.filter(todo => todo.id !== targetId);
  await db.TodoList.destroy({
    where: { id: targetId },
  });
  res.status(204).send();
};

const updateTodoList = async (req, res) => {
  const targetId = Number(req.params.id);
  const newTitle = req.body.title;
  await db.TodoList.update(
    {
      title: newTitle,
    },
    {
      where: { id: targetId },
    }
  );
  // const targetIndex = todoList.findIndex(todo => todo.id === targetId);
  // todoList[targetIndex] = {
  //     id: targetId,
  //     title: newTitle
  // };
  res.status(200).send({ message: "updating is success" });
};

module.exports = {
  getTodoList,
  addTodoList,
  deleteTodoList,
  updateTodoList,
};
