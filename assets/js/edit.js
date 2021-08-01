// DOMContent loaded event
document.addEventListener('DOMContentLoaded', () => {
    // Logged in handling
    let isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn == "true") {
        document.querySelector("#adminLogin").classList.add("d-none")
        document.querySelector("#logout").classList.remove("d-none")
    } else {
        document.querySelector("#adminLogin").classList.remove("d-none")
        document.querySelector("#logout").classList.add("d-none")
    }

    let result = window.location.pathname.split('/').slice(0, 3)[2]

    // Getting the content for editing
    fetch(`/editblog/${result}`)
        .then(response => response.json())
        .then(data => {
            const title = data.article.title
            const description = data.article.description
            // Setting the title, description to the DOM 
            document.querySelector('#id').value = data.article._id
            document.querySelector('#title').value = title
            document.querySelector('#description').innerHTML = description
        })


})

// HandleEdit component
const handleEdit = event => {
    event.preventDefault()
    // Collecting the form values
    const id = document.querySelector("#id").value;
    const title = document.querySelector("#title").value;
    const image = imagePreviewUrl
    // Getting the description from wsiwysg editor
    const description = tinymce.get("description").getContent()
    const body = {
        id, title, image, description
    }
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/update`)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    // API call to update the data
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let host = window.location.href
            let arr = host.split("/");
            let result = arr[0] + "//" + arr[2]
            window.location.replace(result);
        });
}