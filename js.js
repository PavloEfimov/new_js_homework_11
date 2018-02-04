// Globs
const btn = document.querySelector("#js-btn");
const btn1 = document.querySelector("#js-btn-send");
const btn2 = document.querySelector("#js-btn-delete");
const btn3 = document.querySelector("#js-btn-update");
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



const getUsers = () =>
    fetch('http://fecore.net.ua/rest/')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Error fetching data");
    })
    .then(data => {
        updateView(data);


    })
    .catch(err => {
        console.error("Error: ", err);
    })


btn.addEventListener("click", getUsers);

const addUser = () => {
    let addUrl = `http://fecore.net.ua/rest/?action=1&name=${document.querySelector('#userName').value}&score=${document.querySelector('#userScore').value}`;
    fetch(addUrl)
        .catch(error => {
                console.error("Error:", error);
            }

        );
    document.querySelector("#user").reset();
}

btn1.addEventListener("click", addUser);
btn1.addEventListener("click", getUsers);

// const removeUser = () => {
//     fetch('http://fecore.net.ua/rest/', {
//             method: "DELETE",
//             body: {
//                 id: "2910",
//             }
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//         });
// }

// btn2.addEventListener("click", removeUser);


const updateUser = () => {
    fetch('http://fecore.net.ua/rest/', {
            method: "UPDATE",
            body: {
                id: "2910",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        });
}

btn3.addEventListener("click", updateUser);