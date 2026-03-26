import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const TWILIO_PHONE = process.env.TWILIO_PHONE!;
const BAKER_PHONE = process.env.BAKER_PHONE!;

// export async function sendSMS(phone: string, message: string) {
//   try {
//     const cleanPhone = phone.replace(/\D/g, "").slice(-10);
//     const finalPhone = `+91${cleanPhone}`;

//     console.log("Sending SMS to:", finalPhone);

//     const res = await client.messages.create({
//       body: message,
//       from: TWILIO_PHONE,
//       to: finalPhone,
//     });

//     console.log("Twilio SMS SID:", res.sid);
//   } catch (error: any) {
//     console.error("TWILIO ERROR:", error.message);
//   }
// }

export async function sendSMS(to: string, message: string) {
  try {
    const formatted = to.startsWith("+") ? to : `+91${to.replace(/\D/g, "").slice(-10)}`;

    console.log("------------ SMS DEBUG ------------");
    console.log("TO:", formatted);
    console.log("FROM:", TWILIO_PHONE);
    console.log("MESSAGE:", message);

    const res = await client.messages.create({
      body: message,
      from: TWILIO_PHONE,
      to: formatted,
    });

    console.log("SUCCESS SID:", res.sid);
    console.log("-----------------------------------");

  } catch (error: any) {
    console.error("TWILIO ERROR FULL:", error);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);
  }
}

export async function sendOrderNotifications(data: {
  customerName: string;
  phone: string;
  itemName: string;
  orderDate: string;
}) {
  const { customerName, phone, itemName, orderDate } = data;

  const customerMsg = `Hi ${customerName}, your order for ${itemName} on ${orderDate} is confirmed 🎂 Thank you!`;

  const bakerMsg = `New Cake Order!
      Customer: ${customerName}
      Phone: ${phone}
      Item: ${itemName}
      Date: ${orderDate}`;

  await Promise.all([
    sendSMS(phone, customerMsg),
    sendSMS(BAKER_PHONE, bakerMsg),
  ]);
}