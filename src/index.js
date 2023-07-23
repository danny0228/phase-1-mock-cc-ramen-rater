//write your code here
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(renderRamen)

    const ramenForm = document.querySelector('#new-ramen')

    ramenForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))

        fetch("http://localhost:3000/ramens", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => renderCard(data))
    })

    function renderCard(ramen) {
        const card = document.createElement('ul')
        card.classList.add('card')

        const img = document.createElement('img')
        img.classList.add('ramen-avatar')
        img.src = ramen.image

        const ramenName = document.createElement('h2')
        ramenName.textContent = ''

        const restaurantName = document.createElement('h3')
        restaurantName.textContent = ''

        const rating = document.createElement('p')
        rating.textContent = ''

        const comments = document.createElement('p')
        comments.textContent = ''

        card.setAttribute('id', `${ramen.id}`)

        card.addEventListener('click', () => {
            document.querySelector('.detail-image').src = `${ramen.image}`
            document.querySelector('.name').innerHTML = `${ramen.name}`
            document.querySelector('.restaurant').innerHTML = `${ramen.restaurant}`
            document.querySelector('#rating-display').innerHTML = `${ramen.rating}`
            document.querySelector('#comment-display').innerHTML = `${ramen.comment}`
        })

        card.append(img, ramenName, restaurantName, rating, comments)
        document.querySelector('#ramen-menu').appendChild(card)
    }

    function renderRamen(ramenList) {
        ramenList.forEach((ramen) => {
            renderCard(ramen)
        })
    }
})

