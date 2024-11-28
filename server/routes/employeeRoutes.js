const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Employee = require('../models/Employee');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Multer Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'employees' },
});
const upload = multer({ storage });

// Create Employee
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file.path;
    const newEmployee = await Employee.create({ name, email, mobile, designation, gender, course, image });
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
// console.log('Request body:', req.body);
// console.log('Uploaded file:', req.file.path);
});

// Get Employees
router.get('/', authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});


router.put('/:id',authMiddleware , upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;
    const updates = { name, email, mobile, designation, gender, course };

    if (req.file) {
      // Assuming you're using Cloudinary for image upload
      updates.image = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update employee" });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Getting the employee ID from the URL
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});


module.exports = router;