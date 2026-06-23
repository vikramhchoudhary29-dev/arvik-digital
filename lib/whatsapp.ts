const WHATSAPP_NUMBER = "919404830921";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const quoteMessage =
  "Hello Arvik Digital, I am interested in your services. Please share more details.";

export const websiteMessage =
  "Hello Arvik Digital, I am interested in Website Development. Please share more details.";