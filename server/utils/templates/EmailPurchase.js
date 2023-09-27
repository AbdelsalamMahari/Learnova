// emailTemplate.js
const emailPurchase = (user, course) => {
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
                background-color: #FFA500;
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
                color: #FFA500;
            }
        </style>
    </head>
    <body>
      <div class="container">
        <div class="text">
            <div>
                <h1 class="info">Dear ${user.firstName},</h1>
                <p>Thank you for your recent purchase on Learnova.</p>
            </div>
            <p>You have successfully purchased the course:</p>
            <h2 class="course-name"><span>"${course.name}"</span></h2>
            <p>We truly appreciate your support and hope you find the course valuable for your learning journey.</p>
            <p>Your total purchase amount is:</p>
            <h3 class="price"><span>$${course.Price}</span></h3>
            <p>If you have any questions or need assistance with anything related to your course, please feel free to contact our support team.</p>
            <p>Thank you once again for choosing Learnova. We wish you success in your studies!</p>
            <p>Best regards,</p>
        </div>
    </div>
    
    </body>
    </html>

`;
};

module.exports = {
    emailPurchase,
};
