const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname);
const siteDirPath = path.join(dirPath, 'site');

// Cria a pasta 'site' se ela não existir
if (!fs.existsSync(siteDirPath)) {
    fs.mkdirSync(siteDirPath, { recursive: true });
}

const htmlPath = path.join(siteDirPath, 'index.html');
const csvPath = path.join(dirPath, 'lista_agents.csv');

// --- DICIONÁRIO DE DADOS MANUALMENTE CURADOS (39 AGENTES ESPECÍFICOS) ---
const curatedData = {
    'HIA (Health Insights Agent)': {
        framework: 'Geral',
        setor: 'Saúde',
        howItWorks: 'Utiliza LLMs integrados com prompts rigorosos de segurança médica para ler arquivos PDF de exames, isolar valores fora do intervalo de referência e decodificar termos complexos como taxas hormonais e leucogramas.',
        whyUseful: 'Combate a ansiedade médica gerando explicações legíveis e avisando de forma empática quando há real necessidade de procurar um pronto-socorro ou especialista.',
        whenToUse: 'Sistemas de pré-triagem hospitalar, portais de telessaúde e aplicativos de acompanhamento preventivo.',
        link: 'https://github.com/harshhh28/hia'
    },
    'AI Health Assistant': {
        framework: 'Geral',
        setor: 'Saúde',
        howItWorks: 'Cruza em tempo real dados de dispositivos vestíveis (pressão, oxigenação, frequência cardíaca) com o histórico de prontuários do paciente, disparando alertas de risco para as centrais médicas na presença de descompensações.',
        whyUseful: 'Salva vidas ao antecipar crises graves de hipertensão ou paradas cardíacas, além de organizar relatórios automatizados para os plantonistas.',
        whenToUse: 'Clínicas geriátricas inteligentes, monitoramento de UTI móvel e sistemas de planos de saúde preventivos.',
        link: 'https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics'
    },
    'Automated Trading Bot': {
        framework: 'Geral',
        setor: 'Finanças',
        howItWorks: 'Conecta-se a feeds de cotações em tempo real (Yahoo Finance), rodando cálculos automatizados de médias móveis exponenciais, RSI e MACD para disparar ordens de compra e venda baseadas em limites de risco stop-loss.',
        whyUseful: 'Executa estratégias matemáticas puras livre de hesitação ou ganância humana, mantendo o portfólio seguro contra quebras drásticas.',
        whenToUse: 'Bancos quantitativos, investidores privados e desenvolvedores de ferramentas de simulação e backtesting.',
        link: 'https://github.com/MingyuJ666/Stockagent'
    },
    'Virtual AI Tutor (EduGPT)': {
        framework: 'Geral',
        setor: 'Educação',
        howItWorks: 'Faz perguntas de diagnóstico inicial para inferir os pontos fracos do estudante. A partir disso, gera analogias didáticas simples sobre matérias como física ou programação e cria simulados customizados de reforço.',
        whyUseful: 'Democratiza o ensino individualizado de excelência respeitando o tempo de absorção de cada aluno, reduzindo a evasão escolar.',
        whenToUse: 'Escolas preparatórias para vestibulares, EdTechs de idiomas e universidades corporativas.',
        link: 'https://github.com/hqanhh/EduGPT'
    },
    '24/7 AI Chatbot Support': {
        framework: 'Geral',
        setor: 'Suporte',
        howItWorks: 'Utiliza barramentos RAG para pesquisar termos de garantia, manuais de produtos e guias comerciais no banco de dados vetorial, formulando respostas esclarecedoras em tom de voz institucional unificado.',
        whyUseful: 'Zera as filas de atendimento do nível 1 solucionando a maioria dos chamados banais, deixando a equipe humana livre para problemas complexos de faturamento.',
        whenToUse: 'Central de ajuda de e-commerces, canais de suporte de telecomunicações e atendimento inicial de serviços públicos.',
        link: 'https://github.com/NirDiamant/GenAI_Agents/blob/main/all_agents_tutorials/customer_support_agent_langgraph.ipynb'
    },
    'Product Recommendation Agent': {
        framework: 'Geral',
        setor: 'E-commerce',
        howItWorks: 'Avalia discretamente o comportamento do usuário: categorias buscadas, tempo gasto olhando fotos específicas e itens adicionados no carrinho, cruzando com históricos de clientes semelhantes para sugerir a oferta ideal.',
        whyUseful: 'Aumenta significativamente a taxa de conversão final e a receita por cliente exibindo complementos de compras de forma orgânica.',
        whenToUse: 'Grandes marketplaces online, serviços de assinatura mensal e e-commerces B2B complexos.',
        link: 'https://github.com/microsoft/RecAI'
    },
    'Self-Driving Delivery Agent': {
        framework: 'Geral',
        setor: 'Logística',
        howItWorks: 'Processa feeds de congestionamento, limites geográficos de circulação de caminhões e janelas de entrega de clientes para resolver equações combinatórias de menor custo e menor quilometragem rodada.',
        whyUseful: 'Reduz despesas com combustíveis, minimiza atrasos contratuais de fretes e previne o desgaste desnecessário de frotas de transporte.',
        whenToUse: 'Despachos de e-commerce expresso, frotas de entrega de supermercados e transportadoras industriais.',
        link: 'https://github.com/sled-group/driVLMe'
    },
    'Factory Process Monitoring Agent': {
        framework: 'Geral',
        setor: 'Indústria',
        howItWorks: 'Recupera dados de sensores físicos de máquinas (RPM, vibração térmica, consumo elétrico), acionando alertas preditivos de fadiga de componentes metálicos antes que quebras catastróficas paralisem a produção.',
        whyUseful: 'Economiza milhões em paradas não programadas e gastos com reparos de última hora em maquinários de grande porte.',
        whenToUse: 'Chãos de fábrica automobilísticos, indústrias petroquímicas e geradoras de energia.',
        link: 'https://github.com/yuchenxia/llm4ias'
    },
    'Property Pricing Agent': {
        framework: 'Geral',
        setor: 'Imobiliário',
        howItWorks: 'Acessa dados abertos de anúncios locais e transações imobiliárias oficiais, ponderando a metragem, número de quartos, proximidade de transporte público e taxas de valorização do bairro para sugerir o preço ótimo.',
        whyUseful: 'Garante negócios rápidos evitando a desvalorização por ociosidade do imóvel ou perdas de lucro por precificação abaixo do mercado.',
        whenToUse: 'Avaliadoras imobiliárias digitais, fundos imobiliários e portais de anúncios habitacionais.',
        link: 'https://github.com/AleksNeStu/ai-real-estate-assistant'
    },
    'Smart Farming Assistant': {
        framework: 'Geral',
        setor: 'Agricultura',
        howItWorks: 'Analisa índices de saturação vegetal por sensoriamento remoto, dados de umidade do solo e previsões climáticas severas, construindo planos de irrigação inteligente e dosagem correta de adubação por hectare.',
        whyUseful: 'Aumenta a eficiência das lavouras diminuindo o desperdício de água e pesticidas químicos, blindando a fazenda contra prejuízos climáticos.',
        whenToUse: 'Grandes latifúndios de grãos, cooperativas agroindustriais e startups de tecnologia no campo.',
        link: 'https://github.com/mohammed97ashraf/LLM_Agri_Bot'
    },
    'Energy Demand Forecasting Agent': {
        framework: 'Geral',
        setor: 'Energia',
        howItWorks: 'Varre dados de temperatura climática local, picos industriais de consumo e calendário escolar, calculando com alta precisão matemática a demanda energética necessária para evitar sobrecargas.',
        whyUseful: 'Previne apagões em massa, otimiza o uso de energias renováveis na rede e evita a queima cara de combustíveis em usinas termoelétricas auxiliares.',
        whenToUse: 'Operadoras nacionais do sistema elétrico, distribuidoras estaduais e indústrias eletrointensivas.',
        link: 'https://github.com/yecchen/MIRAI'
    },
    'Content Personalization Agent': {
        framework: 'Geral',
        setor: 'Entretenimento',
        howItWorks: 'Analisa microinterações de scroll, compartilhamentos diretos e tempo de fixação de olhar em vídeos ou posts, alimentando redes neurais que reorganizam o conteúdo do feed do usuário em tempo real.',
        whyUseful: 'Aumenta vertiginosamente o tempo de tela do usuário e a exposição orgânica de publicidade da plataforma.',
        whenToUse: 'Redes de mídia digital, plataformas de streaming e aplicativos de notícias agregadas.',
        link: 'https://github.com/crosleythomas/MirrorGPT'
    },
    'Legal Document Review Assistant': {
        framework: 'Geral',
        setor: 'Jurídico',
        howItWorks: 'Lê contratos em massa de forma semântica, localizando termos que contrariam leis vigentes (ex: LGPD), multas rescisórias abusivas ou lacunas contratuais ocultas que deixem a empresa desprotegida.',
        whyUseful: 'Reduz o tempo de análises contratuais corporativas complexas de semanas para minutos, mitigando a chance de processos judiciais caros.',
        whenToUse: 'Departamentos jurídicos empresariais, firmas de fusões e aquisições (M&A) e auditorias de compliance.',
        link: 'https://github.com/firica/legalai'
    },
    'Recruitment Recommendation Agent': {
        framework: 'Geral',
        setor: 'RH',
        howItWorks: 'Mapeia currículos em PDF e requisitos da vaga para representações vetoriais (embeddings), calculando a aderência real de competências e ranqueando os perfis técnicos mais adequados de forma automatizada.',
        whyUseful: 'Elimina o gargalo operacional de leitura manual de milhares de e-mails e currículos desorganizados na etapa de atração de talentos.',
        whenToUse: 'Startups de tecnologia em expansão acelerada de equipes, agências globais de recrutamento e seleção (R&S).',
        link: 'https://github.com/sentient-engineering/jobber'
    },
    'Virtual Travel Assistant': {
        framework: 'Geral',
        setor: 'Turismo',
        howItWorks: 'Interliga preços de voos, hotéis parceiros e pontos turísticos, calculando uma grade de horários eficiente que indica qual metrô pegar, onde comer e quanto tempo ficar em cada monumento histórico.',
        whyUseful: 'Promove uma experiência de viagem livre de imprevistos logísticos otimizando o orçamento do usuário e o tempo de estadia nas cidades.',
        whenToUse: 'Plataformas globais de viagens, agências de câmbio e concierge hoteleiro.',
        link: 'https://github.com/nirbar1985/ai-travel-agent'
    },
    'AI Game Companion Agent': {
        framework: 'Geral',
        setor: 'Games',
        howItWorks: 'Integra LLMs locais na engine do jogo, permitindo que o companheiro entenda instruções livres por voz, discuta rumos das missões e colabore em batalhas de forma dinâmica baseado em estatísticas de jogo.',
        whyUseful: 'Rompe com diálogos e mecânicas estáticas, promovendo jogos de alta imersão com narrativas que mudam a cada rodada.',
        whenToUse: 'Estúdios de jogos RPG e simuladores corporativos de realidade virtual.',
        link: 'https://github.com/onjas-buidl/LLM-agent-game'
    },
    'Real-Time Threat Detection Agent': {
        framework: 'Geral',
        setor: 'Segurança',
        howItWorks: 'Lê fluxos contínuos de logs de segurança, identificando padrões de força bruta de senhas, tentativas de conexões em portas bloqueadas ou downloads massivos de dados que indicam ataques ransomware em andamento.',
        whyUseful: 'Cria barreiras automáticas e alertas em segundos para blindar a infraestrutura de rede da empresa antes que ocorra o sequestro definitivo de servidores.',
        whenToUse: 'Infraestruturas bancárias, provedores de nuvem e startups SaaS que lidam com dados sensíveis.',
        link: 'https://github.com/NVISOsecurity/cyber-security-llm-agents'
    },
    'E-commerce Personal Shopper Agent': {
        framework: 'Geral',
        setor: 'E-commerce',
        howItWorks: 'Interage via chat amigável descobrindo o real objetivo do cliente (ex: quer câmera fotográfica para hobby ou trabalho), traduzindo especificações chatas de milímetros de lentes em benefícios práticos explicados.',
        whyUseful: 'Reduz drasticamente o abandono de carrinhos de compras indevidamente por inseguranças técnicas dos consumidores.',
        whenToUse: 'Portais de venda de eletrônicos, lojas de autopeças automotivas e varejo premium de maquiagem.',
        link: 'https://github.com/Hoanganhvu123/ShoppingGPT'
    },
    'Logistics Optimization Agent': {
        framework: 'Geral',
        setor: 'Logística',
        howItWorks: 'Usa modelos de previsão de séries temporais cruzados com greves de frete e flutuações sazonais para sugerir o volume ideal de compra de insumos, mantendo o estoque nos limites perfeitos.',
        whyUseful: 'Evita a falta de produtos nas gôndolas e previne o prejuízo de capital parado com caixas em galpões de alto aluguel.',
        whenToUse: 'Redes de drogarias, atacadistas de alimentos e distribuidoras de produtos de limpeza.',
        link: 'https://github.com/microsoft/OptiGuide'
    },
    'Vibe Hacking (Decepticon)': {
        framework: 'Geral',
        setor: 'Segurança',
        howItWorks: 'Simula o comportamento de hackers maliciosos: injeta strings maliciosas em campos de busca, realiza tentativas de brute-force em endpoints vulneráveis e mapeia vulnerabilidades, reportando os pontos fracos de forma proativa.',
        whyUseful: 'Permite fechar brechas graves de segurança em sistemas corporativos antes que invasores reais as descubram e iniciem chantagens.',
        whenToUse: 'Plataformas de pagamento digital, startups de finanças e auditorias anuais de segurança em nuvem.',
        link: 'https://github.com/PurpleAILAB/Decepticon'
    },
    'MediSuite-Ai-Agent': {
        framework: 'Geral',
        setor: 'Saúde',
        howItWorks: 'Lê prontuários, laudos e recibos emitidos por hospitais, cruza com as regras de cobertura da seguradora de saúde, detectando de forma prévia possíveis erros de codificação médica ou tentativas de cobranças indevidas de exames.',
        whyUseful: 'Evita glosas e disputas administrativas exaustivas de faturamento médico acelerando em até 80% o pagamento dos procedimentos autorizados.',
        whenToUse: 'Administradoras de convênios médicos, corretoras de saúde corporativas e redes hospitalares privadas.',
        link: 'https://github.com/MahmoudRabea13/MediSuite-Ai-Agent'
    },
    'Email Auto Responder Flow': {
        framework: 'CrewAI',
        setor: 'Comunicação',
        howItWorks: 'Cria uma equipe de agentes CrewAI: o primeiro lê a mensagem e extrai o tom. O segundo pesquisa o banco vetorial de manuais da empresa. O terceiro redige a resposta perfeitamente formatada e envia ao cliente.',
        whyUseful: 'Zera o tempo de resposta inicial de chamados de suporte técnico básicos, mantendo o tom profissional unificado 24 horas por dia.',
        whenToUse: 'Plataformas SaaS de alto tráfego, portais estudantis e caixas de entrada de sac.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/flows/email_auto_responder_flow'
    },
    'Meeting Assistant Flow': {
        framework: 'CrewAI',
        setor: 'Produtividade',
        howItWorks: 'Consome a transcrição completa do áudio da conversa de alinhamento técnico, mapeia os compromissos prometidos por cada engenheiro e envia um e-mail com a lista de pendências específicas de cada participante.',
        whyUseful: 'Elimina a inutilidade de reuniões sem ações práticas registradas, garantindo que o cronograma do projeto continue rodando perfeitamente.',
        whenToUse: 'Desenvolvimento corporativo ágil, equipes remotas internacionais e rotinas de diretoria de holdings.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/flows/meeting_assistant_flow'
    },
    'Self Evaluation Loop Flow': {
        framework: 'CrewAI',
        setor: 'RH',
        howItWorks: 'Conduz uma entrevista conversacional agradável com os funcionários sobre suas metas batidas e gargalos enfrentados no ano, compilando as notas e justificativas em um formulário estruturado de RH.',
        whyUseful: 'Promove um ambiente leve e transparente de coleta de feedbacks, poupando centenas de horas burocráticas de preenchimento manual de planilhas.',
        whenToUse: 'Plataformas de gestão de carreiras e departamentos corporativos de recursos humanos.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/flows/self_evaluation_loop_flow'
    },
    'Lead Score Flow': {
        framework: 'CrewAI',
        setor: 'Vendas',
        howItWorks: 'Cruza micro-dados de comportamento do prospect (artigos lidos no site, abertura de e-mails corporativos, cargo no LinkedIn) para classificar de forma matemática os leads prontos para a abordagem comercial.',
        whyUseful: 'Foca a energia dos vendedores seniores da empresa somente nas ligações com reais chances de conversão imediata de faturamento.',
        whenToUse: 'Operações B2B de ticket médio alto e integrações de CRM comercial.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/flows/lead-score-flow'
    },
    'Marketing Strategy Generator': {
        framework: 'CrewAI',
        setor: 'Marketing',
        howItWorks: 'Ativa robôs paralelos de CrewAI: um especialista em SEO mapeia as palavras-chaves de maior tráfego dos concorrentes. O estrategista cria o funil de atração e o redator formata a apresentação completa de campanhas.',
        whyUseful: 'Reduz o planejamento estratégico de campanhas de semanas para minutos, entregando insights ricos validados pelo mercado digital.',
        whenToUse: 'Agências de publicidade online, novas marcas no e-commerce e startups de serviços.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/crews/marketing_strategy'
    },
    'Job Posting Generator': {
        framework: 'CrewAI',
        setor: 'RH',
        howItWorks: 'Converte os requisitos rústicos de linguagens e ferramentas digitais informados por gerentes em descrições de vagas no tom ideal de atração da cultura da marca.',
        whyUseful: 'Garante anúncios atrativos que chamam a atenção de candidatos altamente qualificados reduzindo inscrições de perfis inadequados.',
        whenToUse: 'Times de atração de talentos de engenharia e plataformas de recrutamento.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/crews/job-posting'
    },
    'Recruitment Workflow': {
        framework: 'CrewAI',
        setor: 'RH',
        howItWorks: 'Dispara uma esteira de agentes autônomos: captam currículos nas caixas de e-mail, fazem a triagem técnica, aplicam testes de código e agendam horários na agenda do gestor de contratação.',
        whyUseful: 'Remove a burocracia cansativa do funil de RH permitindo que a liderança gaste tempo apenas entrevistando as pessoas certas.',
        whenToUse: 'Startups em expansão acelerada de colaboradores e redes de varejo de alta rotatividade.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/crews/recruitment'
    },
    'Match Profile to Positions': {
        framework: 'CrewAI',
        setor: 'RH',
        howItWorks: 'Compara a bagagem técnica descrita no currículo frente ao ecossistema real de código da empresa, identificando defasagens ou pontos fortes e preparando o roteiro de perguntas para a entrevista técnica.',
        whyUseful: 'Prepara o entrevistador de forma perfeita assegurando que o candidato possui real domínio sobre a rotina exigida.',
        whenToUse: 'Contratações seniores de TI, equipes de desenvolvimento em plataformas corporativas.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/crews/match_profile_to_positions'
    },
    'Instagram Post Generator': {
        framework: 'CrewAI',
        setor: 'Marketing',
        howItWorks: 'Pesquisa os temas de alta relevância do segmento na internet, redige a legenda usando gatilhos mentais fortes, monta o briefing detalhado da imagem para o designer e sugere as tags ideais.',
        whyUseful: 'Provê um calendário consistente de posts profissionais eliminando os bloqueios de criatividade do departamento de mídias.',
        whenToUse: 'Criadores de conteúdo, agências de assessoria de imprensa e marcas com faturamento focado no Instagram.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/crews/instagram_post'
    },
    'Landing Page Generator': {
        framework: 'CrewAI',
        setor: 'Webdev',
        howItWorks: 'Divide o trabalho: um agente redige o texto da página usando técnicas de copywriting de vendas. O segundo agente codifica o arquivo HTML5 responsivo com estilos CSS para captura de e-mails.',
        whyUseful: 'Coloca novas ofertas ou páginas de captura no ar em minutos sem requerer custos com desenvolvedores dedicados.',
        whenToUse: 'Testes de novos produtos de infoprodutores, afiliados de venda e marketing de validação.',
        link: 'https://github.com/crewAIInc/crewAI-examples/tree/main/crews/landing_page_generator'
    },
    'Task Solving with Code Gen': {
        framework: 'AutoGen',
        setor: 'Programação',
        howItWorks: 'Recebe as metas lógicas (ex: trate estes 50 PDFs e converta em tabelas), escreve scripts Python, executa a sandbox isolada local, captura erros lógicos de conexão e conserta a sintaxe recursivamente até passar sem falhas.',
        whyUseful: 'Total automação de processamento de dados e raspagem de web portais locais dispensando intervenção manual.',
        whenToUse: 'Analistas de dados corporativos tratando de planilhas gigantes de dados e automações gerais.',
        link: 'https://microsoft.github.io/autogen/0.2/docs/notebooks/agentchat_auto_feedback_from_code_execution'
    },
    'QA with Retrieval Chat / Qdrant': {
        framework: 'AutoGen',
        setor: 'Dados',
        howItWorks: 'Estrutura manuais gigantes, contratos complexos ou guias regulatórios no banco Qdrant. A IA busca semântica a semântica as respostas corretas, provendo trechos e referências exatas da fonte.',
        whyUseful: 'Elimina as alucinações de modelos geradores garantindo respostas seguras baseadas 100% no documento indexado.',
        whenToUse: 'Pesquisas em legislações complexas, centrais internas de suporte operacional de engenharia de indústrias.',
        link: 'https://microsoft.github.io/autogen/0.2/docs/notebooks/agentchat_RetrieveChat_qdrant'
    },
    'Group Chat Solver': {
        framework: 'AutoGen',
        setor: 'Colaboração',
        howItWorks: 'Integra robôs do AutoGen especialistas de áreas diferentes (compliance, copywriter, desenvolvedor) discutindo rumos em tempo real sob a governança de um robô líder de projeto, polindo a solução em conjunto.',
        whyUseful: 'Fornece tomadas de decisões equilibradas que consideram todos os pontos críticos corporativos de forma simultânea.',
        whenToUse: 'Brainstorms estratégicos de produtos, análises multifacetadas de fusões de negócios.',
        link: 'https://microsoft.github.io/autogen/0.2/docs/notebooks/agentchat_groupchat'
    },
    'Data Visualization by Group Chat': {
        framework: 'AutoGen',
        setor: 'Dados',
        howItWorks: 'Conecta um agente analista de dados que extrai os indicadores e gráficos da marca e um agente estilizador de layouts. O stlyer formata um documento PDF visualmente atraente pronto para a diretoria.',
        whyUseful: 'Economiza o tempo desperdiçado com a formatação repetitiva e desgastante de slides de fechamento de metas semanais.',
        whenToUse: 'Fechamentos mensais de resultados comerciais, relatórios periódicos de desempenho de sistemas.',
        link: 'https://microsoft.github.io/autogen/0.2/docs/notebooks/agentchat_groupchat_vis'
    },
    'Society of Mind (Inner-Monologue)': {
        framework: 'AutoGen',
        setor: 'Tecnologia',
        howItWorks: 'Submete a questão do usuário a dois processos de reflexão interna opostos (gerador vs auditor). Eles dialogam de forma oculta polindo inconsistências conceituais e lógicas antes de dar o veredito público.',
        whyUseful: 'Reduz severamente a probabilidade de falhas e furos conceituais em respostas que demandam extrema precisão.',
        whenToUse: 'Lógica computacional exata, validação de regras de segurança física e verificação científica de patentes.',
        link: 'https://microsoft.github.com/autogen/0.2/docs/notebooks/agentchat_society_of_mind'
    },
    'Nested Chats (Conversas Aninhadas)': {
        framework: 'AutoGen',
        setor: 'Processos',
        howItWorks: 'No chat de suporte público, o robô intercepta dados sensíveis (ex: conta de banco) e abre secretamente um subset de conversação com um robô de compliance para obter a liberação de segurança antes de prosseguir.',
        whyUseful: 'Garante o cumprimento estrito de normas corporativas de compliance de dados em atendimento automatizado.',
        whenToUse: 'Atendimento inicial bancário de alta segurança, centrais de triagem de planos de previdência corporativa.',
        link: 'https://microsoft.github.com/autogen/0.2/docs/notebooks/agentchat_nestedchat'
    },
    'Web Surfer Agent': {
        framework: 'AutoGen',
        setor: 'Busca',
        howItWorks: 'Controla navegadores Chromium ocultos via Playwright. A IA entra no Google, clica em links, rola a página capturando parágrafos textuais e formata resumos com fontes precisas.',
        whyUseful: 'Permite acessar informações frescas da internet de hoje que não estavam incluídas no banco de dados fixo do modelo.',
        whenToUse: 'Clipagem diária de fatos geopolíticos importantes, acompanhamento de oscilações cambiais de mercado.',
        link: 'https://github.com/microsoft/autogen/blob/0.2/notebook/agentchat_surfer.ipynb'
    },
    'SQL Spider DB Agent': {
        framework: 'AutoGen',
        setor: 'Dados',
        howItWorks: 'Lê a estrutura lógica das tabelas do banco de dados, escreve a instrução de consulta SQL perfeitamente limpa, roda diretamente no ERP da empresa e exibe os relatórios solicitados de forma perfeitamente formatada.',
        whyUseful: 'Dá independência de dados a gerentes corporativos permitindo consultar relatórios de vendas sem sobrecarregar programadores.',
        whenToUse: 'Consultas de dashboards executivos rápidos e controle interno de vendas integrados a bancos PostgreSQL/MySQL.',
        link: 'https://github.com/microsoft/autogen/blob/0.2/notebook/agentchat_sql_spider.ipynb'
    },
    'Agno Support Agent / Assist': {
        framework: 'Agno',
        setor: 'Suporte',
        howItWorks: 'Monitora e consome toda a base de documentações públicas e manuais do framework Agno, provendo respostas lógicas de backend com trechos funcionais de códigos para desenvolvedores seniores.',
        whyUseful: 'Acelera consideravelmente o desenvolvimento de novos sistemas diminuindo a necessidade de pesquisa em guias locais.',
        whenToUse: 'Centrais de dúvidas de desenvolvimento e suporte automatizado de plataformas digitais.',
        link: 'https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/agno_support_agent.py'
    },
    'YouTube Analytica Agent': {
        framework: 'Agno',
        setor: 'Conteúdo',
        howItWorks: 'Captura as legendas textuais anexadas nos vídeos na API do YouTube, lê e estrutura o fluxo de temas ordenando por marcações de tempo exatas com sínteses de conteúdo altamente didáticas.',
        whyUseful: 'Poupa horas de visualização de aulas longas de concorrentes extraindo a essência textual com exatidão.',
        whenToUse: 'Análise de canais rivais, portais educacionais internos e curadorias corporativas de vídeos.',
        link: 'https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/youtube_agent.py'
    },
    'Finance / Thinking Finance Agent': {
        framework: 'Agno',
        setor: 'Finanças',
        howItWorks: 'Cruza demonstrativos trimestrais (DRE) com feeds de cotações das ações e notícias globais do mercado financeiro, provendo visões de solidez e saúde econômica da marca de forma instantânea.',
        whyUseful: 'Proporciona subsídios rápidos de auditoria financeira antes de reuniões de investimentos corporativos.',
        whenToUse: 'Carteiras administradas de fundos de previdência, planejamento orçamentário anual de holdings.',
        link: 'https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/thinking_finance_agent.py'
    },
    'Journalistic Research Agent': {
        framework: 'Agno',
        setor: 'Escrita',
        howItWorks: 'Consome buscadores corporativos em busca de dados, faz cruzamento em lote para atestar a autenticidade das notícias e redige um texto no clássico modelo da grande imprensa profissional.',
        whyUseful: 'Garante o fluxo constante de notícias de nicho nas newsletters da marca sem desvios factuais ou furos de lógica.',
        whenToUse: 'Portais de notícias digitais segmentadas e newsletters corporativas em plataformas pagas.',
        link: 'https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/research_agent.py'
    },
    'Legal Consultant Agent': {
        framework: 'Agno',
        setor: 'Jurídico',
        howItWorks: 'Examina semanticamente termos do processo, localiza conflitos lógicos frente à jurisprudência nacional e monta um sumário detalhado alertando o advogado sobre prazos e riscos eminentes.',
        whyUseful: 'Protege a empresa contra erros processuais graves cometidos por analistas juniores devido à fadiga de leitura.',
        whenToUse: 'Due diligence contratuais de alto valor e grandes escritórios de assessoria judicial corporativa.',
        link: 'https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/legal_consultant.py'
    },
    'DeepKnowledge Agent': {
        framework: 'Agno',
        setor: 'Pesquisa',
        howItWorks: 'Ao receber uma meta complexa, divide o tema em até 10 submetas de pesquisas paralelas e cruzadas, varre repositórios inteiros e monta um dossiê analítico de nível de pós-graduação.',
        whyUseful: 'Proporciona um mapeamento completo e sem pontos cegos sobre mercados novos ou patentes industriais complexas.',
        whenToUse: 'Equipes de P&D (Pesquisa e Desenvolvimento), planejamento estratégico anual e inteligência competitiva.',
        link: 'https://github.com/agno-agi/agno/blob/main/cookbook/examples/agents/deep_knowledge.py'
    },
    'Chatbot Simulation Evaluation': {
        framework: 'LangGraph',
        setor: 'Qualidade',
        howItWorks: 'Executa robôs de teste baseados em perfis irritados, desconfiados ou invasivos que tentam quebrar ou tirar o chatbot do compliance em um canal fechado, emitindo um relatório completo de pontuações de estabilidade.',
        whyUseful: 'Protege a imagem da empresa evitando que falhas de conexão ou alucinações de conduta cheguem ao público real.',
        whenToUse: 'Homologações regulamentares de suporte em bancos, fintechs e seguradoras antes do go-live.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/chatbot-simulation-evaluation/agent-simulation-evaluation.ipynb'
    },
    'Information Gathering via Prompting': {
        framework: 'LangGraph',
        setor: 'Triagem',
        howItWorks: 'Usa um fluxograma rígido no LangGraph: a conversa só avança se o usuário preencher dados válidos (como CEP, telefone e e-mail). O robô valida os inputs de forma amigável no chat até completar a ficha.',
        whyUseful: 'Garante preenchimento completo de cadastros eliminando fichas incompletas ou fakes no banco de vendas.',
        whenToUse: 'Triagens de captação de leads bancários de alta renda, contratações de seguros digitais.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/chatbots/information-gather-prompting.ipynb'
    },
    'Code Assistant with Auto-Correction': {
        framework: 'LangGraph',
        setor: 'Programação',
        howItWorks: 'Roda no fluxo cíclico do LangGraph: codifica o microsserviço ➔ compila em sandbox local ➔ captura bugs ➔ revisa a tese logical ➔ altera código ➔ repete o ciclo até a compilação fechar 100% perfeita.',
        whyUseful: 'Entrega códigos de infraestrutura estáveis e livres de erros básicos de sintaxe sem requerer retrabalho técnico.',
        whenToUse: 'Geradores de rotinas e scripts de backend, pipelines integradores corporativos em ambientes Kubernetes.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/code_assistant/langgraph_code_assistant.ipynb'
    },
    'Enterprise Customer Support Agent': {
        framework: 'LangGraph',
        setor: 'Suporte',
        howItWorks: 'Utiliza lógica determinística de grafos. A IA atende dúvidas básicas baseada no manual e desvia a conversa para a liderança humana do suporte no momento em que detecta que a solicitação exige aprovações manuais.',
        whyUseful: 'Mantém o cliente bem assistido em canais digitais sem o risco do robô inventar concessões ou descontos indevidos.',
        whenToUse: 'Operações de atendimento de companhias aéreas, suporte técnico de telecomunicações.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/customer-support/customer-support.ipynb'
    },
    'Adaptive RAG Flow': {
        framework: 'LangGraph',
        setor: 'Busca',
        howItWorks: 'Avalia a pergunta: questões recorrentes são respondidas com a base de FAQs locais. Questões técnicas demandam buscas vetoriais em manuais densos. Questões inéditas disparam rotinas de busca no Google.',
        whyUseful: 'Provê a melhor resposta em milissegundos sem sobrecarregar os servidores com buscas pesadas desnecessárias.',
        whenToUse: 'Autoatendimento técnico avançado de produtos eletrônicos e centrais de triagem de ISPs.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/rag/langgraph_adaptive_rag.ipynb'
    },
    'Corrective RAG (CRAG)': {
        framework: 'LangGraph',
        setor: 'Busca',
        howItWorks: 'Lê semanticamente o bloco de documentos retornado pela busca semântica do banco, filtra passagens reais relevantes e descarta páginas errôneas que causariam alucinações na resposta final da IA.',
        whyUseful: 'Eleva absurdamente a precisão da resposta gerada em ambientes bancários ou hospitalares que não aceitam mentiras.',
        whenToUse: 'Sistemas corporativos internos de auditorias financeiras e suporte a tratamentos clínicos.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/rag/langgraph_crag.ipynb'
    },
    'Self-RAG': {
        framework: 'LangGraph',
        setor: 'Busca',
        howItWorks: 'Gera a resposta e roda um validador interno que checa se a afirmação tecida é baseada nas fontes válidas do banco. Se detectar alucinação conceitual, a IA apaga o texto e reescreve de forma correta.',
        whyUseful: 'Zera as chances de erros factuais grotescos mantendo a governança e a segurança de imagem da marca.',
        whenToUse: 'Buscadores internos de jurisprudência e centrais regulatórias de auditorias de conformidade corporativa.',
        link: 'https://github.com/langchain-ai/langgraph/blob/main/docs/docs/tutorials/rag/langgraph_self_rag.ipynb'
    }
};

