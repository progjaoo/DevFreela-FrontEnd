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
    //se entrar aqui, é pq ta válido!
    if (checkIfAnyRoleIsChecked() === false) {
        alert("Marque se você é Dev ou Cliente!")
    }

    //pegar os dados da API
    let payload = {
        fullname: document.querySelector("#fullname").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }


    //if (document.getElementsByName("role")[0].checked === false) {


    //Enviar para API

}