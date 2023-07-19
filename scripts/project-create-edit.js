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
        idClient: "1"
    }

    // Enviando para a API utilizando MockAPI para testes...
    fetch(`https://64b7d58821b9aa6eb0791e15.mockapi.io/api/projects${screenType === 'edit' ? ('/' + params.id) : ''}`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payloadProjects), //transformando o payload em string
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (screenType === 'edit') {

                alert("Editado com sucesso");
            } else {
                alert("Cadastrado com sucesso");
            }

        })
}

window.onload = function () {
    trocaDeTextoDaPage();
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