// emailTemplate.js
const emailVerifyContent = (user, url) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .container {
                text-align: center;
                padding: 30px;
                margin: 10px;
                background-color: #f5f5f5;
                border-radius: 20px;
            }
            .text {
                margin-bottom: 20px;
            }
            .info {
                color: #007991;
                padding-bottom: 25px;
            }
            .text p {
                font-size: larger;
                color: #000;
                margin: 20px 0;
            }
            .link {
                background-color: #007991;
                padding: 15px 30px;
                font-size: large;
                text-decoration: none;
                border-radius: 5px;
            }
            .btn{
                margin-top: 50px;
            }
            .btn a{
                color:#fff; 
            }
            span{
                text-decoration: none;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="text">
                <div>
                    <h1 class="info">Dear ${user.firstName}, <br>Welcome To Learnova</h1>
                </div>
                <p>Your gateway to endless knowledge and learning opportunities! As a valued member of the Learnova community, you'll enjoy exclusive access to the latest courses, educational updates, and exciting promotions. Your journey towards limitless learning starts now.</p>
                <p>
                    Your account details are:<br>
                    <span>${user.email}<span></p>
            </div>
            <div class="btn">
                <a class="link" href="${url}">Verify</a>
            </div>
        </div>
    </body>
    </html>
`;
  };
  
  module.exports = {
    emailVerifyContent
  };
  