import { MongoClient } from 'mongodb';
import express from 'express';
const app=express();
app.use(express.json());
const PORT=9000;
// const MONGO_URL="mongodb://localhost";
const MONGO_URL="mongodb+srv://pavan:12345@cluster0.2yq7c.mongodb.net";
async function createConnection(){
    const client= new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb connected successfully");
    return client;
    // const movie = await client.db("first").collection("movies").findOne({id:"102"});
    // console.log(movie);

}
// createConnection();    
app.get("/",(request,response)=>{
    response.send("Hello 🌎");
    
});
app.get("/movies",(request,response)=>{
    response.send(movies);
    
});

app.get("/movies/:id",async(request,response)=>{
    const { id } = request.params; 
    // const mov = movies.find((mv)=>mv.id===id);
    // response.send( mov ? mov : {message:"No match"});
    const client = await createConnection();
    const mov = await client.db("first").collection("movies").findOne({id:id});

    response.send( mov || {message:"No match"});
});
// app.get("/movies/:language",(request,response)=>{
//     const { language } = request.query; 
//     // response.send( mov ? mov : {message:"No match"});
//     response.send( movies.filter((mv1)=>mv1.language===language));
// });
//create movies
app.post("/movies", async (request,response)=>{
    const data=request.body;

    console.log(data);
    
    const client = await createConnection();

    const result = await client.db("first").collection("movies").insertMany(data);

    response.send(result);

    
});


const movies=[
    
    {
      id:"101",  
      name: "Bahubali_2",
      poster: "https://m.media-amazon.com/images/I/711eHgGtnFL._SL1209_.jpg",
      rating: 8.6,
      summary: `Bahubali 2: The Conclusion is a 2017 Indian epic action film directed by S. S. Rajamouli, 
      cond cinematic part in the Baahubali franchise, it is the follow-up to Baahubali.`,
      trailer:"https://www.youtube.com/embed/qD-6d8Wo3do",
      language:"english",
    },
    {
      id:"102",
      name: "GabbarSingh", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Gabbar_singh_poster.jpg/220px-Gabbar_singh_poster.jpg",
      rating: 9.0,
      summary: `Gabbar Singh is a 2012 Indian Telugu-language action comedy film directed by Harish Shankar and produced by Bandla Ganesh.`,
      trailer:"https://www.youtube.com/embed/FpFoQPj4sgs",
      language:"telugu",
    },
    {
      name: "Varudu Kavalenu",
      poster: "https://www.filmibeat.com/img/190x100x237/popcorn/movie_posters/varudukaavalenu-20210413173327-19669.jpg",
      rating: 7.0,
      summary: `Varudu Kaavalenu ( transl. Groom wanted) is a 2021 Indian Telugu-language romantic comedy film directed by debutant Lakshmi Sowjanya and produced by.`
    },
    {
      name: "Dybbuk",
      poster: "https://timesofindia.indiatimes.com/thumb/87282580.cms?width=219&height=317&quality=80&imgsize=11450",
      rating: 8.5,
      summary: `In Jewish mythology, a dybbuk is a malicious possessing spirit believed to be the dislocated soul of a dead person. It supposedly leaves the host body once it has accomplished its goal, sometimes after being exorcised.`
    },
    {
      name: "Avengers",
      poster: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
      rating: 10.0,
      summary: `Marvel's The Avengers (classified under the name Marvel Avengers Assemble in the United Kingdom and Ireland), or simply The Avengers, is a 2012 American superhero film based on the Marvel Comics superhero team of the same name.`
    },
    {
      name: "Nethrikann", poster: "https://static.toiimg.com/photo/msid-85172504/Netrikann.jpg?85172504",
      rating: 7.5,
      summary: `Netrikann is an 2021 Indian Tamil-language crime thriller film, a remake of the 2011 South Korean film Blind. It centres around a blind police officer in search of a serial killer The film is directed by Milind Rau and produced by Vignesh Shivan under the banner of Rowdy Pictures.`
    }
  ];

  

app.listen(PORT, ()=>console.log("App started at ",PORT));