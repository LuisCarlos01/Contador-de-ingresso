// Configuração inicial
const CONFIG = {
    API: {
        BASE_URL: 'http://localhost:3000', // Ajuste para sua URL real
        ENDPOINTS: {
            COUNT: '/count',
            REGISTER: '/register',
            UPDATE: '/update',
            SYNC: '/sync'
        },
        TIMEOUT: 5000
    },
    COUNTER: {
        STORAGE_KEY: 'ipassCounter',
        MAX_COUNT: 9999,
        MIN_COUNT: 0,
        SYNC_INTERVAL: 30000
    }
};

Object.freeze(CONFIG);

// Classe principal do contador
class IPassCounter {
    constructor() {
        this.count = 0;
        this.isInitialized = false;
        this.api = new APIService();
        this.initializeElements();
        this.initializeEventListeners();
        this.initialize();
    }

    initializeElements() {
        this.elements = {
            digits: Array.from({ length: 4 }, (_, i) => document.getElementById(`digit${i + 1}`)),
            incrementBtn: document.getElementById('incrementBtn'),
            editBtn: document.getElementById('editBtn'),
            syncBtn: document.getElementById('syncBtn'),
            connectionStatus: document.getElementById('connectionStatus')
        };
    }

    initializeEventListeners() {
        // Usar bind para manter o contexto correto
        this.elements.incrementBtn.addEventListener('click', this.increment.bind(this));
        this.elements.editBtn.addEventListener('click', this.edit.bind(this));
        this.elements.syncBtn.addEventListener('click', this.syncWithServer.bind(this));
    }

    async initialize() {
        try {
            const data = await this.api.getCount();
            this.count = data.count || 0;
            this.isInitialized = true;
            this.updateDisplay();
        } catch (error) {
            console.error('Erro na inicialização:', error);
            this.handleError(error);
        }
    }

    async increment() {
        try {
            if (this.count >= CONFIG.COUNTER.MAX_COUNT) {
                throw new Error('Valor máximo atingido!');
            }

            const newCount = this.count + 1;
            const result = await this.api.registerTicket({ count: newCount });
            
            if (result.success) {
                this.count = newCount;
                this.updateDisplay();
                this.checkCelebrationTriggers();
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    async edit() {
        try {
            const newValue = prompt(`Digite o novo valor (0-${CONFIG.COUNTER.MAX_COUNT}):`, this.count);
            
            if (newValue === null) return; // Usuário cancelou

            const parsedValue = parseInt(newValue, 10);
            
            if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > CONFIG.COUNTER.MAX_COUNT) {
                throw new Error(`Valor inválido. Use números entre 0 e ${CONFIG.COUNTER.MAX_COUNT}`);
            }

            const result = await this.api.updateCounter(parsedValue);
            
            if (result.success) {
                this.count = parsedValue;
                this.updateDisplay();
                this.checkCelebrationTriggers();
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    updateDisplay() {
        const paddedCount = this.count.toString().padStart(4, '0');
        this.elements.digits.forEach((digit, index) => {
            digit.textContent = paddedCount[index];
            digit.classList.add('flip');
            setTimeout(() => digit.classList.remove('flip'), 300);
        });
    }

    handleError(error) {
        console.error('Erro:', error);
        alert(error.message || 'Ocorreu um erro. Tente novamente.');
    }

    checkCelebrationTriggers() {
        if ([1000, 2000, 5000].includes(this.count)) {
            this.launchConfetti();
        }
    }

    launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.5 }
        });
    }
}

// Inicializar o contador
document.addEventListener('DOMContentLoaded', () => {
    window.ipassCounter = new IPassCounter();
});