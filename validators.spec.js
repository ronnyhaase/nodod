import { validateTodoCreate, validateTodoUpdate } from './validators';

describe('Validators', () => {
	describe('validateTodoUpdate', () => {
		it('should succeed if title and completed are valid', () => {
			const completed = false;
			const title = 'A title';

			const result = validateTodoUpdate({ completed, title });
			expect(result).toBe(true);
		});

		it('should succeed if title is valid and completed skipped', () => {
			const title = 'A title';

			const result = validateTodoUpdate({ title });
			expect(result).toBe(true);
		});

		it('should succeed if title is skipped and completed valid', () => {
			const completed = false;

			const result = validateTodoUpdate({ completed });
			expect(result).toBe(true);
		});

		it('should fail if title and completed are both skipped', () => {
			const result = validateTodoUpdate({});
			expect(result).toBe(false);
		});

		it('should fail if title is not a String', () => {
			const title = 23;

			const result = validateTodoUpdate({ title });
			expect(result).toBe(false);
		});

		it('should fail if title is a empty String', () => {
			const title = '   ';

			const result = validateTodoUpdate({ title });
			expect(result).toBe(false);
		});

		it('should fail if completed is not a Boolean', () => {
			const completed = 23;

			const result = validateTodoUpdate({ completed });
			expect(result).toBe(false);
		});
	});

	describe('validateTodoCreate', () => {
		it('should succeed if title is valid and completed a Boolean', () => {
			const completed = false;
			const title = 'A title';

			const result = validateTodoCreate({ completed, title });
			expect(result).toBe(true);
		});

		it('should succeed if title is valid and completed skipped', () => {
			const title = 'A title';

			const result = validateTodoCreate({ title });
			expect(result).toBe(true);
		});

		it('should fail if both title and completed are skipped', () => {
			const result = validateTodoCreate({});
			expect(result).toBe(false);
		});

		it('should fail if title is skipped and completed valid', () => {
			const completed = true;

			const result = validateTodoCreate({ completed });
			expect(result).toBe(false);
		});

		it('should fail if title is valid and completed not a Boolean ', () => {
			const completed = 23;
			const title = 'A title';

			const result = validateTodoCreate({ completed, title });
			expect(result).toBe(false);
		});

		it('should fail if title is a empty String', () => {
			const title = '   ';

			const result = validateTodoCreate({ title });
			expect(result).toBe(false);
		});

		it('should fail if title is not a String', () => {
			const title = 23;

			const result = validateTodoCreate({ title });
			expect(result).toBe(false);
		});
	});
});
