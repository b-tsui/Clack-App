import { handleErrors, api } from "./utils.js";

const logInForm = document.querySelector(".log-in-form");
const demoLogIn = document.getElementById("demoUser");

logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Grabs form inputs from the login form
    const formData = new FormData(logInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };

    //Makes a post request to grab access token for user
    try {
        const res = await fetch(`${api}users/token`, {
            method: "POST",
            body: JSON.stringify(body),
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

//Allows users to log in as a demo user to test clack app functionality
//Users will not have to provide any login credentials and get to chat instantly
demoLogIn.addEventListener("click", async (e) => {
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