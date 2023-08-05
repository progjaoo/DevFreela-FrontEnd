function checkIfAnyRoleIsChecked() {

    let list = document.getElementsByName("role");
    let counter = 0;

    for (let radioButton of list) {
        if (radioButton.checked == false) {
            counter++;
        }
    }
    return counter !== list.length;
}


function cadastrar() {
    //Checa se a role foi checked
    if (checkIfAnyRoleIsChecked() === false) {
        Swal.fire(
            'Algo deu errado...',
            'Para prosseguir, escolhe se você é Dev ou Cliente',
            'error'
        )
        return;
    }

    //inicia a massa de dados
    let payloadUsers = {
        role: document.getElementsByName("role")[0].checked == true ? 'dev' : 'cliente',
        fullname: document.querySelector("#fullname").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    // Enviando para a API utilizando MockAPI para testes...
    fetch("https://64b7d58821b9aa6eb0791e15.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payloadUsers), //transformando o payload em string
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {

            Swal.fire({
                title: 'Parabéns!',
                text: "Usuário cadastrado com sucesso",
                icon: 'success',
                confirmButtonText: 'Ok!'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.setItem("userName", response.fullname);
                    localStorage.setItem("role", response.role === 'dev' ? "Desenvolvedor" : "Cliente");
                    localStorage.setItem("idClient", response.id);

                    window.location.href = "list.html";
                }
            })

        })
}