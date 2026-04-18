exports.getConfirmationHtml = (name, service, date, time) => `
<div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #f8edeb; padding: 40px; border-radius: 16px; text-align: center;">
  <div style="width: 60px; height: 60px; border-radius: 50%; background-color: rgba(229,152,155,0.2); border: 1px solid #e5989b; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; color: #e5989b; font-weight: bold; margin-bottom: 20px;">
    K
  </div>
  <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; font-weight: bold; margin: 0 0 20px;">Appointment Confirmed</h1>
  <p style="color: #a0a0a0; font-size: 16px; font-weight: 300; margin-bottom: 30px; line-height: 1.6;">
    Dear ${name},<br/>
    We're pleased to confirm your appointment at Kaya Beauty Parlour. We are preparing a premium experience just for you.
  </p>
  <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; margin-bottom: 30px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">
    <p style="margin: 0 0 10px; font-size: 14px; color: #a0a0a0;"><strong>Service:</strong> <span style="color: #fff;">${service}</span></p>
    <p style="margin: 0 0 10px; font-size: 14px; color: #a0a0a0;"><strong>Date:</strong> <span style="color: #fff;">${date}</span></p>
    <p style="margin: 0; font-size: 14px; color: #a0a0a0;"><strong>Time:</strong> <span style="color: #fff;">${time}</span></p>
  </div>
  <p style="font-size: 12px; color: #606060;">If you need to change your appointment, please contact us at least 24 hours in advance.</p>
</div>
`;
