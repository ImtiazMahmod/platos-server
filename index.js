
const { getFirestore, collection, addDoc,getDoc, getDocs, updateDoc, doc, setDoc, deleteDoc } = require("firebase/firestore");

const  initApp = require( "./firebase.init");

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
var cors = require("cors");
const { async } = require("@firebase/util");

app.use(cors());
app.use(express.json());




async function run() {
    try { 
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(initApp);
        // console.log(db);
        
        // /////Pizza API //////////
        
    const pizzaCollection = collection(db, "pizzas")   
   
    // add pizza
        app.post("/addPizza", async (req, res) => {
            const newPizza = req.body
                    
                const result = await addDoc(pizzaCollection, newPizza)
            console.log(result);
            
            res.json(result)
    })    
     
        // load all pizza
        app.get("/getPizza", async (req, res) => {       
         const pizza = []
                const result = await getDocs(pizzaCollection)
            result.forEach(doc => {

            //   id add in pizza doc
                const id = doc.id

                const data = { id, ...doc.data() };
                
            pizza.push(data);
            })
            // console.log(pizza);       
            
            res.json(pizza)
        }) 
        // load a pizza
        app.get("/getAPizza/:id", async (req, res) => {       

            const id = req.params.id
            let data
            console.log(id);
                   const result = await getDocs(pizzaCollection)
               result.forEach(doc => {
   
                   if (doc.id === id) {
                    data = (doc.data());
               }
               })
                   
               
               res.json(data)
           }) 
        // update a pizza
        app.put("/updatePizza/:id", async (req, res) => {
            const id = req.params.id
            console.log(id);
            const newPizza = req.body
            console.log(newPizza);
            const docRef = doc(db, "pizzas", id)
                   await updateDoc(docRef, newPizza)
               
                     
               
            //    res.json("pizza")
       }) 
        // delete a pizza
        app.delete("/deletePizza/:id", async (req, res) => {
            const id = req.params.id
            console.log(id);
            
                const result =   await deleteDoc(doc(db, "pizzas", id))
               
                     console.log(result);
               
               res.json(result)
        }) 
        

        /////////// burger api ///////////

        const burgerCollection = collection(db, "burgers")   
   
    // add burger
        app.post("/addBurger", async (req, res) => {
            const newBurger = req.body
                    
                const result = await addDoc(burgerCollection, newBurger)
            console.log(result);
            
            res.json(result)
    })    
     
        // load all Burger
        app.get("/getBurger", async (req, res) => {       
         const burger = []
                const result = await getDocs(burgerCollection)
            result.forEach(doc => {

            //   id add in Burger doc
                const id = doc.id

                const data = { id, ...doc.data() };
                
            burger.push(data);
            })
            // console.log(burger);       
            
            res.json(burger)
        }) 
        // load a burger
        app.get("/getABurger/:id", async (req, res) => {       

            const id = req.params.id
            let data
            console.log(id);
                   const result = await getDocs(burgerCollection)
               result.forEach(doc => {
   
                   if (doc.id === id) {
                    data = (doc.data());
               }
               })
                   
               
               res.json(data)
           }) 
        // update a Burger
        app.put("/updateBurger/:id", async (req, res) => {
            const id = req.params.id
            console.log(id);
            const newBurger = req.body
            console.log(newBurger);
            const docRef = doc(db, "burgers", id)
                   await updateDoc(docRef, newBurger)
               
                     
               
            //    res.json("Burger")
       }) 
        // delete a Burger
        app.delete("/deleteBurger/:id", async (req, res) => {
            const id = req.params.id
            console.log(id);
            
                const result =   await deleteDoc(doc(db, "burgers", id))
               
                     console.log(result);
               
               res.json(result)
        }) 
        
    }
    catch {
        
    }finally {
        
      }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server OK");
});

app.listen(port, () => {
  console.log(`my port is `, port);
});
