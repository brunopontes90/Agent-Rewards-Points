const env = require('dotenv').config();

const open = require('./edge');
const edge = new open;

try {
    console.log(`========== INICIANDO ROBÔ ${process.env.APP_NAME} ==========`);
    edge.rewards();
} catch (error) {
    console.log(`Não foi possivel executar: ${error}`);
}