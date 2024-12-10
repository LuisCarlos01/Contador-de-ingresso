// Inicializa o contador com 0
let count = 0;

// Atualiza a exibição do contador
function updateDisplay() {
    const paddedCount = count.toString().padStart(4, '0');
    document.getElementById('digit1').textContent = paddedCount[0];
    document.getElementById('digit2').textContent = paddedCount[1];
    document.getElementById('digit3').textContent = paddedCount[2];
    document.getElementById('digit4').textContent = paddedCount[3];
}

// Salva o contador no Local Storage
function saveToLocalStorage() {
    localStorage.setItem('ipassCounter', count);
}

// Carrega o contador do Local Storage
function loadFromLocalStorage() {
    const savedCount = localStorage.getItem('ipassCounter');
    count = savedCount ? parseInt(savedCount, 10) : 0;
    updateDisplay();
}

// Incrementa o contador
function incrementCounter() {
    count++;
    saveToLocalStorage();
    updateDisplay();
    if (count === 1000) {
        launchConfetti();
    }
}

// Lança confetes
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5673', '#ff9d56', '#ffd1a3']
    });
}

// Permite editar o contador manualmente
function editCounter() {
    const newCount = prompt("Digite o novo valor do contador:", count);
    if (newCount !== null && !isNaN(newCount) && newCount >= 0) {
        count = parseInt(newCount, 10);
        saveToLocalStorage();
        updateDisplay();
    } else {
        alert("Por favor, insira um número válido.");
    }
}

// Configura os eventos dos botões
document.getElementById('incrementBtn').addEventListener('click', incrementCounter);
document.getElementById('editBtn').addEventListener('click', editCounter);

// Inicializa o contador ao carregar a página
window.onload = loadFromLocalStorage;
