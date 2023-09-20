const express = require('express')
const { ObjectId } = require("mongodb");
const {DBconnects} = require("../mongoDB");
const router = express.Router()

router.get("/", async (req, response) => {
    try {
      const data = await DBconnects();
      const resilt = await data.find().toArray()
  
      return response.status(200).json({
        count: resilt.length,
        data: resilt,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
router.get("/:id", async (req, response) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return response.status(400).json({ message: "Invalid ID format" });
        }
        const data = await DBconnects();
        const result = await data.findOne({ _id: new ObjectId(id) });
        if (!result) {
          return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).json(result);
      } catch (error) {
        response.status(500).send({ message: error.message });
      }
    });
    
router.put("/:id", async (request, response) => {
      try {
        if (
          !request.body.title ||
          !request.body.author ||
          !request.body.publishyear
        ) {
          return response.status(400).send({
            message: "Send all required fields: title, author, publishyear",
          });
        }
        const { id } = request.params;
        const data = await DBconnects();
        const updateQuery = {
          $set: {
            title: request.body.title,
            author: request.body.author,
            publishyear: request.body.publishyear,
          },
        };

        const result = await data.updateOne({ _id: new ObjectId(id) }, updateQuery);
    
        if (result.matchedCount === 0) {
          return response.status(404).json({ message: "Book not found" });
        }
    
        return response.status(200).send({ message: "Book updated successfully" });
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }
  });
  
router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const data = await DBconnects();
      const result = await data.deleteOne({ _id: new ObjectId(id)});
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishyear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishyear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishyear: request.body.publishyear,
      };
      const data = await DBconnects();
      const book = await data.insertOne(newBook);
      console.log("created book on server ",book); 
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  
module.exports = router