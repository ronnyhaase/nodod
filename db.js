let todos = [];
let iid = 0;

const addTodo = (title, completed) => {
	const id = `${iid++}`;
	const newTodo = {
		id,
		completed: (completed === true || completed === false) ? completed : false,
		created_at: Date.now(),
		title,
		updated_at: null
	};

	todos = [...todos, newTodo];
	return id;
};

const deleteTodo = (id) => {
	let success = false;

	todos = todos.filter(todo => {
		if (todo.id === id) {
			success = true;
			return false;
		}

		return true;
	});

	return success;
};

const editTodo = (id, newTitle, newCompleted) => {
	let success = false;

	todos = todos.map(todo => {
		if (todo.id === id) {
			success = true;

			return {
				...todo,
				completed: (newCompleted === true || newCompleted === false)
						? newCompleted : todo.completed,
				title: newTitle ? newTitle : todo.title,
				updated_at: Date.now()
			}
		} else {
			return todo;
		}
	});

	return success;
};

const getTodo = (todoId) => todos.find(todo => todo.id === todoId) || null;

const getTodos = () => [...todos];

const resetTodos = () => todos = [];

module.exports = { addTodo, deleteTodo, editTodo, getTodo, getTodos, resetTodos };
