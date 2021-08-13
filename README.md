# To-Do List-type Rest API

This repository is a simple Rest API written in JavaScript showcasing CRUD operations on a To-Do list. It allows users to add, edit, and remove tasks. Users may create multiple items that they want to remember to do.

## Features

- Each to-do item has:
  Title
  Description
  Status (i.e. Pending, Done)
  Due Date
- Simple for the user to track the status of multiple items as well as remember when things are due

## API Endpoints and Usage

### Test: base URL handling

GET http://localhost:3000/api

### Get all todo items

GET http://localhost:3000/api/todos

### Get todo items with status DONE

GET http://localhost:3000/api/todos?status=DONE

### Get todo items due in next 5 days

GET http://localhost:3000/api/todos?dueInDays=5

### Add single todo item

POST http://localhost:3000/api/todos HTTP/1.1
content-type: application/json

{
    "title": "Pay utilities",
    "description": "Pay for house utilities",
    "dueDate": "2021-08-30"
}

### Add single todo item without required fields

POST http://localhost:3000/api/todos HTTP/1.1
content-type: application/json

{
    "description": "Testing empty title",
    "dueDate": "2021-08-30"
}

### Add multiple todo items

POST http://localhost:3000/api/todos HTTP/1.1
content-type: application/json

[
    {
        "title": "Make reservation",
        "description": "Make online hotel reservation",
        "dueDate": "2021-08-26"
    },
    {
        "title": "Book air tickets",
        "description": "Book air tickets for upcoming trip",
        "dueDate": "2021-10-23"
    },
    {
        "title": "Buy groceries",
        "description": "Buy groceries for home",
        "dueDate": "2021-08-17"
    }
]

### Update todo item

PUT http://localhost:3000/api/todos/6115f83d615cf16ce68d4b9e HTTP/1.1
content-type: application/json

{
    "_id": "6115f83d615cf16ce68d4b9e",
    "title": "Buy groceries",
    "description": "Buy groceries for home",
    "status": "DONE",
    "dueDate": "2021-08-17T00:00:00.000Z"
}

### Delete todo item

DELETE http://localhost:3000/api/todos/6115e68fe030fec3e0e434b3 HTTP/1.1
content-type: application/json

### Test: 404 handling

GET http://localhost:3000/api/this-route-does-not-exists

## Changelog

- 1.0
  - Initial version
