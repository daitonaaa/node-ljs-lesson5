const config = require('config');
const crypto = require('crypto');

const utils = {

  isNotEmpty(value) {
    if (value && typeof value === 'object') {
      return Array.isArray(value) ? Boolean(value.length) : Boolean(Object.keys(value).length);
    }

    return false;
  },

  generatePassword(salt, password) {
    return new Promise((resolve, reject) => {
      const hashLength = config.get('crypto.hash.length');
      const hashIterations = config.get('crypto.hash.iterations');

      crypto.pbkdf2(password, salt, hashIterations, hashLength, 'sha512', (err, key) => {
        if (err) return reject(err);

        resolve(key.toString('hex'));
      })
    });
  },

  Response: function (status, body) {
    this.status = status;
    this.body = body;
  },

};

module.exports = utils;
