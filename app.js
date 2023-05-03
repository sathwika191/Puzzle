const express = require('express');
const app = express();
const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
var path=require('path');
const serviceAccount = require('./key.json')

initializeApp({
    credential: cert(serviceAccount)
});

app.use(express.static(path.resolve('./public')));
const db=getFirestore();
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index');
});
c=0;

app.get('/signin', (req, res) => {
    res.render('signin');
  });


app.get('/signinsubmit',(req,res)=>{

  const email=req.query.email;
    const password=req.query.pwd;

    db.collection('players').add({
      
      email:email,
      password:password
    }).then(() =>{
      res.render("p2");
    })
});

app.get('/p2submit', (req, res) => {
  c=c+1
  res.render('p4');
});
app.get('/p4submit', (req, res) => {
  const answer=req.query.answer;
  console.log(answer);
  if(answer=="future"){
  res.render('p5');
  c=c+1;}
  else{
    res.render('fail');
  }
});
app.get('/p5submit', (req, res) => {
  const ans=req.query.ans;
  console.log(ans);
  if(ans=="fire"){
  res.render('p1');
c=c+1;}
  else{
    res.render('fail');
  }
 
});

app.get('/p1submit', function(req, res) {
  c=c+1;
  res.render('p3');
  
});

app.get('/p3submit', (req, res) => {
  const object=req.query.object;
 
  if(object=="map"){
    c=c+1;
  res.render('success',{message:c});}
  else{
    res.render('fail');
  }
 
});

app.get('/failsubmit', (req, res) => {
  res.render('p2');
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
