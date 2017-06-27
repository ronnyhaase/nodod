import { isBoolean, isNonEmptyString, isNumber, isString } from './util';

describe('Utilities', () => {
	describe('isBoolean', () => {
		it('should succeed when passing Boolean', () => {
			expect(isBoolean(true)).toBe(true);
			expect(isBoolean(false)).toBe(true);
		});

		it('should fail when not passing a Boolean', () => {
			expect(isBoolean('')).toBe(false);
			expect(isBoolean(23)).toBe(false);
			expect(isBoolean({})).toBe(false);
			expect(isBoolean([])).toBe(false);
		});
	});

	describe('isNonEmptyString', () => {
		it('should succeed when passing a non-empty String', () => {
			expect(isNonEmptyString('test')).toBe(true);
		});

		it('should fail when not passing a String', () => {
			expect(isNonEmptyString(true)).toBe(false);
			expect(isNonEmptyString(23)).toBe(false);
			expect(isNonEmptyString({})).toBe(false);
			expect(isNonEmptyString([])).toBe(false);
		});

		it('should fail when passing a empty String', () => {
			expect(isNonEmptyString('')).toBe(false);
		});

		it('should fail when passing a String only containing whitespace chars', () => {
			expect(isNonEmptyString('   \n\t')).toBe(false);
		});
	});

	describe('isNumber', () => {
		it('should succeed when passing a Number', () => {
			expect(isNumber(23)).toBe(true);
		});

		it('should fail when not passing a Number', () => {
			expect(isNumber(true)).toBe(false);
			expect(isNumber('23')).toBe(false);
			expect(isNumber({})).toBe(false);
			expect(isNumber([])).toBe(false);
		});
	});

	describe('isString', () => {
		it('should succeed when passing a String', () => {
			expect(isString('test')).toBe(true);
		});

		it('should succeed when passing a empty String', () => {
			expect(isString('')).toBe(true);
		});

		it('should succeed when passing a String only containing whitespace chars', () => {
			expect(isString('   \t\n')).toBe(true);
		});

		it('should fail when not passing a String', () => {
			expect(isString(true)).toBe(false);
			expect(isString(23)).toBe(false);
			expect(isString({})).toBe(false);
			expect(isString([])).toBe(false);
		});
	});
});
