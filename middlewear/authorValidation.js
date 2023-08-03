
const validateAuthor = (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/
    const { firstname, lastname, email, phonenumber, bio } = req.body;
    if (!firstname || !lastname ||!email || !phonenumber || !bio) {
      return res.status(400).json({ error: 'Fields cannot be empty' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    if (!phoneRegex.test(phonenumber)) {
        return res.status(400).json({ error: 'Invalid phone number' });
    }
    next();
  };
  
module.exports={validateAuthor}
 