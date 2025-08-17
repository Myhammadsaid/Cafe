const wrapper = document.querySelector('.check__info')
const check = JSON.parse(localStorage.getItem('bill'))
const user = JSON.parse(localStorage.getItem('user'))
let number = Number.parseInt(Math.random() * 100)
const box = document.querySelector('.check-div')
const login = JSON.parse(localStorage.getItem('user')) || ''

if (!login) {
	window.location = '/pages/login.html'
}

wrapper.innerHTML = `
<p>№ ${number + 1}</p>
<p>Имя: ${user?.firstname}</p>
<p>Номер телефона: ${user?.phone_number}</p>
<div class="check-div">
<h4>Заказано</h4>
${check
	.map(
		i =>
			`<p><span>${i.img?.split('/')[2].replace('.svg', '')}</span> <span>${
				i.quantity
			}x</span></p>`
	)
	.join('')}
</div>
`
