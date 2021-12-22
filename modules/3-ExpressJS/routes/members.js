const express = require('express');
const router = express.Router();
const dbo = require('../db/conn');
const {ObjectId} = require('mongodb');

router.get('/', async (req, res) => {
    const dbConnect = dbo.getDb();
    try {
        const members = await dbConnect.collection('members').find().toArray();
        res.json(members);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
})

// Get member by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dbConnect = dbo.getDb();
        let members = await dbConnect.collection('members').find({ _id: ObjectId(id) }).toArray();
        res.json(members);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

// Create member
router.post('/', async (req, res) => {
    const member = {
        ...req.body,
        status: 'active'
    }
    try {
        const dbConnect = dbo.getDb();
        const jutu = await dbConnect.collection('members').insertOne(member);

        const members = await dbConnect.collection('members').find().toArray()
        //res.json(members);
        res.redirect('/');
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

// Update member
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dbConnect = dbo.getDb();
        if (id)
            await dbConnect.collection('members').updateOne({ _id: ObjectId(id) }, {$set:{name: req.body.name, email: req.body.email}});
        else
            res.send("Couldn't find id");
        const members = await dbConnect.collection('members').find().toArray()
        res.json(members);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

// Selete member
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dbConnect = dbo.getDb();
        if (id)
            await dbConnect.collection('members').deleteOne({ _id: ObjectId(id) });
        else
            res.send("Couldn't find id");
        const members = await dbConnect.collection('members').find().toArray()
        res.json(members);
    }
    catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;