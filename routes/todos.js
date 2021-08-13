const { client, todosCollection } = require("../lib/connection");
const express = require("express");
const { isArray, isObject, has, isEmpty } = require("lodash");
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get("/", async (req, res, next) => {
  try {
    await client.connect();
    const qs = req.query;
    let query = {
      deleted: { $ne: true }
    };
    if (isObject(qs) && !isEmpty(qs)) {
      const { status } = qs;
      if (status) {
        query["status"] = status;
      }
      const { dueInDays } = qs;
      if (parseInt(dueInDays)) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + parseInt(dueInDays));
        query["status"] = "PENDING";
        query["dueDate"] = { $lte: futureDate };
      }
    }
    console.log(query);
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
        if (has(item, "title") && has(item, "dueDate") && !isEmpty(item.title) && !isEmpty(item.dueDate)) {
          const todoItem = {
            title: item.title,
            description: item.description,
            status: "PENDING",
            dueDate: new Date(item.dueDate)
          };
          todoItems.push(todoItem);
        }
      });
    } else {
      if (has(body, "title") && has(body, "dueDate") && !isEmpty(body.title) && !isEmpty(body.dueDate)) {
        const todoItem = {
          title: body.title,
          description: body.description,
          status: "PENDING",
          dueDate: new Date(body.dueDate)
        };
        todoItems.push(todoItem);
      }
    }
    const result = todoItems.length >= 1 ? await todosCollection.insertMany(todoItems, { ordered: true }) : [];
    res.status(201).send(result);
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
    const body = req.body;
    if (!isObject(body)) {
      res.status(400).send("Request body is not in correct format");
      return;
    }
    const { id } = req.params;
    const filter = {
      _id: ObjectId(id),
      deleted: { $ne: true }
    };
    if (has(body, "title") && has(body, "dueDate") && !isEmpty(body.title) && !isEmpty(body.dueDate)) {
      const todoItem = {
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate
      };
      const result = await todosCollection.replaceOne(filter, todoItem);
      res.status(200).send(result);
    } else {
      res.status(400).send("Request body is not in correct format");
    }
  } catch (err) {
    console.log(`\x1b[31m[ERR] ${err}\x1b[0m`);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await client.connect();
    const { id } = req.params;
    const filter = { _id: ObjectId(id) };
    const updateDoc = { $set: { deleted: true } };
    const result = await todosCollection.updateOne(filter, updateDoc);
    res.status(200).send(result);
  } catch (err) {
    console.log(`\x1b[31m[ERR] ${err}\x1b[0m`);
    res.sendStatus(500);
  } finally {
    await client.close();
  }
});

module.exports = router;
