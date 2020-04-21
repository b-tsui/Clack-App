import { handleErrors } from "./utils.js";

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { fullName, email, password };
    try {
        const res = await fetch("http://localhost:8000/users", {
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
        // storage access_token in localStorage:
        localStorage.setItem("CLACK_ACCESS_TOKEN", token);
        localStorage.setItem("CLACK_CURRENT_USER_ID", id);
        // redirect to home page to see all tweets:
        window.location.href = "/main";
    } catch (err) {
        handleErrors(err);
    }
});