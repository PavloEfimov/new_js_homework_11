// Globs
const btn = document.querySelector("#js-btn");
const btn1 = document.querySelector("#js-btn-send");
const tBody = document.querySelector("#js-tbody");
const htmlTpl = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(htmlTpl);


const updateView = persons => {
    let htmlString = "";

    persons.forEach(person => {
        htmlString += compiled(person);
    });

    tBody.innerHTML = htmlString;
};



const getUsersBase = () =>
    fetch('http://fecore.net.ua/rest/')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Error fetching data");
    })
    .catch(err => {
        console.error("Error: ", err);
    })

const getUsers = () =>
    getUsersBase().then(persons => {
        updateView(persons);
    })

btn.addEventListener("click", getUsers);

const addUser = () => {
    fetch('http://fecore.net.ua/rest/', {
            method: "POST",
            body: {
                id: "7777",
                name: "Pavel",
                score: 777
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        });
}

btn1.addEventListener("click", addUser);