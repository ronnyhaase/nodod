const { isBoolean, isNonEmptyString } = require('./util');

/**
 * validateTodoUpdate
 * Validates a todo resource for a update operation, *fails* when:
 * 1. Both, title or completed, are not present
 * 2. title is present but not a String or a empty String
 * 3. completed is present but not a Boolean
 * @param {*} todo - The todo object to validate
 * @returns {Boolean} - True if the object is valid for a update operation
 */
const validateTodoUpdate = (todo) => {
	if (
			(!todo)
			|| (todo.title === undefined && todo.completed === undefined)
			|| (todo.title !== undefined && !isNonEmptyString(todo.title))
			|| (todo.completed !== undefined && !isBoolean(todo.completed))
	) {
		return false;
	} else {
		return true;
	}
};

/**
 * validateTodoCreate
 * Validates a todo resource for a create operation, *fails* when:
 * 1. title is not present
 * 2. title is present but not a String or a empty String
 * 3. completed is present but not a Boolean
 * @param {*} todo - The todo object to validate
 * @returns {Boolean} - True if the object is valid for a update operation
 */
const validateTodoCreate = (todo) => {
	if (
			(!todo)
			|| (!isNonEmptyString(todo.title))
			|| (todo.completed !== undefined && !isBoolean(todo.completed))
	) {
		return false;
	} else {
		return true;
	}
};

module.exports = { validateTodoCreate, validateTodoUpdate };
