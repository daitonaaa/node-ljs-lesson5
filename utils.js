const utils = {

  isNotEmpty(value) {
    if (value && typeof value === 'object') {
      return Array.isArray(value) ? Boolean(value.length) : Boolean(Object.keys(value).length);
    }

    return false;
  },

};

module.exports = utils;
