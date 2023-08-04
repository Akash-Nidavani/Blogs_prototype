const db = require("./../models");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await db.category.create({
            name
        });
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create a category" });
    }
};


//.findAll() --> Only to get All categories, 
//.findAll({include:'categories'}) --> fetches all the Blogs in that All categories

const getAllCategories = async (req, res) => {
    try {
        const category = await db.category.findAll({ include: 'categories' });
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

const deleteCategories = async (req, res) => {
    try {
      const category = await db.category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      await category.destroy();
      res.json({ message: "category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the category" });
    }
  };



module.exports = {
    createCategory,
    getAllCategories,
    deleteCategories
}