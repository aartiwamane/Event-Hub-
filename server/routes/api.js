const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Events = require('../models/events');
const Specialevents = require('../models/specialevents')
const Admission = require('../models/admission')

mongoose.connect('mongodb+srv://aarti_wamane:Aarti2204@cluster0.ubalotp.mongodb.net/eventhub?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));


function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

// Public events
  router.get('/events', async (req, res) => {
  try {
    const events = await Events.find();  //  Fixed
    res.json(events);
  } catch (err) {
    console.error(" Error fetching events:", err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});


// Protected special events

router.get('/special', verifyToken, async (req, res) => {
  try {
    const specialEvents = await Specialevents.find(); //  Fixed
    res.json(specialEvents);
  } catch (err) {
    console.error(" Error fetching special events:", err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Admin") && (userData.password == "Admin@123")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

router.post('/admissions', async (req, res) => {
  try {
    const newAdmission = new Admission(req.body);
    await newAdmission.save();
    res.status(200).json({
      message: ' Admission saved successfully!',
      data: newAdmission
    });
  } catch (err) {
    console.error(' Error saving admission:', err);
    res.status(500).json({ message: ' Failed to save admission', error: err });
  }
});

module.exports = router;