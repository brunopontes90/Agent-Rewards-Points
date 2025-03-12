const env = require('dotenv').config();
const puppeteer = require('puppeteer');

class edge {
    rewards = async () => {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--disable-notifications',
                '--start-maximized'
            ]
        });

        const page = await browser.newPage();
        await page.setViewport(
            {
                width: 1280,
                height: 800
            }
        );

        try {
            // Acessa a página
            await page.goto(
                'https://rewards.bing.com/?form=ML2V0U',
                {
                    waitUntil: 'networkidle2',
                    timeout: 30000
                }
            );
            console.log('Página do Rewards carregada');

            // Aguarda o campo de e-mail estar disponível
            await page.waitForSelector('#i0116', {
                visible: true,
                timeout: 15000
            });

            // Preenche o e-mail
            await page.type(
                '#i0116',
                process.env.LOGIN_EMAIL,
                {
                    delay: 100,
                    timeout: 10000
                });
            console.log(`E-mail inserido: ${process.env.LOGIN_EMAIL}`);

            // Mantém o navegador aberto para visualização

            await page.click('#idSIButton9'); // Botão "Avançar"

            // Aguardar campo de senha
            await page.waitForSelector('#i0118', { visible: true });
            await page.type('#i0118', process.env.SENHA);
            console.log(`Senha inserida: **********`);

            // Clicar em "Entrar"
            await page.click('#idSIButton9');

            try {
                // Tenta encontrar o botão
                await page.waitForSelector('#idBtn_Back', { timeout: 5000 });
                await page.click('#idBtn_Back');
                console.log('Botão "Não" clicado');
            } catch (error) {
                console.log('Botão não encontrado, continuando...');
            }

            // Mantém o navegador aberto
            console.log('Pressione CTRL+C para encerrar');
            await new Promise(() => { }); // Mantém o processo aberto

            //await page.waitForTimeout(5000000000);
        } catch (error) {
            console.error('Erro durante a execução:', error);
        } finally {
            await browser.close();
        }
    };
};

module.exports = edge;