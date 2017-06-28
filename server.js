const Koa = require('koa');
const cuid = require('cuid');
const parse = require('koa-bodyparser');
const logger = require('koa-logger');
const route = require('koa-route');

const { isBoolean, isNonEmptyString, isString } = require('./util');
const { addTodo, getTodo, getTodos, deleteTodo, editTodo, resetTodos } = require('./db');
const { validateTodoCreate, validateTodoUpdate} = require('./validators');

const resetKey = cuid();

async function create(ctx) {
	const data = ctx.request.body;

	if (validateTodoCreate(data)) {
		const id = addTodo(data.title, data.completed);
		ctx.response.status = 201;
		ctx.set('Location', `/todos/${id}`);
		ctx.response.body = {};
	} else {
		ctx.response.status = 400;
		ctx.response.body = {};
	}
}

async function list(ctx) {
	const todos = getTodos();
	ctx.response.body = { data: { todos } };
	ctx.response.status = 200;
}

async function read(ctx, id) {
	const todo = getTodo(id);

	if (todo) {
		ctx.response.body = { data: todo }
		ctx.response.status = 200;
	} else {
		ctx.response.status = 404;
	}
}

async function remove(ctx, id) {
	if (deleteTodo(id)) {
		ctx.response.status = 200;
		ctx.response.body = {};
	} else {
		ctx.response.status = 404;
	}
}

async function reset(ctx, id) {
	if (ctx.request.query && ctx.request.query.key === resetKey) {
		resetTodos();
		ctx.response.status = 200;
		ctx.response.body = {};
	} else {
		ctx.response.status = 401;
	}
}

async function update(ctx, id) {
	const data = ctx.request.body;

	if (validateTodoUpdate(data)) {
		const success = editTodo(id, data.title, data.completed)
		if (success) {
			ctx.response.status = 200;
			ctx.response.body = {};
		} else {
			ctx.response.status = 404;
		}
	} else {
		ctx.response.status = 400;
		ctx.response.body = {};
	}
}

function runServer(settings = { logging: true, port: 3001 }) {
	const app = new Koa();

	if (settings.logging) app.use(logger());
	app.use(parse());
	// CORS
	app.use((ctx, next) => {
		ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,OPTIONS,POST,PUT');
		ctx.set('Access-Control-Allow-Origin', '*');
		next();
	});

	app.use(route.get('/todos', list));
	app.use(route.post('/todos', create));
	app.use(route.get('/todos/:id', read));
	app.use(route.put('/todos/:id', update));
	app.use(route.del('/todos/:id', remove));
	app.use(route.post('/todos/reset', reset));

	app.listen(settings.port);

	return { logging: settings.logging, port: settings.port, resetKey }
}

module.exports = { create, list, read, remove, update, runServer };
