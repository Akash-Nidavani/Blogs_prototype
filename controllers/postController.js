const db = require("./../models");
const sequelize = require('sequelize');
const { Op } = require("sequelize")

const createPost = async (req, res) => {
    try {
        const { title, description, content, categoryId, authorId } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Blog picture needs to be uploaded" })
        }
        const image = req.file ? req.file.path : null;
        const post = await db.post.create({
            title,
            description,
            content,
            categoryId,
            authorId,
            image
        });
        res.status(200).json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create a post" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const blog = await db.post.findAll({
            // attributes: ['id', 'title', ['createdAt', 'Date']],
            attributes: ['id', 'title',
                [sequelize.fn('TO_CHAR', sequelize.col(`"post"."createdAt"`), 'DD-MM-YYYY'), 'date']
            ],
            include: [{
                model: db.author,
                as: 'authors',
                attributes: [[sequelize.literal(`firstname||' '||lastname`), 'author']],
                // attributes: ['firstname', 'lastname'],
            }, {
                model: db.category,
                as: 'categories',
                attributes: ['name'],
            }]
        });
        res.send(blog)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};

const deletePost = async (req, res) => {
    try {
        const blog = await db.post.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        await blog.destroy();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to delete the blog" });
    }
};


const updatePost = async (req, res) => {
    try {
        const post = await db.post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { title, description, content, categoryId, image, status } = req.body; //status
        post.title = title;
        post.description = description;
        post.content = content;
        post.categoryId = categoryId;
        post.image = image;
        post.status = status;
        await post.save();
        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to update the blog" });
    }
};

const getDeletedPost = async (req, res) => {
    try {
        const blog = await db.post.findAll({
            where: { status: "Deleted" },
            attributes: ['id', 'title', ['createdAt', 'Date']],
            include: [{
                model: db.author,
                as: 'authors',
                attributes: ['firstname', 'lastname'],
            }, {
                model: db.category,
                as: 'categories',
                attributes: ['name'],
            }]
        });
        // {include:['blogs_author']} --> for joining Respecting author data
        res.send(blog)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};


const getPublishedPost = async (req, res) => {
    try {
        const blog = await db.post.findAll({
            where: { status: "Published" },
            attributes: ['id', 'title', ['createdAt', 'Date']],
            include: [{
                model: db.author,
                as: 'authors',
                attributes: ['firstname', 'lastname'],
            }, {
                model: db.category,
                as: 'categories',
                attributes: ['name'],
            }]
        });
        // {include:['blogs_author']} --> for joining Respecting author data
        res.send(blog)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
};


const searchBlog = async (req, res) => {
    const searchKey = req.params.key;
    try {
        const posts = await db.post.findAll({
            where: {
                [Op.or]: [{
                    title: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                }, {
                    content: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                }]
            },
        });

        // const author = await db.uthor.findAll({
        //     where: {
        //         title: {
        //             [Op.iLike]: `%${query}%`,
        //         },
        //     },
        // });

        res.json({ posts });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Failed to search' });
    }
}

module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    updatePost,
    getDeletedPost,
    getPublishedPost,
    searchBlog
}