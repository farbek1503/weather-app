const query = document.getElementById('query'),
current = document.getElementById('current'),
buttons = document.querySelector('.buttons'),
days = document.querySelectorAll('#days div'),
day1 = document.querySelector('#day1'),
day2 = document.querySelector('#day2'),
day3 = document.querySelector('#day3'),
day4 = document.querySelector('#day4'),
day5 = document.querySelector('#day5'),
lat = document.querySelector('#lat'),
lon = document.querySelector('#lon')

function cityData() {
  if (query.value === '') {
    alert('Enter Something')
    return
  }
  days.forEach(el => {
    el.classList.add('disActive')
  })
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query.value}&appid=${Api Key}`)
  .then(res => res.json())
  .then(data => {
    if (data.cod === '404') {
      document.querySelector('.alerts').style.display = 'block';
			document.querySelector('.current_area').style.display = 'none';
			document.querySelector('.buttons_area').style.display = 'none';
      return
    }
		document.querySelector('.alerts').style.display = 'none';
		document.querySelector('.current_area').style.display = 'block';
		document.querySelector('.buttons_area').style.display = 'block';
    currentData(data)
  })

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query.value}&appid=${Api Key}`)
  .then(res => res.json())
  .then(data => {
    if (data.cod === '404') {
      return
    }
		weekdayData(data)
  })
}

function currentData(data) {
  current.innerHTML = `
		<div class="border"></div>
		<div class="status">
			<p>Status: ${data.weather[0].description}</p>
			<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
		</div>
		
		<table>
			<tbody>
				<tr>
					<td class="icon"><i class="fa-solid fa-temperature-half"></i></td>
					<td class="text">Temp: ${calcTemp(data.main.temp)}</td>
				</tr>
				<tr>
					<td class="icon"><i class="fa-solid fa-droplet"></i></td>
					<td class="text">Humidity: ${data.main.humidity} %</td>
				</tr>
				<tr>
					<td class="icon"><i class="fa-solid fa-wind"></i></td>
					<td class="text">Wind Deg: ${data.wind.deg} ° | Wind Speed: ${data.wind.speed} m/s</td>
				</tr>
				<tr>
					<td class="icon"><i class="fa-solid fa-earth-americas"></i></td>
					<td class="text">City: <b>${data.name}</b> | Country: <b>${data.sys.country}</b></td>
				</tr>
				<tr>
					<td class="icon"><i class="fa-solid fa-location-dot"></i></td>
					<td class="text">Lat: ${data.coord.lat} | Long: ${data.coord.lon} <a class="link" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}">Maps <i class="fa-solid fa-up-right-from-square"></i></a></td>
				</tr>
			</tbody>
		</table>
		
		<br />
	`;
	buttons.innerHTML = `
		<label for="day_1" class="radio" onclick="toggleVisibility('day1')">
			<input type="radio" id="day_1" name="selector">
			<span>1</span>
		</label>
		<label for="day_2" class="radio" onclick="toggleVisibility('day2')">
			<input type="radio" id="day_2" name="selector">
			<span>2</span>
		</label>
		<label for="day_3" class="radio" onclick="toggleVisibility('day3')">
			<input type="radio" id="day_3" name="selector">
			<span>3</span>
		</label>
		<label for="day_4" class="radio" onclick="toggleVisibility('day4')">
			<input type="radio" id="day_4" name="selector">
			<span>4</span>
		</label>
		<label for="day_5" class="radio" onclick="toggleVisibility('day5')">
			<input type="radio" id="day_5" name="selector">
			<span>5</span>
		</label>
	`
}

function weekdayData(data){
	const groupedByMsg = data.list.reduce((acc, obj) => {
		const msg = dateSplit(obj);
		if (acc[msg]) {
			acc[msg].push(obj);
		} else {
			acc[msg] = [obj];
		}
		return acc;
	}, {});

	const sortData = Object.values(groupedByMsg);
	sortData[0].forEach(item => {
		const dt = dateSplit(item);
		document.querySelector('#day1 h5').innerText = findWeekDay(dt);
		day1.innerHTML += `
			${weekFunc(item)}
		`
	})
	sortData[1].forEach(item => {
		const dt = dateSplit(item);
		document.querySelector('#day2 h5').innerText = findWeekDay(dt);
		day2.innerHTML += `
			${weekFunc(item)}
		`
	})
	sortData[2].forEach(item => {
		const dt = dateSplit(item);
		document.querySelector('#day3 h5').innerText = findWeekDay(dt);
		day3.innerHTML += `
			${weekFunc(item)}
		`
	})
	sortData[3].forEach(item => {
		const dt = dateSplit(item);
		document.querySelector('#day4 h5').innerText = findWeekDay(dt);
		day4.innerHTML += `
			${weekFunc(item)}
		`
	})
	sortData[4].forEach(item => {
		const dt = dateSplit(item);
		document.querySelector('#day5 h5').innerText = findWeekDay(dt);
		day5.innerHTML += `
			${weekFunc(item)}
		`
	})
}

function coordData() {
  if (lat.value === '' || lon.value === '') {
    alert('Enter Something')
    return
  }
  document.querySelector('.alerts').style.display = 'none';
	document.querySelector('.current_area').style.display = 'block';
	document.querySelector('.buttons_area').style.display = 'block';
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=${Api Key}`)
  .then(res => res.json())
  .then(data => {
		console.log('data')
		
    currentData(data)
  })

  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat.value}&lon=${lon.value}&appid=${Api Key}`)
  .then(res => res.json())
  .then(data => {
    weekdayData(data)
  })
}

function weekFunc(item) {
  return `
		<fieldset>
			<legend>${hourSplit(item)}</legend>
			<div class="status">
				<p>Status: ${item.weather[0].description}</p>
				<img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" />
			</div>
			<div style="margin: 0 0 0 10px;">
				<p>
					<i class="fa-solid fa-temperature-half"></i>
					Temp: ${calcTemp(item.main.temp)}
				</p>
				<p>
					<i class="fa-solid fa-droplet"></i>
					Humidity: ${item.main.humidity} %
				</p>
				<p>
					<i class="fa-solid fa-wind"></i>
					Wind Deg: ${item.wind.deg}° | 
					Wind Speed: ${item.wind.speed} m/s
				</p>
			</div>
			<br />
		</fieldset>
	`
}

function calcTemp(t) {
  const temp = `${Math.ceil(t - 273.15)} °C`;
  return temp
}

function dateSplit(item) {
  const day = item.dt_txt.split(' ')[0];
  return day
}

function hourSplit(item) {
  const hour = item.dt_txt.split(' ')[1];
  return hour
}

function findWeekDay(msg) {
  const date = new Date(msg);
  const weekDay = date.getDay();

  const allWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const weekDayString = allWeek[weekDay];

  return weekDayString
}

function toggleVisibility(dayId) {
  let day = document.getElementById(dayId);
  days.forEach(el => {
    el.classList.add('disActive')
  })

  day.classList.remove('disActive')
}

function refresh() {
  window.location.reload()
}