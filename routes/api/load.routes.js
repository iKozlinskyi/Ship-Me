const loadService = require('../../service/loadService');
const express = require('express');
const {NEW} = require('../../constants/loadStatuses');
const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const loads = await loadService.findByCreatedUserId(userId);

  res.json({loads});
});

router.post('/', async (req, res) => {
  const load = {
    ...req.body,
    createdBy: req.user._id,
    status: NEW,
  };

  try {
    const savedLoad = await loadService.save(load);

    res.status(201).json(savedLoad);
  } catch (err) {
    return res.status(400).json({error: 'wrong request format'});
  }
});

module.exports = router;
