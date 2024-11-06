import ContactModel from "../models/contact.model.js";

/**
 * @desc Get all contacts
 * @Route GET /api/contacts
 * @Access Public
 */

const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find();

    res.status(200).json({
      success: true,
      message: "Retrived",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * @desc Get a contact
 * @Route GET /api/contacts/:id
 * @Access Public
 */

const getContact = async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `The contact with id of ${id} was not found` });
    }

    res.status(200).json({
      success: true,
      message: "Retrived",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Create a contact
 * @Route POST /api/contacts
 * @Access Public
 */

const createContact = async (req, res) => {
  try {
    const { name, email, type } = req.body;

    if (!name || !email || !type) {
      return res.status(400).json({
        success: false,
        message: "name or email or type are required",
      });
    }
    const contact = await ContactModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Created",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Update a contact
 * @Route PUT /api/contacts/:id
 * @Access Public
 */

const updateContact = async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `The contact with id of ${id} was not found` });
    }

    const updatedContact = await ContactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      message: "Created",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Delete a contact
 * @Route DELETE /api/contacts/:id
 * @Access Public
 */

const deleteContact = async (req, res) => {
  try {
    const contact = await ContactModel.findById(req.params.id);

    if (!contact) {
      return res
        .status(404)
        .json({ message: `The contact with id of ${id} was not found` });
    }

    await ContactModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Deleted",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export { getContacts, getContact, createContact, updateContact, deleteContact };
