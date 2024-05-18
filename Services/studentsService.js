// 获取所有学生
const getAllStudents = async (fastify) => {
    const client = await fastify.mysql.getConnection();
    const [students] = await client.execute('SELECT * FROM students');
    client.release();
    return students;
};

// 获取单个学生
const getStudentById = async (fastify, request) => {
    const { id } = request.params;
    const client = await fastify.mysql.getConnection();
    const [student] = await client.execute('SELECT * FROM students WHERE id = ?', [id]);
    client.release();
    return student[0];
};

// 添加学生
const addStudent = async (fastify, request) => {
    const { name, age } = request.body;
    const client = await fastify.mysql.getConnection();
    const result = await client.execute('INSERT INTO students (name, age) VALUES (?, ?)', [name, age]);
    client.release();
    return { id: result.insertId, name, age };
};

// 更新学生
const updateStudent = async (fastify, request) => {
    const { id } = request.params;
    const { name, age } = request.body;
    const client = await fastify.mysql.getConnection();
    await client.execute('UPDATE students SET name = ?, age = ? WHERE id = ?', [name, age, id]);
    client.release();
    return { id: Number(id), name, age };
};

// 删除学生
const deleteStudent = async (fastify, request) => {
    const { id } = request.params;
    const client = await fastify.mysql.getConnection();
    await client.execute('DELETE FROM students WHERE id = ?', [id]);
    client.release();
    return { id: Number(id), message: 'Student deleted successfully' };
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
};

