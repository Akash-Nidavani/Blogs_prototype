
const validatePost = (req, res, next) => {
    const { title, categoryId, description, content, authorId } = req.body;
    if (!title || !categoryId || !description || !content || !authorId ) {
      return res.status(400).json({ error: 'Fields cannot be empty' });
    }
    next();
  };
  
module.exports={validatePost}
 