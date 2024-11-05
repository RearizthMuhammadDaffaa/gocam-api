import Brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

const brevo = new Brevo.TransactionalEmailsApi();
brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export const sender = {
  email: '7e461f001@smtp-brevo.com',
  name: 'Rearizth Company',
};

export default brevo;