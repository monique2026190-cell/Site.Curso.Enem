import pg from 'pg';
import { appConfig } from '../config.js';
const { Pool } = pg;
// Configura o pool de conexões usando a variável de ambiente DATABASE_URL
// que é fornecida por serviços como o Render.
const pool = new Pool({
    connectionString: appConfig.DATABASE_URL,
    ssl: {
        // Em ambientes de produção, a conexão SSL é geralmente necessária.
        // A configuração pode variar dependendo do provedor de hospedagem.
        rejectUnauthorized: false,
    },
});
export default pool;
