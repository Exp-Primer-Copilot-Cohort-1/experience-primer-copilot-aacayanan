// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'data/comments.json');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(req.body);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Path: public/index.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <h1>Comments</h1>
    <form id="comment-form">
        <input type="text" id="name" placeholder="Your name" required>
        <textarea id="comment" placeholder="Your comment" required></textarea>
        <button type="submit">Submit</button>
    </form>
    <div id="comments"></div>
    <script src="app.js"></script>
</body>
</html>

// Path: public/styles.css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

h1 {
    text-align: center;
}

#comment-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
}

#comment-form input, #comment-form textarea, #comment-form button {
    margin: 10px;
    padding