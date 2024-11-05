import express from "express";
const router = express.Router();

let contacts = [
  {
    id: 1,
    title: "Contact One ",
  },
  {
    id: 2,
    title: "Contact Two ",
  },
  {
    id: 3,
    title: "Contact Three ",
  },
];

router.get("/", (req, res) => {
  return res.status(200).json(contacts);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    res
      .status(404)
      .json({ message: `The contact with id of ${id} was not found` });
  } else {
    res.status(200).json(contact);
  }
});

router.post("/", (req, res) => {
  const { title } = req.body;

  const newContact = {
    id: contacts.length + 1,
    title,
  };

  if (!newContact.title) {
    return res.status(400).json({ msg: "Please add a title " });
  }

  contacts.push(newContact);

  res.status(201).json(contacts);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `The contact with id of ${id} was not found` });
  }

  contact.title = req.body.title;

  res.status(200).json(contacts);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `The contact with id of ${id} was not found` });
  }

  contacts = contacts.filter((contact) => contact.id !== id);

  res.status(200).json(contacts);
});

export default router;
