const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(err => {
            res.status(500).json({ error: "Somethin' went wrong, bucko." })
        })
})

//---------------------------------------------------------------------------------------------

router.get("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if (account) {
                res.status(200).json({ data: account });
            } else {
                res.status(404).json({ error: "Account with provided ID not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Somethin' went wrong, bucko" })
        })
})

//---------------------------------------------------------------------------------------------

router.post("/", (req, res) => {
    const info = req.body
    if(isValidPost(info)) {
        db("accounts")
            .insert(info, "id")
            .then(ids => {
                res.status(201).json({ data: ids })
            })
            .catch(err => {
                res.status(500).json({ error: "Somethin' went wrong, bucko" })
            })
    } else {
        res.status(400).json({ message: "please provide name and budget" })
    }
})

function isValidPost(post){
    return Boolean(post.name && post.budget)
}

//---------------------------------------------------------------------------------------------

router.put("/:id", (req, res) => {
    const changes = req.body;
    db("accounts")
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if(count > 0){
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ message: "ID not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ messages: err.message })
        })
})

//---------------------------------------------------------------------------------------------

router.delete("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ error: "ID not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: error.message })
        })
})



module.exports = router;