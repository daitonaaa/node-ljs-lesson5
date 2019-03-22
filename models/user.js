const crypto = require('crypto');
const config = require('config');
const utils = require('../utils');
const mongoose = require('../libs/mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'E-mail пользователя не должен быть пустым.',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Некорректный email.'
      }
    ],
    unique: 'Такой email уже существует'
  },
  displayName: {
    type: String,
    required: 'У пользователя должно быть имя',
    unique: 'Такое имя уже существует'
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
  },
}, {
  timestamps: true,
});


userSchema.methods.setPassword = async function(password) {
  if (!password && password.length < 4) {
    throw new Error('Password length needed 4')
  }

  this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
  this.passwordHash = await utils.generatePassword(this.salt, password);

  return {
    salt: this.salt,
    passwordHash: this.passwordHash,
  }
};


userSchema.methods.checkPassword = async function(password) {
  if (!password) return false;

  const hash = await utils.generatePassword(this.salt, password);
  return hash === this.passwordHash;
};


userSchema.methods.toJSON = function() {
  let obj = this.toObject();

  delete obj.salt;
  delete obj.verify;
  delete obj.verifyCode;
  delete obj.passwordHash;

  return obj;
};


module.exports = mongoose.model('User', userSchema);
