const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const port = process.env.PORT || 3000
//Paths y views location

const partialsPath = path.join(__dirname, "../templates/partials");
//Se declara que se va a usar el motor de templates "hbs"
app.set('view engine', 'hbs');
//Acá se especifica el path donde se crean las vistas
app.set('views', path.join(__dirname, "../templates/views"));
hbs.registerPartials(partialsPath)


//Ruta donde estan los archivos publicos (Estaticos)
app.use(express.static(path.join(__dirname, "../public")))


app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Ionatan"
	})
})

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "Generic name"
	})
})

app.get("/help", (req, res) => {
	res.render("help", {
		message: "This is a message",
		title: "Help",
		name: "Crisian Cuello"
	})
})
app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address"
		})
	}

	geocode(req.query.address, (error, { location } = {}) => {

		if (error) {
			return res.send({
				error: error
			})
		}

		forecast(location, (error, forecastData) => {
			if (error) {
				return res.send({
					error: error
				})
			}

			res.send({
				location: location,
				forecast: forecastData,
				address: req.query.address
			})
		})
	})

})

app.get("/help/*", (req, res) => {
	res.render("404", {
		error: "Help article not found"
	})
})

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term"
		})
	}
	res.send({
		products: []
	})
});

app.get("*", (req, res) => {
	res.render("404", {
		error: "Page not found"
	})
})
//Puerto que se escucha y callback que se ejecuta cuando el server está corriendo
app.listen(port, () => {
	console.log("Server is running on port 300")
})