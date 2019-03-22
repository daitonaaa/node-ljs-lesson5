const path = require('path');
const User = require(path.join(process.cwd(), 'controller', 'user'));


const users = [
  {
    url: '/users/me',
    method: 'get',
    controller: User.getMe,
  },
  {
    url: '/users',
    method: 'get',
    controller: User.getList
  },
  {
    method: 'get',
    url: '/users/:id',
    controller: User.getById
  },
  {
    method: 'post',
    url: '/users',
    controller: User.create
  },
  {
    method: 'patch',
    url: '/users/:id',
    controller: User.update
  },
  {
    method: 'delete',
    url: '/users/:id',
    controller: User.delete
  },
];

module.exports = users;
