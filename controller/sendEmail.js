const sendMail = require('../libs/sendMail');


const sendEmailController = {

  verifyUser(user) {
    const locals = {
      verifyCode: user.verifyCode,
      displayName: user.displayName,
    };

    return sendMail({
      template: 'verifyEmail',
      subject: 'Vefiry your email',
      to: user.email,
    }, locals);
  },
};

module.exports = sendEmailController;
