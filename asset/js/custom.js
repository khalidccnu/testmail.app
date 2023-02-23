// user input validation
let loginValidation = value => {
    if (value.trim() !== "") return false;
}

// get value from user and check the value is right or wrong
document.querySelector("#btn-login").addEventListener("click", _ => {
    document.querySelectorAll(".login-box input").forEach((e) => {
        let validationResult = loginValidation(e.value);
        validationResult === false ? e.parentNode.lastElementChild.classList.add("d-none") : e.parentNode.lastElementChild.classList.remove("d-none");
    });
});