const { shuffle } = require('lodash');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const searchTerms = shuffle([
    // Tecnologia Geral (50 termos)
    "O que é machine learning?", "Como funcionam as redes 5G",
    "Diferença entre IPv4 e IPv6", "Benefícios da computação em nuvem",
    "Como funciona um firewall", "O que é uma rede VPN",
    "Introdução à criptografia", "Melhores práticas de segurança na internet",
    "O que é um ataque DDoS", "Como proteger dados pessoais online",
    "Tendências em inteligência artificial", "O que é computação quântica",
    "Como funcionam os algoritmos de busca", "O que é big data",
    "Tutoriais de Python para redes", "Como configurar um servidor Linux",
    "O que é phishing digital", "Diferença entre HTTP e HTTPS",
    "Como criar uma rede segura em casa", "O que é blockchain",
    "Tendências em desenvolvimento web", "Como funcionam os certificados SSL",
    "O que é engenharia social", "Melhores antivírus 2024",
    "Como detectar malware", "O que é ethical hacking",
    "Tendências em IoT industrial", "Como funciona a autenticação de dois fatores",
    "O que é deepfake", "Riscos de redes Wi-Fi públicas",
    "Como usar ferramentas de pentest", "O que é ransomware",
    "Tendências em redes mesh", "Como funciona o protocolo TCP/IP",
    "O que é spoofing de IP", "Segurança em dispositivos médicos IoT",
    "Como proteger smart homes", "O que é shodan.io",
    "Tendências em cidades inteligentes", "Como funcionam os ataques de força bruta",
    "O que é zero trust security", "Melhores práticas para senhas seguras",
    "Como configurar um NAS caseiro", "O que é engenharia reversa",
    "Tendências em wearables", "Como funciona a tecnologia NFC",
    "O que é BYOD (Bring Your Own Device)", "Segurança em carros conectados",

    // Redes de Computadores (30 termos)
    "Como configurar um roteador TP-Link", "O que é SD-WAN",
    "Diferença entre switch e hub", "Como monitorar tráfego de rede",
    "Melhores práticas para QoS", "O que é MPLS",
    "Como fazer subnetting IPv4", "Tutorial de configuração VLAN",
    "O que é BGP protocol", "Como usar o Wireshark",
    "Tendências em redes 6G", "O que é latency em redes",
    "Como funcionam as CDNs", "Diferença entre TCP e UDP",
    "O que é network slicing", "Como configurar VPN no Windows 11",
    "Tendências em Wi-Fi 7", "O que é uma DMZ",
    "Como usar o traceroute", "O que é SNMP",
    "Segurança em redes corporativas", "Como fazer port forwarding",
    "O que é RTP protocol", "Troubleshooting de redes",
    "Como funciona o DNS", "O que é DHCP",
    "Tendências em redes ópticas", "Como configurar firewall pfSense",

    // Cybersecurity (30 termos)
    "Como prevenir vazamento de dados", "O que é um honeypot",
    "Tendências em segurança de APIs", "Como fazer análise forense",
    "O que é MITRE ATT&CK", "Melhores certificações de segurança",
    "Como usar o Metasploit", "O que é segurança ofensiva",
    "Tendências em AI para segurança", "Como detectar intrusões",
    "O que é bug bounty", "Segurança em aplicações web",
    "Como implementar SIEM", "O que é compliance GDPR",
    "Tendências em cloud security", "Como proteger endpoints",
    "O que é segurança DevSecOps", "Melhores práticas de log management",
    "Como responder a incidentes", "O que é segurança em containers",
    "Tendências em biometric security", "Como proteger dados na nuvem",
    "O que é threat intelligence", "Segurança em microserviços",
    "Como implementar PAM", "O que é segurança em 5G",

    // IoT (25 termos)
    "Como integrar Alexa com IoT", "O que é MQTT protocol",
    "Segurança em dispositivos IoT", "Tendências em smart cities",
    "Como usar Raspberry Pi para IoT", "O que é Zigbee",
    "Automação residencial com IoT", "Melhores sensores para IoT",
    "Como conectar IoT à nuvem", "O que é LoRaWAN",
    "Tendências em wearables", "IoT na agricultura",
    "Como usar Node-RED", "O que é digital twin",
    "Monitoramento industrial com IoT", "Tendências em smart grids",
    "Como proteger dispositivos IoT", "O que é edge computing",
    "IoT na saúde", "Como usar plataformas AWS IoT",
    "O que é matter protocol", "Tendências em IoT automotive",

    // Xbox (30 termos)
    "Gameplay de Halo Infinite", "Como jogar Forza Horizon 5",
    "Review de Starfield", "Dicas para Sea of Thieves",
    "Melhores jogos Xbox Game Pass", "Tutorial de Gears 5",
    "Novidades do Xbox Series X", "Como conseguir achievements",
    "Comparação Xbox vs PlayStation", "Dicas para Minecraft Dungeons",
    "Guia de Forza Motorsport 8", "Melhores FPS para Xbox",
    "Como usar o Xbox Cloud Gaming", "Review de Hellblade 2",
    "Dicas para State of Decay 3", "Gameplay de Fable 4",
    "Melhores jogos retrocompatíveis", "Como configurar o Xbox Elite Controller",
    "Guia de The Outer Worlds 2", "Dicas para Psychonauts 2",
    "Novidades do Xbox Game Studios", "Como jogar em co-op no Xbox",
    "Review de Contraband", "Melhores jogos indie para Xbox",
    "Tutorial de S.T.A.L.K.E.R. 2", "Dicas para Avowed",

    // PC (30 termos)
    "Melhores jogos Steam 2024", "Como montar um PC gamer",
    "Review de Cyberpunk 2077", "Dicas para Baldur's Gate 3",
    "Otimização para jogos em 4K", "Comparação RTX 4080 vs 4090",
    "Guia de mods para Skyrim", "Como jogar em ultrawide",
    "Tutoriais de Unreal Engine 5", "Melhores jogos de estratégia",
    "Como gravar gameplay", "Review de Star Citizen",
    "Dicas para Diablo IV", "Tendências em jogos indie",
    "Como fazer overclock seguro", "Melhores jogos free-to-play",
    "Guia de Cities: Skylines 2", "Como usar DLSS 3.0",
    "Review de The Sims 5", "Dicas para Counter-Strike 2",
    "Tendências em jogos VR", "Como jogar em cloud gaming PC",
    "Melhores jogos RPG 2024", "Como configurar hotkeys",

    // PlayStation (33 termos)
    "Gameplay de God of War Ragnarök", "Review de Spider-Man 2",
    "Dicas para Horizon Forbidden West", "Como jogar The Last of Us Part III",
    "Novidades do PSVR 2", "Guia de Gran Turismo 7",
    "Melhores exclusivos PlayStation", "Tutorial de Final Fantasy XVI",
    "Dicas para Ghost of Tsushima 2", "Review de Wolverine da Insomniac",
    "Como usar o DualSense Edge", "Comparação PS5 vs Xbox Series X",
    "Guia de Ratchet & Clank: Rift Apart", "Dicas para Returnal",
    "Gameplay de Stellar Blade", "Melhores jogos PS Plus Extra",
    "Como configurar HDR no PS5", "Review de Silent Hill 2 Remake",
    "Dicas para Death Stranding 2", "Tendências em jogos PlayStation",
    "Guia de Tekken 8", "Como jogar em 120Hz no PS5",
    "Review de Metal Gear Solid Delta", "Dicas para Assassin's Creed Mirage",
    "Melhores jogos de luta PS5", "Como usar o PlayStation Portal",
    "Gameplay de Final Fantasy VII Rebirth", "Dicas para multiplayer no PS5",
    "Novos recursos do PS5 Slim", "Guia de Rise of the Ronin",
    "Review de Until Dawn remake", "Como compartilhar jogos PS5"
]);

