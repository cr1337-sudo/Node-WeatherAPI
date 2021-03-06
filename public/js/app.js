/* const url = "http://puzzle.mead.io/puzzle"

fetch(url).then((response) => {
	  response.json().then((data) => {
		console.log(data)
	  })
})




 */
const weatherForm = document.querySelector(".form-weather");
const search = document.querySelector("input");
const parOk = document.querySelector(".ok");
const parError = document.querySelector(".error");


weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = search.value

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				parError.insertAdjacentHTML("afterbegin", `<p>${data.error}</p>`)
			} else {
				parOk.insertAdjacentHTML("afterbegin", `<p>${data.location}</p>`)
				parOk.insertAdjacentHTML("afterbegin", `<p>${data.forecast}</p>`)
			}
		})
	})
});