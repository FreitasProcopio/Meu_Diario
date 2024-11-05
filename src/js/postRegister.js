const btn = document.getElementById('btn-register');
const span = document.getElementById('message');
const url = "http://localhost:3000/usuarios-login";

class Register {
    constructor(email_register, password_register, check_register) {
        this.email_register = email_register;
        this.password_register = password_register;
        this.check_register = check_register;
    }

    sensiveis = () => {
        if (this.email_register) { 
            if (this.password_register === this.check_register) {
                const dados = {
                    "email": this.email_register,
                    "check_password": this.check_register
                };
                new POST_USER(url, dados);
            } else {
                throw new Error("As senhas não correspondem.");
            }
        } else {
            throw new Error("Email não fornecido.");
        }
    }
}

class ActionBtn {
    constructor() {
        this.open();
    }

    open() {
        btn.addEventListener('click', () => {
            try {
                const email = document.getElementById('email_register').value;
                const password = document.getElementById('password_register').value;
                const checkPassword = document.getElementById('check_register').value;

                const registro = new Register(email, password, checkPassword);
                registro.sensiveis();

                setTimeout(() => this.showMessage(), 1000);
                
            } catch (erro) {
                span.innerText = erro.message;
                span.style.display = "flex";
                span.style.color = "red"; 
                
                setTimeout(() => this.closeMessage(), 2000);
            }
        });
    }

    showMessage() {
        span.innerText = "Successfully registered";
        span.style.display = "flex";
        span.style.color = "green";

        setTimeout(() => this.closeMessage(), 2000);    
    }
    
    closeMessage() {
        span.style.display = "none";

        document.getElementById('email_register').value = '';
        document.getElementById('password_register').value = '';
        document.getElementById('check_register').value = '';
    }
}

class POST_USER {
    constructor(url, dados) {
        this.connection(url, dados);
    }

    connection(url, dados) {
        try {
            console.log("Body=", dados);
            const request = new XMLHttpRequest();
            request.open("POST", url, true);
            request.setRequestHeader("Content-type", "application/json");

            request.onload = function () {
                if (request.status >= 200 && request.status < 300) {
                    console.log("Response:", request.responseText);
                } else {
                    console.error("Failed with status:", request.status);
                }
            };

            request.send(JSON.stringify(dados));
        } catch (erro) {
            console.log("Erro de conexão:", erro);
        }
    }
}

