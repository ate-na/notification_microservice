export const emailsList = {
  bundle: (name) => ({
    text: `Dear ${name} Your Bundle is Ready`,
    link: 'https://dev.app.3dily.com/bundle',
  }),
  ownerAddToPanel: (owner, userEmail) => ({
    text: `Dear ${owner}, you had invited a new user to your 3Dily account named ${userEmail} on 2022, April 12,  check your users list by the link below`,
    link: 'https://dev.app.3dily.com/users',
  }),
  InviteToPanel: (name, company) => ({
    text: `Hello ${name}, you are invited to the ${company} panel in 3Dily as a user, join the panel, using the link below`,
    link: 'https://dev.app.3dily.com/auth/login',
  }),
};
