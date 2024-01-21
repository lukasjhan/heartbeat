import axios from "axios";
import querystring from "querystring";

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
    const payload = {
      text: formattedMessage,
      mrkdwn: true, // Enable Markdown formatting
    };
    const encodedPayload = querystring.stringify({
      payload: JSON.stringify(payload),
    });
    await axios.post(webhookUrl, encodedPayload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("Email and message sent to Slack successfully");
  } catch (error) {
    console.error("Error sending email and message to Slack:", error);
  }
}
