const Email = require("../models/Email");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const getSend = (req, res) => res.render("sendmail",{title:"Send Mail"});

const getDashboard = async (req, res) => {
  const user = await User.findById(req.user.id);
  const emails = await Email.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.render("dashboard", { title: "Dashboard", user, emails });
};
const sendMail=async(req,res)=>{
    const{message,to}=req.body;
    const user=await User.findById(req.user.id);
    const completion =  await openai.chat.completions.create({
     model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
     messages: [
      { role: "system", content: "You are an email formatter." },
      { role: "user", content: message }
    ]
  });
  const formatted = completion.choices[0].message.content + `\n\n(Employee ID: ${user.employeeId})\n${user.name}`;
  await Email.create({ userId: req.user.id, to, originalMessage: message, formattedMessage: formatted });

   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  


  await transporter.sendMail({
    from: `AI Mail Tool <${process.env.EMAIL_USER}>`,
    to,
    subject: "Important Mail",
    text: formatted,
  });

  res.redirect("/dashboard");
};




module.exports = {
  getSend,
  getDashboard,
  sendMail,
};
