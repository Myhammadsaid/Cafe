const form = document.querySelector('.login__form')
const firstname = document.querySelector('.first_name')
const lastname = document.querySelector('.last_name')
const phone_number = document.querySelector('.phone_number')
const btn = document.querySelector('.login__btn')
const login = JSON.parse(localStorage.getItem('user')) || ''

if (login) {
	window.location = '/pages/profile.html'
}

const clearform = () => {
	firstname.value = ''
	lastname.value = ''
	phone_number.value = ''
}

form.addEventListener('submit', event => {
	event.preventDefault()
	const user = {
		firstname: firstname.value,
		lastname: lastname.value,
		phone_number: phone_number.value,
	}
	localStorage.setItem('user', JSON.stringify(user))
	clearform()
})
