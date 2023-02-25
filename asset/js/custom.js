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

// store data with no expiration date
let setStorage = (ns, apikey) => {
    localStorage.ns = ns;
    localStorage.apikey = apikey;
}

// display user email
let displayEmail = async _ => {
    if (localStorage.ns && localStorage.apikey) {
        document.getElementById("login").classList.add("d-none");
        document.getElementById("email").classList.remove("d-none");
        let obj;

        await nsKeyFetch(localStorage.ns, localStorage.apikey).then(result => obj = result);

        let emailStart = document.querySelector("#email .start");
        let emailEnd = document.querySelector("#email .end .card");
        emailStart.innerText = "";

        obj.emails.forEach(email => {
            let card = document.createElement("div");

            card.classList.add("card", "border-info");
            card.innerHTML = `
            <div class="card-header">${email.from}</div>
            <div class="card-body">
                <h5 class="card-title">${email.subject}</h5>
                <p class="card-text"></p>
            </div>
            `;

            card.addEventListener("click", _ => {
                for (let children of card.parentNode.children) children.classList.remove("active-email");
                card.classList.add("active-email");
                emailEnd.innerHTML = `${email.html}`;
            });

            emailStart.appendChild(card);
        });
    } else {
        document.getElementById("login").classList.remove("d-none");
        document.getElementById("email").classList.add("d-none");
    }
}

// get value from user and check the value is right or wrong then further process
document.querySelector("#btn-login").addEventListener("click", async _ => {
    document.querySelectorAll(".login-box input").forEach((e) => {
        let validationResult = loginValidation(e.value);
        validationResult === false ? e.parentNode.lastElementChild.classList.add("d-none") : e.parentNode.lastElementChild.classList.remove("d-none");
    });

    const alert = document.querySelectorAll(".login-box .alert");
    for (let elem of alert) if (!elem.classList.contains("d-none")) return false;

    let ns = document.querySelector("#namespace").value;
    let apikey = document.querySelector("#apikey").value;
    let obj;

    await nsKeyFetch(ns, apikey).then(result => obj = result);
    if (obj === false) return false;

    setStorage(ns, apikey);
    location.href = "./";
});

// clear data from local storage
document.querySelector("#btn-logout").addEventListener("click", _ => {
    localStorage.removeItem("ns");
    localStorage.removeItem("apikey");
    location.href = "./";
});

// initial load
onload = _ => {
    displayEmail();
}