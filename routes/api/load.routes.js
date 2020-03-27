const loadService = require('../../service/LoadService');
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
    const savedLoad = await loadService.createLoad(load);

    res.status(201).json(savedLoad);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
});

module.exports = router;