class edge {
    rewards = async () => {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            args: [
                '--disable-notifications',
                '--start-maximized',
                '--disable-blink-features=AutomationControlled',
                `--user-data-dir=${process.env.LOCALAPPDATA}\\Microsoft\\Edge\\User Data`
            ],
            defaultViewport: null,
            timeout: 60000
        });

        const page = await browser.newPage();

        try {
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 Edg/94.0.992.50');
            
            // Executa exatamente 31 pesquisas
            await this.executeSearches(browser, page);

        } finally {
            console.log('\n✅ Todas as 31 pesquisas foram concluídas! O navegador fechará em 10 segundos...');
            await page.waitForTimeout(10000);
            await browser.close();
        }
    };

    async executeSearches(browser, mainPage) {
        await mainPage.goto('https://rewards.bing.com/?form=ML2V0U', {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        // Limita às primeiras 31 pesquisas
        const termsToProcess = searchTerms.slice(0, 32);

        for (const [index, term] of termsToProcess.entries()) {
            try {
                console.log(`\n[${index + 1}/32] Pesquisando: ${term.substring(0, 31)}...`);
                
                const searchTab = await this.performSearch(browser, mainPage, term);
                await this.processSearchTab(searchTab, mainPage);
                await this.randomDelay(3000, 7000);

            } catch (error) {
                console.error(`Erro na pesquisa ${index + 1}: ${error.message}`);
                await this.recoverFromError(mainPage);
            }
        }
    }

    async performSearch(browser, mainPage, term) {
        // Preenche e executa pesquisa
        await mainPage.waitForSelector('#rewards-suggestedSearch-searchbox', { visible: true });
        await mainPage.click('#rewards-suggestedSearch-searchbox', { clickCount: 3 });
        await this.humanType(mainPage, term);

        const [searchTab] = await Promise.all([
            new Promise(resolve => browser.once('targetcreated', target => resolve(target.page()))),
            mainPage.keyboard.press('Enter')
        ]);

        await searchTab.waitForNavigation({ waitUntil: 'domcontentloaded' });
        return searchTab;
    }

    async processSearchTab(searchTab, mainPage) {
        try {
            await this.humanScroll(searchTab);
            await this.randomInteraction(searchTab);
        } finally {
            await searchTab.close();
            await mainPage.bringToFront();
        }
    }

    async humanType(page, term) {
        for (const char of term) {
            await page.type('#rewards-suggestedSearch-searchbox', char, {
                delay: Math.random() * 150 + 50
            });
            if (Math.random() < 0.1) {
                await page.keyboard.press('Backspace');
                await page.type('#rewards-suggestedSearch-searchbox', char);
            }
        }
    }

    async humanScroll(page) {
        await page.evaluate(async () => {
            await new Promise(resolve => {
                let total = 0;
                const timer = setInterval(() => {
                    window.scrollBy(0, Math.random() * 300 + 200);
                    total += 500;
                    if (total > 3500) {
                        clearInterval(timer);
                        resolve();
                    }
                }, Math.random() * 600 + 400);
            });
        });
    }

    async randomInteraction(page) {
        if (Math.random() > 0.6) {
            await page.mouse.move(
                Math.random() * 800,
                Math.random() * 600,
                { steps: Math.floor(Math.random() * 10) + 5 }
            );
            await page.waitForTimeout(800);
        }
    }

    async randomDelay(min, max) {
        await new Promise(resolve => 
            setTimeout(resolve, Math.random() * (max - min) + min)
        );
    }

    async recoverFromError(mainPage) {
        const pages = await mainPage.browser().pages();
        if (pages.length > 1) {
            await pages[pages.length - 1].close();
        }
        await mainPage.goto('https://rewards.bing.com/?form=ML2V0U');
    }
};

module.exports = edge;