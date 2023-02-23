// user input validation
let loginValidation = value => {
    if (value.trim() !== "") return false;
}

// check namespace and api key exist or not
let isExist = (obj) => {
    if (obj.result !== "success") return false;
}

// get object from json format
let nsKeyFetch = (ns, key) => {
    return fetch(`https://api.testmail.app/api/json?apikey=${key}&namespace=${ns}&pretty=true`).then(r => r.json()).then(get => {
        let exist = isExist(get);

        if (exist === false) return false;
        else return get;
    });
}

// get value from user and check the value is right or wrong
document.querySelector("#btn-login").addEventListener("click", _ => {
    document.querySelectorAll(".login-box input").forEach((e) => {
        let validationResult = loginValidation(e.value);
        validationResult === false ? e.parentNode.lastElementChild.classList.add("d-none") : e.parentNode.lastElementChild.classList.remove("d-none");
    });

    const alert = document.querySelectorAll(".login-box .alert");
    for (let elem of alert) if (!elem.classList.contains("d-none")) return false;

    let ns = document.querySelector("#namespace").value;
    let apikey = document.querySelector("#apikey").value;

    nsKeyFetch(ns, apikey).then();
});