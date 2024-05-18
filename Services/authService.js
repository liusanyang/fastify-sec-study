const authenticateUser = (username, password) => {
    // 在实际应用中，这里应该是数据库查询或其他验证逻辑
    // 这里简化为用户名是 "cris"，密码是 "123456" 才认为验证通过

    const isAuthenticated = username === 'cris' && password === '123456';
    const errorMessage = isAuthenticated ? null : '用户名或密码错误';

    return { isAuthenticated, errorMessage };
};

module.exports = {
    authenticateUser,
};