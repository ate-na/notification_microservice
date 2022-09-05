export const emailsList = {
  bundle: (name: string, context: string) => ({
    text: `Your Bundle is Ready`,
    link: 'https://dev.app.3dily.com/bundle',
    name: name,
  }),
  owner_join: (name: string, content: string) => ({
    text: `${content} on 2022, April 12,check your users list by the link below`,
    link: 'https://dev.app.3dily.com/users',
    name: name,
  }),
  user_join: (name: string, context: string) => ({
    text: ` ${context} in 3Dily as a user, join the panel, using the link below`,
    link: 'https://dev.app.3dily.com/auth/login',
    name: name,
  }),
  forget_password: (name, link) => ({
    text: 'For keeping your account secure,we send you a new link to recover your password.login to your account by link blow',
    name: name,
    link: link,
  }),
  change_password: (name, context) => ({
    text: 'Your password has been suceesfuly changed in your 3Dily account,check your login section right now,from login link below',
    name: name,
    link: 'https://dev.app.3dily.com/auth/login',
  }),
  signup: (name, context) => ({
    text: `Dear ${name}
    Welcome to your 3Dily account in 2022, April 12
    We hope you enjoy our services and can boost your marketing with them.
    This is a 1-month trial account to get familiar with our service and pipeline, so you can make decisions about further steps.
    Please login into your account with this link and complete your personal and company information
    Please let me know if you have any questions, I will support you.
    All the best, Niki jaffari `,
    name,
    link: context,
  }),
};
