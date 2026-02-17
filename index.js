import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const app = express();
const PORT = 7000;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


app.get('/Valence', async (req, res)=> {
    try {
      await client.connect();
      const db = client.db("Hotels");
      const Valence = db.collection("Valence")
      const lista = await Valence.find({}).toArray();
      res.json({success: true, data: lista})  
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }finally{
        await client.close();
    }
})

app.listen(PORT, () =>{
    console.log(`your port is http://localhost:${PORT}`)
})
