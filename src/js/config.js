
btn = document.querySelector('.open-modal-btn');
notes = document.getElementById('notesModal');

btn.addEventListener('click', () => {
  notes.style.display = 'flex';
  notes.style.position = 'absolute';
});

// Função para fechar o modal
function closeModal() {
  notes.style.display = 'none';
}