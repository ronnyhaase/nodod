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

	it('should succeed when passing a valid id', () => {
		return request
			.delete(location)
			.expect(200);
	});

	it('should fail when passing a id already removed', () => {
		return request
			.delete(location)
			.expect(404);
	});

	it('should fail passing a unknown id', () => {
		return request
			.delete('/todos/666')
			.expect(404);
	});

});
