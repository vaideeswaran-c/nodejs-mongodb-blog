// DOMContent Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handling the login mechanism
    let isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn == "true") {
        document.querySelector("#newArticle").classList.remove("d-none")
        document.querySelector("#adminLogin").classList.add("d-none")
        document.querySelector("#logout").classList.remove("d-none")
    } else {
        document.querySelector("#newArticle").classList.add("d-none")
        document.querySelector("#adminLogin").classList.remove("d-none")
        document.querySelector("#logout").classList.add("d-none")
    }

    let count = 0
    // Getting all articles
    fetch("/all")
        .then(response => response.json())
        .then(data => {
            const articles = data.articles
            const main = document.querySelector("main")
            // Rendering the article one by one
            count = articles.length;
            articles.map((article, index) => {
                // Rendering the card component
                const card = document.createElement("section")
                // Creating the picture component
                const picture = document.createElement("picture")
                picture.classList.add('picture')
                // Creating the image component
                const img = document.createElement("img")
                img.src = article.image
                img.alt = `blog image ${index}`
                picture.appendChild(img)
                // Picture onclick event
                picture.onclick = event => handleBlogClick(article.slug, event)
                card.appendChild(picture)
                // Creating the div event
                const div = document.createElement("div")
                const h2 = document.createElement("h2")
                h2.innerText = article.title
                div.appendChild(h2)
                const div2 = document.createElement("div")
                div2.classList.add("card-footer")
                const div3 = document.createElement("div")
                const date = new Date(article.createdAt)
                // Parsing the date and rendering the component
                div3.innerHTML = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
                div2.appendChild(div3)
                // Setting the edit link
                const editLink = document.createElement("a")
                editLink.href = `/edit/${article.slug}`
                editLink.innerText = 'Edit'
                editLink.setAttribute("id", `edit-${index}`)
                editLink.classList.add('edit-button')
                editLink.classList.add('d-none')
                // Setting the delete link
                const deleteLink = document.createElement("a")
                deleteLink.href = `/delete/${article.slug}`
                deleteLink.innerText = 'Delete'
                deleteLink.setAttribute("id", `delete-${index}`)
                deleteLink.classList.add('delete-button')
                deleteLink.classList.add('d-none')
                // Attaching the divs to card element
                div2.appendChild(editLink)
                div2.appendChild(deleteLink)
                div.appendChild(div2)
                card.appendChild(div)
                card.setAttribute("data-slug", article.slug)
                card.classList.add("card")
                // Appending the card to the main component
                main.appendChild(card)
            })
        })
        .then(() => {
            let isLoggedIn = sessionStorage.getItem("isLoggedIn")
            for (let i = 0; i < count; i++) {
                if (isLoggedIn == "true") {
                    document.querySelector(`#edit-${i}`).classList.remove("d-none")
                    document.querySelector(`#delete-${i}`).classList.remove("d-none")
                } else {
                    document.querySelector(`#edit-${i}`).classList.add("d-none")
                    document.querySelector(`#delete-${i}`).classList.add("d-none")
                }
            }
        })
})

// Redirecting the blog click event
const handleBlogClick = (slug, event) => {
    event.preventDefault()
    console.log(slug, event)
    let host = window.location.href
    let arr = host.split("/")
    let result = arr[0] + "//" + arr[2]
    window.location.replace(`${result}/article/${slug}`)
}