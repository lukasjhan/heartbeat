import axios from "axios";

const webhookUrl = process.env.NEXT_PUBLIC_SLACK || "";

export async function sendEmailAndMessageToSlack(
  email: string,
  message: string
): Promise<void> {
  const formattedMessage = `Email: *${email}*\nMessage: ${message}`;

  if (!webhookUrl) {
    console.error("Slack webhook URL not found");
    return;
  }

  try {
    await axios.post(webhookUrl, {
      text: formattedMessage,
      mrkdwn: true, // Enable Markdown formatting
    });
    console.log("Email and message sent to Slack successfully");
  } catch (error) {
    console.error("Error sending email and message to Slack:", error);
  }
}
