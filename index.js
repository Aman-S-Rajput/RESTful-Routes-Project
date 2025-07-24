const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    { id: uuidv4(), username: "alice123", comment: "Great post! Really insightful." },
    { id: uuidv4(), username: "bob_the_dev", comment: "Thanks for sharing this!" },
    { id: uuidv4(), username: "charlie7", comment: "Could you explain more on this topic?" },
    { id: uuidv4(), username: "diana_coder", comment: "Loved the examples you used." },
    { id: uuidv4(), username: "eve_techie", comment: "This cleared up my confusion." },
    { id: uuidv4(), username: "franklin42", comment: "Looking forward to more content like this." }
];


app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('new.ejs');
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id: uuidv4(), username: username, comment: comment })
    res.redirect('/comments')
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === (id));
    res.render('comments/edit.ejs', { comment });
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === (id));
    res.render('comments/show.ejs', { comment })
})
app.get('/tacos', (req, res) => {
    res.send(' IT is get tacos request');
})
app.post('/tacos', (req, res) => {
    console.log(req.body);
    const { v, vn } = req.body
    res.send(`Here are your ${v} ${vn} body`);
})

app.post('/comments/:id/edit', (req, res) => {
    const { id, newComment } = req.body;
    const comment = comments.find(c => c.id === (id));
    comment.comment = newComment;
    res.redirect('/comments')
})


app.listen(3000, () => {
    console.log(3000);
})