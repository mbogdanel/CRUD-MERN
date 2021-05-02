const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const FoodModel = require('./models/Food.js')

app.use(express.json())
app.use(cors())

mongoose.connect(
  'mongodb+srv://bibi1234:bibi1234@crud.2ujjp.mongodb.net/food?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

app.post('/insert', async (req, res) => {
  const foodName = req.body.foodName
  const days = req.body.days

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days })

  try {
    await food.save()
    console.log('inserted data')
  } catch (err) {
    console.log(err)
  }
})

app.get('/read', async (req, res) => {
  // FoodModel.find({$where: {foodName: 'Apple'}}) for fetching one product
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    console.log('sending for read')
    res.send(result)
  })
})

app.put('/update', async (req, res) => {
  const newFoodName = req.body.newFoodName
  const id = req.body.id
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName
      updatedFood.save()
      res.send('updated')
    })
  } catch (err) {
    console.log(err)
  }
})

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id

  await FoodModel.findByIdAndRemove(id).exec()
  res.send('deleted')
})

app.listen(3001, () => {
  console.log('Server running on 3001')
})
