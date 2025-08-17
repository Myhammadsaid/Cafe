const wrapper = document.querySelector('.cards')
const cards = JSON.parse(localStorage.getItem('cards')) || []
const login = JSON.parse(localStorage.getItem('user')) || ''

const getCards = () => {
	wrapper.innerHTML = ''
	cards?.map(item => {
		const div = document.createElement('div')
		div.classList.add('card')
		let title = item.img?.split('/')[2]
		title = title.replace('.svg', '')

		div.innerHTML = `
		<img src=${item.img} alt=${title} />
		<h3>${title}</h3>
		<button name='inc-cart' data-id=${item.id}>+</button>
		<span>${item.quantity}</span>
		<button name='dec-cart' data-id=${item.id}>-</button>
		`

		wrapper.appendChild(div)
	})
}

getCards()

wrapper.addEventListener('click', e => {
	if (!login) {
		return alert('Сначало зарегистрироваетесь')
	}
	if (e.target.name === 'inc-cart') {
		let btn = e.target.closest('[data-id]').dataset.id
		const find = cards?.find(i => i.id == btn)
		const filtered = cards?.filter(i => i.id != btn)
		find.quantity += 1
		localStorage.setItem('cards', JSON.stringify([find, ...filtered]))
		getCards()
	}
	if (e.target.name === 'dec-cart') {
		let btn = e.target.closest('[data-id]').dataset.id
		const find = cards?.find(i => i.id == btn)
		const filtered = cards?.filter(i => i.id != btn)
		find.quantity -= 1
		if (find.quantity < 1) {
			find.quantity = 0
			localStorage.setItem('cards', JSON.stringify([...filtered]))
			getCards()
		} else {
			localStorage.setItem('cards', JSON.stringify([find, ...filtered]))
			getCards()
		}
	}
})

const order_btn = document.querySelector('.order-btn')
order_btn.addEventListener('click', e => {
	if (!login) {
		return alert('Сначало зарегистрироваетесь')
	}
	if (!cards.length) {
		return alert('Корзина пуста')
	}
	localStorage.setItem('bill', JSON.stringify(cards))
	localStorage.removeItem('cards')
	getCards()
	window.location = ''
})
