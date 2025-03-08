const {Promotion, promotions} = require("../models/promotion.js")

const getPromotion = (req, res) => {
    res.json(promotions);
}

const addPromotion = (req, res) => {
    const {category, description, discount} = req.body;
    
    if (!category || !description || discount === undefined || discount === null || discount === 0 || !discount) {
        return res.status(400).json({ msg: "Все поля должны быть заполнены" });
    }

    const maxId = Math.max(...promotions.map(promotion => promotion.id));
    console.log(...promotions)
    console.log(maxId);

    const newPromotion = new Promotion(maxId + 1, category, description, discount);
    promotions.push(newPromotion);
    res.status(201).json(newPromotion);
}

const getPromotionById = (req, res) => {
    const idToFind = parseInt(req.params.id);
    const promotion = promotions.find(p => p.id == idToFind);
    if(promotion){
        res.json(promotion);
    }
    else{
        res.status(404).json({msg:"promotion not found"});
    }
}

const updatePromotion = (req, res) => {
    const idToFind = parseInt(req.params.id);
    const promotion = promotions.find(p => p.id == idToFind);
    if(promotion){
        const {category, description, discount} = req.body;

        if (category === "" || description == "" || discount === undefined || discount === "" ) {
            return res.status(400).json({ msg: "Все поля должны быть заполнены" });
        }

        promotion.category = category;
        promotion.description = description;
        promotion.discount = discount;
        res.json(promotion);
    }
    else{
        res.status(404).json({msg:"promotion not found"});
    }
}

const deletePromotion = (req, res) => {
    const idToDel = parseInt(req.params.id);
    const promotionInd = promotions.findIndex(p => p.id == idToDel);
    if(promotionInd !== -1){
        promotions.splice(promotionInd, 1);
        res.status(204).send();
    }
    else{
        res.status(404).json({msg:"promotion not found"})
    }
}

module.exports = {getPromotion, getPromotionById, addPromotion, updatePromotion, deletePromotion}