// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Author, Book, AuthorBook } = require('./models');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // API route to insert data for both Author and Book
// app.post('/insert', async (req, res) => {
//   try {
//     const { authorName, bookTitle } = req.body;

//     // Create the Author record
//     const newAuthor = await Author.create({ name: authorName });

//     // Create the Book record
//     const newBook = await Book.create({ title: bookTitle });

//     // Create the association in the AuthorBook table
//     await AuthorBook.create({ AuthorId: newAuthor.id, BookId: newBook.id });

//     res.json({ message: 'Data inserted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to insert data' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { Order, Customer, Product } = require('./models');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// // API route to get all orders along with customer and product details
// app.get('/orders', async (req, res) => {
//   try {
//     const ordersWithDetails = await Order.findAll({
//       include: [
//         {
//           model: Customer,
//           attributes: ['firstName', 'lastName'],
//         },
//         {
//           model: Product,
//           attributes: ['name', 'price'],
//         },
//       ],
//     });

//     res.json(ordersWithDetails);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });




// console.log(blog)
// const author_name = await db.author.findOne({where:{id:blog.dataValues.authorId}})
// const category_name = await db.category.findOne({where:{id:blog.dataValues.categoryId}})
// fullinfo = { ...blog, author_name, category_name }
// res.json(fullinfo);


// const db = require("./../models");

// const createBlog = async (req, res) => {
//     try {
//         const { title, description, content, categoryId, authorId } = req.body;
//         const post = await db.post.create({
//             title,
//             description,
//             content,
//             categoryId,
//             authorId
//         });

//         // const student = await Student.findByPk(studentId);
//         // const newBook = await Book.create({ title: bookTitle });

//         await AuthorBook.create({ AuthorId: newAuthor.id, BookId: newBook.id });
//         res.json({ message: 'Blog created successfully' });

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: "Failed to create a Blog" });
//     }
// }

// const deleteBlog = async (req, res) => {
//     try {
//       const blog = await db.blog.findByPk(req.params.id);
//       if (!blog) {
//         return res.status(404).json({ error: "Blog not found" });
//       }
//       await blog.destroy();
//       res.json({ message: "Blog deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to delete the blog" });
//     }
//   };

// module.exports = {
//     createBlog,
//     deleteBlog
// }





const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Image } = require('./models');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());

const upload = multer();

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    await Image.create({
      name: originalname,
      data: buffer,
    });
    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
});





where: {
  [Op.or]: [{
    firstname: {
      [Op.iLike]: `%${searchKey}%`,
    }
  }, {
    lastname: {
      [Op.iLike]: `%${searchKey}%`,
    }
  }], 
},


firstname: {
  [Op.iLike]: `%${searchKey}%`,
},
lastname: {
  [Op.iLike]: `%${searchKey}%`,
},





