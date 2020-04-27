import { handleErrors, api } from "./utils.js";
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 };
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
}


const splashDemo = document.getElementById("demoUser");
splashDemo.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${api}users/token`, {
            method: "POST",
            body: JSON.stringify({
                email: "demo@demo.com",
                password: "demo"
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const {
            token,
            user: { id, name },
        } = await res.json();
        // Stores fullName, access_token, and user_id in localStorage:
        localStorage.setItem("CLACK_CURRENT_USER_FULLNAME", name);
        localStorage.setItem("CLACK_ACCESS_TOKEN", token);
        localStorage.setItem("CLACK_CURRENT_USER_ID", id);
        localStorage.setItem("CLACK_CURRENT_CHANNEL_ID", 1);

        // Redirects user to main channel page
        window.location.href = "/main";
    } catch (err) {
        handleErrors(err);
    }
});