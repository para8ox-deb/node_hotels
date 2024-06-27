const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


// POST route to add a person
router.post('/', async (req,res) =>{

    try{
        const data = req.body  // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
        

        // Below method is also right and is used to save data but if we have many fields so it is very slow, that's why we can directly pass data to person like done above.

        // newPerson.name = data.name; 
        // newPerson.age = data.age;
        // newPerson.mobile = data.mobile;


        // Save the new person to the database

        const response = await newPerson.save()
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})



// GET method to get the person
router.get('/', async (req,res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})




// Creating parameterized endpoint i.e. localhost:3000/person/manager - So to handle such cases we are doing this 

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType; // Extract the work type from the URL parameter

        if(workType == 'chef' || workType == 'manager' || workType=='waiter'){

            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);

        }
        else{
            res.status(404).json({error: "Invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



// Update Operation
// Which record to update and what exactly to update

// For update we can use any PUT or PATCH, we will use PUT

// In our collection, the most unique is _id or document id or id that mongo automatically puts with each field or data


router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL paramter
        const updatedPersonData = req.body; // Extract the data which client sends for updation

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document 
            runValidators: true, //run mongoose validation 
        });

        if(!response){
            return res.status(404).json({error: "Person not found"});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// NOTE - above /:id so here id is variable, in which the client will send the data and it will be stored in this id, so instead of id we can use any name like aakash, person_id anything.


// Delete operation

router.delete('/:id',  async (req,res)=>{
    try{
        const personId = req.params.id; // extract he id from the url parameter

        //Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})






module.exports = router;