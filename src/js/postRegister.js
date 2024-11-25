const url = "http://localhost:3000/usuarios-login";

class Register {
    constructor(name_register, email_register, password_register, check_register) {
        this.name_register = name_register;
        this.email_register = email_register;
        this.password_register = password_register;
        this.check_register = check_register;
    }

    sensiveis = () => {
        if (this.email_register && this.name_register) {
            if (this.password_register === this.check_register) {
                const dados = {
                    "name": this.name_register,
                    "email": this.email_register,
                    "check_password": this.check_register
                };
                new POST_USER(url, dados);
            } else {
                throw new Error("As senhas não correspondem.");
            }
        } else {
            throw new Error("Preencha todos os campo2s");
        }
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

class ActionBtn {
    constructor() {
        this.span = document.getElementById('message'); 
        this.open(); 
    }

    open() {
        const btn = document.getElementById('btn-register');
        btn.addEventListener('click', () => {
            try {
                const name = document.getElementById('name_register').value.trim();
                const email = document.getElementById('email_register').value.trim();
                const password = document.getElementById('password_register').value.trim();
                const checkPassword = document.getElementById('check_register').value.trim();
    
                const registro = new Register(name, email, password, checkPassword);

                setTimeout(() => {
                    try {
                        setTimeout (() => registro.sensiveis(), 2000); 
                        this.showMessage("Successful", "#378137"); 
                    } catch (erro) {
                        this.showMessage(erro.message, "#b22929"); 
                    }
                }, 2000);
    
            } catch (erro) {
                this.showMessage(erro.message, "#b22929"); 
            }
        });
    }

    showMessage(message, color) {
        this.span.innerText = message;
        this.span.style.display = "flex";
        this.span.style.marginTop = "20px";
        this.span.style.color = color;

        setTimeout(() => this.closeMessage(), 2000);
    }
    
    closeMessage() {
        this.span.style.display = "none";

        document.getElementById('name_register').value = '';
        document.getElementById('email_register').value = '';
        document.getElementById('password_register').value = '';
        document.getElementById('check_register').value = '';
    }
}

new ActionBtn();