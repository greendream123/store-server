/* eslint-disable strict */
module.exports = {
  getToken(options) {
    const processData = {};
    for (const key in options) {
      if (key !== 'password') processData[key] = options[key];
    }
    processData.loginTime = new Date().getTime();
    return this.app.jwt.sign(processData, this.app.config.jwt.secret, { expiresIn: '24h' });
  },
};
