const express = require("express");
const { getAllContacts, getIndividualContact, createNewContact, updateContact, deleteContact } = require("../controllers/contact-controllers");
const validateTokenHandler = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateTokenHandler);

// get all contacts
router.route("/").get(getAllContacts);

// get individual contacts
router.route("/:id").get(getIndividualContact);

// create new contact
router.route("/").post(createNewContact);

// update contact
router.route("/:id").put(updateContact);

// delete contact
router.route("/:id").delete(deleteContact);

module.exports = router;