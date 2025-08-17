const wrapper = document.querySelector('.menu')
const api = 'http://127.0.0.1:5500/menu.json'
const cards = JSON.parse(localStorage.getItem('cards')) || []
const login = JSON.parse(localStorage.getItem('user')) || ''

async function fetchMenu() {
	const res = await fetch(api)
	const data = await res.json()
	data?.menu?.map(item => {
		const div = document.createElement('div')
		div.classList.add('food')
		let title = item.img?.split('/')[2]
		title = title.replace('.svg', '')
		div.innerHTML = `
		<img src=${item.img} alt=${item.img} />
		<p>${title}</p>
		<button name='menu__btn' data-id=${item.id} >в корзину</button>
		`
		wrapper.appendChild(div)
	})
	localStorage.setItem('products', JSON.stringify(data))
}

fetchMenu()

wrapper.addEventListener('click', e => {
	if (!login) {
		return alert('Сначало зарегистрироваетесь')
	}
	if (e.target.name === 'menu__btn') {
		let btn = e.target.closest('[data-id]').dataset.id
		const products = JSON.parse(localStorage.getItem('products')) || []
		let find = products?.menu?.find(i => i.id == btn)
		find.quantity = 1
		if (cards.length) {
			let inx = cards.findIndex(i => i.id === find.id)
			if (inx !== -1) {
				const res = cards[inx]
				res.quantity += 1
				const filtered = cards?.filter(i => i.id != inx)
				localStorage.setItem('cards', JSON.stringify(...filtered, res))
			} else {
				cards.push(find)
			}
		} else {
			cards.push(find)
		}
		localStorage.setItem('cards', JSON.stringify(cards))
	}
})
