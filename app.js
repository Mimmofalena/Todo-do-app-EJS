const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getDate = require(__dirname + '/date.js')

console.log(getDate);

let items = ['Buy Food','Cook Food', 'Eat Food']
let workItems = []
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/',function(req,res) {
    const day = getDate()
  

    res.render('list', {listTitle:day, newListItems:items});
    
})

app.get('/work',function(req,res){

    res.render('list',{listTitle:'Work', newListItems:workItems})
})

app.get('/about',function(req,res){
    res.render('about')
})

app.post('/', function(req,res){
    
    if(req.body.list === 'Work'){
        const item = req.body.newItem
        workItems.push(item)
        res.redirect('/work')
    } else {

        const item = req.body.newItem;
        items.push(item)
       
        res.redirect('/')
    }

    
})

// app.post('/work',function(req,res){
//     let item = req.body.newItem
//     workItems.push(item)
//     res.redirect('/work')
// })



app.listen(3001,function(){
    console.log('server started on port 3001');
})
