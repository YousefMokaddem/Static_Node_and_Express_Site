const express = require('express');
const {projects} = require('./data.json');

const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    res.locals.projects = projects;
    res.render('index');
});

app.get('/about', (req, res)=>{
    res.locals.projects = projects;
    res.render('about');
});

app.get(['/project', '/projects'], (req, res)=>{
    res.locals.projects = projects;
    res.render('project');
});

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

app.listen(3000, () =>{
    console.log('The application is running on port 3000')
});