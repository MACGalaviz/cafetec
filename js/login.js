//const login = document.getElementById("login");
//const loginForm = document.getElementById("loginForm").submit();
// console.log(loginForm);
//import * as host from "./script";

let userNameText = document.getElementById("userNameText");
let userCashText = document.getElementById("userCashText");
const btnLogin = document.getElementById("btnLogin");
const btnChangePassword = document.getElementById("btnChangePassword");
const btnLogOut = document.getElementById("btnLogOut");
const btnCarrito = document.getElementById("carritoButton");

function login(){
    let host2 = document.getElementById("host");
    console.log(host2.value.trim());
    let host = host2.value.trim();
    const userInput = document.getElementById("userInput");
    const passwordInput = document.getElementById("passwordInput");
    let user = userInput.value.trim();
    console.log(user);
    let password = passwordInput.value.trim();
    console.log(password);
    const url = `http://${host}:3977/api/user`;
    let data = {control_number: user, password: password};
    console.log(data);
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:',response);
            sessionStorage.setItem("data",JSON.stringify(response[0]));
            console.log(sessionStorage.getItem("data"));
        });
    $('#modalClose').click();
    afterLogin();
};
//login();

//TODO parametros a login() asignar datos y cerrar sesion

function afterLogin() {
    const data = JSON.parse(sessionStorage.getItem("data"));
    console.log(data.control_number);

    //Mostrar en html
    userNameText.style.display = "";
    userCashText.style.display = "";
    btnChangePassword.style.display = "";
    btnLogOut.style.display="";
    btnCarrito.style.display="";

    // Ocultar en html
    btnLogin.style.display = "none";

    // mostrar
    userNameText.innerText = data.control_number;
    userCashText.innerText = data.cash;

}

