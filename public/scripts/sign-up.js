import { handleErrors } from "./utils.js";

//Grabs the sign up form element
const signUpForm = document.querySelector(".sign-up-form");


signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Grabs the form input values
    const formData = new FormData(signUpForm);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const body = { fullName, email, password };

    try {

        //If password and confirm password fields do not match, throws error
        if (password !== confirmPassword) {
            let passwordError = new Error;
            passwordError.name = "Password Error"
            passwordError.message = "Passwords must match"
            passwordError.status = "passwordError";
            throw passwordError;
        }

        //If there are no problems with signing up, makes a post request to create
        //new user in the database
        const res = await fetch("https://clackbackend.herokuapp.com/users", {
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
            user: { id },
        } = await res.json();

        // Stores fullName, access_token, user_id in localStorage:
        localStorage.setItem("CLACK_CURRENT_USER_FULLNAME", fullName);
        localStorage.setItem("CLACK_ACCESS_TOKEN", token);
        localStorage.setItem("CLACK_CURRENT_USER_ID", id);

        //Redirects user to main channel chat
        window.location.href = "/main";
    } catch (err) {
        handleErrors(err);
    }
});