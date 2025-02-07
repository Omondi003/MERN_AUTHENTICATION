 import { MailtrapClient } from 'mailtrap'
 import  dotenv  from 'dotenv'

dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;


// Configuration for sending the emails

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
 

// export { mailtrapClient };
