const supertest = require('supertest');

const { runServer } = require('../../../server');

let server;
let request;

describe('API - Todos#list', () => {
	beforeAll(() => {
		server = runServer({ port: 3001, logging: false });
		request = supertest(server);
	});

	afterAll(() => {
		server.close();
	});

	it('should return a object containing prop data with todos', () => {
		return request
			.get('/todos')
			.expect(200)
			.expect('Content-Type', /json/)
			.then(response => {
				expect(response.body).toHaveProperty('data');
				expect(response.body.data).toHaveProperty('todos');
				expect(response.body.data.todos).toEqual(expect.arrayContaining([]));
			});
	});
});
