const express = require("express");
const cors = require("cors");
const { uploadImage } = require("./middlewear/multerUpload");
const postRoutes = require("./routes/postRoutes")
const tagRoutes = require("./routes/tagsRoutes")
const categoryRoutes = require("./routes/categoryRoute")
const authorRoutes = require("./routes/authorRoute")
const authorize = require("./auth/authorize")

const app = express()
const PORT = 3001

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("./images"));

app.use("/author",uploadImage, authorRoutes)
app.use("/post",uploadImage, postRoutes);
// app.use("/category", categoryRoutes)
app.use("/category", authorize('Admin', 'Reviewer'),categoryRoutes)


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})