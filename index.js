let express=require('express');
let app=express();
let port=1995;
let mongoose=require('mongoose');
app.use(express.json());
mongoose.connect('mongodb+srv://gopinathcs2:12345@cluster0.2v5seyj.mongodb.net/?appName=Cluster0').then(()=>{
console.log('db connect');
}).catch((err)=>{
    console.log(err)
})

let collection=mongoose.model('employee',{
    emp_name:String,emp_id:Number,emp_age:Number
})

app.get("/",async(req,res)=>{
    let data=await collection.find()
    res.status(200).json({message:data})
})

app.post("/",async(req,res)=>{
    try {
        let {emp_name,emp_id,emp_age}=req.body;
        let data=new collection({emp_name,emp_id,emp_age});
        console.log(data)
        await data.save();
        res.status(201).json({msg:"data saved",data})
    } catch (error) {
        res.status(500).json({msg:"Internal error",error})
    }
})

app.get("/user/:id",async(req,res)=>{
    try {
        let {id}=req.params;
        let data=await collection.findById(id)
        if(!data){
            res.status(404).json({msg:"No data found"})
        }
        else{
            res.status(200).json({msg:data})
        }
    } catch (error) {
        res.status(500).json({msg:"Internal error",error})
    }
})

app.delete("/user/:id",async(req,res)=>{
    try {
        let {id}=req.params;
        let data=await collection.findByIdAndDelete(id)
        res.status(200).json({msg:"deleted"})
    } catch (error) {
        res.status(500).json({msg:"Internal error",error})
    }
})

app.put("/:id",async(req,res)=>{
    try {
        let {id}=req.params;
        let {emp_name,emp_id,emp_age}=req.body
        let data=await collection.findByIdAndUpdate(id,{emp_name,emp_id,emp_age});
        console.log(data);
        res.status(200).json({msg:"Data updated!!!"})
    } catch (error) {
        res.status(500).json({msg:"Internal error",error})   
    }
})

app.listen(port,()=>{
    console.log('Server Running On',port)
})
