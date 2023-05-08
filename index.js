const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(express.urlencoded({
      extended: true
   }));
app.use(express.json());

app.get('/', (req, res) => {
   res.send(`
		<title>Weather App</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
		<div class="container mt-5">
			<form action="/" method="POST">
				<div class="form-floating mb-3">
					<input type="text" name="city" class="form-control" id="floatingInput"
					placeholder="name@example.com">
					<label for="floatingInput">Search</label>
					<button class="btn btn-success mt-2 w-100 fs-5" type="submit">Click</button>
				</div>
			</form>
		</div>
	`)
})

app.post('/', (req, res) => {
   const city = req.body.city;
   const url = `${process.env.BASE_URL}weather?q=${city}&units=metric&appid=${process.env.API_KEY}`
      axios.get(url)
      .then(function (response) {
         // handle success
			const data = response.data
         res.send(`
					<title>Weather App Result</title>
					<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
					<div class="container mt-5">
						<div class="card">
							<h2 class="card-header text-center">${data.name}</h2>
							<div class="card-body">
								<p class="card-text">
									
									<div>
										<i class="fa-solid fa-temperature-three-quarters"></i> &nbsp;
										Current Temp <b>${data.main.temp}</b>,
										Min Temp <b>${data.main.temp_min}</b>,
										Max Temp <b>${data.main.temp_max}</b>
									</div>
									<br />
									<div>
										<i class="fa-solid fa-droplet"></i> &nbsp;
										Humidity <b>${data.main.humidity}</b>
									</div>
									<br />
									<div>
										<i class="fa-solid fa-wind"></i> &nbsp;
										Wind Speed <b>${data.wind.speed}</b>
										Wind Deg <b>${data.wind.deg}</b>
									</div>
									<br />
									<div>
										<i class="fa-solid fa-earth-americas"></i> &nbsp;
										Country ${data.sys.country}
									</div>
									<br />
									<div>
										<i class="fa-solid fa-cloud"></i> &nbsp;
										${data.weather[0].main}
									</div>
									
								</p>
								<div class="text-center">
									<a href="/" class="btn btn-primary w-50 fs-5">Restart</a>
								</div>
							</div>
						</div>
					</div>
			`)
      })
      .catch(function (error) {
         // handle error
			res.send(`
				<title>Weather App Error</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
				<div class="container mt-5">
					<div class="alert alert-danger" role="alert">
						Country Not Found
					</div>
					<div class="text-center">
						<a href="/" class="btn btn-warning w-100 fs-5">Restart</a>
					</div>
				</div>
			`)
      })
      .finally(function () {
         // always executed
      });
})

const port = 3000;
app.listen(port, () => {
   console.log(`The Server Is Started On Port ${port}`)
})
