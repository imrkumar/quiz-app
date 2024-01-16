let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let app = express();
let port = 9090;
let connectionString = "mongodb://127.0.0.1:27017";

//default route
app.get('/',(req,res)=>{
    res.json({
        "message":"Welcome to quiz King"
    })
})

// add quiz question route
app.post("/question", (req, res) => {
    let question = req.body.question;
    let optionA = req.body.optionA;
    let optionB = req.body.optionB;
    let optionC = req.body.optionC;
    let optionD = req.body.optionD;
    let answer = req.body.answer;
    
    let data = {
      question: question,
      options:[
        optionA,optionB,optionC,optionD
      ],
      answer: answer
    };
    mongoClient.connect(connectionString, (err, clientObject) => {
      if (!err) {
        let dbo = clientObject.db("QuizApp");
        dbo.collection("questions").insertOne(data, (err, result) => {
          if (!err) {
            console.log("record inserted");
          }
        });
      }
    });
    res.send("data received successfully");
  });












app.listen(port,(err)=>{
    if(err) console.log(err);
    else{
        console.log(`Server is listening to ${port}`);
    }
})