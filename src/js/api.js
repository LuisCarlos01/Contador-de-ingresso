class APIService {
    constructor() {
        // Simulação da API para teste
        this.mockData = {
            count: 0
        };
    }

    async getCount() {
        // Simulação de chamada API
        return { count: this.mockData.count };
    }

    async registerTicket(data) {
        // Simulação de registro
        this.mockData.count = data.count;
        return { success: true, count: this.mockData.count };
    }

    async updateCounter(count) {
        // Simulação de atualização
        this.mockData.count = count;
        return { success: true, count: this.mockData.count };
    }
}