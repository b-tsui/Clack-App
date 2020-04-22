export const handleErrors = async (err) => {
    const errorsContainer = document.querySelector(".errors-container");
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
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
