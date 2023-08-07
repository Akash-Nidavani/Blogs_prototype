const db = require("./../models");
const sequelize = require("sequelize")
const { Op } = require("sequelize")

const createAuthor = async (req, res) => {
    try {
        const { firstname, lastname, email, phonenumber, bio } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "profile picture needs to be uploaded" })
        }
        const image = req.file ? req.file.path : null;
        const author = await db.author.create({
            firstname,
            lastname,
            email,
            phonenumber,
            bio,
            image
        });
        res.status(200).json(author);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create a author" });
    }
};


// {include:'auth_posts'} to get Author along with thier posts
const getAllAuthorsBlog = async (req, res) => {
    try {
        const authors = await db.author.findAll({ include: 'authors' });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch authors" });
    }
};

const getAllAuthors = async (req, res) => {
    try {
        const authors = await db.author.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json(authors);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to fetch authors" });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const author = await db.author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        await author.destroy();
        res.json({ message: "Author deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the author" });
    }
};

const editAuthor = async (req, res) => {
    try {
        const author = await db.author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ error: "Author not found" })
        }
        const { firstname, lastname, email, phonenumber, bio, image } = req.body;
        author.firstname = firstname;
        author.lastname = lastname;
        author.email = email;
        author.phonenumber = phonenumber;
        author.bio = bio;
        author.image = image;
        await author.save();
        res.json(author);

    } catch (error) {
        res.status(500).json({ error: "Failed to edit the Author details" })
    }
}


const searchAuthor = async (req, res) => {
    try {
        const searchKey = req.params.key;
        let searchResult = await db.author.findAll({
            where: {
                [Op.or]: [{
                    firstname: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                }, {
                    lastname: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                }, {
                    email: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                },
                {
                    phonenumber: {
                        [Op.iLike]: `%${searchKey}%`,
                    }
                }
                ],
            }
        })
        if (!searchResult) {
            return res.status(404).json({ error: "Author not found!" })
        }
        res.status(200).json({ searchResult })
    } catch (error) {
        res.status(404).json({ error: "Author not found!" })
    }
}

module.exports = {
    createAuthor,
    getAllAuthors,
    deleteAuthor,
    getAllAuthorsBlog,
    editAuthor,
    searchAuthor
}