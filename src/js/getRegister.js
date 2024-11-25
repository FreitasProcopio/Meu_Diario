class DataCollector {
    static getInputs() {
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;
        return { email, password };
    }
}

class CredentialChecker {
    constructor(data) {
        this.data = data;
    }

    checkCredentials(email, password) {
        const emailCorrect = this.data.some((usuario) => usuario.email === email);
        const passwordCorrect = this.data.some((usuario) => usuario.check_password === password);

        return emailCorrect && passwordCorrect;
    }
}

class Login {
    constructor() {
        this.getRegister = this.getRegister.bind(this);
        this.span = document.getElementById('message-login'); 
    }

    getRegister() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:3000/usuarios-login`);

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                const { email } = DataCollector.getInputs();
                const { password } = DataCollector.getInputs();
                
                const credentialChecker = new CredentialChecker(data); 

                if (credentialChecker.checkCredentials(email, password)) {
                    // Armazena o email do usuário logado no localStorage
                    localStorage.setItem('loggedInUser', email);
                    setTimeout(() => this.showMessage(), 1000);
                    setTimeout(() => { window.location.href = '../pages/notas.html'; }, 3000);
                } else {
                    setTimeout(() => this.errorMessage(), 1000);
                }
            } else {
                console.error('Erro ao buscar dados da API:', xhr.status);
            }
        };

        xhr.send();
    }

    showMessage() {
        this.span.innerText = "Successful";
        this.span.style.display = "flex";
        this.span.style.marginTop = "20px";
        this.span.style.color = "#378137";

        setTimeout(() => this.closeMessage(), 2000);
    }

    errorMessage() {
        this.span.innerText = "Check your Email or Password"
        this.span.style.display = "flex";
        this.span.style.marginTop = "20px";
        this.span.style.color = "#b22929";

        setTimeout(() => this.closeMessage(), 2000);
    }

    closeMessage() {
        this.span.style.display = "none";

        document.getElementById('email-login').value = '';
        document.getElementById('password-login').value = '';
    }
}

const btn = document.getElementById('btn-login');

btn.addEventListener('click', () => {
    const login = new Login();
    login.getRegister();
});
