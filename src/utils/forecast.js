const request = require("request")

const forecast = (location, callback) => {
	location = encodeURIComponent(location)
	const url = `http://api.weatherstack.com/current?access_key=29cb55f2032e73c3856ee20f3c7f9876&query=${location}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect", undefined)
		} else if (body.error) {
			callback("Error, prueba otra localización", undefined)
		} else {
			callback(undefined, `Temperatura ${body.current.temperature}`)
		}
	})
}

module.exports = forecast;