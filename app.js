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

app.get(['/project/:id', '/projects/:id'], (req, res)=>{
    res.locals.project = projects[req.params.id];
    res.render('project');
});

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(`${err.message} - Status: ${err.status}`)
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

app.listen(process.env.PORT || 4000, () =>{
    console.log('The application is running');
});