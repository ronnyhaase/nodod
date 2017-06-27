import { create, list, read, remove, runServer, update } from './server';

describe('Server', () => {
	const createValidCreateContext = () => ({
		request: {
			body: {
				title: 'A title',
				completed: true
			}
		},
		response: {
			body: null,
			status: null
		},
		set: jest.fn(),
	});
	const createItemAndGetId = async () => {
		const createContext = createValidCreateContext();
		await create(createContext);
		// Koa's context.set() is mocked so we can fetch the url from there
		const id = `${createContext.set.mock.calls[createContext.set.mock.calls.length-1][1]
			.match(/^\/todos\/(.*)$/)[1]}`;
		return id;
	};
	const random = () => (Math.random() + '').slice(2);

	describe('create', () => {
		it('should return a proper success context when passing a valid todo', async () => {
			const context = createValidCreateContext();

			await create(context);

			expect(context.response.status).toBe(201);
			expect(context.response.body).toEqual({});
			expect(context.set.mock.calls[context.set.mock.calls.length-1][0]).toBe('Location');
			expect(context.set.mock.calls[context.set.mock.calls.length-1][1])
				.toMatch(/^\/todos\/\d+$/);
		});

		it('should return a proper failure context when passing a invalid todo', async () => {
			const context = {
				request: {
					body: {}
				},
				response: {
					body: null,
					response: null
				}
			};

			await create(context);

			expect(context.response.status).toBe(400);
			expect(context.response.body).toEqual({});
		});
	});

	describe('list', () => {
		it('should return a proper context', async () => {
			const context = {
				response: {
					body: null,
					status: null
				}
			};

			await list(context);

			expect(context.response.body).toEqual({ data: { todos: expect.any(Array) }});
			expect(context.response.status).toBe(200);
		});
	});

	describe('read', () => {
		it('should return a proper success context when requesting a valid item', async () => {
			const id = await createItemAndGetId();
			const context = {
				response: {
					body: null,
					status: null
				}
			};

			await read(context, id);

			expect(context.response.body).not.toBe(null);
			expect(context.response.status).toBe(200);
		});

		it('should return a proper failure context when requesting a non-existing items', async () => {
			const context = {
				response: {
					body: null,
					status: null
				}
			};

			await read(context, random());

			expect(context.response.status).toBe(404);
		});
	});

	describe('remove', () => {
		it('should return a proper success context when deleting a valid item', async () => {
			const id = await createItemAndGetId();
			const context = {
				response: {
					body: null,
					status: null
				}
			};

			await remove(context, id);

			expect(context.response.body).toEqual({});
			expect(context.response.status).toBe(200);
		});

		it('should return a proper failure context when trying to delete a non-existing item', async () => {
			const context = {
				response: {
					body: null,
					status: null
				}
			};

			await remove(context, random());

			expect(context.response.status).toBe(404);
		});
	});

	describe('update', () => {
		it('should return a proper success context when update request is valid', async () => {
			const id = await createItemAndGetId();
			const context = {
				request: {
					body: {
						title: random()
					}
				},
				response: {
					body: null,
					status: null
				}
			};

			await update(context, id);

			expect(context.response.body).toEqual({});
			expect(context.response.status).toBe(200);
		});

		it('should return a proper failure context when requesting an update of a non-existing item', async () => {
			const id = random();
			const context = {
				request: {
					body: {
						title: random()
					}
				},
				response: {
					body: null,
					status: null
				}
			};

			await update(context, random);

			expect(context.response.status).toBe(404);
		});

		it('should return a proper failure context when sending a invalid udpate request', async () => {
			const id = await createItemAndGetId();
			const context = {
				request: {
					body: {
						title: parseInt(random())
					}
				},
				response: {
					body: null,
					status: null
				}
			};

			await update(context, id)

			expect(context.response.status).toBe(400);
			expect(context.response.body).toEqual({});
		});
	});

	describe('runServer', () => {
		it('should run', () => {
			const handleError = jest.fn();

			expect(() => {
				const server = runServer();
				server.on('error', handleError);
				server.close();
			}).not.toThrow();
			expect(handleError).not.toHaveBeenCalled();
		});
	});
});
