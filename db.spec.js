import { addTodo, deleteTodo, editTodo, getTodo, getTodos } from './db';

describe('Database', () => {
	const random = () => (Math.random() + '').slice(2);

	describe('addTodo', () => {
		it('should add a item and return it\'s ID', () => {
			const title = random();
			const result = addTodo(title);
			const after = getTodos();
			const search = after.find(el => el.title === title);

			expect(search).not.toBe(undefined);
			expect(result).toEqual(expect.any(String));
		});
	});

	describe('deleteTodo', () => {
		it('should remove a item when passing a known id and return true', () => {
			const lengthBefore = getTodos().length;
			const id = addTodo();
			const result = deleteTodo(id);

			expect(result).toBe(true);
			expect(getTodos()).toHaveLength(lengthBefore);
		});

		it('should not remove a item when passing a unknown id and return false', () => {
			const lengthBefore = getTodos().length;
			const wrongId = random();

			expect(deleteTodo(wrongId)).toBe(false);
			expect(getTodos()).toHaveLength(lengthBefore);
		});
	});

	describe('editTodo', () => {
		it('should update an item and return true if a known id was provided', () => {
			const title = random();
			const newTitle = random();
			const id = addTodo(title);

			editTodo(id, newTitle);

			expect(getTodo(id).title).toEqual(newTitle);
		});

		it('should return false if a unknown id was provided', () => {
			const wrongId = random();

			expect(editTodo(wrongId)).toBe(false);
		});
	});

	describe('getTodo', () => {
		it('should return a item when passing a known id', () => {
			let id;
			if (getTodos().length === 0) {
				id = addTodo(random());
			} else {
				id = getTodos()[0].id;
			}

			expect(getTodo(id)).not.toBe(null);
		});

		it('should return null when passing a unknown id', () => {
			const wrongId = random();

			expect(getTodo(wrongId)).toBe(null);
		});
	});

	describe('getTodos', () => {
		it('should return a array', () => {
			expect(getTodos()).toBeInstanceOf(Array);
		});
	});
});
