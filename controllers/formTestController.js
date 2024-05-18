// module.exports = (fastify) => {
//     fastify.post('/submit-form', async (request, reply) => {
//         const { name, email } = request.body;
//
//         // 在实际应用中，你可以在这里处理表单数据，例如将数据保存到数据库
//
//         // return { message: `Form submitted successfully! Name: ${name}, Email: ${email}` };
//         reply.code(200).send({ success: true, message: 'Form submitted successfully!', data: { name, email } });
//     });
// };