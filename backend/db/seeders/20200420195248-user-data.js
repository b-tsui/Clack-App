'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const users = await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Lisa Kang',
        email: 'test@test.com',
        hashedPassword: bcrypt.hashSync('test1'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Brandon Tsui',
        email: 'b@test.com',
        hashedPassword: bcrypt.hashSync("hunter2"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true }
    );
    const channels = await queryInterface.bulkInsert('Channels', [
      {
        userId: 2,
        name: 'Main Channel',
        isDM: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        name: ';)',
        isDM: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true }
    );

    const channelUsers = await queryInterface.bulkInsert('ChannelUsers', [
      {
        userId: 1,
        channelId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        channelId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        channelId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        channelId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true }
    );
    return queryInterface.bulkInsert('Messages', [
      {
        message: "This is a test message from brandon to main chat",
        userId: 2,
        channelId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: "Test message from lisa to the main",
        userId: 1,
        channelId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: "hey dude",
        userId: 1,
        channelId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: "I like poop",
        userId: 2,
        channelId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Channels", null, {});
    await queryInterface.bulkDelete("ChannelUsers", null, {});
    return queryInterface.bulkDelete("Messages", null, {});
  }
};
