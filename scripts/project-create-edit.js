//pega os parametros da URL para saber se é edit ou create
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

//type: 'create | edit'
const screenType = params.id ? 'edit' : 'create';

function CriarOuEditar() {
    let payloadProjects = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: localStorage.getItem("idClient")
    }

    // Enviando para a API utilizando MockAPI para testes...
    fetch(`https://localhost:7014/api/projects${screenType === 'edit' ? ('/' + params.id) : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payloadProjects), //transformando o payload em string
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (screenType === 'edit') {

                Swal.fire({
                    title: 'Parabéns!',
                    text: "Projeto editado com sucesso",
                    icon: 'success',
                    confirmButtonText: 'Ok!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "list.html";
                    }
                })
            } else {
                Swal.fire({
                    title: 'Parabéns!',
                    text: "Projeto cadastrado com sucesso",
                    icon: 'success',
                    confirmButtonText: 'Ok!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "list.html";
                    }
                })
            }
        })
}

window.onload = function () {
    trocaDeTextoDaPage();
    FillInputs();
}

function FillInputs() {
    if (screenType == 'edit') {
        fetch(`https://localhost:7014/api/projects/${params.id}`)
            .then(response => response.json())
            .then(project => {
                document.querySelector('#title').value = project.title;
                document.querySelector('#totalCost').value = project.totalCost;
                document.querySelector('#description').value = project.description;

            })
    }
}


function trocaDeTextoDaPage() {
    if (screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto?";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    if (screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
}