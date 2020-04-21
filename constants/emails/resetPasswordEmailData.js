const config = require('config');
const host = config.get('host');

const resetPasswordEmailData = (token, username) => ({
  subject: 'Ship-Me App Password Reset',
  text: `Dear ${username},
  
    You are receiving this because you (or someone else) have requested the reset of the password for your account.
    
    Please, click on the following link, or paste this into your browser to complete the process:
    
    ${host}/api/auth/password/${token}
    
    If you did not request this, please ignore this email and your password will remain unchanged.`,
});

module.exports = {
  resetPasswordEmailData,
};
