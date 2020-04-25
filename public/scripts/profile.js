
//When user logs in, their full name will get displayed on the sidebar
//and profile modal
const fullNameElement = document.getElementById("fullName");
const nameDisplay = document.getElementById("nameDisplay")
fullNameElement.innerHTML = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");
nameDisplay.innerHTML = localStorage.getItem("CLACK_CURRENT_USER_FULLNAME");

const userId = localStorage.getItem("CLACK_CURRENT_USER_ID");
const editProfileForm = document.getElementById("editProfileForm")
const saveProfileEdit = document.getElementById("saveProfileEdit")

saveProfileEdit.addEventListener("submit", async event => {
    event.preventDefault();

    //Grabs form input and creates a body object with them
    const formData = new FormData(editProfileForm);
    const newName = formData.get("fullName");
    const newEmail = formData.get("email");
    const body = {
        fullName: newName,
        email: newEmail
    }

    //Send a put request to update the user's fullName/email
    try {
        const res = await fetch(`https://clackbackend.herokuapp.com/users/${userId}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('CLACK_ACCESS_TOKEN')}`
                },
            })

        if (!res.ok) {
            throw res;
        }

        //Reset the user's fullName in the localStorage and redirect
        //to main page
        const {
            fullName
        } = await res.json();
        localStorage.setItem("CLACK_CURRENT_USER_FULLNAME", fullName);
        window.location.href = "/main";
    } catch (err) {
        console.error(err);
    }
})

//log out user by clearing the localStorage and redirect to the splash page
const logOutButton = document.getElementById("sign-out-workspace");
logOutButton.addEventListener("click", event => {
    event.preventDefault();
    localStorage.removeItem("CLACK_CURRENT_USER_FULLNAME");
    localStorage.removeItem("CLACK_CURRENT_USER_ID");
    localStorage.removeItem("CLACK_ACCESS_TOKEN");
    window.location.href = "/";
})