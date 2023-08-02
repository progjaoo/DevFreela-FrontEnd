let list = [];

window.onload = function () {
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#role").innerText = localStorage.getItem("role");

    GetProjects();


}

function GetProjects() {
    fetch("https://64b7d58821b9aa6eb0791e15.mockapi.io/api/projects")
        .then(response => response.json())
        .then(response => {
            list = response;
            BuildTable();
        })
}

function GoToEdit(id) {
    window.location.href = `project-create-edit.html?id=${id}`;
}

function DeleteProject(id) {
    fetch(`https://64b7d58821b9aa6eb0791e15.mockapi.io/api/projects/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(response => {
            list = list.filter(project => project.id != id);

            BuildTable();
        })
}

function BuildTable() {
    document.querySelector("#table-body").innerHTML = '';

    list.forEach(elem => {
        let template = `<div class="row">
        <div class="title-description">
            <h6 class="title">
                ${elem.title}
            </h6>
            <p class="description">
                ${elem.description}
            </p>
        </div>
        <div class="price">R$ ${elem.totalCost}</div>
        <div class="actions">
            <span class="edit material-icons" onclick="GoToEdit(${elem.id})">edit</span>
            <span class="delete material-icons" onclick="DeleteProject(${elem.id})">delete_outline</span>
        </div>
    </div>`

        document.querySelector("#table-body").insertAdjacentHTML("beforeend", template);
    });
}