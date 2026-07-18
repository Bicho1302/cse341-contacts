const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await getDb()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve contacts"
    });
  }
});

// GET contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = await getDb()
      .collection("contacts")
      .findOne({
        _id: new ObjectId(contactId)
      });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve contact"
    });
  }
});

// POST create contact
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const result = await getDb()
      .collection("contacts")
      .insertOne({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
      });

    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create contact."
    });
  }
});

// PUT update contact
router.put("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !favoriteColor ||
      !birthday
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const result = await getDb()
      .collection("contacts")
      .replaceOne(
        {
          _id: new ObjectId(contactId)
        },
        {
          firstName,
          lastName,
          email,
          favoriteColor,
          birthday
        }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update contact."
    });
  }
});
// DELETE contact
router.delete("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const result = await getDb()
      .collection("contacts")
      .deleteOne({
        _id: new ObjectId(contactId)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Contact not found."
      });
    }

    res.sendStatus(204);

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete contact."
    });
  }
});

module.exports = router;