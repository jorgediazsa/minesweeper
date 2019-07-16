const express = require('express')
const bodyParser = require('body-parser')

const boardRouter = require('./routes/boardRouter')

const app = express()

app.use(bodyParser.json())

app.use('/board', boardRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)