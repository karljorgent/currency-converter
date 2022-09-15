const express = require('express')
const cors = require('cors')
const app = express()
const port = 8800
const currencies = [{name:'EURUSD', bid:1.001, ask:1.000}]

app.use(cors())

app.get('/currencies', (req, res) => {
    res.send(currencies)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})