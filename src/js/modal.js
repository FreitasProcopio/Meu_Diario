const modal = () => {
  const btn = document.querySelector('.open-modal-btn');
  const notes = document.getElementById('notesModal');

  if (btn && notes) {
    btn.addEventListener('click', () => {
      notes.style.display = 'flex';
      notes.style.position = 'absolute';
    });

    const closeBtn = document.querySelector('.close-modal-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        notes.style.display = 'none';
      });
    }
  }
};

modal();