const express = require('express')
const cors = require('cors')
const app = express()
const port = 8800

const currencies = [
    {name:'EURUSD', bid:1.001, ask:1.000},
    {name:'GBPUSD', bid:1.1381, ask:1.1379},
    {name:'CADUSD', bid:0.7524, ask:0.7523}
]

setTimeout(changeCurrencies, 1000)

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(0.9, 1.1)
console.log(rndInt)

function changeCurrencies() {

}

app.use(cors())

app.get('/currencies', (req, res) => {
    res.send(currencies)
})


app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
})