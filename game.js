document.addEventListener("DOMContentLoaded", function () {
  const boards = document.querySelectorAll('.board');
  const colorPicker = document.getElementById('colorPicker');
  const versusMode = document.getElementById('versusMode');
  const messageBox = document.getElementById('message');
  let paintedCount = 0;
  const totalBoards = boards.length;

  // Загружаем сохранённый цвет
  const savedColor = localStorage.getItem('brushColor');
  if (savedColor) {
    colorPicker.value = savedColor;
  }

  colorPicker.addEventListener('input', () => {
    localStorage.setItem('brushColor', colorPicker.value);
  });

  function flickBrush(board) {
    board.classList.add('brush-flash');
    setTimeout(() => board.classList.remove('brush-flash'), 200);
  }

  boards.forEach((board) => {
    board.addEventListener('click', () => {
      if (!board.classList.contains('painted')) {
        board.classList.add('painted');
        board.style.backgroundColor = colorPicker.value;
        paintedCount++;
        flickBrush(board);

        if (versusMode.checked) {
          setTimeout(() => {
            if (Math.random() < 0.6) {
              board.classList.remove('painted');
              board.style.backgroundColor = '#deb887';
              paintedCount--;
              messageBox.textContent = 'Гек сработал быстрее — он перекрасил одну доску! 😈';
            }
          }, 500 + Math.random() * 800);
        }

        if (paintedCount === totalBoards) {
          messageBox.textContent = 'Ты победил! Забор блестит! ✨ Даже Гек не смог помешать!';
        }
      }
    });
  });
});