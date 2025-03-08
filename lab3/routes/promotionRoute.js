const express = require('express');
const router = express.Router();
const promotionController = require("../controllers/controller.js");

router.get('/promotions', promotionController.getPromotion);
router.get('/promotions/:id', promotionController.getPromotionById);
router.post('/promotions', promotionController.addPromotion);
router.put('/promotions/:id', promotionController.updatePromotion);
router.delete('/promotions/:id', promotionController.deletePromotion);

module.exports = router;