// --- LEITOR E PARSER AUTOMÁTICO DE CSV DO WORKSPACE ---
function parseCSVFile(filePath) {
    const csvContent = fs.readFileSync(filePath, 'utf8');
    const lines = csvContent.split(/\r?\n/);
    const results = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        let fields = [];
        let currentField = '';
        let insideQuotes = false;
        
        for (let c = 0; c < line.length; c++) {
            const char = line[c];
            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                fields.push(currentField.trim());
                currentField = '';
            } else {
                currentField += char;
            }
        }
        fields.push(currentField.trim());
        
        if (fields.length >= 5) {
            results.push({
                name: fields[0].replace(/^"|"$/g, '').trim(),
                frameworkRaw: fields[1].replace(/^"|"$/g, '').trim(),
                setor: fields[2].replace(/^"|"$/g, '').trim(),
                description: fields[3].replace(/^"|"$/g, '').trim(),
                useCase: fields[4].replace(/^"|"$/g, '').trim()
            });
        }
    }
    return results;
}

// --- DYNAMIC DATA MERGE ---
const rawAgents = parseCSVFile(csvPath);
const finalAgents = rawAgents.map(a => {
    // Normaliza o framework
    let framework = 'Geral';
    const fwLower = a.frameworkRaw.toLowerCase();
    if (fwLower.includes('crewai')) framework = 'CrewAI';
    else if (fwLower.includes('autogen')) framework = 'AutoGen';
    else if (fwLower.includes('agno') || fwLower.includes('phidata')) framework = 'Agno';
    else if (fwLower.includes('langgraph')) framework = 'LangGraph';
    
    // Se o agente já foi curado manualmente, traz os dados ricos
    if (curatedData[a.name]) {
        return {
            name: a.name,
            framework: framework,
            setor: a.setor || curatedData[a.name].setor,
            description: a.description,
            howItWorks: curatedData[a.name].howItWorks,
            whyUseful: curatedData[a.name].whyUseful,
            whenToUse: curatedData[a.name].whenToUse,
            link: curatedData[a.name].link
        };
    }
    
    // Fallbacks dinâmicos de alta qualidade para preencher os 86 agentes perfeitamente
    let link = 'https://github.com/ashishpatel26/500-AI-Agents-Projects';
    if (framework === 'CrewAI') link = 'https://github.com/crewAIInc/crewAI-examples';
    else if (framework === 'AutoGen') link = 'https://github.com/microsoft/autogen';
    else if (framework === 'Agno') link = 'https://github.com/agno-agi/agno';
    else if (framework === 'LangGraph') link = 'https://github.com/langchain-ai/langgraph';

    return {
        name: a.name,
        framework: framework,
        setor: a.setor,
        description: a.description,
        howItWorks: `Executa sob a lógica modular de barramentos de IA do framework ${framework}, utilizando agentes autônomos configurados para decodificar, tratar e processar dados associados ao domínio de ${a.setor.toLowerCase()}.`,
        whyUseful: `Proporciona agilidade imediata e consistência técnica na automação de processos, simplificando significativamente a seguinte rotina de uso: ${a.useCase.toLowerCase()}.`,
        whenToUse: `${a.useCase} e em projetos corporativos integradores em larga escala.`,
        link: link
    };
});

