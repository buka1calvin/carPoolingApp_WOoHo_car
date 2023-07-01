import sgMail from "@sendgrid/mail";
import "dotenv/config";

const validationOTPmail = async (user, otp, token) => {
  const apikey = process.env.API_KEY;
  const url = `${process.env.VERIFYEMAIL}?token=${token}`;
  sgMail.setApiKey(apikey);
  const message = {
    to: user.email,
    from: {
      name: "WOoHo_Car",
      email: process.env.SEND_EMAIL,
    },
    subject: "Click here to confirm",
    text: "This is the message from SendGrid",
    html: `
      <html>
        <head>
          <style>
            .container {
              border: 2px;
            }
            .button {
              background-color: #2D719D;
              padding: 10px 20px;
              text-decoration: none;
              font-weight: bold;
              border-radius: 4px;
            }
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .header{
              background-repeat: no-repeat;
              background-size: fit;
              width: 100%;
              height: 120px;
            }
            a{
              text-decoration: none;
              color: white;
            }
            span{
              color: #fff;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class = "header">
              <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>
            </div>
            <h2>Click to verify your email</h2>
            <p>Copy this code: ${otp}</p>
            <a href="${url}" class="button"><span>Verify Email</span></a>
          </div>
        </body>
      </html>
    `,
  };

  sgMail
    .send(message)
    .then((res) => {
      console.log("Message sent...");
    })
    .catch((error) => console.log(error));
};

const sendDriverProfileUpdateEmail = async (user, driverData) => {
  const url = `${process.env.VERIFY_EMAIL}/verification/${user._id}`;
  const apikey = process.env.API_KEY;
  sgMail.setApiKey(apikey);
  const { driverLicenseNumber, carPictures } = driverData;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Your CSS styles here */
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Driver Profile Update Request</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
          <td>names</td>
          <td>${user.firstname} ${user.lastname}</td>
        </tr>
          <tr>
            <td>Driver License Number:</td>
            <td>${driverLicenseNumber}</td>
          </tr>
          <tr>
            <td>Car Pictures:</td>
            <td>
              <ul>
                ${carPictures
                  .map((picture) => `<li><img src="${picture}"/></li>`)
                  .join("")}
              </ul>
            </td>
          </tr>
        </table>
        <button><a href=${url}> verify </a></button>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: "calvinusbukaran@gmail.com",
    from: {
      name: `${user.firstname}  ${user.lastname}`,
      email: process.env.SEND_EMAIL,
    },
    subject: "Driver Profile Update Request",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("Driver profile update email sent");
  } catch (error) {
    console.error("Error sending driver profile update email:", error);
  }
};

export { validationOTPmail, sendDriverProfileUpdateEmail };
