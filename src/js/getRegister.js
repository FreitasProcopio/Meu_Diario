class DataCollector {
    // Esta classe coleta os dados de entrada do formulário
    static getInputs() {
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;
        return { email, password };
    }
}

class CredentialChecker {
    // Esta classe verifica as credenciais obtidas da API
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
    }

    getRegister() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:3000/usuarios-login`);

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                const { email } = DataCollector.getInputs();
                const { password } = DataCollector.getInputs();

                const credentialChecker = new CredentialChecker(data); // instânciando a classe e atribuindo o const a variável credentialChecker
                if (credentialChecker.checkCredentials(email, password)) {
                    console.log("OK");
                } else {
                    console.log("ERROR PASSWORD");
                }
            } else {
                console.error('Erro ao buscar dados da API:', xhr.status);
            }
        };

        xhr.send();
    }
}

const btn_login = document.getElementById('btn-login');
btn_login.addEventListener('click', () => {
    const login = new Login();
    login.getRegister();
});
