const express = require('express');
const mongoose = require('mongoose');
const articleModel = require('./models/articleModel')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname,'/build')))
app.use(express.json())

app.get("/api/articles/:name", async (req, res) => {
    try {
        const articleName = req.params.name;
        const articleInfo = await articleModel.findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error Occured" })
    }
})

app.post("/api/articles/:name/upvote", async (req, res) => {
    try {
        const articleName = req.params.name;
        await articleModel.updateOne({name:articleName},{$inc:{upvotes:1}})
        const updatedArticle = await articleModel.find({name:articleName})
        res.status(200).json(updatedArticle)
    }
    catch (err) {
        res.status(500).json({ message: "Server Error Occured" })
    }
})

app.post("/api/articles/:name/add-comment", async (req, res) => {
    try{
        const { username, text } = req.body;
        const articleName = req.params.name;
        await articleModel.updateOne({name:articleName},{$push:{comments:{username,text}}})
        const updatedArticle = await articleModel.findOne({name:articleName})
        res.status(200).json(updatedArticle)
    }
    catch(err){
        res.status(500).json({ message: "Server Error Occured" })
    }

    
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'))
})


// Connection to Database
const uriString = "mongodb+srv://Kushagra:dXk9DOgi@myblog.jitmu.mongodb.net/myblog"
mongoose.connect(uriString, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        app.listen(8000, () => console.log("Database Connected App Running"))
    }
})