const supertest = require('supertest');

const { runServer } = require('../../../server');

let server;
let request;

describe('API - Todos#create', () => {
	beforeAll(() => {
		server = runServer({ port: 3001, logging: false });
		request = supertest(server);
	});

	afterAll(() => {
		server.close();
	});

	it('should succeed when passing valid title and completed props, returning 201 with Location header', () => {
		return request
			.post('/todos')
			.send({ title: 'A task', completed: false })
			.expect('Content-Type', /json/)
			.expect('Location', /^\/todos\/[a-zA-Z0-9_-]+$/)
			.expect(201);
	});

	it('should succeed when passing a valid title and skipping completed, defaulting to false for completed', () => {
		return request
			.post('/todos')
			.send({ title: 'A task'})
			.expect('Content-Type', /json/)
			.expect('Location', /^\/todos\/[a-zA-Z0-9_-]+$/)
			.expect(201)
			.then(response => {
				return request.get(response.header['location'])
					.then(r => expect(r.body.data.completed).toBe(false));
			});
	});

	it('should fail when not passing a title', () => {
		return request
			.post('/todos')
			.send({ completed: true })
			.expect('Content-Type', /json/)
			.expect(400);
	});

	it('should fail when passing a invalid title', () => {
		return request
			.post('/todos')
			.send({ title: 23})
			.expect('Content-Type', /json/)
			.expect(400);
	});

	it('should fail when passing a empty title', () => {
		return request
			.post('/todos')
			.send({ title: '   '})
			.expect('Content-Type', /json/)
			.expect(400);
	});

	it('should fail when passing a valid title and a invalid complete', () => {
		return request
			.post('/todos')
			.send({ title: 'A task', completed: 23 })
			.expect('Content-Type', /json/)
			.expect(400);
	});
});
