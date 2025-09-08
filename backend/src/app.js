import express from 'express';

const app = express()

app.get('/', (req, res) => {
    res.json({ "msg": 'success' })
})

app.listen(5000, () => (console.log('kar running')
))