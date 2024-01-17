const express=require("express");
const app=express();
const {MongoClient}=require("mongodb");

app.use(express.json())
app.get("/",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    const client=new MongoClient(url);

    client.connect().then(()=>{
        const dbname=client.db("paramshah");
        const collection=dbname.collection("paramdata");
        return collection.findOne({ password: "27062004" });
    }).then((data)=>{

        res.send(data)
    }).then(()=>{
        client.close()
    })
});

app.post("/",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    const client=new MongoClient(url);

    client.connect().then(()=>{
        const dbname=client.db("paramshah");
        const collection=dbname.collection("paramdata");
        return collection.insertOne(req.body)

    }).then((data)=>{
        res.send(data)
    }).then(()=>{
        client.close();
    })
})

app.put("/",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    const client=new MongoClient(url);

    client.connect().then(()=>{
        const dbname=client.db("paramshah");
        const collection=dbname.collection("paramdata");
        return collection.updateOne(
            {email:"dayaCID@123"},
            {$set:{"email":req.body.email}}
        )
    }
)
    res.send(req.body)
    console.log(req.body.email)
})

app.delete("/",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    const client=new MongoClient(url);

    client.connect().then(()=>{
        const dbname=client.db("paramshah");
        const collection=dbname.collection("paramdata");
        collection.deleteOne({email:req.body.email})
    }).then(()=>{
        console.log(`data deleted`)
    })
})

app.listen(3000)