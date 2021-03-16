const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { setupDatabase, userOne, userOneId, userTwo, userTwoId, taskOne, taskTwo, taskThree } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async function() {
  const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
          description: 'From my test'
      })
      .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
});

test('Should get all tasks for user one', async function() {
  const response = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200)

    expect(response.body.length).toBe(2)
});

test('Should not delete task from other user', async function() {
    const taskOneId = taskOne._id
  const response = await request(app)
      .delete('/tasks/'+taskOneId)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404)

    const taskResponse = await request(app)
        .get('/tasks/'+taskOneId)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // OR

    const task = Task.findById(taskOneId)
    expect(task).not.toBeNull()
});