
const authorize = (...role) => { //(role)--> for single role authorize and can use --> (...role) if you want to validate more than one role
    return (req, res, next) => {
        //if(!role.includes(req.user.role)) ---> (...role) if (req.user.role !== role) ---> for single role
      if (!role.includes(req.user.role)) {
        return res.status(403).json({ error: 'Permission denied' });
      }
      next();
    };
  };

module.exports= authorize