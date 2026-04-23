'use strict';

(() => {
  const STORAGE_KEY = 'portfolio-language';
  const DEFAULT_LANGUAGE = 'en';

  const pageMeta = {
    en: {
      lang: 'en',
      title: 'Aleson Viana | DevOps Engineer',
      description: 'Portfolio of Aleson Viana, DevOps engineer focused on automation, infrastructure, reliability, and cloud operations.',
      formSubject: 'New contact from portfolio',
    },
    pt: {
      lang: 'pt-BR',
      title: 'Aleson Viana | Engenheiro DevOps',
      description: 'Portfolio de Aleson Viana, engenheiro DevOps focado em automações, infraestrutura, confiabilidade e operações em cloud.',
      formSubject: 'Novo contato pelo portfolio',
    },
  };

  const textEntries = [
    ['.nav-menu a[href="#home"]', 'Home', 'Home'],
    ['.nav-menu a[href="#sobre"]', 'About', 'Sobre'],
    ['.nav-menu a[href="#projetos"]', 'Projects', 'Projetos'],
    ['.nav-menu a[href="#carreira"]', 'Experience', 'Carreira'],
    ['.nav-menu a[href="#artigos"]', 'Articles', 'Artigos'],
    ['.nav-menu a[href="#recomendacoes"]', 'Recommendations', 'Recomendações'],
    ['.nav-menu a[href="#contato"]', 'Contact', 'Contato'],

    ['.eyebrow', 'Hello 👋', 'Olá 👋', {scramble: true}],
    ['.hero-kicker-text', 'I am Aleson Viana', 'Eu sou Aleson Viana', {scramble: true}],
    ['.hero-title-line', 'DevOps Engineer', 'Engenheiro DevOps', {scramble: true}],
    ['.hero-description', 'I build reliable cloud infrastructure, automation, pipelines, and scalable operations for modern products.', 'Crio infraestrutura cloud confiável, automações, pipelines e operações escaláveis para produtos modernos.', {scramble: true}],
    ['.hero-actions .btn-primary', 'View Projects', 'Ver Projetos'],
    ['.hero-actions .btn-outline', 'Download Resume', 'Download Resume'],

    ['.service-item:nth-child(1) h3', 'Web Development', 'Desenvolvimento Web'],
    ['.service-item:nth-child(2) h3', 'Application Management', 'Gerenciamento de aplicações'],
    ['.service-item:nth-child(3) h3', 'Automation & Reliability', 'Automações e Confiabilidade'],
    ['.about-copy h2', 'About Me', 'Sobre mim'],
    ['.about-copy > p', 'I am a DevOps engineer focused on building reliable systems, automating operations, and supporting teams with cloud infrastructure, pipelines, observability, and scalable delivery practices.', 'Sou engenheiro DevOps focado em criar sistemas confiáveis, automatizar operações e apoiar times com infraestrutura cloud, pipelines, observabilidade e práticas escaláveis de entrega.'],
    ['.stats p', 'Years of experience', 'Anos de experiência'],

    ['#projetos .section-heading h2', 'Projects', 'Projetos'],
    ['#projetos .projects-list > article:nth-child(1) .project-info p', 'Website as a Service operation with commercial automation, lead capture and follow-up, Arca Insights, and reusable templates for customer activation.', 'Operação de Website as a Service com automações comerciais, captura e follow-up de leads, Arca Insights e templates replicáveis para ativação de clientes.'],
    ['#projetos .projects-list > article:nth-child(1) .btn-primary', 'View Project', 'Ver Projeto'],
    ['.arcadev-metrics span:nth-child(1) small', 'target leads', 'leads alvo'],
    ['.arcadev-metrics span:nth-child(2) small', 'workflows', 'workflows'],
    ['.arcadev-metrics span:nth-child(3) small', 'follow-up', 'follow-up'],
    ['.arcadev-queue div:nth-child(1) strong', 'Lead capture', 'Captura de lead'],
    ['.arcadev-queue div:nth-child(1) small', 'Active webhook', 'Webhook ativo'],
    ['.arcadev-queue div:nth-child(2) strong', 'Event status', 'Status por eventos'],
    ['.arcadev-queue div:nth-child(2) small', 'Delivery confirmed', 'Entrega confirmada'],
    ['.arcadev-queue div:nth-child(3) strong', 'Monthly report', 'Relatório mensal'],

    ['#projetos .projects-list > article:nth-child(2) .project-info p', 'Educational math game for children ages 5 to 10, with 4 languages, customizable avatar, local and cloud progress, public landing page, and Android app through Capacitor.', 'Jogo educativo de matemática para crianças de 5 a 10 anos, com 4 idiomas, avatar customizável, progresso local e em nuvem, landing pública e app Android via Capacitor.'],
    ['#projetos .projects-list > article:nth-child(2) .btn-primary', 'View Project', 'Ver Projeto'],

    ['#projetos .projects-list > article:nth-child(3) .project-info p', 'Evangelistic app for receiving daily Bible verses with inspiring images, downloading artwork, and sharing faith messages with just a few taps.', 'Aplicativo evangelístico para receber versículos bíblicos diários com imagens inspiradoras, baixar artes e compartilhar mensagens de fé com poucos toques.'],
    ['#projetos .projects-list > article:nth-child(3) .btn-primary', 'View Project', 'Ver Projeto'],
    ['#projetos .projects-list > article:nth-child(3) .text-link', 'Instagram', 'Instagram'],
    ['.verso-preview-header small', 'Daily biblical inspiration', 'Inspiração bíblica diária'],
    ['.verso-preview-pill', 'Daily content • Verses + images', 'Conteúdo diário • Versículos + imagens'],
    ['.verso-verse-card small', 'Example', 'Exemplo'],
    ['.verso-verse-card p', '“Your word is a lamp to my feet and a light to my path.”', '“Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.”'],
    ['.verso-actions span:nth-child(1)', 'Download', 'Baixar'],
    ['.verso-actions span:nth-child(2)', 'Share', 'Compartilhar'],
    ['.verso-actions span:nth-child(3)', 'New verse', 'Novo verso'],

    ['.member-count-top strong', 'Service Counter', 'Contador de Cultos'],
    ['.member-count-top small', 'Real-time report', 'Relatório em tempo real'],
    ['.member-count-total span', 'Total attendance', 'Total no culto'],
    ['.member-count-grid span:nth-child(1) small', 'Members', 'Membros'],
    ['.member-count-grid span:nth-child(2) small', 'Visitors', 'Visitantes'],
    ['.member-count-grid span:nth-child(3) small', 'Children', 'Crianças'],
    ['.member-count-grid span:nth-child(4) small', 'Volunteers', 'Obreiros'],
    ['.member-count-actions span:nth-child(3)', 'History', 'Histórico'],
    ['#projetos .projects-list > article:nth-child(4) h3', 'Member Count', 'Contagem de Membros'],
    ['#projetos .projects-list > article:nth-child(4) .project-info p', 'Tool for recording attendance in church services, organizing counts by category, generating PDF reports, and sharing the result through WhatsApp.', 'Ferramenta para registrar a presença em cultos, organizar contagens por categoria, gerar relatórios em PDF e compartilhar o resultado pelo WhatsApp.'],
    ['#projetos .projects-list > article:nth-child(4) .btn-primary', 'View Project', 'Ver Projeto'],

    ['#carreira .section-heading h2', 'Experience', 'Carreira'],
    ['.career-list > article:nth-child(1) .career-meta', 'Nov 2024 - Present · Ottawa, Canada · Remote', 'Nov 2024 - Atual · Ottawa, Canadá · Remoto'],
    ['.career-list > article:nth-child(1) .project-info > p:last-of-type', 'I administer cloud environments and new AWS projects, connecting infrastructure as code, migrations, databases, and pipelines to support critical operations with high availability.', 'Administro ambientes cloud e novos projetos na AWS, conectando infraestrutura como código, migrações, bancos de dados e pipelines para sustentar operações críticas com alta disponibilidade.'],
    ['.career-list > article:nth-child(1) li:nth-child(1)', 'Creation and management of IaC with Terraform, Terragrunt, and Ansible.', 'Criação e gestão de IaC com Terraform, Terragrunt e Ansible.'],
    ['.career-list > article:nth-child(1) li:nth-child(2)', 'AWS cost management and optimization across EC2, RDS, S3, FSx, and VPC.', 'Gestão e otimização de custos em AWS, incluindo EC2, RDS, S3, FSx e VPC.'],
    ['.career-list > article:nth-child(1) li:nth-child(3)', 'Migration of servers, services, and relational databases to AWS, Amazon RDS, and Windows SQL.', 'Migração de servidores, serviços e bancos relacionais para AWS, Amazon RDS e Windows SQL.'],
    ['.career-list > article:nth-child(1) li:nth-child(4)', 'Deployment and CI/CD automation with Bitbucket, Docker, and GitOps practices.', 'Automação de deploys e CI/CD com Bitbucket, Docker e práticas GitOps.'],

    ['.career-list > article:nth-child(2) .career-meta', 'Jun 2024 - Nov 2024 · Redwood, California', 'Jun 2024 - Nov 2024 · Redwood, California'],
    ['.career-list > article:nth-child(2) .project-info > p:last-of-type', 'Automation of routines with IaC, development team support, and cloud environment management focused on reliability, collaboration, and delivery speed.', 'Automação de rotinas com IaC, suporte a times de desenvolvimento e gestão de ambientes cloud com foco em confiabilidade, colaboração e velocidade de entrega.'],
    ['.career-list > article:nth-child(2) li:nth-child(1)', '40% reduction in manual intervention and operational overhead.', 'Redução de 40% em intervenção manual e overhead operacional.'],
    ['.career-list > article:nth-child(2) li:nth-child(2)', '15% reduction in downtime with Prometheus and Grafana monitoring.', 'Queda de 15% no downtime com monitoramento via Prometheus e Grafana.'],
    ['.career-list > article:nth-child(2) li:nth-child(3)', 'GitHub versioning management for more than 80 collaborators.', 'Gestão de versionamento GitHub para mais de 80 colaboradores.'],
    ['.career-metrics div:nth-child(1) span', 'less manual work', 'menos trabalho manual'],
    ['.career-metrics div:nth-child(2) span', 'faster delivery cycle', 'ciclo de entrega mais rápido'],
    ['.career-metrics div:nth-child(3) span', 'GitHub users', 'usuários GitHub'],

    ['.career-list > article:nth-child(3) .career-meta', 'Nov 2022 - Jun 2024 · São Paulo, Brazil', 'Nov 2022 - Jun 2024 · São Paulo, SP'],
    ['.career-list > article:nth-child(3) .project-info > p:last-of-type', 'I worked on server and application migrations to AWS, structuring infrastructure as code, managed pipelines, and service catalogs to increase team autonomy.', 'Atuei na migração de servidores e aplicações para AWS, estruturando infraestrutura como código, pipelines gerenciadas e catálogos de serviços para acelerar a autonomia dos times.'],
    ['.career-list > article:nth-child(3) li:nth-child(1)', '65% reduction in infrastructure provisioning time.', 'Redução de 65% no tempo de provisionamento de infraestrutura.'],
    ['.career-list > article:nth-child(3) li:nth-child(2)', '37% performance improvement after migration to Beanstalk and RDS.', 'Melhoria de 37% em performance após migração para Beanstalk e RDS.'],
    ['.career-list > article:nth-child(3) li:nth-child(3)', '30% faster deployments with Azure DevOps pipelines.', 'Deploys 30% mais rápidos com pipelines no Azure DevOps.'],

    ['.career-list > article:nth-child(4) .career-meta', 'Jun 2021 - Nov 2022 · Fortaleza, Brazil', 'Jun 2021 - Nov 2022 · Fortaleza, CE'],
    ['.career-list > article:nth-child(4) .project-info > p:last-of-type', 'I administered AWS services, created deployment automation, and supported development and data science teams in using cloud resources with security and consistency.', 'Administrei serviços AWS, criei automações de deploy e apoiei equipes de desenvolvimento e ciência de dados no uso de recursos cloud com segurança e consistência.'],
    ['.career-list > article:nth-child(4) li:nth-child(1)', '25% faster automated deployments with Jenkins and Ansible AWX.', 'Deploys automatizados 25% mais rápidos com Jenkins e Ansible AWX.'],
    ['.career-list > article:nth-child(4) li:nth-child(2)', '15% greater data processing efficiency through AWS support and training.', 'Eficiência de processamento de dados 15% maior com suporte e treinamentos AWS.'],
    ['.career-list > article:nth-child(4) li:nth-child(3)', '18% reduction in downtime with Prometheus, Splunk, and CloudWatch.', 'Redução de 18% no downtime com Prometheus, Splunk e CloudWatch.'],

    ['.career-list > article:nth-child(5) .career-meta', 'Feb 2018 - Jun 2021 · Fortaleza, Brazil', 'Fev 2018 - Jun 2021 · Fortaleza, CE'],
    ['.career-list > article:nth-child(5) .project-info > p:last-of-type', 'I built the infrastructure and cloud foundation, administering networks, servers, OCI environments, containers, and VoIP communication in a critical healthcare operation.', 'Construí a base de infraestrutura e cloud, administrando redes, servidores, ambientes OCI, containers e comunicação VoIP em um contexto crítico de operação hospitalar.'],
    ['.career-list > article:nth-child(5) li:nth-child(1)', 'Docker and Kubernetes environments with 30% less manual setup time.', 'Ambientes Docker e Kubernetes com 30% menos tempo de configuração manual.'],
    ['.career-list > article:nth-child(5) li:nth-child(2)', 'Management of TCP/IP, OSPF, BGP, firewalls, and Linux/Windows servers.', 'Gestão de redes TCP/IP, OSPF, BGP, firewalls e servidores Linux/Windows.'],
    ['.career-list > article:nth-child(5) li:nth-child(3)', '18% reduction in call downtime with Asterisk, VoIP, and PABX.', 'Redução de 18% no downtime de chamadas com Asterisk, VoIP e PABX.'],

    ['#artigos .section-heading h2', 'Articles', 'Artigos'],
    ['.article-row:nth-child(1) .article-meta', 'Article 01 · Observability', 'Artigo 01 · Observabilidade'],
    ['.article-row:nth-child(1) h3', 'Observability Stack on Raspberry Pi with K3s', 'Observability Stack no Raspberry Pi com K3s'],
    ['.article-row:nth-child(1) .article-info p:not(.article-meta)', 'Practical guide to building a complete observability stack in a lightweight K3s cluster.', 'Guia prático para montar uma stack completa de observabilidade em um cluster leve usando K3s.'],
    ['.article-row:nth-child(2) .article-meta', 'Article 02 · Kubernetes', 'Artigo 02 · Kubernetes'],
    ['.article-row:nth-child(2) h3', 'HA Kubernetes Cluster on Alpine', 'HA Kubernetes Cluster no Alpine'],
    ['.article-row:nth-child(2) .article-info p:not(.article-meta)', 'Step-by-step guide to creating a highly available Kubernetes cluster using Alpine Linux.', 'Passo a passo para criar um cluster Kubernetes de alta disponibilidade usando Alpine Linux.'],
    ['.article-row:nth-child(3) .article-meta', 'Article 03 · AWS', 'Artigo 03 · AWS'],
    ['.article-row:nth-child(3) h3', 'ECS Cluster with Terraform on AWS', 'ECS Cluster com Terraform na AWS'],
    ['.article-row:nth-child(3) .article-info p:not(.article-meta)', 'Building an ECS cluster on AWS with infrastructure as code, organization, and repeatability.', 'Criação de um cluster ECS na AWS com infraestrutura como código, organização e repetibilidade.'],
    ['.article-row:nth-child(4) .article-meta', 'Article 04 · Web Security', 'Artigo 04 · Segurança Web'],
    ['.article-row:nth-child(4) h3', 'Free SSL Certificate for Websites', 'Certificado SSL gratuito para websites'],
    ['.article-row:nth-child(4) .article-info p:not(.article-meta)', 'HTTPS configuration with a free certificate to improve security and trust in web applications.', 'Configuração de HTTPS com certificado gratuito para melhorar segurança e confiança em aplicações web.'],
    ['.article-row:nth-child(5) .article-meta', 'Article 05 · Ingress', 'Artigo 05 · Ingress'],
    ['.article-row:nth-child(5) h3', 'NGINX Ingress Controller on K3s', 'NGINX Ingress Controller no K3s'],
    ['.article-row:nth-child(5) .article-info p:not(.article-meta)', 'Installing and configuring the NGINX Ingress Controller to expose services in K3s clusters.', 'Instalação e configuração do NGINX Ingress Controller para expor serviços em clusters K3s.'],
    ['.article-row .btn-primary', 'Read Article', 'Ler artigo', {all: true}],
    ['.articles-cta p', 'If you want to see all my articles, click the button below.', 'Se você quiser ver todos os meus artigos, clique no botão abaixo.'],
    ['.articles-cta .btn-primary', 'View all articles', 'Ver todos os artigos'],

    ['#recomendacoes .section-heading h2', 'Recommendations', 'Recomendações'],
    ['.recommendations-lead', 'A sample of comments published by professionals who have worked with me.', 'Uma amostra dos comentários publicados por profissionais que trabalharam comigo.'],
    ['.recommendation-source', 'LinkedIn Recommendation', 'Recomendação LinkedIn', {all: true}],
    ['.retro-testimonial-card:nth-child(1) small', 'Full Stack Developer', 'Desenvolvedor Full Stack'],
    ['.retro-testimonial-card:nth-child(3) .retro-testimonial-quote', 'A highly competent DevOps professional committed to promoting a culture of collaboration and efficiency.', 'Um DevOps altamente competente e comprometido em promover uma cultura de colaboração e eficiência.'],
    ['.retro-testimonial-card:nth-child(3) .retro-testimonial-full', 'I recommend Alesson to companies looking for a highly competent DevOps professional committed to promoting a culture of collaboration and efficiency. I have no doubt any team would be lucky to have him as part of it.', 'Recomendo o Alesson para empresas que buscam um DevOps altamente competente e comprometido em promover uma cultura de colaboração e eficiência. Não tenho dúvidas de que qualquer equipe teria sorte em tê-lo como parte de seu time.'],
    ['.retro-testimonial-card:nth-child(7) .retro-testimonial-quote', 'An excellent professional with skills across different technology areas and great determination to evolve.', 'Excelente profissional, com vários skills em diferentes áreas da tecnologia e grande determinação para evoluir.'],
    ['.retro-testimonial-card:nth-child(10) .retro-testimonial-quote', 'Always willing to learn, always available, and highly knowledgeable about infrastructure.', 'Nunca está cansado de aprender, sempre disposto e domina bem o que se trata de infraestrutura.'],
    ['.recommendations-cta .btn-primary', 'View all recommendations', 'Ver todas as recomendações'],
    ['.testimonial-modal-panel .btn-primary', 'View on LinkedIn', 'Ver no LinkedIn'],

    ['.contact-label', 'Contact', 'Contato'],
    ['.contact h2 span:nth-child(1)', 'Have a project?', 'Tem um projeto?'],
    ['.contact h2 span:nth-child(2)', "Let's talk!", 'Vamos conversar!'],
    ['.contact-form .btn-primary', 'Send message', 'Enviar mensagem'],
    ['label[for="nome"]', 'Name', 'Nome'],
    ['label[for="email"]', 'Email', 'Email'],
    ['label[for="mensagem"]', 'Message', 'Mensagem'],

    ['.footer h2', 'Thanks for visiting my portfolio', 'Obrigado por visitar meu portifolio'],
    ['.footer > p', 'Where to find me ↓', 'Onde me encontrar ↓'],
  ];

  const attrEntries = [
    ['.page-progress', 'aria-label', 'Page progress', 'Progresso da página'],
    ['.navbar', 'aria-label', 'Main navigation', 'Navegação principal'],
    ['.logo', 'aria-label', 'Aleson Viana - Home', 'Aleson Viana - Início'],
    ['.nav-control', 'aria-label', 'Open menu', 'Abrir menu'],
    ['.language-switcher', 'aria-label', 'Language selector', 'Seletor de idioma'],
    ['.hero-actions', 'aria-label', 'Main actions', 'Ações principais'],
    ['.tech-strip', 'aria-label', 'Technologies', 'Tecnologias'],
    ['.stats', 'aria-label', 'Professional statistics', 'Estatísticas profissionais'],
    ['.tags', 'aria-label', 'Technologies and topics', 'Tecnologias e temas', {all: true}],
    ['.social-links', 'aria-label', 'Social links', 'Redes sociais'],
    ['.retro-testimonials-controls', 'aria-label', 'Recommendations carousel controls', 'Controle do carrossel de recomendações'],
    ['[data-testimonials-prev]', 'aria-label', 'Previous recommendation', 'Recomendação anterior'],
    ['[data-testimonials-next]', 'aria-label', 'Next recommendation', 'Próxima recomendação'],
    ['.testimonial-modal-close', 'aria-label', 'Close recommendation', 'Fechar recomendação'],
  ];

  function setText(selector, value, options = {}) {
    const nodes = options.all ? document.querySelectorAll(selector) : [document.querySelector(selector)];
    nodes.forEach(node => {
      if (!node) return;
      node.textContent = value;
      if (options.scramble) {
        node.setAttribute('data-scramble-text', value);
        node.setAttribute('aria-label', value);
      }
    });
  }

  function setAttr(selector, attr, value, options = {}) {
    const nodes = options.all ? document.querySelectorAll(selector) : [document.querySelector(selector)];
    nodes.forEach(node => {
      if (node) node.setAttribute(attr, value);
    });
  }

  function applyLanguage(language) {
    const lang = language === 'pt' ? 'pt' : DEFAULT_LANGUAGE;
    const index = lang === 'pt' ? 2 : 1;
    const meta = pageMeta[lang];

    document.documentElement.lang = meta.lang;
    document.documentElement.dataset.lang = lang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('input[name="_subject"]')?.setAttribute('value', meta.formSubject);

    textEntries.forEach(entry => {
      setText(entry[0], entry[index], entry[3] || {});
    });

    attrEntries.forEach(entry => {
      setAttr(entry[0], entry[1], entry[index + 1], entry[4] || {});
    });

    document.querySelectorAll('[data-lang-option]').forEach(button => {
      const active = button.dataset.langOption === lang;
      button.setAttribute('aria-pressed', String(active));
    });

    document.documentElement.classList.add('i18n-ready');

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      // Ignore unavailable storage.
    }
  }

  function getInitialLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'pt' || stored === 'en') return stored;
    } catch (_) {
      // Ignore unavailable storage.
    }

    return DEFAULT_LANGUAGE;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang-option]').forEach(button => {
      button.addEventListener('click', () => applyLanguage(button.dataset.langOption));
    });

    applyLanguage(getInitialLanguage());
  });
})();
