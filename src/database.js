import { MongoClient, ServerApiVersion } from 'mongodb';


const PASSWORD = "LeNTt2gPR6SHjkUH"
const uri = `mongodb+srv://admin:${PASSWORD}@cluster0.wys8meo.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb://0.0.0.0:27017`;

const client = new MongoClient(uri, {
  serverApi: {version: ServerApiVersion.v1, deprecationErrors: true}
});



export default async function connection(){
    await client.connect();
    console.log("base de datos conectada");
    return client.db("crud")
}