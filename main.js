import data from './tables.js'
const login = JSON.parse(localStorage.getItem('user')) || ''
const wrapper = document.querySelector('.intro__tables')
// const api = 'http://127.0.0.1:5500/tables.json'

// async function fetchProducts() {
async function fetchProducts() {
	// const res = await fetch(api)
	// const data = await res.json()
	data.tables?.map(item => {
		const div = document.createElement('div')
		div.classList.add('intro__table')
		div.innerHTML = `
		<div class="intro__table-part">
			<img src="/images/table.svg" alt="table" />
		</div>
		<p>${item.title}</p>
		<button name='table-btn' data-id=${item.id} class="intro__btn">${item.book}</button>
		`
		wrapper.appendChild(div)
	})

	const savedTables = JSON.parse(localStorage.getItem('tables')) || []
	savedTables.forEach(t => {
		const btn = wrapper.querySelector(`[data-id="${t.id}"]`)
		if (btn) {
			btn.innerText = t.book
		}
	})
}
fetchProducts()

wrapper.addEventListener('click', e => {
	if (e.target.name === 'table-btn') {
		if (!login) {
			return alert('Сначало зарегистрироваетесь')
		}
		let btn = e.target.closest('[data-id]').dataset.id
		const data = JSON.parse(localStorage.getItem('tables')) || []
		const find = data?.find(i => i.id == btn)
		if (find.book === 'вы забранировали этот столик') {
			const filtered = data?.filter(i => i.id != btn)
			find.book = 'забранировать'
			localStorage.setItem('tables', JSON.stringify([...filtered, find]))
			return (window.location = '')
		} else {
			const filtered = data?.filter(i => i.id != btn)
			find.book = 'вы забранировали этот столик'
			localStorage.setItem('tables', JSON.stringify([...filtered, find]))
			return (window.location = '')
		}
	}
})
