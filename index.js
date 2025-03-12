const env = require('dotenv').config();

const open = require('./edge');
const edge = new open;

// const portal = require('./edge');
// const senac = new portal;

try {
    console.log(`========== INICIANDO ROBÔ ${process.env.APP_NAME} ==========`);
    edge.rewards();
} catch (error) {
    console.log(`Não foi possivel executar: ${error}`);
}