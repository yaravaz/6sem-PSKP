class Promotion{
    constructor(id, category, description, discount){
        this.id = id,
        this.category = category,
        this.description = description,
        this.discount = discount
    }
}

let promotions = [
    new Promotion(1, 'boots', 'летние скидки', 20.0),
    new Promotion(2, 'shirts', 'скидки для школьников', 10.0),
    new Promotion(3, 'pants', 'скидки для именнинника', 15.0),
]

module.exports = {Promotion, promotions}