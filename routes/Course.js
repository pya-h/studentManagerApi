const express = require('express');
const courseController = require('../controllers/course');

const router = express.Router();
router.post(
    '/:studentid/courses',
    courseController.Create
);

router.get('/:studentid', courseController.Read);

router.put('/:studentid/:courseid', courseController.Edit);

router.delete('/:studentid/:courseid', courseController.Delete);

module.exports = router;