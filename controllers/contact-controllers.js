const asyncHandler = require("express-async-handler");
const ContactModel = require("../models/contact-model");

// Get all contacts
// route GET : /api/contacts
// access: private
const getAllContacts = async (req, res) => {
    try{
        const contacts = await ContactModel.find({ userId: req.user.id });   
        res.status(200).json(contacts)
    }catch(error){
        throw error;
    }
}


// Get individual contacts
// route GET : /api/contacts/:id
// access: private
const getIndividualContact = asyncHandler(async (req, res) => {
    try{
        const contacts = await ContactModel.findById(req.params.id);

        if(!contacts || contacts.userId.toString() !== req.user.id){
            res.status(404);
            throw new Error("Contact not found");
        }

        res.status(200).json(contacts);
    }catch(error){
        throw error;
    }
});


// create new contact
// route POST : /api/contacts
// access: private
const createNewContact = async(req, res) => {
    
    const { name, gender, email, phone } = req.body;

    if(!name || !gender || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory");
    }

    try{
        const create = await ContactModel.create({
            name,
            gender,
            email,
            phone,
            userId: req.user.id
        })

        res.status(201);
        res.json(create);

    }catch(error){
        throw error;
    }
};


// update contact
// route PUT : /api/contacts/:id
// access: private
const updateContact = asyncHandler(async (req, res) => {

    try{
        const contacts = await ContactModel.findById(req.params.id);

        if(!contacts || contacts.userId.toString() !== req.user.id){
            res.status(404);
            throw new Error("Contact not found");
        }

        const updateContact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateContact);
    }catch(error){
        throw error;
    }
});


// delete contact
// route DELETE : /api/contacts/:id
// access: private
const deleteContact = asyncHandler(async (req, res) => {
    try{
        const contacts = await ContactModel.findById(req.params.id);

        if(!contacts || contacts.userId.toString() !== req.user.id){
            res.status(404);
            throw new Error("Contact not found");
        }

        await ContactModel.deleteMany({ _id: req.params.id });
        res.status(200).json(contacts);
    }catch(error){
        throw error;
    }
});

module.exports = { getAllContacts, getIndividualContact, createNewContact, updateContact, deleteContact };