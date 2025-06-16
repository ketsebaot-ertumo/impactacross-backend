const bcryptjs = require('bcryptjs');
const { Users } = require('../models/index');

const seedUsers = async () => {
    await Users.sync({ force: true });
    const password = await bcryptjs.hash('admin', 10);

    // Create Users
    const users = await Users.bulkCreate([
        { firstName: 'super', lastName: 'admin', email: 'super@admin.com', password, phone: '+251919765445', isConfirmed: true, role: 'supe_admin' },
        { firstName: 'admin', lastName: 'admin', email: 'admin@gmail.com', password, phone: '+251919765445', isConfirmed: true, role: 'admin' },
        { firstName: 'user', lastName: 'user', email: 'user@gmail.com', password, phone: '+251919765445', isConfirmed: true, role: 'user' },
    ]);

    return users[0];
    // const userMap = {};
    // return users.forEach(user => userMap[user.email] = user.id);
};

module.exports = seedUsers;
