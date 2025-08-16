const { createTransport } = require("nodemailer");
const { getTime } = require("./functions");


let transport = createTransport({
    service:"gmail",
    host:"smtp.gmail.email",
    port:587,
    secure:false,
    auth:{
        user:"gadzit.ensam.meknes@gmail.com",
        pass:"hyrr rfze opmz odsn",
    }
});

let mailOptions = {
    from : ("GADZ'IT CLUB - " + process.env.USER).replaceAll("<","").replaceAll(">",""),
    to: 'elamrani.abdenour765@gmail.com',
    subject: 'Account Activation :',
    html : `
    <div style="font-family: 'Arial', sans-serif;line-height: 1.6;color: #333333;margin: 0;padding: 0;background-color: #f5f5f5;">
        <center>
            <div style="max-width: 600px;margin: 0 auto;background: #ffffff;">
                <header style="background-color: #a4eda1;padding: 30px;text-align: center;">
                    <div style="color: #ffffff;font-size: 24px;font-weight: bold;">Miami Hotel</div>
                </header>
                <main style="padding: 30px;">
                    <h1 style="color: #a4eda1;margin-top: 0;">Welcome to Miami Hotel!</h1>
                    <p>Dear {{Guest}},</p>
                    <p>Thank you for creating an account with Miami Hotel. We're delighted to have you as our valued guest.</p>
                    
                    <div style="border-top: 1px solid #eeeeee;margin: 20px 0;"></div>

                    <p>Your account details:</p>
                    <p><strong>Email:</strong> {{user_email}}</p>
                    <p><strong>Account Created:</strong> {{signup_date}}</p>
                    
                    <a href="{{login_link}}" style="display: inline-block;background-color: #a4eda1;color: #ffffff;text-decoration: none;padding: 12px 25px;border-radius: 4px;font-weight: bold;margin: 15px 0;">Activate youre account</a>

                    <div style="border-top: 1px solid #eeeeee;margin: 20px 0;"></div>
                    <p>If you didn't create this account, please contact our support team immediately.(dris o alla)</p>
                </main>

                <footer style="background-color: #f9f9f9;padding: 20px;text-align: center;font-size: 12px;color: #999999;">
                    <p>Sahrai Hotel &copy; 2025 | All Rights Reserved</p>
                    <p>Liberty City, Vice city, Jotia salondrias</p>
                    <p>
                        <a href="">Our Website</a> | 
                        <a href="">Contact Us</a> | 
                        <a href="">Privacy Policy</a>
                    </p>
                </footer>
            </div>
        </center>
    </div>
    `.replace("{{Guest}}","3bidaaa d nour").replace("{{user_email}}","elamrani.abdenour765@gmail.com").replace("{{signup_date}}","1:38 8/16/2025")
};

/*sendMail(transport , mailOptions , (err , info) => {
    if(err) return console.log("Error : " , err.message);
    console.log("Done!")
});
//a();
*/

console.log(getTime());