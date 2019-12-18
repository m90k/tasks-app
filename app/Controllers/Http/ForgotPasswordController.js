'use strict';

const Crypto = require('crypto');
const User = use('App/Models/User');
const Mail = use('Mail');
const Moment = require('moment');

class ForgotPasswordController {
  async store({request, response}) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = Crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();
      await user.save();

      await Mail.send(
        ['email.forgot-password'],
        {
          email,
          token: user.token,
          link: `${request.input('url')}?token=${user.token}`,
        },
        message => {
          message
            .to(user.email)
            .from('m90kdeveloper@gmail', 'Marcos De Souza')
            .subject('Recuperação de Senha');
        },
      );
    } catch (error) {
      return response
        .status(error.status)
        .send({error: {message: 'Algo Deu Errado'}});
    }
  }

  async update({request, response}) {
    try {
      const {token, password} = request.all();

      const user = await User.findByOrFail('token', token);

      const tokenExpired = Moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'Token de Acesso Expirado',
          },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;
      await user.save();
    } catch (error) {
      return response
        .status(error.status)
        .send({error: {message: 'Algo Deu Errado ao resetar sua senha'}});
    }
  }
}

module.exports = ForgotPasswordController;
