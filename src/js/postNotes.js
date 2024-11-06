const btnTitle = document.querySelector('.open-modal-btn'); // Corrigido o seletor de classe
const btnNotes = document.querySelector('.salve-modal-btn');
const url = "http://localhost:3001/notes";

class Register_Notes {
    constructor(title_notes, notes_area) {
        this.title_notes = title_notes;
        this.notes_area = notes_area;
    }

    conteudo() {
        if (this.title_notes && this.notes_area) {  // Verifica se ambos os campos têm conteúdo
            const takeNote = {
                "title": this.title_notes,
                "allNotes": this.notes_area
            };
            new POST_NOTES(url, takeNote);
        } else if (!this.title_notes) {
            throw new Error("Insira um título.");
        } else {
            throw new Error("Insira algo na nota.");
        }
    }
}

class ActionNotes {
    constructor() {
        this.btnTitle = btnTitle; // Inicializa os botões aqui
        this.btnNotes = btnNotes;
        this.notes();
    }

    notes() {
        this.btnTitle.addEventListener('click', () => {
            try {
                const title = document.getElementById('title_notes').value;
                const allNotes = document.getElementById('notes_area').value;
                
                const registro = new Register_Notes(title, allNotes); 
                registro.conteudo();
            } catch (erro) {
                console.log("ERROR:", erro.message);
            }
        });

        this.btnNotes.addEventListener('click', () => {
            try {
                const title = document.getElementById('title_notes').value;
                const allNotes = document.getElementById('notes_area').value;
                const registro = new Register_Notes(title, allNotes);
                registro.conteudo();
            } catch (erro) {
                console.log("ERROR:", erro.message);
            }
        });
    }
}

class POST_NOTES {
    constructor(url, takeNote) {
        this.connection(url, takeNote);
    }

    connection(url, takeNote) {
        try {
            console.log("Body=", takeNote);
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

            request.send(JSON.stringify(takeNote));
        } catch (erro) {
            console.log("Erro de conexão:", erro);
        }
    }
}

new ActionNotes();
