// src/rocCloser/emailClient.js
// Placeholder for email service integration (SendGrid, Resend, Mailgun, etc.)

// TODO: Replace with actual email service integration (e.g., SendGrid, Resend, Mailgun)

/**
 * Simulates sending an email.
 * In a real application, this would integrate with an email service provider.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The HTML or plain text body of the email.
 * @param {string} [from='noreply@roccloser.com'] - The sender's email address.
 * @returns {Promise<{success: boolean, message: string, messageId: string}>}
 *          A promise that resolves with the status of the email sending attempt.
 */
async function sendEmail(to, subject, body, from = 'noreply@roccloser.com') {
  console.log('Attempting to send email:');
  console.log(`  From: ${from}`);
  console.log(`  To: ${to}`);
  console.log(`  Subject: ${subject}`);
  console.log('  Body:');
  console.log(body.length > 200 ? `${body.substring(0, 197)}...` : body); // Log a snippet if body is long

  // Simulate network delay and success
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
  const mockMessageId = `mock-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  console.log(`Mock email sent successfully. Message ID: ${mockMessageId}`);
  return { success: true, message: 'Email sent successfully (mock).', messageId: mockMessageId };
}

module.exports = {
  sendEmail,
};
