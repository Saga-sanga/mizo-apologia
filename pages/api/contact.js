const mail = require('@sendgrid/mail');
// import cors from 'cors';
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);
  
  const message = `
    Name: ${body.name}\r\n
    Email ID: ${body.email}\r\n
    Message: ${body.message}
  `;
 
  const data = {
    to: 'mizo.apologia@gmail.com',
    from: 'mizoapologia.noreply@gmail.com',
    subject: `New question from ${body.name}`,
    text: message,
    html: message.replace(/\r\n/g, '<br />'),
  };

  try {
    await mail.send(data);
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }

  // console.log(body);
};