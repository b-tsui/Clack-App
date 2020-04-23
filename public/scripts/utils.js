export const handleErrors = async (err) => {
    const errorsContainer = document.querySelector(".errors-container");
    if (err.status === 401) {
        errorsContainer.innerHTML = "login failed"
    } else if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        console.log(err.status)
        let errorsHtml = [
            `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
        ];
        const { errors } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
            );
        }
        errorsContainer.innerHTML = errorsHtml.join("");
    }
    else if (err.status === "passwordError") {
        let errorsHtml = [
            `
        <div class="alert alert-danger">
            ${err.name}: 
            ${err.message}
        </div>
      `]
        errorsContainer.innerHTML = errorsHtml;
    }
    else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
    }
};

//-----------------------------------------------------------------------------------
// Function that takes in a message, translate it into emoji letters, and returns that new message
export const emojiTranslate = (message) => {
    const alphabet = {
        a: ["🅰️"],
        b: ["🅱️"],
        c: ["©️"],
        d: ["↩️"],
        e: ["📧"],
        f: ["🎏"],
        g: ["ⓖ"],
        h: ["♓"],
        i: ["ℹ️"],
        j: ["ʝ"],
        k: ["ⓚ"],
        l: ["👢"],
        m: ["Ⓜ️"],
        n: ["ⓝ"],
        o: ["🅾️"],
        p: ["🅿️"],
        q: ["🔍"],
        r: ["®️"],
        s: ["💲"],
        t: ["✝️"],
        u: ["⛎"],
        v: ["♈"],
        w: ["〰️"],
        x: ["❌"],
        y: ["✌🏻"],
        z: ["💤"],
        1: ["1️⃣"],
        2: ["2️⃣"],
        3: ["3️⃣"],
        4: ["4️⃣"],
        5: ["5️⃣"],
        6: ["6️⃣"],
        7: ["7️⃣"],
        8: ["8️⃣"],
        9: ["9️⃣"],
        0: ["0️⃣"],
        "?": ["❓"],
        "!": ["❗️"],
        " ": [""],
        ".": ["❀"]
    };
    return message.toLowerCase().split('').map(char => {
        if (char in alphabet) {
            return alphabet[char];
        } else {
            return char;
        }
    }).join('')
}