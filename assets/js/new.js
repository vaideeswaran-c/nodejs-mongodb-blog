// Dom content loaded event
document.addEventListener('DOMContentLoaded', () => {
    // Handling the log in mechanism
    let isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn == "true") {
        document.querySelector("#adminLogin").classList.add("d-none")
        document.querySelector("#logout").classList.remove("d-none")
    } else {
        document.querySelector("#adminLogin").classList.remove("d-none")
        document.querySelector("#logout").classList.add("d-none")
    }
})