const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
      extended: true
   }));
app.use(express.json());

app.get('/', (req, res) => {
   res.render('pages/index')

})

app.post('/', (req, res) => {
   const city = req.body.city;
   const url = `${process.env.BASE_URL}weather?q=${city}&units=metric&appid=${process.env.API_KEY}`
      axios.get(url)
      .then(function (response) {
         // handle success
         res.render('pages/result', {
            data: response.data
         })
      })
      .catch(function (error) {
         // handle error
         res.render('pages/error')
      })
      .finally(function () {
         // always executed
      });
})

const port = 3000;
app.listen(port, () => {
   console.log(`The Server Is Started On Port ${port}`)
})
