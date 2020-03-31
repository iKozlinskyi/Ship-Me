const loadService = require('../../service/LoadService');
const express = require('express');
const {USER_LACKS_AUTHORITY} = require('../../constants/errors');
const {NEW} = require('../../constants/loadStatuses');
const router = express.Router();

router.param('loadId', async (req, res, next) => {
  const {loadId} = req.params;
  const shipper = req.user;

  try {
    req.load = await loadService.findById(loadId);
    if (!loadService.hasUserAuthorityForLoad(shipper, req.load)) {
      return res.status(403).json({error: USER_LACKS_AUTHORITY});
    }
    next();
  } catch (err) {
    // TODO: wrong status codes - unauthorized error can also be triggered
    return res.status(404).json({error: err.message});
  }
});

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const loads = await loadService.findByCreatedUserId(userId);

  res.json({loads});
});

router.get('/:loadId', async (req, res) => {
  res.json({load: req.load});
});

router.post('/', async (req, res) => {
  const load = {
    ...req.body,
    createdBy: req.user._id,
    status: NEW,
  };

  try {
    const savedLoad = await loadService.processNewLoad(load);

    res.status(201).json(savedLoad);
  } catch (err) {
    return res.status(400).json({error: err.message});
  }
});

router.delete('/:loadId', async (req, res) => {
  try {
    await loadService.remove(req.load);
    res.json({status: 'Load successfully removed'});
  } catch (err) {
    res.status(403).send({error: err.message});
  }
});

router.put('/:loadId', async (req, res) => {
  const load = req.load;
  const editedLoadData = req.body;

  try {
    const editedLoad = await loadService.update(load, editedLoadData);

    res.status(201).json(editedLoad);
  } catch (err) {
    return res.status(403).json({error: err.message});
  }
});

module.exports = router;
