const studentController = require('../Services/studentsService');

module.exports = (fastify) => {
    fastify.get('/students', async (request, reply) => studentController.getAllStudents(fastify));
    fastify.get('/students/:id', async (request, reply) => studentController.getStudentById(fastify, request));
    fastify.post('/students', async (request, reply) => studentController.addStudent(fastify, request));
    fastify.put('/students/:id', async (request, reply) => studentController.updateStudent(fastify, request));
    fastify.delete('/students/:id', async (request, reply) => studentController.deleteStudent(fastify, request));
};
