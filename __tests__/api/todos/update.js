const supertest = require('supertest');

const { runServer } = require('../../../server');

let server;
let request;

describe('API - Todos#read', () => {
	let location;
	let completed = true;

	beforeAll(() => {
		server = runServer({ port: 3001, logging: false });
		request = supertest(server);
		return request
			.post('/todos')
			.send({ title: 'A test task', completed })
			.then(response => location = response.header.location);
	});

	afterAll(() => {
		server.close();
	});

	it('should succeed when passing valid title and completed', () => {
		const newTitle = 'A new title';
		completed = !completed;

		return request
			.put(location)
			.send({ title: newTitle, completed})
			.expect(200)
			.then(() => {
				return request.get(location).then(response => {
					expect(response.body.data.title).toBe(newTitle);
					expect(response.body.data.completed).toBe(completed);
				});
			});
	});

	it('should succeed when passing a valid title only', () => {
		const newTitle = 'A brand new title';

		return request
			.put(location)
			.send({ title: newTitle })
			.expect(200)
			.then(() => {
				return request.get(location).then(response => {
					expect(response.body.data.title).toBe(newTitle);
					expect(response.body.data.completed).toBe(completed);
				});
			});
	});

	it('should succeed when passing a valid completed only', () => {
		completed = !completed;

		return request
			.put(location)
			.send({ completed })
			.expect(200)
			.then(() => {
				return request.get(location).then(response => {
					expect(response.body.data.completed).toBe(completed);
				});
			});
	});

	it('shoud fail when passing a unknown id', () => {
		completed = !completed;
		const newTitle = 'A title that\'ll never appear';

		return request
			.put('/todos/666')
			.send({ completed, title: newTitle })
			.expect(404);
	});

	it('shoud fail when passing no title and no completed', () => {
		return request
			.put(location)
			.send({})
			.expect(400);
	});

	it('should fail when title is invalid', () => {
		const newTitle = 23;

		return request
			.put(location)
			.send({ title: newTitle })
			.expect(400);
	});

	it('should fail when title is a empty string', () => {
		const newTitle = '   ';

		return request
			.put(location)
			.send({ title: newTitle })
			.expect(400);
	});

	it('should fail when completed is invalid', () => {
		const newCompleted = 23;

		return request
			.put(location)
			.send({ completed: newCompleted })
			.expect(400);
	});
});
