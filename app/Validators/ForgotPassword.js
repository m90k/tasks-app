'use strict';

const Antl = use('Antl');
class ForgotPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      url: 'required|url',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = ForgotPassword;
