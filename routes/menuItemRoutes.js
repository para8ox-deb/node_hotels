const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');



// Handling MenuItem POST and GET

router.post('/', async (req,res)=>{
    try{
        const data = req.body  // Assuming the request body contains the menu data

        // Create a new menu document using the Mongoose model
        const newMenu = new MenuItem(data);

        // Save the new order to the database

        const response = await newMenu.save()
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.get('/', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})





// Creating parameterized endpoint i.e. localhost:3000/menu/sour - So to handle such cases we are doing this 

router.get('/:tasteType', async(req,res)=>{
    try{
        const tasteType = req.params.tasteType; // extracting the taste from the url parameter
        if(tasteType == 'Sweet' || tasteType=="Spicy" || tasteType =="Sour"){
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error: "Invalid Taste Type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})



// Update Operation

router.put('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id;
        const newMenuData = req.body;   // extract the data that client sends i.e. new updated data

        const response = await MenuItem.findByIdAndUpdate(menuId, newMenuData, {
            new: true,
            runValidators: true 
        });

        if(!response){
            return res.status(404).json({error: "MenuItem not found"});
        }

        console.log('Data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})





// Delete operation

router.delete('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id; // extracting the id frm the url parameter

        // MenuItem is the model name
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: "Menu Item not Found"});
        }

        console.log("Data deleted");
        res.status(200).json({message: "Menu Item deleted successfully"});
    } catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})




module.exports = router;