const User = require('../models/user');


const userController = {

  getList() {
    return User.create({ email: 'ao_socz@list.ru', displayName: 'Sasha' });
  },

};

module.exports = userController;
