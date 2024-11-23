class allBasic {
    constructor() {
        this.getNotes = this.getNotes.bind(this);
    }

    async getUserId() {
        try {
            const response = await fetch('http://localhost:3000/usuarios-login');
            if (response.ok) {
                const users = await response.json();
                
                // Supondo que o primeiro usuário seja o logado, substitua esta lógica conforme necessário
                const loggedInUser = users[0]; // Ajuste conforme a estrutura do login
                return loggedInUser.id; // Retorna o `id` do usuário logado
            } else {
                console.error("Erro ao buscar o usuário logado:", response.status);
            }
        } catch (error) {
            console.error("Erro na requisição para obter o usuário:", error);
        }
    }

    async getNotes() {
        const userId = await this.getUserId(); // Obtém o ID do usuário logado da API

        if (userId) {
            try {
                const response = await fetch(`http://localhost:3001/notes?userId=${userId}`);
                if (response.ok) {
                    const data = await response.json();

                    const display = new Add();
                    data.forEach(note => {
                        display.displayNotes(note.id, note.title, note.allNotes);
                    });
                } else {
                    console.error('Erro ao buscar dados da API:', response.status);
                }
            } catch (error) {
                console.error('Erro de conexão com a API:', error);
            }
        } else {
            console.log("ID do usuário não encontrado.");
        }
    }
}


class Add {
    displayNotes(id, title, notes) {

        const conteudoCarrosel = document.querySelector('.conteudo_carrosel');

        const notePreview = document.createElement('div');
        notePreview.classList.add('note-preview');
        
        notePreview.innerHTML = `
            <h3>${title}</h3>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Deletar</button>
        `;

        conteudoCarrosel.appendChild(notePreview);

        const editor = new Editor();
        editor.enableEditing(notePreview, id, title, notes);

        const deleter = new Delete();
        deleter.enableDeleting(notePreview, id);
    }
}

class Editor {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        document.body.appendChild(this.modal);
    }

    enableEditing(noteElement, noteId, title, notes) {
        const editButton = noteElement.querySelector('.edit-btn');

        editButton.addEventListener('click', () => {
            this.openModal(noteId, title, notes);
        });
    }

    openModal(noteId, title, notes) {
        this.modal.innerHTML = `
            <div class="modal-content-notes">
                <h2>Edit - ${title}</h2>
                <textarea id="modalNotes" rows="10" placeholder="Edit your Notes">${notes}</textarea>
                <button id="saveModalBtnNotes">Salvar</button>
                <button id="closeModalBtnNotes">Fechar</button>
            </div>
        `;

        this.modal.style.display = 'block';

        const saveButton = this.modal.querySelector('#saveModalBtnNotes');
        const closeButton = this.modal.querySelector('#closeModalBtnNotes');

        saveButton.addEventListener('click', () => {
            const updatedContent = document.getElementById('modalNotes').value;
            this.saveChanges(noteId, updatedContent);
            this.closeModal();
        });

        closeButton.addEventListener('click', () => {
            this.closeModal();
        });
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    saveChanges(noteId, updatedContent) {
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", `http://localhost:3001/notes/${noteId}`);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log("Nota atualizada com sucesso.");
            } else {
                console.error("Erro ao atualizar a nota:", xhr.status);
            }
        };

        xhr.send(JSON.stringify({ allNotes: updatedContent }));
    }
}


class Delete {
    enableDeleting(noteElement, noteId) {
        const deleteButton = noteElement.querySelector('.delete-btn');

        deleteButton.addEventListener('click', () => {
            event.preventDefault();
            this.deleteNote(noteId, () => {
                noteElement.remove();
                console.log(`Nota com ID ${noteId} deletada com sucesso.`);
            });
        });
    }

    deleteNote(noteId, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `http://localhost:3001/notes/${noteId}`);
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                callback();
            } else {
                console.error("Erro ao deletar a nota:", xhr.status);
            }
        };

        xhr.send();
    }
}

// Cria uma instância de allBasic e chama o método para obter as notas
const notesApp = new allBasic();
notesApp.getNotes();
