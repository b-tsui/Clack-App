window.addEventListener("DOMContentLoaded", event => {
    // Get the modal
    let modal = document.getElementById("modal");

    // Get the button that opens the modal
    let button = document.getElementById("button");

    button.addEventListener("click", event => {
        modal.style.display = "block";
    });
})
