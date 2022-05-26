

const express=require('express')

const mysql=require('mysql2')

const app=express()

const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:true}));

// Create a connex=ction to mysql server

const db=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'vidit',
    database:'nodesql'
})


// Connect
db.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log('Mysql connected..')
})


// app.get('/addrow',(req,res)=>{
//     let sql='INSERT INTO posts(id,title,body) VALUES (2,"Second post","HELLO EVERYONE, THIS IS MY Second POST HERE")'

//     db.query(sql,(err)=>{
//         if(err)
//         console.log(err)
//         else
//         res.send('New row created..')
//     })
// })


// app.get('/getallposts',(req,res)=>{
//     let sql='SELECT * FROM posts'

//     let query=db.query(sql,(err,results)=>{
//         if(err)
//         console.log(err)
//         else
//         {
//         res.send(results)
//         console.log(results[0])
//         }
//     })
   
// })

// app.get('/getpost/:id',(req,res)=>{
//     let sql='SELECT * FROM posts WHERE id= ${req.params.id}'

//     let query=db.query(sql,(err)=>{
//         if(err)
//         console.log(err)
//         else
//         res.send('REQUIRED POST ..')
        
//     })
//     console.log(res)
// })

//form data
//save form data 


app.listen(process.env.PORT||9000,()=>{
    console.log('Server started at port 9000')
})








app.get('/posts', (req, res) => {

    const url='SELECT * FROM posts'

    db.query(url, (err, rows) => {
        if (!err)
            res.send(rows);
            
        else
            console.log(err);
    })
});

app.get('/posts/:is', (req, res) => {

    const url='SELECT * FROM posts WHERE id = ?'
   db.query(url, [req.params.is], (err, rows) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
            
    })
});


app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @Name = ?;SET @Country = ?; \
    CALL EmployeeAddOrEdit(@id,@Name,@Country);";
    db.query(sql, [emp.id, emp.Name, emp.Country], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].id);
            });
        else
            console.log(err);
    })
});


app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @id = ?;SET @Name = ?;SET @Country = ?; \
    CALL EmployeeAddOrEdit(@id,@Name,@Country);";
    mysqlConnection.query(sql, [emp.id, emp.Name, emp.Country], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});