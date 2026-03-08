// Configurazione email per invio conferma ordine
import nodemailer from "nodemailer";

// Crea il trasportatore SMTP con le credenziali dal file .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Tipo per i dati dell'ordine nella email
interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

// Funzione per inviare email di conferma ordine
export async function sendOrderConfirmation(data: OrderEmailData) {
  // Crea la lista prodotti in formato HTML
  const itemsList = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">€${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  // Template HTML dell'email
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFF8F0;padding:40px;border-radius:12px">
      <div style="text-align:center;margin-bottom:30px">
        <h1 style="color:#B8860B;font-size:28px;margin:0">TarallOro</h1>
        <p style="color:#666;font-size:14px">Sapori autentici della Puglia</p>
      </div>
      <h2 style="color:#333">Grazie per il tuo ordine, ${data.customerName}!</h2>
      <p style="color:#666">Il tuo ordine <strong>#${data.orderId.slice(-8).toUpperCase()}</strong> è stato ricevuto con successo.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0">
        <thead>
          <tr style="background:#B8860B;color:white">
            <th style="padding:10px;text-align:left">Prodotto</th>
            <th style="padding:10px;text-align:center">Qtà</th>
            <th style="padding:10px;text-align:right">Prezzo</th>
          </tr>
        </thead>
        <tbody>${itemsList}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:12px;font-weight:bold;text-align:right">Totale:</td>
            <td style="padding:12px;font-weight:bold;text-align:right;color:#B8860B;font-size:18px">€${data.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <p style="color:#666;font-size:14px;margin-top:30px;text-align:center">
        Per qualsiasi domanda, contattaci a <a href="mailto:info@taralloro.it" style="color:#B8860B">info@taralloro.it</a>
      </p>
    </div>
  `;

  // Invia l'email
  try {
    await transporter.sendMail({
      from: `"TarallOro" <${process.env.EMAIL_FROM}>`,
      to: data.customerEmail,
      subject: `Conferma ordine #${data.orderId.slice(-8).toUpperCase()} - TarallOro`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Errore invio email:", error);
    return { success: false, error };
  }
}
