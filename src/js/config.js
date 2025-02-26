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