const fs = require('fs');
const path = require('path');

// Garante que a pasta /Ai Agents existe no workspace
const dirPath = path.join(__dirname);
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const csvPath = path.join(dirPath, 'lista_agents.csv');

// UTF-8 BOM para garantir que o Excel no Windows abra com acentuação correta
const BOM = '\ufeff';

const headers = ['Nome', 'Framework', 'Setor', 'Descrição (O que é)', 'Aplicações Práticas (Para que serve)'];

const agents = [
    // --- 1. SETORES GERAIS ---
    {
        name: 'HIA (Health Insights Agent)',
        framework: 'Geral / Outros',
        setor: 'Saúde',
        description: 'Agente que analisa relatórios médicos, receitas e exames clínicos digitados ou enviados pelo usuário.',
        useCase: 'Usado para fornecer insights simplificados sobre saúde e explicar termos médicos difíceis para leigos.'
    },
    {
        name: 'AI Health Assistant',
        framework: 'Geral / Outros',
        setor: 'Saúde',
        description: 'Assistente inteligente que ajuda a monitorar doenças e analisar dados históricos de pacientes.',
        useCase: 'Usado por clínicas para acompanhar a evolução clínica e sintomas de pacientes de forma autônoma.'
    },
    {
        name: 'Automated Trading Bot',
        framework: 'Geral / Outros',
        setor: 'Finanças',
        description: 'Robô de trading de ações que coleta dados de mercado em tempo real e simula negociações.',
        useCase: 'Usado para automatizar a compra e venda de ativos com base em estratégias e indicadores técnicos.'
    },
    {
        name: 'Virtual AI Tutor (EduGPT)',
        framework: 'Geral / Outros',
        setor: 'Educação',
        description: 'Tutor de ensino personalizado que se adapta ao nível de aprendizado do aluno.',
        useCase: 'Criação de planos de estudos personalizados, simulados e explicação de matérias escolares complexas.'
    },
    {
        name: '24/7 AI Chatbot',
        framework: 'Geral / Outros',
        setor: 'Suporte',
        description: 'Chatbot inteligente de atendimento ao cliente ativo 24 horas por dia.',
        useCase: 'Resolução de dúvidas frequentes, triagem inicial de chamados e suporte básico de e-commerce.'
    },
    {
        name: 'Product Recommendation Agent',
        framework: 'Geral / Outros',
        setor: 'E-commerce',
        description: 'Agente de recomendação de produtos com base no histórico e preferências do usuário.',
        useCase: 'Aumentar o faturamento de lojas online sugerindo itens complementares perfeitos para cada cliente.'
    },
    {
        name: 'Self-Driving Delivery Agent',
        framework: 'Geral / Outros',
        setor: 'Logística',
        description: 'Otimizador autônomo de rotas e despacho de pacotes.',
        useCase: 'Reduzir custos logísticos de empresas definindo as melhores rotas de entrega automaticamente.'
    },
    {
        name: 'Factory Process Monitoring Agent',
        framework: 'Geral / Outros',
        setor: 'Indústria',
        description: 'Monitora linhas de produção industriais para detectar falhas operacionais.',
        useCase: 'Prevenção de paradas de fábrica e controle automático de qualidade de produtos na esteira.'
    },
    {
        name: 'Property Pricing Agent',
        framework: 'Geral / Outros',
        setor: 'Imobiliário',
        description: 'Analisa tendências imobiliárias locais para sugerir o preço ideal de imóveis.',
        useCase: 'Usado por imobiliárias para avaliar se o preço de venda ou aluguel de um imóvel está adequado ao mercado.'
    },
    {
        name: 'Smart Farming Assistant',
        framework: 'Geral / Outros',
        setor: 'Agricultura',
        description: 'Analisa dados de satélite e solo para fornecer insights agrícolas.',
        useCase: 'Previsão de rendimento de colheitas, alertas de pragas e recomendações de fertilização.'
    },
    {
        name: 'Energy Demand Forecasting Agent',
        framework: 'Geral / Outros',
        setor: 'Energia',
        description: 'Previsão de demanda energética de bairros ou cidades inteiras.',
        useCase: 'Otimização do gerenciamento de redes elétricas para evitar apagões ou desperdício de energia.'
    },
    {
        name: 'Content Personalization Agent',
        framework: 'Geral / Outros',
        setor: 'Entretenimento',
        description: 'Personaliza a exibição de mídias e conteúdos em aplicativos.',
        useCase: 'Aumentar a retenção de usuários sugerindo os vídeos, músicas ou posts mais relevantes.'
    },
    {
        name: 'Legal Document Review Assistant',
        framework: 'Geral / Outros',
        setor: 'Jurídico',
        description: 'Análise e revisão automatizada de contratos e documentos jurídicos.',
        useCase: 'Detectar cláusulas de risco ou abusivas em contratos antes da assinatura de forma automática.'
    },
    {
        name: 'Recruitment Recommendation Agent',
        framework: 'Geral / Outros',
        setor: 'RH',
        description: 'Agente que cruza o perfil de vagas abertas com milhares de currículos.',
        useCase: 'Facilitar o trabalho do setor de RH selecionando apenas os candidatos mais qualificados.'
    },
    {
        name: 'Virtual Travel Assistant',
        framework: 'Geral / Outros',
        setor: 'Turismo',
        description: 'Planeja itinerários completos de viagens baseando-se nas preferências do usuário.',
        useCase: 'Montar roteiros turísticos personalizados com sugestão de pontos turísticos, restaurantes e hotéis.'
    },
    {
        name: 'AI Game Companion Agent',
        framework: 'Geral / Outros',
        setor: 'Games',
        description: 'Personagem não-jogável (NPC) inteligente que reage e ajuda o jogador em tempo real.',
        useCase: 'Melhorar a imersão de videogames com companheiros virtuais que pensam autonomamente.'
    },
    {
        name: 'Real-Time Threat Detection Agent',
        framework: 'Geral / Outros',
        setor: 'Segurança',
        description: 'Identifica acessos suspeitos e potenciais ameaças de rede.',
        useCase: 'Prevenção de ataques hacker e bloqueio instantâneo de tráfego malicioso em servidores corporativos.'
    },
    {
        name: 'E-commerce Personal Shopper Agent',
        framework: 'Geral / Outros',
        setor: 'E-commerce',
        description: 'Agente que conversa com o cliente ajudando-o a decidir o melhor produto para comprar.',
        useCase: 'Simular a experiência de um vendedor real em uma loja online para aumentar as vendas.'
    },
    {
        name: 'Logistics Optimization Agent',
        framework: 'Geral / Outros',
        setor: 'Logística',
        description: 'Otimiza a cadeia de suprimentos e o estoque com base no histórico de vendas.',
        useCase: 'Evitar falta de produtos ou excesso de estoque calculando a reposição ideal automaticamente.'
    },
    {
        name: 'Vibe Hacking Agent',
        framework: 'Geral / Outros',
        setor: 'Segurança',
        description: 'Agente inteligente que simula ataques simulados contra sistemas (Red Teaming).',
        useCase: 'Descobrir brechas de segurança cibernética em empresas antes que criminosos reais as encontrem.'
    },
    {
        name: 'MediSuite-Ai-Agent',
        framework: 'Geral / Outros',
        setor: 'Saúde',
        description: 'Automatiza o fluxo de faturamento hospitalar e sinistros de planos de saúde.',
        useCase: 'Reduzir glosas e acelerar o reembolso de despesas de hospitais com seguradoras de saúde.'
    },
    {
        name: 'Lina-Egyptian-Medical-Chatbot',
        framework: 'Geral / Outros',
        setor: 'Saúde',
        description: 'Chatbot especializado em triagem médica e direcionamento hospitalar no Egito.',
        useCase: 'Auxiliar a população local com informações de postos de saúde de forma interativa.'
    },

    // --- 2. CREWAI ---
    {
        name: 'Email Auto Responder Flow',
        framework: 'CrewAI',
        setor: 'Comunicação',
        description: 'Fluxo que lê e-mails recebidos, analisa o tom/assunto e escreve uma resposta adequada.',
        useCase: 'Automação de caixas de entrada de suporte ao cliente, respondendo dúvidas comuns instantaneamente.'
    },
    {
        name: 'Meeting Assistant Flow',
        framework: 'CrewAI',
        setor: 'Produtividade',
        description: 'Agente que gerencia pautas de reuniões, convites e resumos pós-chamada.',
        useCase: 'Agendar compromissos e garantir que todos recebam a ata de reunião resumida automaticamente.'
    },
    {
        name: 'Self Evaluation Loop Flow',
        framework: 'CrewAI',
        setor: 'RH',
        description: 'Fluxo de agentes que interagem com o funcionário para coletar autoavaliações.',
        useCase: 'Otimizar o processo anual de avaliação de desempenho de grandes equipes.'
    },
    {
        name: 'Lead Score Flow',
        framework: 'CrewAI',
        setor: 'Vendas',
        description: 'Analisa o comportamento de novos contatos e pontua quem tem mais chance de comprar.',
        useCase: 'Direcionar apenas os contatos quentes e qualificados para a equipe de vendas humana fechar negócio.'
    },
    {
        name: 'Marketing Strategy Generator',
        framework: 'CrewAI',
        setor: 'Marketing',
        description: 'Gera campanhas de marketing completas analisando a concorrência e público-alvo.',
        useCase: 'Fornecer ideias de posts, anúncios e posicionamento de marca em minutos.'
    },
    {
        name: 'Job Posting Generator',
        framework: 'CrewAI',
        setor: 'RH',
        description: 'Escreve anúncios de vagas de emprego atraentes baseando-se nos requisitos técnicos.',
        useCase: 'Automatizar a redação de vagas para portais como LinkedIn e Gupy.'
    },
    {
        name: 'Recruitment Workflow',
        framework: 'CrewAI',
        setor: 'RH',
        description: 'Fluxo multiagente completo que realiza triagem, agendamento de entrevistas e feedback.',
        useCase: 'Automatizar a burocracia do recrutamento ponta a ponta.'
    },
    {
        name: 'Match Profile to Positions',
        framework: 'CrewAI',
        setor: 'RH',
        description: 'Compara detalhadamente o perfil técnico do candidato com a descrição exata da vaga.',
        useCase: 'Evitar entrevistas com candidatos fora do perfil desejado.'
    },
    {
        name: 'Instagram Post Generator',
        framework: 'CrewAI',
        setor: 'Marketing',
        description: 'Agente focado em escrever a legenda ideal e criar o roteiro visual para posts.',
        useCase: 'Manter a constância de postagens de marcas ou influenciadores digitais.'
    },
    {
        name: 'Landing Page Generator',
        framework: 'CrewAI',
        setor: 'Webdev',
        description: 'Escreve a estrutura HTML e os textos persuasivos (copy) de uma página de vendas.',
        useCase: 'Criar páginas de captação de clientes de forma extremamente rápida.'
    },
    {
        name: 'Game Builder Crew',
        framework: 'CrewAI',
        setor: 'Games',
        description: 'Equipe de agentes programadores e designers que desenvolvem um jogo simples do zero.',
        useCase: 'Desenvolvimento ágil de protótipos de jogos em Python para testes rápidos.'
    },
    {
        name: 'Stock Analysis Tool',
        framework: 'CrewAI',
        setor: 'Finanças',
        description: 'Ferramenta de múltiplos agentes para análise fundamentalista de ações na bolsa.',
        useCase: 'Auxiliar investidores a tomarem decisões de compra baseadas em relatórios automatizados.'
    },
    {
        name: 'Trip Planner / Surprise Trip Planner',
        framework: 'CrewAI',
        setor: 'Turismo',
        description: 'Planeja viagens tradicionais ou cria roteiros secretos sob medida para presentes.',
        useCase: 'Agências de turismo automatizarem o envio de propostas de viagens personalizadas.'
    },
    {
        name: 'Write a Book with Flows',
        framework: 'CrewAI',
        setor: 'Escrita',
        description: 'Fluxo estruturado de agentes para escrever capítulos de livros mantendo a coerência.',
        useCase: 'Apoiar escritores no bloqueio criativo e na produção acelerada de e-books.'
    },
    {
        name: 'Screenplay Writer',
        framework: 'CrewAI',
        setor: 'Escrita',
        description: 'Agente especializado nas formatações e regras de roteiros cinematográficos profissionais.',
        useCase: 'Criar primeiros esboços de curtas, comerciais e roteiros de vídeos publicitários.'
    },
    {
        name: 'Markdown Validator',
        framework: 'CrewAI',
        setor: 'Produtividade',
        description: 'Lê arquivos de documentação técnica em Markdown e avisa se há links quebrados ou má formatação.',
        useCase: 'Garantir que a documentação técnica de softwares esteja perfeita antes do lançamento.'
    },
    {
        name: 'Meta Quest Knowledge',
        framework: 'CrewAI',
        setor: 'Suporte',
        description: 'Base de conhecimento ativa que responde dúvidas técnicas sobre dispositivos Meta Quest.',
        useCase: 'Suporte especializado para desenvolvedores de realidade virtual.'
    },
    {
        name: 'NVIDIA Models Integration',
        framework: 'CrewAI',
        setor: 'Tecnologia',
        description: 'Agente configurado para tirar o máximo proveito das APIs de IA hospedadas na infraestrutura NVIDIA.',
        useCase: 'Processamento de alta velocidade de LLMs e tarefas de inteligência computacional pesada.'
    },
    {
        name: 'Prep for a Meeting',
        framework: 'CrewAI',
        setor: 'Produtividade',
        description: 'Pesquisa os participantes da reunião na web e monta um briefing sobre o assunto que será tratado.',
        useCase: 'Chegar em reuniões comerciais sabendo tudo sobre o cliente de antemão.'
    },
    {
        name: 'CrewAI + LangGraph Integration',
        framework: 'CrewAI',
        setor: 'Integração',
        description: 'Exemplo prático de como integrar a facilidade do CrewAI com o controle rígido do LangGraph.',
        useCase: 'Construir sistemas de IA de nível empresarial extremamente robustos.'
    },

    // --- 3. AUTOGEN ---
    {
        name: 'Task Solving with Code Gen',
        framework: 'AutoGen',
        setor: 'Programação',
        description: 'Agente que resolve qualquer problema lógico escrevendo, testando e depurando um código de programação.',
        useCase: 'Resolver cálculos matemáticos pesados ou criar scripts de automação sob demanda.'
    },
    {
        name: 'QA with Retrieval / Qdrant',
        framework: 'AutoGen',
        setor: 'Tecnologia',
        description: 'Agente de respostas baseado em inteligência vetorial (Qdrant) para bases de dados imensas.',
        useCase: 'Consultar manuais industriais gigantescos e obter respostas exatas em segundos.'
    },
    {
        name: 'Group Chat Solver',
        framework: 'AutoGen',
        setor: 'Colaboração',
        description: 'Sala de conversa virtual com mais de 3 agentes autônomos trabalhando juntos com um líder de equipe.',
        useCase: 'Resolução de problemas de negócios complexos que exigem discussões de múltiplas áreas.'
    },
    {
        name: 'Data Visualization by Group Chat',
        framework: 'AutoGen',
        setor: 'Dados',
        description: 'Grupo de agentes que recebe dados brutos e gera automaticamente gráficos e PDFs formatados.',
        useCase: 'Gerar relatórios de vendas e desempenho de marketing sem precisar mexer no Excel ou PowerBI.'
    },
    {
        name: 'Inner-Monologue via SocietyOfMind',
        framework: 'AutoGen',
        setor: 'Tecnologia',
        description: 'Agente que discute consigo mesmo, levantando hipóteses e refutando-as antes de responder ao usuário.',
        useCase: 'Tarefas científicas e lógicas complexas que exigem extremo rigor e evitam erros.'
    },
    {
        name: 'Sequential Multi-Agent Chats',
        framework: 'AutoGen',
        setor: 'Processos',
        description: 'Agentes que passam a tarefa de um para o outro em uma esteira sequencial automatizada.',
        useCase: 'Automação de processos administrativos lineares e rígidos em empresas.'
    },
    {
        name: 'Nested Chats Solver',
        framework: 'AutoGen',
        setor: 'Processos',
        description: 'Agentes que conseguem "chamar reuniões privadas" internas para decidir algo antes de voltar ao chat principal.',
        useCase: 'Processos com etapas de compliance, verificação de dados e aprovações rígidas.'
    },
    {
        name: 'OptiGuide Supply Chain',
        framework: 'AutoGen',
        setor: 'Logística',
        description: 'Agente inteligente com salvaguardas que otimiza cadeias de suprimentos sem errar cálculos.',
        useCase: 'Calcular a rota logística de menor custo para frotas de distribuição.'
    },
    {
        name: 'Conversational Chess Agent',
        framework: 'AutoGen',
        setor: 'Games',
        description: 'Agente que joga xadrez por meio de conversação textual interpretando tabuleiros e regras.',
        useCase: 'Demonstrar inteligência de tomada de decisões com regras restritivas e lógica pura.'
    },
    {
        name: 'Automated Continual Learning',
        framework: 'AutoGen',
        setor: 'Machine Learning',
        description: 'Agente capaz de aprender com as interações diárias e salvar os novos conhecimentos para sempre.',
        useCase: 'Sistemas que se adaptam e ficam cada vez mais inteligentes conforme o uso operacional.'
    },
    {
        name: 'AutoAnny Discord bot',
        framework: 'AutoGen',
        setor: 'Comunicação',
        description: 'Bot de Discord completo que utiliza a autonomia do AutoGen para atuar no chat.',
        useCase: 'Engajamento de comunidade e moderação inteligente em servidores de games ou empresas.'
    },
    {
        name: 'Web Search: Function Call',
        framework: 'AutoGen',
        setor: 'Busca',
        description: 'Agente que possui a habilidade de abrir navegadores e pesquisar no Google de forma ativa.',
        useCase: 'Trazer fatos atualizados do dia de hoje para responder a perguntas que dependem do presente.'
    },
    {
        name: 'Whisper Audio Agent',
        framework: 'AutoGen',
        setor: 'Áudio',
        description: 'Agente integrado ao Whisper capaz de entender ordens por voz, transcrever e traduzir áudios.',
        useCase: 'Interfaces ativadas por voz para comandos industriais ou assistência pessoal.'
    },
    {
        name: 'Constrained Responses via Guidance',
        framework: 'AutoGen',
        setor: 'Tecnologia',
        description: 'Garante que o robô responda exatamente no formato desejado (JSON, sim/não) sem fugir das regras.',
        useCase: 'Integração de IAs com sistemas de TI legados que não toleram respostas livres.'
    },
    {
        name: 'SQL Spider Agent',
        framework: 'AutoGen',
        setor: 'Dados',
        description: 'Agente de conversão de linguagem natural em código SQL complexo testando o resultado no banco.',
        useCase: 'Permitir que diretores de empresas façam perguntas ao banco de dados sem saber programar.'
    },
    {
        name: 'Web Scraping with Apify',
        framework: 'AutoGen',
        setor: 'Busca',
        description: 'Robô de extração de dados em massa integrado com a API da Apify.',
        useCase: 'Extrair listagens de preços, dados de redes sociais ou concorrência em grande escala.'
    },
    {
        name: 'Spider Domain Crawler',
        framework: 'AutoGen',
        setor: 'Busca',
        description: 'Agente que varre um site inteiro (todas as páginas) de forma recursiva.',
        useCase: 'Copiar todas as informações e documentações de um produto ou empresa para treinar uma IA interna.'
    },
    {
        name: 'AgentEval Framework',
        framework: 'AutoGen',
        setor: 'Qualidade',
        description: 'Sistema que cria agentes específicos para testarem o sistema de IA principal buscando falhas.',
        useCase: 'Garantir a segurança e qualidade antes de lançar um chatbot ou agente em produção.'
    },
    {
        name: 'AgentOps Observability',
        framework: 'AutoGen',
        setor: 'Gestão',
        description: 'Painel e agente para auditoria de chamadas de IA, erros técnicos e custo por token em tempo real.',
        useCase: 'Evitar gastos abusivos com APIs e identificar instabilidades no sistema.'
    },

    // --- 4. AGNO ---
    {
        name: 'Agno Support Agent / Assist',
        framework: 'Agno',
        setor: 'Suporte',
        description: 'Robô especialista que conhece toda a documentação da Agno e ajuda a escrever códigos usando o framework.',
        useCase: 'Auxiliar programadores a desenvolverem novos agentes 10x mais rápido.'
    },
    {
        name: 'YouTube Agent',
        framework: 'Agno',
        setor: 'Conteúdo',
        description: 'Agente que assiste a vídeos do YouTube, transcreve e extrai os principais timestamps e temas.',
        useCase: 'Criar resumos de aulas online, palestras ou podcasts em texto rapidamente.'
    },
    {
        name: 'Finance Agent / Thinking Finance',
        framework: 'Agno',
        setor: 'Finanças',
        description: 'Robô analista de mercado com acesso aos balanços históricos de empresas da bolsa de valores.',
        useCase: 'Geração de relatórios profundos sobre a saúde financeira de empresas listadas na bolsa.'
    },
    {
        name: 'Study Partner',
        framework: 'Agno',
        setor: 'Educação',
        description: 'Assistente pessoal de estudos que organiza materiais e cria rotinas de aprendizado.',
        useCase: 'Apoiar vestibulandos, concurseiros e estudantes universitários a organizarem suas rotinas.'
    },
    {
        name: 'Shopping Partner Agent',
        framework: 'Agno',
        setor: 'E-commerce',
        description: 'Agente inteligente de compras que compara preços e avaliações de produtos na Amazon e similares.',
        useCase: 'Achar o melhor custo-benefício de um produto de forma automatizada.'
    },
    {
        name: 'Research Scholar Agent',
        framework: 'Agno',
        setor: 'Educação',
        description: 'Pesquisador acadêmico que vasculha bases de artigos científicos reais e gera resumos com citações.',
        useCase: 'Escrever artigos e relatórios técnicos baseados em literatura científica validada.'
    },
    {
        name: 'Recipe Creator',
        framework: 'Agno',
        setor: 'Culinária',
        description: 'Cria receitas personalizadas com base nos ingredientes que o usuário tem na despensa.',
        useCase: 'Evitar desperdício de alimentos fornecendo ideias de pratos rápidos e saudáveis.'
    },
    {
        name: 'Readme Generator Agent',
        framework: 'Agno',
        setor: 'Programação',
        description: 'Lê a pasta de um código de programação e escreve um arquivo de apresentação (README.md) perfeito.',
        useCase: 'Manter repositórios de software documentados e profissionais sem esforço manual.'
    },
    {
        name: 'Movie Recommendation Agent',
        framework: 'Agno',
        setor: 'Entretenimento',
        description: 'Dá sugestões de filmes com base no humor do usuário, atores preferidos e notas do IMDB.',
        useCase: 'Plataformas de streaming engajarem usuários recomendando os melhores títulos.'
    },
    {
        name: 'Media Trend Analysis Agent',
        framework: 'Agno',
        setor: 'Marketing',
        description: 'Analisa o que está em alta no TikTok, Reels e X para prever as próximas tendências de vídeo.',
        useCase: 'Dar ideias de conteúdos virais de forma antecipada para influenciadores e marcas.'
    },
    {
        name: 'Legal Document Analysis Agent',
        framework: 'Agno',
        setor: 'Jurídico',
        description: 'Análise profunda de PDFs jurídicos gerando resumos executivos focados em riscos.',
        useCase: 'Revisão ultra rápida de petições, acordos e termos de serviço em massa.'
    },
    {
        name: 'DeepKnowledge Agent',
        framework: 'Agno',
        setor: 'Pesquisa',
        description: 'Realiza buscas repetitivas em profundidade, desmembrando uma dúvida em sub-questões.',
        useCase: 'Pesquisas científicas, médicas ou de mercado extremamente aprofundadas.'
    },
    {
        name: 'MCP Airbnb Agent',
        framework: 'Agno',
        setor: 'Turismo',
        description: 'Utiliza o protocolo MCP para buscar acomodações no Airbnb integrando filtros de metrô e home office.',
        useCase: 'Encontrar a melhor hospedagem para nômades digitais baseando-se em logística.'
    },

    // --- 5. LANGGRAPH ---
    {
        name: 'Chatbot Simulation Evaluation',
        framework: 'LangGraph',
        setor: 'Qualidade',
        description: 'Simula interações de usuários virtuais com o seu chatbot para ver se ele mantém a qualidade em estresse.',
        useCase: 'Homologação e auditoria de robôs de atendimento antes de irem para o público real.'
    },
    {
        name: 'Information Gathering via Prompting',
        framework: 'LangGraph',
        setor: 'Triagem',
        description: 'Fluxo rígido que só encerra a conversa quando coletou todos os dados obrigatórios do cliente.',
        useCase: 'Formulários interativos por chat (ex: contratação de seguros, empréstimos, matrículas).'
    },
    {
        name: 'Code Assistant with LangGraph',
        framework: 'LangGraph',
        setor: 'Programação',
        description: 'Escreve códigos e possui etapas rigorosas de auto-correção, rodando testes locais até estar 100% livre de erros.',
        useCase: 'Criação de APIs estáveis e rotinas de backend sem intervenção de programadores.'
    },
    {
        name: 'Customer Support Agent',
        framework: 'LangGraph',
        setor: 'Suporte',
        description: 'Agente que resolve reclamações de clientes de forma extremamente profissional seguindo regras da empresa.',
        useCase: 'Reduzir a fila de suporte humano de nível 1 em empresas de telefonia, varejo ou SaaS.'
    },
    {
        name: 'Extraction with Retries',
        framework: 'LangGraph',
        setor: 'Dados',
        description: 'Extrai dados de textos bagunçados e, se faltar algo ou vier inválido, tenta de novo ajustando os prompts.',
        useCase: 'Transformar e-mails de clientes em chamados técnicos perfeitamente categorizados.'
    },
    {
        name: 'Hierarchical Agent Teams / Supervisor',
        framework: 'LangGraph',
        setor: 'Processos',
        description: 'Estrutura organizacional onde um supervisor distribui as tarefas para subordinados inteligentes.',
        useCase: 'Orquestrar operações industriais ou de TI complexas com múltiplos subprocessos.'
    },
    {
        name: 'Plan-and-Execute Agent',
        framework: 'LangGraph',
        setor: 'Processos',
        description: 'Planeja todos os passos necessários para uma tarefa longa e executa, refletindo a cada etapa se deu certo.',
        useCase: 'Escrever relatórios industriais anuais complexos, buscando dados em centenas de fontes.'
    },
    {
        name: 'SQL Agent',
        framework: 'LangGraph',
        setor: 'Dados',
        description: 'Conversa com o banco de dados SQL executando e validando as consultas para garantir dados exatos.',
        useCase: 'Criação de dashboards dinâmicos onde você pede os números por voz ou texto.'
    },
    {
        name: 'Reflection / Reflexion Agent',
        framework: 'LangGraph',
        setor: 'Qualidade',
        description: 'Fluxo onde um agente escreve e o outro critica rigidamente, repetindo o ciclo até estar perfeito.',
        useCase: 'Geração de artigos jornalísticos ou redação publicitária de altíssima qualidade.'
    },
    {
        name: 'Adaptive RAG / Local Adaptive RAG',
        framework: 'LangGraph',
        setor: 'Busca',
        description: 'Busca inteligente de documentos que decide se a pergunta é simples ou se precisa fazer buscas externas no Google.',
        useCase: 'Sistemas corporativos de perguntas e respostas que sabem quando o manual interno não é suficiente.'
    },
    {
        name: 'Corrective RAG (CRAG) / Local CRAG',
        framework: 'LangGraph',
        setor: 'Busca',
        description: 'Avalia a qualidade dos arquivos encontrados no banco de dados vetorial antes de usar para responder.',
        useCase: 'Evitar alucinações em sistemas de IA de bancos ou hospitais que exigem 100% de precisão de fatos.'
    },
    {
        name: 'Self-RAG / Local Self-RAG',
        framework: 'LangGraph',
        setor: 'Busca',
        description: 'O agente escreve a resposta e avalia a si mesmo se usou dados reais ou se inventou algo, corrigindo-se.',
        useCase: 'Garantir auditoria e precisão absoluta de respostas sobre manuais de aviação ou engenharia civil.'
    }
];

// Converte a lista em formato CSV
let csvContent = BOM + headers.join(',') + '\n';

agents.forEach(a => {
    // Escapa aspas duplas internas duplicando-as, conforme padrão RFC 4180
    const nameEsc = `"${a.name.replace(/"/g, '""')}"`;
    const fwEsc = `"${a.framework.replace(/"/g, '""')}"`;
    const secEsc = `"${a.setor.replace(/"/g, '""')}"`;
    const descEsc = `"${a.description.replace(/"/g, '""')}"`;
    const ucEsc = `"${a.useCase.replace(/"/g, '""')}"`;
    
    csvContent += [nameEsc, fwEsc, secEsc, descEsc, ucEsc].join(',') + '\n';
});

fs.writeFileSync(csvPath, csvContent, 'utf8');
console.log('✅ Arquivo lista_agents.csv gerado com sucesso em /Ai Agents!');
