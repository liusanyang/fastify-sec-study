const fastify = require('fastify')({ logger: true });
const fastifyFormbody = require('@fastify/formbody');
const fastifyCors = require('@fastify/cors');
const fastifyMySQL = require('@fastify/mysql');
const fastifyStatic = require('@fastify/static');
const path = require('path');
// const authRoutes = require('./controllers/authController');
const {authenticateUser} = require("./Services/authService");
const studentController = require("./Services/studentsService");
// const studentRoutes = require('./controllers/studentContorller');
// const formTest = require('./controllers/formTestController');

// 注册拆分的路由
// fastify.register(authRoutes);
// fastify.register(studentRoutes);
// fastify.register(formTest);
// fastify.register(authRoutes, null, (err) => {
//   if (err) throw err;
// });
// fastify.register(studentRoutes, options, (err) => {
//   if (err) throw err;
// });
// fastify.register(formTest, options, (err) => {
//   if (err) throw err;
// });

// 配置静态文件服务
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', // 可根据需要修改前缀
});


fastify.register(fastifyMySQL, {
  promise: true,
  connectionString: 'mysql://root:Pass1234@localhost/studentsMgt',
});
// 创建学生表
fastify.addHook('onReady', async () => {
  await createStudentTable(fastify);
});
const createStudentTable = async (fastify) => {
  const client = await fastify.mysql.getConnection();
  await client.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT NOT NULL
    )
  `);
  client.release();
};

// 导入 fastify/formbody 插件，用于解析表单数据
fastify.register(fastifyFormbody);
// 注册 fastify/cors 插件
fastify.register(fastifyCors, {
  origin: true, // 允许所有来源
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
});

// 路由定义
fastify.get('/', async (request, reply) => {

  return reply.sendFile('login.html');
});

fastify.get('/DOMXss', async (request, reply) => {

  return reply.sendFile('DomXss.html');
});

fastify.post('/login', async (request, reply) => {
  try {
    const { username, password } = request.body;

    // 使用 authController 中的 authenticateUser 方法进行身份验证
    const { isAuthenticated, errorMessage } = authenticateUser(username, password);
    // console.log(isAuthenticated);

    if (isAuthenticated) {
      return reply.redirect('students.html');
    } else {
      // 验证失败，继续显示登录页面并提示错误信息
      return reply.sendFile('login.html').replace('$error_message$', errorMessage || '');
    }
  } catch (error) {
    reply.code(500).send({ success: false, message: 'Internal Server Error' });
  }
});


fastify.get('/students', async (request, reply) => studentController.getAllStudents(fastify));
fastify.get('/students/:id', async (request, reply) => studentController.getStudentById(fastify, request));
fastify.post('/students', async (request, reply) => studentController.addStudent(fastify, request));
fastify.put('/students/:id', async (request, reply) => studentController.updateStudent(fastify, request));
fastify.delete('/students/:id', async (request, reply) => studentController.deleteStudent(fastify, request));


// 启动服务器
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
