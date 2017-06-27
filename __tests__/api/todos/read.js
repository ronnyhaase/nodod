const supertest = require('supertest');

const { runServer } = require('../../../server');

let server;
let request;

describe('API - Todos#read', () => {
	let location;

	beforeAll(() => {
		server = runServer({ port: 3001, logging: false });
		request = supertest(server);
		return request
			.post('/todos')
			.send({ title: 'A test task', completed: true })
			.then(response => location = response.header.location);
	});

	afterAll(() => {
		server.close();
	});

	it('should succeed when providing a correct id', () => {
		return request
			.get(location)
			.expect(200)
			.expect('Content-Type', /json/);
	});

	it('should fail when providing a wrong id', () => {
		return request
			.get('/todos/666')
			.expect(404);
	});
});
