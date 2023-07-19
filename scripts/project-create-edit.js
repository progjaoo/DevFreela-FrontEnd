window.onload = function () {
    //type: 'create | edit'
    const screenType = 'create';

    if (screenType == 'create') {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto?";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    /*              MODO EDITAR
    if (screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }*/
}
function CadastrarProjeto() {
    let payloadProjects = {
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: "1"
    }

    // Enviando para a API utilizando MockAPI para testes...
    fetch("https://64b7d58821b9aa6eb0791e15.mockapi.io/api/projects", {
        method: 'POST',
        body: JSON.stringify(payloadProjects), //transformando o payload em string
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            alert("Cadastrado com sucesso");
        })
}