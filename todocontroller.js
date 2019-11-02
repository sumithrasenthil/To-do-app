var bodyParser=require('body-parser');
var mongoose=require('mongoose');
mongoose.connect('mongodb+srv://todo:todo@todo-c44jy.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true } ,function(){console.log('Db connected!!!')});

//creating  a schema
var todoschema =new mongoose.Schema({
    item:String
});

var Todo=mongoose.model('Todo',todoschema)
// var itemOne =Todo({item:'buy Sweets'}).save(function(err){
//     if(err) throw err;
//
//     console.log('item saved');
// });;
//var data=[{item:'Walk'},{item:'Eat'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports=function(app){
    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo',{todoes:data});
        });
    });
    app.post('/todo', urlencodedParser,function(req,res){
        var newTodo =Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).deleteOne(function(err, data){
            if (err) throw err;

            res.json({todoes:data});

        });


    });
};