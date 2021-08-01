const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Admin = require('./models/admin')
const Article = require('./models/article')
const bodyParser = require('body-parser');

// Mongodb connection
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// Parsing the body in express requests
app.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '10mb',
    extended: true
}))
app.use(
    express.urlencoded({
        extended: false
    })
)

// Parsing json in express
app.use(bodyParser.json({ limit: "10mb" }))

// Serving static files
app.use(express.static('assets'))

// Home page route. Serving index html file
app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/index.html')
})

// Login form endpoint
app.get('/login', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/login.html')
})

app.get('/signup', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/register.html')
})

// Adding new article
app.get('/new', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/new.html')
})

// Getting a particular blog
app.get('/blog/:slug', async (req, res) => {
    console.log(__dirname)
    try {
        // Getting article from database
        const article = await Article.findOne({
            slug: req.params.slug
        })
        // Sending the response back as json data
        res.send(JSON.stringify({ article: article }))
    } catch (e) {
        console.log(e)
        // Error response
        res.send(JSON.stringify({ error: "Error in finding article" }))
    }
})

// Getting article html for showing article
app.get('/article/:slug', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/article.html')
})

// Article edit html file
app.get('/edit/:slug', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/edit.html')
})

// Getting edit article json data
app.get('/editblog/:slug', async (req, res) => {
    try {
        // Finding one article
        const article = await Article.findOne({
            slug: req.params.slug
        })
        // Sending article back as response
        res.send(JSON.stringify({ article: article }))
    } catch (e) {
        console.log(e)
        // Error response
        res.send(JSON.stringify({ error: "Error in finding article" }))
    }
})

// Saving the article in mongodb
app.post('/upload', async (req, res) => {
    // Creating new article
    let article = new Article()
    article.title = req.body.title;
    article.description = req.body.description
    article.image = req.body.image
    try {
        // Saving the article
        article = await article.save()
        // Sending the response
        res.send(JSON.stringify({ message: "Success" }))
    } catch (e) {
        console.log(e)
        // Error response
        res.send(JSON.stringify({ error: "Error in register as admin" }))
    }
})

// Update the article
app.post('/update', async (req, res) => {
    // Finding the article before updating
    Article.findById(req.body.id, function (err, article) {
        if (!article) {
            // Sending the response back
            res.send(JSON.stringify({ error: "Error in finding article" }))
        }
        else {
            // Setting the article
            article.title = req.body.title
            article.description = req.body.description
            article.image = req.body.image
            article.createdAt = Date.now()
            // Saving the article
            article.save(function (err) {
                if (err)
                    console.log('error')
                else
                    console.log('success')
            });
            // Sending the response back
            res.send(JSON.stringify({ message: "Success" }))
        }
    });
})

// Delete endpoint
app.get('/delete/:slug', async (req, res) => {
    const query = {
        slug: req.params.slug
    }
    try {
        // Article delete query
        await Article.deleteOne(query);
        // Redirecting back to index html
        res.sendFile(__dirname + '/index.html')
    } catch (e) {
        console.log(e)
        // Redirecting back to index html
        res.sendFile(__dirname + '/index.html')
    }

})

// Getting all articles
app.get('/all', async (req, res) => {
    try {
        // Finding the articles by sorting
        const articles = await Article.find().sort({ createdAt: 'desc' })
        // Sending all article back as json response
        res.send(JSON.stringify({ articles: articles }))
    } catch (e) {
        console.log(e)
        // Sending the error response
        res.send(JSON.stringify({ error: "Error in fetching articles" }))
    }
})

// Getting the admin login page
app.get('/admin', async (req, res) => {
    try {
        console.log(req.query)
        // FInding the admin
        const admin = await Admin.findOne({
            email: req.query.email,
            password: req.query.password
        })
        console.log(admin, req.params)
        if (admin == null) {
            // Sending error response
            res.send(JSON.stringify({ error: "Invalid email and password" }))
        } else {
            // Sending success response
            res.send(JSON.stringify({ message: "success", path: "/" }))
        }
    } catch (e) {
        console.log(e)
    }
})

// Register endpoint
app.get("/register", async (req, res) => {
    // Creating a new admin model
    let admin = new Admin()
    admin.email = req.query.email
    admin.password = req.query.password
    console.log(admin, req.query)
    try {
        // Save the admin in db
        admin = await admin.save()
        // Sending the success response
        res.send(JSON.stringify({ message: "Success" }))
    } catch (e) {
        console.log(e)
        // Sending the error response
        res.send(JSON.stringify({ error: "Error in register as admin" }))
    }
})

// Starting the app
app.listen(3000)