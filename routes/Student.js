const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/student');

//──── POST Http Methods ─────────────────────────────────────────────────────────────────
//POST /api/students
router.post('/students', StudentController.Create);

// GET /api/students
router.get('/students', StudentController.Read);

// PUT /api/students
router.put('/students/:studentid', StudentController.Edit);

// DELETE /api/students
router.delete('/students/:studentid', StudentController.Delete);

module.exports = router;