const { client, todosCollection } = require("../lib/connection");
const express = require("express");
const { isArray, isObject } = require("lodash");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await client.connect();
    const query = {
      deleted: { $ne: true }
    };
    const todoItems = await todosCollection.find(query).toArray();
    res.status(200).send(todoItems);
  } catch (err) {
    console.log(`\x1b[31m[ERR] ${err}\x1b[0m`);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.post("/", async (req, res, next) => {
  try {
    await client.connect();
    const body = req.body;
    let todoItems = [];
    if (!isObject(body)) {
      res.status(400).send("Request body is not in correct format");
      return;
    }
    if (isArray(body)) {
      body.forEach((item) => {
        const todoItem = {
          title: item.title,
          description: item.description,
          status: "PENDING",
          dueDate: item.dueDate
        };
        todoItems.push(todoItem);
      });
    } else {
      todoItems = [
        {
          title: body.title,
          description: body.description,
          status: "PENDING",
          dueDate: body.dueDate
        }
      ];
    }
    const result = await todosCollection.insertMany(todoItems, { ordered: true });
    res.sendStatus(201);
  } catch (err) {
    console.log(`\x1b[31m[ERR] ${err}\x1b[0m`);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await client.connect();
    const { id } = req.params;
    let todoItems = [];
    if (isArray(body)) {
      body.forEach((item) => {
        const todoItem = {
          title: item.title,
          description: item.description,
          status: "PENDING",
          dueDate: item.dueDate
        };
        todoItems.push(todoItem);
      });
    } else {
      res.status(400).send("Request body is not in correct format");
      return;
    }
    const result = await todosCollection.insertMany(todoItems, { ordered: true });
    res.status(200).send(req.body);
  } catch (err) {
    console.log(`\x1b[31m[ERR] ${err}\x1b[0m`);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

module.exports = router;
