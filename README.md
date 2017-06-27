# nodod
A Todo app backend providing a RESTful API.

All todos are stored in memory and will be lost when the process shuts down.

## API docs

### List
`GET /todos` to get a list of all todos

### Read
`GET /todos/:id` to get a specific todo by it's ID.

### Create
`POST /todos` to create a todo.

#### Parameter
title {String} - The title of the todo.

completed (optional) {Boolean} - If the todo is completed or not.

If you skip completed *nodod* will default to false, but if it's not a Boolean it will fail.

#### 201 Created
Contains the location of the newly created todo in the header field "Location"

#### 400 Bad Request
Either title is not a non-empty String, or completed is not a Boolean

### Update
`PUT /todos/:id` to update a todo.

#### Parameter
title (optional) {String} - The title of the todo.

completed (optional) {Boolean} - If the todo is completed or not.

*nodod* only updates the fields you pass. You must either provide `completed` or `title`.

### Delete
`DELETE /todos/:id` to remove a todo.

## Issues
If you're facing any problems feel free to create an [issue](issues), or even better fix it yourself and [contribute](#contributing).

## Development
*nodod* is written in NodeJS using Koa 2

### Tests
*nodod* comes with 100% test coverage, including unit tests and integration tests for the API.

`npm run test`

## Contributing
Please create a PR and assure you respect the code style. Also assure all tests pass and extend them when necessary.

---

MIT License
