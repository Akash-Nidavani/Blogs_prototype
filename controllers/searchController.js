const db = require("./../models");

const searchAny = async (req,res)=>{
    try{
        const searchkey = req.params.key;
        let searchResult = await db.


        res.status(200).json(searchResult);
    }catch(error){
        res.status(404).json({ error: "not found!" });
    }
}

module.exports={ searchAny }