// Estatísticas para o painel
const totalAgentsCount = finalAgents.length;
const uniqueSectors = [...new Set(finalAgents.map(a => a.setor))];
const totalSectorsCount = uniqueSectors.length;

const crewAiCount = finalAgents.filter(a => a.framework === 'CrewAI').length;
const autoGenCount = finalAgents.filter(a => a.framework === 'AutoGen').length;
const agnoCount = finalAgents.filter(a => a.framework === 'Agno').length;
const langGraphCount = finalAgents.filter(a => a.framework === 'LangGraph').length;
const geralCount = finalAgents.filter(a => a.framework === 'Geral').length;

// HTML do painel cyber premium DAS Vaporwave
const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LOWAS — AI Agents Universe — Database Premium</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            /* Palette Cósmica - Espelho do Universo */
            --bg-color: #050507;
            --grid-color: rgba(139, 0, 255, 0.05);
            --card-bg: rgba(10, 8, 20, 0.75);
            --card-border: rgba(192, 38, 255, 0.15);
            --text-primary: #f1e4ff;
            --text-secondary: #a395b8;
            --accent-purple: #8B00FF;
            --accent-violet: #C026FF;
            --accent-magenta: #FF007F;
            --accent-gold: #FFD700;
            --accent-cyan: #00F0FF;
            
            --tag-crewai: #10b981;
            --tag-autogen: #f59e0b;
            --tag-agno: #3b82f6;
            --tag-langgraph: #06b6d4;
            --tag-geral: #8b5cf6;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            line-height: 1.6;
            padding-bottom: 120px;
            overflow-x: hidden;
            position: relative;
            
            /* Grid Cósmico Padrão */
            background-image: 
                linear-gradient(var(--grid-color) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
            background-size: 50px 50px;
        }

        /* Efeitos de Luz de Fundo (Nebulosas) */
        body::before {
            content: '';
            position: fixed;
            top: 20%; left: 30%;
            width: 50vw; height: 50vw;
            background: radial-gradient(circle, rgba(139, 0, 255, 0.08) 0%, transparent 70%);
            z-index: 0;
            pointer-events: none;
            filter: blur(80px);
        }

        body::after {
            content: '';
            position: fixed;
            bottom: 10%; right: 20%;
            width: 60vw; height: 60vw;
            background: radial-gradient(circle, rgba(255, 0, 127, 0.05) 0%, transparent 70%);
            z-index: 0;
            pointer-events: none;
            filter: blur(100px);
        }

        /* Canvas de Constelações Dinâmicas */
        #starfield {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }

        /* --- CRT EFEITO SCANLINES --- */
        .scanline-overlay {
            position: fixed;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(139, 0, 255, 0.08) 50%);
            z-index: 99999;
            background-size: 100% 4px;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .scanline-overlay.disabled {
            opacity: 0;
        }

        /* --- 3D GRID PERSPECTIVA ANIMAÇÃO --- */
        .retro-grid-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 400px;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
            opacity: 0.6;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
        }

        .retro-grid-3d {
            background-image: 
                linear-gradient(rgba(192, 38, 255, 0.06) 2px, transparent 2px),
                linear-gradient(90deg, rgba(192, 38, 255, 0.06) 2px, transparent 2px);
            background-size: 40px 40px;
            width: 200%;
            height: 800px;
            position: absolute;
            top: -200px;
            left: -50%;
            transform: perspective(180px) rotateX(60deg);
            animation: gridScroll 20s linear infinite;
        }

        @keyframes gridScroll {
            0% { background-position: 0 0; }
            100% { background-position: 0 800px; }
        }

        /* --- TOP NAV BAR --- */
        .cyber-navbar {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            z-index: 10;
            border-bottom: 1px solid rgba(192, 38, 255, 0.15);
            background: rgba(5, 5, 7, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        .nav-logo {
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            font-size: 1.5rem;
            color: #ffffff;
            text-shadow: 0 0 10px var(--accent-purple);
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .nav-logo span {
            color: var(--accent-magenta);
            text-shadow: 0 0 8px var(--accent-magenta);
        }

        .nav-actions {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .sys-button {
            background: transparent;
            border: 1px solid var(--accent-purple);
            color: var(--text-primary);
            font-family: 'Share Tech Mono', monospace;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 0 8px rgba(139, 0, 255, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 44px; /* Touch target */
        }

        .sys-button:hover {
            background: linear-gradient(135deg, var(--accent-purple), var(--accent-violet));
            color: #ffffff;
            border-color: transparent;
            box-shadow: 0 0 18px rgba(192, 38, 255, 0.4);
            transform: translateY(-2px);
        }

        .sys-button.cyan-btn {
            border-color: var(--accent-cyan);
            color: var(--accent-cyan);
            box-shadow: 0 0 8px rgba(0, 240, 255, 0.15);
        }

        .sys-button.cyan-btn:hover {
            background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
            color: #050507;
            border-color: transparent;
            box-shadow: 0 0 18px rgba(0, 240, 255, 0.4);
        }

        /* --- HERO SECTION --- */
        .hero-section {
            max-width: 1400px;
            margin: 0 auto;
            padding: 70px 24px 40px;
            text-align: center;
            position: relative;
            z-index: 1;
        }

        .hero-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 4rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 0 25px rgba(192, 38, 255, 0.7), 0 0 50px rgba(139, 0, 255, 0.4);
            letter-spacing: 4px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .hero-subtitle {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--accent-magenta);
            text-shadow: 0 0 12px rgba(255, 0, 127, 0.6);
            letter-spacing: 8px;
            margin-bottom: 20px;
            text-transform: uppercase;
        }

        .hero-description {
            font-family: 'Inter', sans-serif;
            color: var(--text-secondary);
            font-size: 1.1rem;
            max-width: 750px;
            margin: 0 auto 40px;
            font-weight: 300;
            line-height: 1.6;
        }

        /* --- METRICS GRID --- */
        .metrics-grid {
            display: flex;
            justify-content: center;
            gap: 25px;
            flex-wrap: wrap;
            max-width: 1000px;
            margin: 0 auto;
        }

        .metric-card {
            background: rgba(10, 8, 25, 0.7);
            border: 1.5px solid rgba(192, 38, 255, 0.2);
            border-radius: 20px;
            padding: 22px 30px;
            min-width: 220px;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .metric-card:hover {
            transform: translateY(-5px);
            border-color: var(--accent-violet);
            box-shadow: 0 15px 35px rgba(192, 38, 255, 0.15), 0 0 20px rgba(192, 38, 255, 0.1);
        }

        .metric-icon {
            font-size: 1.8rem;
            margin-bottom: 10px;
        }

        .metric-value {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            margin-bottom: 4px;
        }

        .metric-label {
            font-family: 'Share Tech Mono', monospace;
            color: var(--accent-cyan);
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 1px;
            font-weight: bold;
        }

        /* --- STELLAR SUMMON (GACHA) --- */
        .summon-section {
            max-width: 1400px;
            margin: 0 auto 50px;
            padding: 0 24px;
            position: relative;
            z-index: 10;
        }

        .summon-container {
            background: linear-gradient(135deg, rgba(15, 8, 30, 0.8) 0%, rgba(5, 4, 15, 0.95) 100%);
            border: 2px solid rgba(192, 38, 255, 0.25);
            border-radius: 28px;
            padding: 35px;
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 
                        0 0 30px rgba(139, 0, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .summon-container::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(192, 38, 255, 0.05) 0%, transparent 60%);
            pointer-events: none;
            z-index: 0;
        }

        .summon-header {
            text-align: center;
            margin-bottom: 25px;
            position: relative;
            z-index: 1;
        }

        .summon-header h3 {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            font-weight: 800;
            color: #ffffff;
            text-shadow: 0 0 12px var(--accent-purple);
            letter-spacing: 1.5px;
            margin-bottom: 6px;
        }

        .summon-header p {
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        .summon-panel {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 50px;
            flex-wrap: wrap;
            position: relative;
            z-index: 1;
        }

        .summon-orb-wrapper {
            position: relative;
            width: 140px;
            height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .summon-orb {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 0, 127, 0.8) 0%, rgba(139, 0, 255, 0.6) 50%, rgba(5, 5, 10, 0.9) 100%);
            border: 2px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 35px rgba(192, 38, 255, 0.6), 
                        inset 0 0 25px rgba(0, 240, 255, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
        }

        .summon-orb:hover {
            transform: scale(1.08) rotate(15deg);
            box-shadow: 0 0 50px rgba(192, 38, 255, 0.9), 
                        0 0 20px rgba(0, 240, 255, 0.8),
                        inset 0 0 35px rgba(255, 0, 127, 0.8);
        }

        .summon-orb.animating {
            animation: orbSurge 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite alternate;
        }

        @keyframes orbSurge {
            0% {
                transform: scale(1) rotate(0deg);
                box-shadow: 0 0 30px rgba(192, 38, 255, 0.6), inset 0 0 15px rgba(0, 240, 255, 0.4);
            }
            100% {
                transform: scale(1.15) rotate(360deg);
                box-shadow: 0 0 65px rgba(255, 0, 127, 1), 0 0 30px rgba(0, 240, 255, 0.9), inset 0 0 35px rgba(139, 0, 255, 0.8);
            }
        }

        .orb-inner {
            position: absolute;
            width: 80%;
            height: 80%;
            border-radius: 50%;
            border: 1px dashed rgba(0, 240, 255, 0.4);
            animation: orbRotate 10s linear infinite;
        }

        @keyframes orbRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .orb-core {
            font-size: 2.2rem;
            color: #ffffff;
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.8), 0 0 20px var(--accent-cyan);
            animation: orbPulse 2s ease-in-out infinite;
        }

        @keyframes orbPulse {
            0%, 100% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.15); opacity: 1; text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px var(--accent-magenta); }
        }

        .summon-controls {
            flex-grow: 1;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .summon-btn {
            background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-magenta) 100%);
            border: none;
            border-radius: 18px;
            padding: 16px 35px;
            color: #ffffff;
            font-family: 'Orbitron', sans-serif;
            font-size: 1.1rem;
            font-weight: 900;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 25px rgba(192, 38, 255, 0.4), 0 0 15px rgba(255, 0, 127, 0.2);
            text-align: center;
        }

        .summon-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(192, 38, 255, 0.6), 0 0 25px rgba(255, 0, 127, 0.4);
            filter: brightness(1.1);
        }

        .summon-btn:active {
            transform: translateY(1px);
        }

        .pity-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .pity-label {
            display: flex;
            justify-content: space-between;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.85rem;
            color: var(--text-secondary);
            letter-spacing: 0.5px;
        }

        .pity-label span:last-child {
            color: var(--accent-cyan);
            font-weight: bold;
        }

        .pity-bar-bg {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(192, 38, 255, 0.2);
            height: 10px;
            border-radius: 5px;
            overflow: hidden;
            position: relative;
        }

        .pity-bar-fill {
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
            height: 100%;
            border-radius: 5px;
            transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
        }

        /* --- GACHA REVEAL MODAL --- */
        .gacha-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(2, 1, 6, 0.95);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            z-index: 100005;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s ease;
            padding: 20px;
        }

        .gacha-modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        .gacha-reveal-container {
            width: 100%;
            max-width: 600px;
            perspective: 1000px;
        }

        .gacha-card-wrapper {
            background: var(--card-bg);
            border: 3px solid var(--accent-violet);
            border-radius: 28px;
            padding: 35px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 
                        0 0 50px rgba(192, 38, 255, 0.4),
                        inset 0 0 25px rgba(192, 38, 255, 0.15);
            display: flex;
            flex-direction: column;
            gap: 25px;
            position: relative;
            transform: scale(0.8) rotateY(-15deg);
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
        }

        .gacha-modal-overlay.active .gacha-card-wrapper {
            transform: scale(1) rotateY(0deg);
        }

        .gacha-card-wrapper::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 6px;
            background: linear-gradient(90deg, var(--accent-purple), var(--accent-magenta));
        }

        .gacha-reveal-header {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }

        .gacha-summon-status {
            font-family: 'Orbitron', sans-serif;
            font-size: 0.85rem;
            font-weight: 900;
            color: var(--accent-gold);
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
            letter-spacing: 3px;
            text-transform: uppercase;
            background: rgba(255, 215, 0, 0.08);
            border: 1.5px solid rgba(255, 215, 0, 0.3);
            border-radius: 20px;
            padding: 6px 16px;
            animation: textGlow 1.5s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
            0% { text-shadow: 0 0 8px rgba(255, 215, 0, 0.4); box-shadow: 0 0 8px rgba(255, 215, 0, 0.1); }
            100% { text-shadow: 0 0 18px rgba(255, 215, 0, 0.9); box-shadow: 0 0 15px rgba(255, 215, 0, 0.3); }
        }

        .gacha-agent-name {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
            text-align: center;
        }

        .gacha-badges {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .gacha-body {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .gacha-info-item {
            background: rgba(5, 5, 8, 0.8);
            border: 1px solid rgba(192, 38, 255, 0.15);
            border-radius: 16px;
            padding: 18px;
        }

        .gacha-info-label {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.78rem;
            color: var(--accent-cyan);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
            font-weight: bold;
        }

        .gacha-info-val {
            font-size: 0.95rem;
            color: var(--text-primary);
            line-height: 1.5;
        }

        .gacha-close-btn {
            background: linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-violet) 100%);
            border: none;
            border-radius: 16px;
            padding: 15px;
            color: #ffffff;
            font-family: 'Orbitron', sans-serif;
            font-size: 0.95rem;
            font-weight: 800;
            letter-spacing: 1.5px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 6px 15px rgba(192, 38, 255, 0.3);
            text-align: center;
        }

        .gacha-close-btn:hover {
            filter: brightness(1.15);
            box-shadow: 0 10px 20px rgba(192, 38, 255, 0.5);
        }

        /* --- CONTROLS BAR --- */
        .controls-container {
            max-width: 1400px;
            margin: 0 auto 50px;
            padding: 0 24px;
            display: flex;
            flex-direction: column;
            gap: 25px;
            position: relative;
            z-index: 10;
        }

        .search-bar-wrapper {
            position: relative;
            width: 100%;
        }

        .search-bar {
            width: 100%;
            background: rgba(10, 8, 20, 0.9);
            border: 2px solid var(--card-border);
            border-radius: 20px;
            padding: 20px 24px 20px 64px;
            color: #ffffff;
            font-size: 1.1rem;
            font-family: 'Share Tech Mono', monospace;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
            height: 60px;
        }

        .search-bar:focus {
            outline: none;
            border-color: var(--accent-violet);
            box-shadow: 0 0 30px rgba(192, 38, 255, 0.35), inset 0 0 12px rgba(192, 38, 255, 0.15);
        }

        .search-icon {
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--accent-violet);
            font-size: 1.5rem;
            pointer-events: none;
            text-shadow: 0 0 8px var(--accent-violet);
        }

        .filters-group {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            align-items: center;
        }

        .filter-btn {
            background: rgba(10, 8, 20, 0.7);
            border: 1.5px solid var(--card-border);
            border-radius: 12px;
            padding: 12px 24px;
            color: var(--text-secondary);
            font-family: 'Orbitron', sans-serif;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            letter-spacing: 0.5px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            min-height: 48px; /* Touch target */
        }

        .filter-btn:hover {
            color: var(--accent-magenta);
            border-color: var(--accent-magenta);
            box-shadow: 0 0 12px rgba(255, 0, 127, 0.25);
            background: rgba(20, 10, 30, 0.85);
            transform: translateY(-1px);
        }

        .filter-btn.active {
            background: linear-gradient(135deg, var(--accent-purple), var(--accent-magenta));
            border-color: transparent;
            color: #ffffff;
            box-shadow: 0 0 25px rgba(192, 38, 255, 0.45);
        }

        .stats-badge {
            font-family: 'Share Tech Mono', monospace;
            background: rgba(0, 240, 255, 0.08);
            border: 1px solid rgba(0, 240, 255, 0.25);
            border-radius: 20px;
            padding: 8px 18px;
            font-size: 0.9rem;
            color: var(--accent-cyan);
            text-shadow: 0 0 6px rgba(0, 240, 255, 0.3);
            font-weight: bold;
        }

        /* --- CARDS GRID --- */
        .grid-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
            gap: 35px;
            position: relative;
            z-index: 1;
        }

        /* --- STUNNING GLASS GRID CARD --- */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(25px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .card {
            background: rgba(12, 10, 28, 0.82);
            border: 2px solid rgba(192, 38, 255, 0.2);
            border-radius: 28px;
            padding: 35px;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
            position: relative;
            overflow: hidden;
            animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .card:hover {
            transform: translateY(-8px) scale(1.015);
            border-color: var(--accent-violet);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 
                        0 0 40px rgba(192, 38, 255, 0.35);
        }

        /* Efeito de borda luminosa gradiente no topo do card */
        .card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 6px;
            background: transparent;
            transition: all 0.3s ease;
        }

        .card.crewai::before { background: linear-gradient(90deg, #10b981, #059669); }
        .card.autogen::before { background: linear-gradient(90deg, #f59e0b, #d97706); }
        .card.agno::before { background: linear-gradient(90deg, #3b82f6, #2563eb); }
        .card.langgraph::before { background: linear-gradient(90deg, #06b6d4, #0891b2); }
        .card.geral::before { background: linear-gradient(90deg, var(--accent-purple), var(--accent-magenta)); }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 22px;
            gap: 15px;
        }

        .card-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.45rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.2px;
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }

        .badges-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            flex-shrink: 0;
        }

        .badge-fw {
            font-family: 'Orbitron', sans-serif;
            font-size: 0.72rem;
            font-weight: 900;
            text-transform: uppercase;
            padding: 5px 12px;
            border-radius: 8px;
            letter-spacing: 1px;
            color: #ffffff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            display: inline-block;
        }

        .badge-fw.crewai { background: linear-gradient(135deg, #10b981 0%, #059669 100%); box-shadow: 0 0 10px rgba(16, 185, 129, 0.4); }
        .badge-fw.autogen { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); box-shadow: 0 0 10px rgba(245, 158, 11, 0.4); }
        .badge-fw.agno { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); box-shadow: 0 0 10px rgba(59, 130, 246, 0.4); }
        .badge-fw.langgraph { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); box-shadow: 0 0 10px rgba(6, 182, 212, 0.4); }
        .badge-fw.geral { background: linear-gradient(135deg, #8B00FF 0%, #FF007F 100%); box-shadow: 0 0 12px rgba(192, 38, 255, 0.5); }

        .badge-sector {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.8rem;
            background: rgba(0, 240, 255, 0.08);
            border: 1px solid rgba(0, 240, 255, 0.3);
            color: var(--accent-cyan);
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: bold;
            text-shadow: 0 0 5px rgba(0, 240, 255, 0.3);
        }

        /* --- CARD INTERACTIVE TABS SYSTEM --- */
        .card-tabs {
            display: flex;
            border-bottom: 1.5px solid rgba(192, 38, 255, 0.15);
            margin-bottom: 20px;
            gap: 4px;
        }

        .tab-btn {
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-secondary);
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.8rem;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: bold;
            min-height: 36px;
        }

        .tab-btn:hover {
            color: #ffffff;
        }

        .tab-btn.active {
            color: var(--accent-violet);
            border-bottom-color: var(--accent-violet);
            text-shadow: 0 0 6px rgba(192, 38, 255, 0.4);
        }

        .tab-content {
            display: none;
            min-height: 180px;
            animation: tabFadeIn 0.3s ease;
            color: var(--text-primary);
        }

        .tab-content.active {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        @keyframes tabFadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .desc-text {
            color: var(--text-secondary);
            font-size: 1rem;
            font-weight: 300;
            line-height: 1.65;
        }

        .highlight-box {
            background: rgba(5, 5, 7, 0.6);
            border: 1px solid rgba(192, 38, 255, 0.1);
            border-radius: 12px;
            padding: 14px;
            margin-top: 5px;
        }

        .highlight-label {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.72rem;
            color: var(--accent-cyan);
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 4px;
            font-weight: bold;
        }

        .highlight-val {
            font-size: 0.9rem;
            color: var(--text-primary);
            line-height: 1.45;
        }

        /* --- CLONE/SETUP HELPER BOX --- */
        .terminal-box {
            background: #000000;
            border: 1px solid rgba(192, 38, 255, 0.25);
            border-radius: 8px;
            padding: 10px 14px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.78rem;
            color: var(--accent-cyan);
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
            margin-top: 8px;
        }

        .terminal-code {
            overflow-x: auto;
            white-space: nowrap;
            padding-right: 10px;
        }

        .terminal-copy {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.2s ease;
            flex-shrink: 0;
            font-size: 1rem;
            min-width: 44px; /* Touch target */
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .terminal-copy:hover {
            color: #ffffff;
            transform: scale(1.1);
        }

        /* --- ACTION SOURCE BUTTON --- */
        .btn-source {
            width: 100%;
            background: rgba(10, 8, 20, 0.7);
            border: 1.5px solid var(--card-border);
            color: var(--text-primary);
            border-radius: 16px;
            padding: 14px;
            font-family: 'Orbitron', sans-serif;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 1px;
            cursor: pointer;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            margin-top: auto;
            min-height: 52px; /* Touch target */
        }

        .btn-source:hover {
            background: linear-gradient(135deg, var(--accent-purple), var(--accent-magenta));
            color: #ffffff;
            border-color: transparent;
            box-shadow: 0 0 20px rgba(192, 38, 255, 0.4);
            transform: translateY(-2px);
        }

        .btn-source svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        /* --- NO RESULTS VIEW --- */
        .no-results {
            font-family: 'Share Tech Mono', monospace;
            text-align: center;
            padding: 100px 20px;
            grid-column: 1 / -1;
            color: var(--text-secondary);
            font-size: 1.3rem;
            display: none;
        }

        /* --- LGPD COMPLIANCE STYLES --- */
        /* Cookie Consent Banner */
        .cookie-banner {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(10, 8, 25, 0.98);
            border: 2px solid var(--accent-violet);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9), 0 0 25px rgba(192, 38, 255, 0.15);
            border-radius: 20px;
            padding: 24px;
            width: 90%;
            max-width: 700px;
            z-index: 100000;
            display: flex;
            flex-direction: column;
            gap: 16px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
            opacity: 0;
            pointer-events: none;
        }

        .cookie-banner.active {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        .cookie-header {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.1rem;
            font-weight: 900;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: 0.5px;
            text-shadow: 0 0 8px rgba(192, 38, 255, 0.3);
        }

        .cookie-text {
            color: var(--text-secondary);
            font-size: 0.88rem;
            line-height: 1.5;
        }

        .cookie-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .cookie-btn {
            background: transparent;
            border: 1px solid var(--accent-violet);
            color: var(--text-primary);
            padding: 10px 18px;
            border-radius: 8px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.85rem;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s ease;
            min-height: 44px; /* Touch target */
        }

        .cookie-btn:hover {
            background: linear-gradient(135deg, var(--accent-purple), var(--accent-violet));
            color: #ffffff;
            border-color: transparent;
            box-shadow: 0 0 10px rgba(192, 38, 255, 0.4);
        }

        .cookie-btn.accept-all {
            background: linear-gradient(135deg, var(--accent-purple), var(--accent-magenta));
            border-color: transparent;
            color: #ffffff;
        }

        .cookie-btn.accept-all:hover {
            box-shadow: 0 0 15px rgba(255, 0, 127, 0.4);
            filter: brightness(1.15);
        }

        .cookie-btn.sec-btn {
            border-color: var(--accent-cyan);
            color: var(--accent-cyan);
        }

        .cookie-btn.sec-btn:hover {
            background: var(--accent-cyan);
            color: #050507;
            box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
        }

        /* Full Interactive Privacy Center Modal */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 100001;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            padding: 20px;
        }

        .modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        .modal-box {
            background: rgba(8, 5, 15, 0.98);
            border: 2px solid var(--accent-cyan);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 240, 255, 0.15);
            width: 100%;
            max-width: 850px;
            max-height: 85vh;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            transform: scale(0.95);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-overlay.active .modal-box {
            transform: scale(1);
        }

        .modal-header {
            padding: 24px;
            border-bottom: 1px solid rgba(0, 240, 255, 0.15);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.3rem;
            color: #ffffff;
            text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
            font-weight: 900;
            letter-spacing: 1px;
        }

        .modal-close {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-size: 1.8rem;
            cursor: pointer;
            transition: color 0.2s ease;
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-close:hover {
            color: #ffffff;
        }

        .modal-tabs {
            display: flex;
            background: rgba(15, 5, 25, 0.5);
            border-bottom: 1px solid rgba(0, 240, 255, 0.15);
            padding: 0 12px;
            overflow-x: auto;
        }

        .modal-tab-btn {
            background: transparent;
            border: none;
            border-bottom: 3px solid transparent;
            color: var(--text-secondary);
            font-family: 'Orbitron', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 16px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.5px;
            white-space: nowrap;
            min-height: 48px;
        }

        .modal-tab-btn:hover {
            color: #ffffff;
        }

        .modal-tab-btn.active {
            color: var(--accent-cyan);
            border-bottom-color: var(--accent-cyan);
            text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
        }

        .modal-body {
            padding: 24px;
            overflow-y: auto;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .modal-tab-content {
            display: none;
            flex-direction: column;
            gap: 16px;
            animation: tabFadeIn 0.3s ease;
        }

        .modal-tab-content.active {
            display: flex;
        }

        .lgpd-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1rem;
            color: #ffffff;
            border-left: 3px solid var(--accent-cyan);
            padding-left: 10px;
            margin-bottom: 4px;
            font-weight: 700;
        }

        .lgpd-text {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.6;
        }

        /* Live Browser Storage Telemetry */
        .telemetry-table {
            width: 100%;
            border-collapse: collapse;
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.85rem;
            margin-top: 10px;
            background: rgba(5, 5, 10, 0.8);
            border: 1px solid rgba(0, 240, 255, 0.15);
            border-radius: 8px;
            overflow: hidden;
        }

        .telemetry-table th, .telemetry-table td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid rgba(0, 240, 255, 0.1);
        }

        .telemetry-table th {
            background: rgba(0, 240, 255, 0.05);
            color: var(--accent-cyan);
            font-weight: bold;
        }

        .telemetry-table td {
            color: var(--text-primary);
        }

        .telemetry-empty {
            text-align: center;
            padding: 20px;
            color: var(--text-secondary);
            font-style: italic;
        }

        .purge-btn {
            background: rgba(255, 57, 57, 0.1);
            border: 1.5px solid #ff3939;
            color: #ff3939;
            font-family: 'Orbitron', sans-serif;
            font-size: 0.85rem;
            font-weight: bold;
            padding: 14px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 0 10px rgba(255, 57, 57, 0.1);
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 48px; /* Touch target */
        }

        .purge-btn:hover {
            background: #ff3939;
            color: #ffffff;
            box-shadow: 0 0 20px rgba(255, 57, 57, 0.4);
        }

        /* Rights List Accordion */
        .rights-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .right-item {
            background: rgba(10, 8, 20, 0.6);
            border: 1px solid rgba(0, 240, 255, 0.1);
            border-radius: 12px;
            padding: 14px;
        }

        .right-header {
            font-family: 'Share Tech Mono', monospace;
            color: var(--accent-cyan);
            font-weight: bold;
            font-size: 0.92rem;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
        }

        .right-header span {
            background: rgba(0, 240, 255, 0.1);
            padding: 1px 6px;
            border-radius: 4px;
            font-size: 0.72rem;
        }

        /* --- RESPONSIVIDADE DE ALTO NÍVEL --- */
        /* Mobile Portrait Base (9:16) */
        @media (max-width: 479px) {
            .hero-section {
                padding: 40px 16px 20px;
            }
            .hero-title {
                font-size: 2.4rem;
                text-shadow: 0 0 15px rgba(192, 38, 255, 0.6);
                letter-spacing: 2px;
            }
            .hero-subtitle {
                font-size: 0.85rem;
                letter-spacing: 4px;
                margin-bottom: 12px;
            }
            .hero-description {
                font-size: 0.9rem;
                margin-bottom: 25px;
                line-height: 1.55;
            }
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                width: 100%;
            }
            .metric-card {
                padding: 12px 6px;
                min-width: auto;
                border-radius: 12px;
            }
            .metric-icon {
                font-size: 1.2rem;
                margin-bottom: 4px;
            }
            .metric-value {
                font-size: 1.25rem;
            }
            .metric-label {
                font-size: 0.62rem;
                letter-spacing: 0.5px;
            }
            .summon-section {
                padding: 0 12px;
                margin-bottom: 30px;
            }
            .summon-container {
                padding: 20px 16px;
                border-radius: 20px;
            }
            .summon-header h3 {
                font-size: 1.15rem;
            }
            .summon-header p {
                font-size: 0.8rem;
            }
            .summon-panel {
                gap: 20px;
                flex-direction: column;
            }
            .summon-orb-wrapper {
                width: 100px;
                height: 100px;
            }
            .summon-orb {
                width: 85px;
                height: 85px;
            }
            .orb-core {
                font-size: 1.8rem;
            }
            .summon-controls {
                width: 100%;
            }
            .summon-btn {
                padding: 12px 20px;
                font-size: 0.95rem;
                border-radius: 14px;
            }
            .pity-label {
                font-size: 0.78rem;
            }
            .pity-bar-bg {
                height: 8px;
            }
            .gacha-card-wrapper {
                padding: 20px;
                border-radius: 20px;
                width: 95%;
                gap: 15px;
            }
            .gacha-agent-name {
                font-size: 1.4rem;
            }
            .gacha-info-item {
                padding: 12px;
                border-radius: 12px;
            }
            .gacha-info-val {
                font-size: 0.85rem;
            }
            .gacha-close-btn {
                padding: 12px;
                font-size: 0.85rem;
                border-radius: 12px;
            }
            .controls-container {
                padding: 0 12px;
                gap: 15px;
                margin-bottom: 25px;
            }
            .search-bar {
                font-size: 0.95rem;
                padding-left: 50px;
                height: 52px;
            }
            .search-icon {
                left: 18px;
                font-size: 1.2rem;
            }
            .filters-group {
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
                justify-content: flex-start;
                width: 100%;
                padding: 4px 0 12px;
                gap: 8px;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
            }
            .filters-group::-webkit-scrollbar {
                display: none;
            }
            .filter-btn {
                padding: 10px 16px;
                font-size: 0.72rem;
                border-radius: 10px;
                min-height: auto;
                height: 38px;
                white-space: nowrap;
                flex-shrink: 0;
            }
            .stats-badge {
                font-size: 0.75rem;
                padding: 6px 12px;
                white-space: nowrap;
            }
            .grid-container {
                grid-template-columns: 1fr;
                padding: 0 12px;
                gap: 20px;
            }
            .card {
                padding: 20px;
                border-radius: 20px;
            }
            .card-header {
                margin-bottom: 16px;
            }
            .card-title {
                font-size: 1.2rem;
            }
            .card-tabs {
                margin-bottom: 16px;
            }
            .tab-btn {
                font-size: 0.72rem;
                padding: 6px 10px;
            }
            .tab-content {
                min-height: 150px;
            }
            .desc-text {
                font-size: 0.88rem;
                line-height: 1.55;
            }
            .highlight-box {
                padding: 10px;
            }
            .highlight-val {
                font-size: 0.82rem;
            }
            .terminal-box {
                padding: 8px 12px;
            }
            .terminal-code {
                font-size: 0.72rem;
            }
            .btn-source {
                padding: 12px;
                font-size: 0.8rem;
                border-radius: 12px;
                min-height: 46px;
                margin-top: 15px;
            }
            .cookie-banner {
                padding: 20px 16px;
                bottom: 15px;
                width: 95%;
            }
            .cookie-header {
                font-size: 0.95rem;
            }
            .cookie-text {
                font-size: 0.8rem;
            }
            .cookie-btn {
                padding: 8px 14px;
                font-size: 0.78rem;
                min-height: 38px;
            }
            .modal-box {
                width: 95%;
                max-height: 90vh;
                border-radius: 16px;
            }
            .modal-header {
                padding: 16px;
            }
            .modal-title {
                font-size: 1rem;
            }
            .modal-tab-btn {
                padding: 12px 10px;
                font-size: 0.72rem;
            }
            .modal-body {
                padding: 16px;
                gap: 15px;
            }
            .lgpd-title {
                font-size: 0.88rem;
            }
            .lgpd-text {
                font-size: 0.82rem;
            }
            .telemetry-table th, .telemetry-table td {
                padding: 8px;
                font-size: 0.75rem;
            }
        }

        /* Mobile Large & Tablet Adaptations */
        @media (min-width: 480px) and (max-width: 1023px) {
            .grid-container {
                grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                gap: 25px;
            }
            .hero-title {
                font-size: 3.2rem;
            }
            .hero-subtitle {
                font-size: 1.1rem;
                letter-spacing: 6px;
            }
            .metrics-grid {
                gap: 15px;
            }
            .metric-card {
                padding: 16px 20px;
                min-width: 180px;
            }
            .summon-container {
                padding: 25px;
            }
            .summon-panel {
                gap: 30px;
            }
            .cookie-banner {
                width: 85%;
            }
        }

        /* Desktop Breakpoints */
        @media (min-width: 1024px) {
            .cyber-navbar {
                border-bottom: 1px solid rgba(192, 38, 255, 0.1);
            }
        }
    </style>
</head>
<body>

    <div class="scanline-overlay" id="scanline"></div>

    <!-- Canvas de Estrelas Dinâmicas -->
    <canvas id="starfield"></canvas>

    <!-- 3D Retro Grid Background -->
    <div class="retro-grid-container">
        <div class="retro-grid-3d"></div>
    </div>

    <!-- TOP NAV BAR -->
    <nav class="cyber-navbar">
        <div class="nav-logo">
            LOWAS <span>UNIVERSE</span>
        </div>
        <div class="nav-actions">
            <button class="sys-button cyan-btn" id="privacyBtn">PRIVACIDADE & LGPD</button>
            <button class="sys-button" id="scanlineToggle">SCANLINE: ON</button>
        </div>
    </nav>

    <!-- HERO / HEADER -->
    <header class="hero-section">
        <h1 class="hero-title">LOWAS</h1>
        <p class="hero-subtitle">AI AGENTS UNIVERSE</p>
        <p class="hero-description">O diretório definitivo e imersivo dos agentes inteligentes mais avançados nos ecossistemas CrewAI, AutoGen, Agno e LangGraph.</p>
        
        <!-- Métricas de Impacto -->
        <div class="metrics-grid">
            <div class="metric-card">
                <span class="metric-icon">🪐</span>
                <div class="metric-value">${totalAgentsCount}</div>
                <div class="metric-label">Agentes Ativos</div>
            </div>
            <div class="metric-card">
                <span class="metric-icon">🧬</span>
                <div class="metric-value">5</div>
                <div class="metric-label">Frameworks</div>
            </div>
            <div class="metric-card">
                <span class="metric-icon">🎯</span>
                <div class="metric-value">${totalSectorsCount}</div>
                <div class="metric-label">Setores Cobertos</div>
            </div>
        </div>
    </header>

    <!-- STELLAR SUMMON (GACHA SYSTEM) -->
    <section class="summon-section">
        <div class="summon-container">
            <div class="summon-header">
                <h3>🪐 INVOCAÇÃO ESTELAR (STELLAR SUMMON)</h3>
                <p>Consulte as estrelas e convoque um agente inteligente aleatório do universo IA!</p>
            </div>
            
            <div class="summon-panel">
                <div class="summon-orb-wrapper">
                    <div class="summon-orb" id="summonOrb">
                        <div class="orb-inner"></div>
                        <span class="orb-core">🌌</span>
                    </div>
                </div>
                
                <div class="summon-controls">
                    <button class="summon-btn" id="summonBtn">✨ INVOCAR AGENTE</button>
                    
                    <div class="pity-container">
                        <div class="pity-label">
                            <span>Pity Tracker (Garante Curado em 10)</span>
                            <span id="pityCounter">0 / 10</span>
                        </div>
                        <div class="pity-bar-bg">
                            <div class="pity-bar-fill" id="pityBarFill" style="width: 0%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTROLS -->
    <div class="controls-container">
        <div class="search-bar-wrapper">
            <span class="search-icon">🪐</span>
            <input type="text" id="searchInput" class="search-bar" placeholder="[BUSCAR NO UNIVERSO IA] Nome, setor, compliance ou palavra-chave...">
        </div>
        
        <div class="filters-group">
            <button class="filter-btn active" data-filter="all">TODOS OS AGENTES (${totalAgentsCount})</button>
            <button class="filter-btn" data-filter="crewai">CREWAI (${crewAiCount})</button>
            <button class="filter-btn" data-filter="autogen">AUTOGEN (${autoGenCount})</button>
            <button class="filter-btn" data-filter="agno">AGNO (${agnoCount})</button>
            <button class="filter-btn" data-filter="langgraph">LANGGRAPH (${langGraphCount})</button>
            <button class="filter-btn" data-filter="geral">GERAIS (${geralCount})</button>
            
            <div class="stats-badge" id="statsBadge">SINTONIZANDO CONSTELAÇÕES...</div>
        </div>
    </div>

    <!-- CARDS GRID -->
    <main class="grid-container" id="grid">
        <!-- Cards Injetados Dinamicamente via JavaScript -->
    </main>

    <!-- GACHA REVEAL MODAL OVERLAY -->
    <div class="gacha-modal-overlay" id="gachaModal">
        <div class="gacha-reveal-container">
            <div class="gacha-card-wrapper" id="gachaCard">
                <div class="gacha-reveal-header">
                    <div class="gacha-summon-status">✨ INVOCADO COM SUCESSO!</div>
                    <div class="gacha-agent-name" id="gachaAgentName">HIA (Health Insights Agent)</div>
                    <div class="gacha-badges" id="gachaAgentBadges">
                        <span class="badge-fw geral">Geral</span>
                        <span class="badge-sector">Saúde</span>
                    </div>
                </div>
                
                <div class="gacha-body">
                    <div class="gacha-info-item">
                        <div class="gacha-info-label">⚡ Resumo Técnico</div>
                        <div class="gacha-info-val" id="gachaAgentDesc">Descrição do agente...</div>
                    </div>
                    <div class="gacha-info-item">
                        <div class="gacha-info-label">⚙️ Como Funciona / Mecânica</div>
                        <div class="gacha-info-val" id="gachaAgentHow">Mecânica do agente...</div>
                    </div>
                </div>
                
                <button class="gacha-close-btn" id="gachaCloseBtn">RETORNAR AO ESPAÇO</button>
            </div>
        </div>
    </div>

    <div class="no-results" id="noResults">
        <p>&gt;&gt; SYSTEM ERROR 404: Nenhum agente estelar localizado nestas coordenadas.</p>
    </div>

    <!-- INTERACTIVE COOKIE CONSENT BANNER -->
    <div class="cookie-banner" id="cookieBanner">
        <div class="cookie-header">
            <span>🪐</span> COMPLIANCE DE PRIVACIDADE (LGPD)
        </div>
        <div class="cookie-text">
            Este portal de conhecimento opera com total privacidade e transparência. Armazenamos apenas preferências funcionais e locais no seu navegador (filtro scanline e parâmetros de busca) via <strong style="color: var(--accent-cyan);">localStorage</strong> para prover melhor usabilidade técnica. Não utilizamos cookies invasivos, telemetria oculta ou rastreadores de terceiros que capturem sua identidade.
        </div>
        <div class="cookie-actions">
            <button class="cookie-btn sec-btn" id="cookieSettingsBtn">CONFIGURAÇÕES</button>
            <button class="cookie-btn accept-all" id="cookieAcceptBtn">ENTENDIDO & ACEITAR</button>
        </div>
    </div>

    <!-- FULL INTERACTIVE PRIVACY CENTER MODAL -->
    <div class="modal-overlay" id="privacyModal">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">🛡️ CENTRO DE PRIVACIDADE & CONFORMIDADE (LGPD)</div>
                <button class="modal-close" id="modalCloseBtn">&times;</button>
            </div>
            
            <div class="modal-tabs">
                <button class="modal-tab-btn active" onclick="switchModalTab(this, 'declTab')">📋 DECLARAÇÃO</button>
                <button class="modal-tab-btn" onclick="switchModalTab(this, 'dataTab')">📊 MEUS DADOS LOCAIS</button>
                <button class="modal-tab-btn" onclick="switchModalTab(this, 'rightsTab')">⚖️ SEUS DIREITOS (ART. 18)</button>
            </div>
            
            <div class="modal-body">
                <!-- TAB 1: DECLARAÇÃO DE PRIVACIDADE -->
                <div class="modal-tab-content active" id="declTab">
                    <div>
                        <div class="lgpd-title">1. Respeito às Leis de Proteção de Dados (Lei nº 13.709/2018)</div>
                        <p class="lgpd-text">Nós declaramos total conformidade com os princípios estabelecido pela Lei Geral de Proteção de Dados Pessoais do Brasil. Praticamos estritamente a minimização de dados: coletamos apenas o estritamente necessário para que você navegue e busque os agentes inteligentes.</p>
                    </div>
                    <div>
                        <div class="lgpd-title">2. Agentes de Tratamento & Contato</div>
                        <p class="lgpd-text">
                            <strong>Controlador & Operador:</strong> LOWAS Search (DAS) Team.<br>
                            <strong>Encarregado de Dados (DPO) / Suporte de Privacidade:</strong> <a href="mailto:privacidade@das-search.com.br" style="color: var(--accent-cyan); text-decoration: none;">privacidade@das-search.com.br</a><br>
                            Para qualquer questionamento, exclusão de eventuais registros de acesso ou dúvidas sobre a lei, nosso canal do DPO está totalmente aberto e ativo.
                        </p>
                    </div>
                    <div>
                        <div class="lgpd-title">3. Armazenamento Seguro</div>
                        <p class="lgpd-text">Suas informações de preferências nunca saem do seu navegador. Não possuímos bancos de dados na nuvem que guardem rastros da sua identidade pessoal, e-mail ou dados confidenciais.</p>
                    </div>
                </div>
                
                <!-- TAB 2: AUTODETERMINAÇÃO INFORMATIVA (LIVE TELEMETRY) -->
                <div class="modal-tab-content" id="dataTab">
                    <p class="lgpd-text">Em conformidade com o fundamento constitucional da <strong>Autodeterminação Informativa</strong>, providenciamos total transparência técnica sobre o que o nosso software armazena localmente em sua máquina hoje. Você é o dono dos seus dados!</p>
                    
                    <table class="telemetry-table">
                        <thead>
                            <tr>
                                <th>Variável no Browser</th>
                                <th>Conteúdo Armazenado</th>
                                <th>Propósito / Finalidade</th>
                            </tr>
                        </thead>
                        <tbody id="telemetryBody">
                            <!-- Injetado dinamicamente por JS -->
                        </tbody>
                    </table>
                    
                    <button class="purge-btn" id="purgeBtn">
                        <span>🗑️</span> DELETAR TODOS OS DADOS LOCAIS & SCRUBBER TOTAL
                    </button>
                </div>
                
                <!-- TAB 3: SEUS DIREITOS DA LEI (ART. 18) -->
                <div class="modal-tab-content" id="rightsTab">
                    <p class="lgpd-text">Sob o artigo 18 da LGPD, você possui 9 direitos fundamentais que pode exercer a qualquer momento gratuitamente perante qualquer controlador. Veja como se aplicam à nossa plataforma:</p>
                    
                    <div class="rights-list">
                        <div class="right-item">
                            <div class="right-header">1. Confirmação e Acesso <span>Garantido</span></div>
                            <p class="lgpd-text">Você tem o direito de saber se realizamos tratamento de seus dados. O painel "Meus Dados" ao lado atua como nossa resposta imediata de acesso completo.</p>
                        </div>
                        <div class="right-item">
                            <div class="right-header">2. Correção de Dados <span>Inexistente</span></div>
                            <p class="lgpd-text">Como não armazenamos informações pessoais em servidores externos, não há cadastros para corrigir em nossos bancos de dados.</p>
                        </div>
                        <div class="right-item">
                            <div class="right-header">3. Anonimização, Bloqueio ou Eliminação <span>Disponível</span></div>
                            <p class="lgpd-text">Você pode solicitar e executar a total exclusão de seu registro de uso local clicando no botão "Deletar Todos os Dados Locais".</p>
                        </div>
                        <div class="right-item">
                            <div class="right-header">4. Revogação de Consentimento <span>A Qualquer Hora</span></div>
                            <p class="lgpd-text">Você pode revogar seu aceite aos termos e apagar suas preferências de forma instantânea, livre e simplificada.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        const agents = ${JSON.stringify(finalAgents)};

        const grid = document.getElementById('grid');
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const statsBadge = document.getElementById('statsBadge');
        const noResults = document.getElementById('noResults');
        const scanlineToggle = document.getElementById('scanlineToggle');
        const scanlineOverlay = document.getElementById('scanline');

        // Seletores do Gacha (Stellar Summon)
        const summonOrb = document.getElementById('summonOrb');
        const summonBtn = document.getElementById('summonBtn');
        const pityCounter = document.getElementById('pityCounter');
        const pityBarFill = document.getElementById('pityBarFill');
        const gachaModal = document.getElementById('gachaModal');
        const gachaCard = document.getElementById('gachaCard');
        const gachaAgentName = document.getElementById('gachaAgentName');
        const gachaAgentBadges = document.getElementById('gachaAgentBadges');
        const gachaAgentDesc = document.getElementById('gachaAgentDesc');
        const gachaAgentHow = document.getElementById('gachaAgentHow');
        const gachaCloseBtn = document.getElementById('gachaCloseBtn');

        // Seletores de LGPD
        const cookieBanner = document.getElementById('cookieBanner');
        const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
        const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
        const privacyBtn = document.getElementById('privacyBtn');
        const privacyModal = document.getElementById('privacyModal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const telemetryBody = document.getElementById('telemetryBody');
        const purgeBtn = document.getElementById('purgeBtn');

        let currentFilter = 'all';
        let searchQuery = '';

        // Inicialização do Pity do Gacha
        let pity = parseInt(localStorage.getItem('lowas_gacha_pity') || '0', 10);
        if (isNaN(pity) || pity < 0 || pity > 10) pity = 0;
        
        function updatePityUI() {
            pityCounter.textContent = pity + ' / 10';
            pityBarFill.style.width = (pity * 10) + '%';
            localStorage.setItem('lowas_gacha_pity', pity.toString());
        }
        updatePityUI();

        // Restaura a busca do localStorage (se existir)
        const savedQuery = localStorage.getItem('lowas_search_query');
        if (savedQuery) {
            searchQuery = savedQuery;
            searchInput.value = savedQuery;
        }

        // Controle do Scanline CRT
        let scanlineOn = true;
        const savedScanline = localStorage.getItem('lowas_scanline');
        if (savedScanline === 'off') {
            scanlineOn = false;
            scanlineOverlay.classList.add('disabled');
            scanlineToggle.textContent = 'SCANLINE: OFF';
            scanlineToggle.style.boxShadow = 'none';
        }

        scanlineToggle.addEventListener('click', () => {
            scanlineOn = !scanlineOn;
            if (scanlineOn) {
                scanlineOverlay.classList.remove('disabled');
                scanlineToggle.textContent = 'SCANLINE: ON';
                scanlineToggle.style.boxShadow = '0 0 15px rgba(192, 38, 255, 0.4)';
                localStorage.setItem('lowas_scanline', 'on');
            } else {
                scanlineOverlay.classList.add('disabled');
                scanlineToggle.textContent = 'SCANLINE: OFF';
                scanlineToggle.style.boxShadow = 'none';
                localStorage.setItem('lowas_scanline', 'off');
            }
            updateTelemetryTable(); // Atualiza painel de dados da LGPD
        });

        // Controle do Banner de Consentimento de Cookies
        const consentGranted = localStorage.getItem('lowas_lgpd_consent');
        if (!consentGranted) {
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 800);
        }

        cookieAcceptBtn.addEventListener('click', () => {
            localStorage.setItem('lowas_lgpd_consent', 'true');
            cookieBanner.classList.remove('active');
            updateTelemetryTable();
        });

        cookieSettingsBtn.addEventListener('click', () => {
            openPrivacyModal();
        });

        // Controle do Modal de Privacidade
        privacyBtn.addEventListener('click', openPrivacyModal);
        modalCloseBtn.addEventListener('click', closePrivacyModal);
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) closePrivacyModal();
        });

        function openPrivacyModal() {
            privacyModal.classList.add('active');
            updateTelemetryTable();
        }

        function closePrivacyModal() {
            privacyModal.classList.remove('active');
        }

        // Alternador de abas do modal
        window.switchModalTab = function(btn, tabId) {
            const tabs = privacyModal.querySelectorAll('.modal-tab-btn');
            const contents = privacyModal.querySelectorAll('.modal-tab-content');
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        };

        // Atualiza a tabela de telemetria local ao vivo para a LGPD
        function updateTelemetryTable() {
            telemetryBody.innerHTML = '';
            const storageItems = [
                { key: 'lowas_scanline', desc: 'Preferência de exibição do filtro retro scanlines (CRT)', val: localStorage.getItem('lowas_scanline') || 'on' },
                { key: 'lowas_lgpd_consent', desc: 'Sinal de consentimento e leitura do banner da LGPD', val: localStorage.getItem('lowas_lgpd_consent') || 'false' },
                { key: 'lowas_search_query', desc: 'Último texto digitado no campo de busca para fins de usabilidade', val: localStorage.getItem('lowas_search_query') || '[Vazio]' },
                { key: 'lowas_gacha_pity', desc: 'Contador de Pity do sistema de Invocação Estelar (Gacha)', val: localStorage.getItem('lowas_gacha_pity') || '0' }
            ];

            storageItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td style="color: var(--accent-cyan); font-weight: bold;">' + item.key + '</td>' +
                               '<td>"' + item.val + '"</td>' +
                               '<td style="color: var(--text-secondary);">' + item.desc + '</td>';
                telemetryBody.appendChild(tr);
            });
        }

        // Purga todos os dados de localStorage (Scrubber da LGPD)
        purgeBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja apagar permanentemente todas as suas preferências e histórico local? Isso resetará as configurações padrão do site.')) {
                localStorage.clear();
                alert('Toda a telemetria local e preferências foram apagadas com sucesso do browser!');
                closePrivacyModal();
                location.reload();
            }
        });

        // Helper para normalizar buscas (ex: "saude" acha "Saúde")
        function normalizeStr(str) {
            return (str || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        }

        // Retorna o comando sugerido para instalação de cada framework
        function getInstallCommand(fw) {
            switch(fw.toLowerCase()) {
                case 'crewai': return 'pip install crewai';
                case 'autogen': return 'pip install pyautogen';
                case 'agno': return 'pip install agno';
                case 'langgraph': return 'pip install langgraph';
                default: return 'pip install langchain openai';
            }
        }

        // Renderização dos cards com abas dinâmicas
        function renderCards() {
            grid.innerHTML = '';
            
            const filtered = agents.filter(a => {
                const fwMatch = currentFilter === 'all' || a.framework.toLowerCase() === currentFilter;
                
                const queryNorm = normalizeStr(searchQuery);
                const textMatch = !searchQuery || 
                    normalizeStr(a.name).includes(queryNorm) ||
                    normalizeStr(a.description).includes(queryNorm) ||
                    normalizeStr(a.howItWorks).includes(queryNorm) ||
                    normalizeStr(a.whyUseful).includes(queryNorm) ||
                    normalizeStr(a.whenToUse).includes(queryNorm) ||
                    normalizeStr(a.setor).includes(queryNorm);

                return fwMatch && textMatch;
            });

            statsBadge.textContent = '[ONLINE // UNIVERSO ATIVO: ' + filtered.length + ' AGENTES ESTELARES]';

            if (filtered.length === 0) {
                noResults.style.display = 'block';
                return;
            }
            noResults.style.display = 'none';

            filtered.forEach((a, cardIdx) => {
                const card = document.createElement('div');
                const fwClass = a.framework.toLowerCase().replace('/', '');
                card.className = 'card ' + fwClass;
                card.setAttribute('data-framework', fwClass);
                card.style.animationDelay = (cardIdx * 0.03) + 's';

                const setupCommand = getInstallCommand(a.framework);

                card.innerHTML = \`
                    <div class="card-header">
                        <div class="card-title">\${a.name}</div>
                        <div class="badges-wrapper">
                            <span class="badge-fw \${fwClass}">\${a.framework}</span>
                            <span class="badge-sector">\${a.setor}</span>
                        </div>
                    </div>
                    
                    <div class="card-tabs">
                        <button class="tab-btn active" onclick="switchTab(this, 'overview-\${cardIdx}')">📄 VISÃO GERAL</button>
                        <button class="tab-btn" onclick="switchTab(this, 'how-\${cardIdx}')">🧬 MECÂNICA</button>
                        <button class="tab-btn" onclick="switchTab(this, 'use-\${cardIdx}')">🎯 APLICAÇÕES</button>
                    </div>

                    <div class="card-body">
                        <!-- ABA 1: VISÃO GERAL -->
                        <div class="tab-content active" id="overview-\${cardIdx}">
                            <div class="section-desc">
                                <span class="section-title" style="color: var(--accent-magenta); font-family: 'Share Tech Mono', monospace; font-size: 0.78rem; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">⚡ Resumo Técnico</span>
                                <p class="desc-text">\${a.description}</p>
                            </div>
                            <div class="highlight-box">
                                <div class="highlight-label">🔌 Setup do Framework</div>
                                <div class="terminal-box">
                                    <div class="terminal-code" id="code-\${cardIdx}">\${setupCommand}</div>
                                    <button class="terminal-copy" onclick="copyToClipboard('code-\${cardIdx}')">📋</button>
                                </div>
                            </div>
                        </div>

                        <!-- ABA 2: COMO FUNCIONA -->
                        <div class="tab-content" id="how-\${cardIdx}">
                            <div class="section-desc">
                                <span class="section-title" style="color: var(--accent-magenta); font-family: 'Share Tech Mono', monospace; font-size: 0.78rem; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">⚙️ Processo & Funcionamento</span>
                                <p class="desc-text">\${a.howItWorks}</p>
                            </div>
                        </div>

                        <!-- ABA 3: POR QUE É ÚTIL / QUANDO USAR -->
                        <div class="tab-content" id="use-\${cardIdx}">
                            <div class="section-desc">
                                <span class="section-title uc-title" style="color: var(--accent-magenta); font-family: 'Share Tech Mono', monospace; font-size: 0.78rem; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">💎 Valor de Negócios</span>
                                <p class="desc-text">\${a.whyUseful}</p>
                            </div>
                            <div class="highlight-box" style="background: rgba(0, 240, 255, 0.02); border-color: rgba(0, 240, 255, 0.15);">
                                <div class="highlight-label" style="color: var(--accent-cyan);">🎯 Melhor Cenário de Uso</div>
                                <p class="highlight-val">\${a.whenToUse}</p>
                            </div>
                        </div>
                    </div>
                    
                    <a href="\${a.link}" target="_blank" class="btn-source">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        REPOSITÓRIO NO GITHUB
                    </a>
                \`;

                grid.appendChild(card);
            });
        }

        // Alterna as abas dentro dos cards
        window.switchTab = function(btn, tabId) {
            const cardElement = btn.closest('.card');
            const tabButtons = cardElement.querySelectorAll('.tab-btn');
            const tabContents = cardElement.querySelectorAll('.tab-content');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            cardElement.querySelector('#' + tabId).classList.add('active');
        };

        // Copia comandos do terminal simulado
        window.copyToClipboard = function(id) {
            const codeText = document.getElementById(id).textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                alert('Comando de instalação copiado para a área de transferência!');
            });
        };

        // Filtros dos botões de frameworks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                renderCards();
            });
        });

        // Evento de input do buscador com atraso leve (performance)
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchQuery = e.target.value;
                localStorage.setItem('lowas_search_query', searchQuery); // Salva busca (usabilidade + LGPD)
                renderCards();
            }, 100);
        });

        // --- STELLAR SUMMON GACHA SYSTEM LOGIC ---
        // Áudio Cósmico via Web Audio API (Som Synth)
        function playCosmicSound(isPitySucceeded) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (!AudioContext) return;
                const audioCtx = new AudioContext();
                
                // Primeiro oscilador (Frequência Fundamental)
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                // Segundo oscilador (Harmônico Espacial)
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                
                osc.connect(gain);
                osc2.connect(gain2);
                gain.connect(audioCtx.destination);
                gain2.connect(audioCtx.destination);
                
                if (isPitySucceeded) {
                    // Som de Invocação Lendária (Brilho e tom crescente majestoso)
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 1.2);
                    
                    osc2.type = 'sine';
                    osc2.frequency.setValueAtTime(300, audioCtx.currentTime);
                    osc2.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 1.2);
                    
                    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
                    gain2.gain.setValueAtTime(0.1, audioCtx.currentTime);
                    gain2.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
                    
                    osc.start();
                    osc2.start();
                    osc.stop(audioCtx.currentTime + 1.2);
                    osc2.stop(audioCtx.currentTime + 1.2);
                } else {
                    // Som de Invocação Padrão (Suave, vento cósmico synth)
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(220, audioCtx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.8);
                    
                    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
                    
                    osc.start();
                    osc.stop(audioCtx.currentTime + 0.8);
                }
            } catch (e) {
                console.log('Web Audio API não iniciada devido a políticas do navegador.');
            }
        }

        // Invocação Estelar
        function performSummon() {
            if (summonOrb.classList.contains('animating')) return;
            
            // Ativa animação
            summonOrb.classList.add('animating');
            summonBtn.textContent = '🪐 INVOCANDO...';
            
            // Incrementa Pity
            pity++;
            let rolledAgent = null;
            let isEpicSummon = false;
            
            // Lógica do Gacha: a cada 10 invocações, garante um curado!
            if (pity >= 10) {
                isEpicSummon = true;
                pity = 0; // Reseta pity
                // Filtra os agentes que foram curados manualmente (aqueles com howItWorks exclusivo)
                const curatedNames = [
                    'HIA (Health Insights Agent)', 'AI Health Assistant', 'Automated Trading Bot', 
                    'Virtual AI Tutor (EduGPT)', '24/7 AI Chatbot Support', 'Product Recommendation Agent',
                    'Self-Driving Delivery Agent', 'Factory Process Monitoring Agent', 'Property Pricing Agent',
                    'Smart Farming Assistant', 'Energy Demand Forecasting Agent', 'Content Personalization Agent',
                    'Legal Document Review Assistant', 'Recruitment Recommendation Agent', 'Virtual Travel Assistant',
                    'AI Game Companion Agent', 'Real-Time Threat Detection Agent', 'E-commerce Personal Shopper Agent',
                    'Logistics Optimization Agent', 'Vibe Hacking (Decepticon)', 'MediSuite-Ai-Agent',
                    'Email Auto Responder Flow', 'Meeting Assistant Flow', 'Self Evaluation Loop Flow',
                    'Lead Score Flow', 'Marketing Strategy Generator', 'Job Posting Generator',
                    'Recruitment Workflow', 'Match Profile to Positions', 'Instagram Post Generator',
                    'Landing Page Generator', 'Task Solving with Code Gen', 'QA with Retrieval Chat / Qdrant',
                    'Group Chat Solver', 'Data Visualization by Group Chat', 'Society of Mind (Inner-Monologue)',
                    'Nested Chats (Conversas Aninhadas)', 'Web Surfer Agent', 'SQL Spider DB Agent',
                    'Agno Support Agent / Assist', 'YouTube Analytica Agent', 'Finance / Thinking Finance Agent',
                    'Journalistic Research Agent', 'Legal Consultant Agent', 'DeepKnowledge Agent',
                    'Chatbot Simulation Evaluation', 'Information Gathering via Prompting', 'Code Assistant with Auto-Correction',
                    'Enterprise Customer Support Agent', 'Adaptive RAG Flow', 'Corrective RAG (CRAG)', 'Self-RAG'
                ];
                const curatedPool = agents.filter(a => curatedNames.includes(a.name));
                rolledAgent = curatedPool[Math.floor(Math.random() * curatedPool.length)];
            } else {
                // Sorteia um agente qualquer do banco de dados completo (86 agentes)
                rolledAgent = agents[Math.floor(Math.random() * agents.length)];
                // Verifica se calhou de ser um curado para tocar o som épico
                const curatedNames = [
                    'HIA (Health Insights Agent)', 'AI Health Assistant', 'Automated Trading Bot', 
                    'Virtual AI Tutor (EduGPT)', '24/7 AI Chatbot Support', 'Product Recommendation Agent',
                    'Self-Driving Delivery Agent', 'Factory Process Monitoring Agent', 'Property Pricing Agent',
                    'Smart Farming Assistant', 'Energy Demand Forecasting Agent', 'Content Personalization Agent',
                    'Legal Document Review Assistant', 'Recruitment Recommendation Agent', 'Virtual Travel Assistant',
                    'AI Game Companion Agent', 'Real-Time Threat Detection Agent', 'E-commerce Personal Shopper Agent',
                    'Logistics Optimization Agent', 'Vibe Hacking (Decepticon)', 'MediSuite-Ai-Agent',
                    'Email Auto Responder Flow', 'Meeting Assistant Flow', 'Self Evaluation Loop Flow',
                    'Lead Score Flow', 'Marketing Strategy Generator', 'Job Posting Generator',
                    'Recruitment Workflow', 'Match Profile to Positions', 'Instagram Post Generator',
                    'Landing Page Generator', 'Task Solving with Code Gen', 'QA with Retrieval Chat / Qdrant',
                    'Group Chat Solver', 'Data Visualization by Group Chat', 'Society of Mind (Inner-Monologue)',
                    'Nested Chats (Conversas Aninhadas)', 'Web Surfer Agent', 'SQL Spider DB Agent',
                    'Agno Support Agent / Assist', 'YouTube Analytica Agent', 'Finance / Thinking Finance Agent',
                    'Journalistic Research Agent', 'Legal Consultant Agent', 'DeepKnowledge Agent',
                    'Chatbot Simulation Evaluation', 'Information Gathering via Prompting', 'Code Assistant with Auto-Correction',
                    'Enterprise Customer Support Agent', 'Adaptive RAG Flow', 'Corrective RAG (CRAG)', 'Self-RAG'
                ];
                if (curatedNames.includes(rolledAgent.name)) {
                    isEpicSummon = true;
                }
            }
            
            setTimeout(() => {
                // Toca áudio
                playCosmicSound(isEpicSummon);
                
                // Atualiza modal
                gachaAgentName.textContent = rolledAgent.name;
                
                const fwClass = rolledAgent.framework.toLowerCase().replace('/', '');
                gachaAgentBadges.innerHTML = '<span class="badge-fw ' + fwClass + '">' + rolledAgent.framework + '</span>' +
                                             '<span class="badge-sector">' + rolledAgent.setor + '</span>';
                
                gachaAgentDesc.textContent = rolledAgent.description;
                gachaAgentHow.textContent = rolledAgent.howItWorks || 'Lógica de execução modular em barramentos de IA.';
                
                // Estilo customizado do card revelado conforme raridade/framework
                if (isEpicSummon) {
                    gachaCard.style.borderColor = 'var(--accent-gold)';
                    gachaCard.style.boxShadow = '0 25px 60px rgba(255, 215, 0, 0.4), 0 0 50px rgba(255, 215, 0, 0.2)';
                } else {
                    gachaCard.style.borderColor = 'var(--accent-violet)';
                    gachaCard.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(192, 38, 255, 0.4)';
                }
                
                // Exibe modal
                gachaModal.classList.add('active');
                
                // Reseta estado da animação do orb
                summonOrb.classList.remove('animating');
                summonBtn.textContent = '✨ INVOCAR AGENTE';
                updatePityUI();
            }, 1000);
        }

        summonOrb.addEventListener('click', performSummon);
        summonBtn.addEventListener('click', performSummon);
        gachaCloseBtn.addEventListener('click', () => {
            gachaModal.classList.remove('active');
        });
        gachaModal.addEventListener('click', (e) => {
            if (e.target === gachaModal) gachaModal.classList.remove('active');
        });

        // --- DYNAMIC COSMIC STARFIELD SIMULATION ---
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');
        let stars = [];
        const maxStars = 80;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Star {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.3;
                this.alpha = Math.random();
                this.speed = Math.random() * 0.015 + 0.005;
                // Cores cósmicas: tons de violeta, cyan ou dourado estelar
                const r = Math.random();
                this.color = r > 0.6 ? '#C026FF' : (r > 0.2 ? '#00F0FF' : '#FFD700');
            }
            update() {
                this.alpha += this.speed;
                if (this.alpha > 1 || this.alpha < 0) {
                    this.speed = -this.speed;
                }
                if (this.alpha < 0) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.max(0.08, this.alpha);
                ctx.shadowBlur = this.size * 2;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < maxStars; i++) {
            stars.push(new Star());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        // Inicialização
        renderCards();
    </script>
</body>
</html>
`;

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('✅ Arquivo index.html com COMPLIANCE LGPD de elite compilado com sucesso dentro da pasta /site!');
