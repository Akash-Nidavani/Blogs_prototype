const db = require("./../models");

const createtag = async (req, res) => {
    try {
        const { name } = req.body;
        // if(!req.file){
        //     return res.status(400).json({error:"Blog picture needs to be uploaded"})
        // }
        // const image = req.file ? req.file.path : null;
        const tag = await db.tags.create({
            name
        });
        res.status(200).json(tag);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to create a tag" });
    }
};

module.exports = {
    createtag
}