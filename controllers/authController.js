// const { authenticateUser } = require('../Services/authService');
//
// module.exports = (fastify) => {
//     fastify.post('/login', async (request, reply) => {
//         try {
//             const { username, password } = request.body;
//
//             // 使用 authController 中的 authenticateUser 方法进行身份验证
//             const { isAuthenticated, errorMessage } = authenticateUser(username, password);
//
//             if (isAuthenticated) {
//                 // 验证通过，重定向到 /student 页面
//                 reply.redirect('/student');
//             } else {
//                 // 验证失败，继续显示登录页面并提示错误信息
//                 return reply.sendFile('login.html').replace('$error_message$', errorMessage || '');
//             }
//         } catch (error) {
//             reply.code(500).send({ success: false, message: 'Internal Server Error' });
//         }
//     });
// };
