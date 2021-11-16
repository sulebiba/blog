const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homestartingcontent = "Lacas hhj dhhjjdjdchjchjchjcdjcc hcdcjcjdhcjhdcjdccjhc dhcjccjhhdchjchjc dchccjdhcjdjhcdhdhc";
const aboutcontent = "about bcghgxggxccghghcxhgx ggcxghxhghgxcghxcghxcghghc gxcghghxcghghxcghghxcghc gxhgxcghxcghcxghxcghgh";
const contactcontent = "contact hshjhshjhdhjsdhjsdj dhjhjsdhsh bnbbncbnnbbnxbn jxhjjhhxjhjhc jjkjkjkxjkjjkcjk jxcjkjcxjkjkk";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req,res){
  res.render("home",{homestartingcontent:homestartingcontent,
                    posts:posts});
  
});

app.get("/contact", function(req,res){
    res.render("contact",{contactcontent:contactcontent});
});

app.get("/about", function(req,res){
  res.render("about",{aboutcontent:aboutcontent});  
});

app.get("/compose", function(req,res){
    res.render("compose")
});

app.post("/compose", function(req,res){
   
   const post = {title:req.body.title,
              posttitle:req.body.posttitle};
    
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postname", function(req,res){
  const requesttitle = _.lowerCase(req.params.postname); 
  posts.forEach(function(post){
      const storedtitle = _.lowerCase(post.title);
      if(requesttitle === storedtitle){
          res.render("post", {
              title: post.title,
              posttitle: post.posttitle
          });
      }
  });
});

app.listen(3000, function(){
    console.log("Server Started at Port 3000");
});