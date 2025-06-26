import axios from 'axios';
import { envVars } from '../utils/envVars.js';

export const sendWhatsAppOtp = async ({ phoneNumber, otp }) => {
  const url = `https://graph.facebook.com/v19.0/${envVars.metaPhoneNumberId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: envVars.metaTemplateName,
      language: { code: envVars.metaLanguage },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: otp }
          ]
        }
      ]
    }
  };

  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${envVars.metaToken}`,
      'Content-Type': 'application/json',
    }
  });
};
