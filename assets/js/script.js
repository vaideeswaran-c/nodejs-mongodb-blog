// Handling login button click
const handleLogin = event => {
    event.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    // Validation for email and password
    if (!email || email == "") {
        document.querySelector("#emailError").innerText = "Email cannot be empty"
        return
    } else {
        document.querySelector("#emailError").innerText = ""
    }
    // Validation for password
    if (!password || password == "") {
        document.querySelector("#passwordError").innerText = "Password cannot be empty"
        return
    } else {
        document.querySelector("#passwordError").innerText = ""
    }
    const params = { email, password }
    // Getting the hostname from the url
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/register`)
    // Setting the params
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const options = {
        method: 'GET'
    };
    // Fetch to call the backend api
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector("#error").innerText = data.error
            } else {
                // Redirecting back to homepage
                let host = window.location.href
                let arr = host.split("/");
                let result = arr[0] + "//" + arr[2]
                sessionStorage.setItem("isLoggedIn", true)
                window.location.replace(result);
            }
        });
}


// Handling login button click
const handleRegister = event => {
    event.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    // Validation for email and password
    if (!email || email == "") {
        document.querySelector("#emailError").innerText = "Email cannot be empty"
        return
    } else {
        document.querySelector("#emailError").innerText = ""
    }
    // Validation for password
    if (!password || password == "") {
        document.querySelector("#passwordError").innerText = "Password cannot be empty"
        return
    } else {
        document.querySelector("#passwordError").innerText = ""
    }
    const params = { email, password }
    // Getting the hostname from the url
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/register`)
    // Setting the params
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const options = {
        method: 'GET'
    };
    // Fetch to call the backend api
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector("#error").innerText = data.error
            } else {
                // Redirecting back to homepage
                let host = window.location.href
                let arr = host.split("/");
                let result = arr[0] + "//" + arr[2]
                sessionStorage.setItem("isLoggedIn", true)
                window.location.replace(result);
            }
        });
}


// Handling the logout
const handleLogout = event => {
    event.preventDefault()
    // Removing the session variable
    sessionStorage.removeItem("isLoggedIn")
    // Redirecting to homepage
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    window.location.replace(result);
}

let imagePreviewUrl;

// Handling Image upload
const handleImageSelect = event => {
    event.preventDefault()
    // File Reader
    const reader = new FileReader()
    const file = event.target.files[0]
    // Preventing file lesser than 10 MB
    if (file.size > 2097152) {
        setTimeout(() => alert("Image size cannot be greater than 10MB"), 700);
        return;
    }
    // Allowing only image filetypes
    if (!"image/jpg,image/jpeg,image/png".includes(file.type)) {
        setTimeout(() => alert("Only image file types are allowed"), 700);
        return;
    }
    if (file) {
        reader.readAsDataURL(file);
        // Setting the image url
        reader.onload = upload => {
            imagePreviewUrl = upload.target.result
        }
    }
}

// Saving the article method
const handleSave = event => {
    event.preventDefault()
    // Collecting the values
    const title = document.querySelector("#title").value;
    const image = imagePreviewUrl
    const description = tinymce.get("description").getContent()
    const body = {
        title, image, description
    }

    // Getting the hostname
    let host = window.location.href
    let arr = host.split("/");
    let result = arr[0] + "//" + arr[2]
    const url = new URL(`${result}/upload`)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    // APi call to save article data
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let host = window.location.href
            let arr = host.split("/");
            let result = arr[0] + "//" + arr[2]
            window.location.replace(result);
        });
}