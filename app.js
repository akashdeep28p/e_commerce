require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

const connectDB = require('./database/connect')
const authRoutes = require('./routes/authRoutes')

const notFoundMiddleware = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.use(morgan('tiny'))

//used to have access to json data in request body
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/api', (req, res) => {
    console.log(req.signedCookies)
    res.send('e_commerce')
})

app.use('/api/auth', authRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }catch (error){
        console.log(error)
    }
}

start()



