var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded( { extended: true } ));
app.set('view engine', 'ejs');

app.use(express.static('public'));

var task = ['buy socks', 'practice with node.js'];
var complete = ['finish jQuery'];

app.get('/', (req, res)=>{
    res.render('index', { task: task, complete:complete } );
});

app.post('/addtask', (req, res) => {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect('/');
});

app.post('/removetask', (req, res)=> {
    var completeTask = req.body.check; 
    if (typeof completeTask === 'string') {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === 'object') {
        for (var i=0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect('/');
});

app.listen(3000, ()=> console.log('App is listening on port 3000!'));