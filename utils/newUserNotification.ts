import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function newUserNotification(
  userName: string,
  userEmail: string
) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [process.env.MY_NOTIFICATION_EMAIL!],
    subject: "Ny användare registrerad",
    text: `Namn: ${userName}\nEmail: ${userEmail}`,
  });
}
