# Aleson Viana Portfolio

Portfólio pessoal estático de Aleson Viana, construído com HTML, CSS e JavaScript puro. O site apresenta posicionamento profissional como DevOps Engineer, projetos, trajetória profissional, artigos técnicos, recomendações do LinkedIn, contato e download do resume em PDF.

O projeto não depende de Node.js, bundlers ou frameworks frontend. A publicação principal é feita como Static Site no Render, usando o script `scripts/build-static.sh` para gerar a pasta `dist/`.

## Sumário

- [Visão geral](#visão-geral)
- [Stack](#stack)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar localmente](#como-executar-localmente)
- [Build estático](#build-estático)
- [Deploy no Render](#deploy-no-render)
- [Conteúdo do site](#conteúdo-do-site)
- [Internacionalização](#internacionalização)
- [Animações e interações](#animações-e-interações)
- [Manutenção de conteúdo](#manutenção-de-conteúdo)
- [Fluxos legados](#fluxos-legados)
- [Checklist antes de publicar](#checklist-antes-de-publicar)
- [Troubleshooting](#troubleshooting)

## Visão geral

O site é uma single page application estática no sentido de navegação, mas sem framework. Todas as seções vivem em `index.html` e são acessadas por âncoras:

- `#home`: hero principal, CTA de projetos e download do resume.
- `#sobre`: resumo profissional, áreas de atuação e experiência acumulada.
- `#projetos`: cards/linhas com projetos selecionados.
- `#carreira`: histórico profissional.
- `#artigos`: artigos técnicos publicados no Medium.
- `#recomendacoes`: carrossel e modal com recomendações profissionais.
- `#contato`: formulário de contato via Formspree.

O layout usa um visual escuro, técnico e responsivo, com background animado, textos com efeito de scramble, carrossel de recomendações e alternância entre inglês e português.

## Stack

- HTML5 em `index.html`.
- CSS puro em `styles.css`.
- JavaScript puro em:
  - `asmr-background.js`
  - `hero-animations.js`
  - `js/i18n.js`
  - `js/recommendations.js`
- Google Fonts com a família `Poppins`.
- Formspree para envio do formulário de contato.
- Render Static Site para deploy principal.
- Docker, GitHub Actions e Kubernetes como fluxos legados/opcionais.

Não há `package.json`, instalação de dependências ou etapa de transpilação.

## Estrutura do projeto

```text
.
├── index.html                 # Documento principal e conteúdo das seções
├── styles.css                 # CSS principal usado pela página atual
├── style.css                  # CSS legado, copiado por compatibilidade no build
├── asmr-background.js         # Canvas animado de fundo após a seção hero
├── hero-animations.js         # Efeito scramble e chuva de caracteres do hero
├── js/
│   ├── i18n.js                # Alternância EN/PT por seletores DOM
│   ├── recommendations.js     # Carrossel e modal das recomendações
│   └── *.js                   # Bibliotecas/scripts legados mantidos no projeto
├── css/                       # CSS legado e bibliotecas antigas
├── scss/                      # Fontes SCSS legadas, não usadas no build atual
├── img/
│   ├── articles/              # Imagens dos artigos
│   ├── recommendations/       # Avatares das recomendações
│   └── ...                    # Imagens do hero, projetos, favicon e assets
├── docs/
│   └── Resume_alesson_2026.pdf # Arquivo baixado pelo CTA "Download Resume"
├── scripts/
│   └── build-static.sh        # Gera a pasta dist para deploy
├── dist/                      # Saída gerada, ignorada pelo Git
├── render.yaml                # Blueprint do Render
├── Dockerfile                 # Fluxo Docker legado/opcional
├── Kubernetes/                # Manifests Kubernetes legados
└── .github/workflows/         # Workflow legado de build/push Docker
```

## Como executar localmente

Por ser um site estático, existem duas formas simples de testar.

### Abrindo o HTML direto

Abra `index.html` no navegador. Esse caminho funciona para a maioria dos testes visuais.

### Usando servidor local

Este caminho é mais próximo de produção, especialmente para validar caminhos relativos, downloads e comportamento de formulário:

```sh
python3 -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Build estático

O build oficial do projeto é:

```sh
bash scripts/build-static.sh
```

O script executa as seguintes ações:

1. Remove a pasta `dist/` anterior.
2. Cria uma nova pasta `dist/`.
3. Copia os arquivos públicos necessários:
   - `index.html`
   - `styles.css`
   - `style.css`
   - `asmr-background.js`
   - `hero-animations.js`
   - `script.js`
   - `css/`
   - `docs/`
   - `fonts/`
   - `img/`
   - `js/`
4. Remove arquivos `.DS_Store` da saída.

A pasta `dist/` é gerada e não deve ser versionada. O arquivo `.gitignore` já ignora esse diretório.

## Deploy no Render

O deploy principal está configurado no `render.yaml` como Static Site.

Configurações importantes:

- Tipo de serviço: `web`
- Runtime: `static`
- Nome do serviço: `alesson-viana-site`
- Build command: `bash scripts/build-static.sh`
- Publish directory: `dist`
- Auto deploy: ativado a cada commit
- Headers:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- Rewrite:
  - `/*` para `/index.html`

### Passos de deploy

1. Faça commit das alterações.
2. Faça push para o repositório conectado ao Render.
3. O Render executará `bash scripts/build-static.sh`.
4. O conteúdo de `dist/` será publicado.

Se criar o serviço manualmente no Render, use:

```text
Build command: bash scripts/build-static.sh
Publish directory: dist
```

## Conteúdo do site

### Hero

Local: `index.html`, seção `#home`.

Contém:

- Nome e título profissional.
- Texto principal com `data-scramble-text`, usado por `hero-animations.js`.
- CTA `Ver Projetos`.
- CTA `Download Resume`, apontando para `docs/Resume_alesson_2026.pdf`.
- Imagem principal em `img/hero-aleson.png`.
- Camada de chuva de caracteres em `.hero-rain`.

### Tech strip

Local: `index.html`, seção `.tech-strip`.

Lista tecnologias e temas de destaque como AWS, Terraform, Kubernetes, Ansible, Git, AI Agents e Pipelines.

### Sobre

Local: `index.html`, seção `#sobre`.

Inclui cards de serviço, resumo profissional e estatística de anos de experiência.

### Projetos

Local: `index.html`, seção `#projetos`.

Projetos atuais:

- ArcaDev
- Mathi
- Verso Diário
- Contagem de Membros

Cada projeto é um `article.project-row` com:

- Título.
- Tags.
- Descrição.
- Links externos.
- Preview visual em HTML/CSS ou imagem.

### Carreira

Local: `index.html`, seção `#carreira`.

Experiências atuais:

- Harris Computer
- Connectist
- GFT
- Instituto Atlântico
- Clínica SiM

Cada experiência segue o padrão:

- Período e local em `.career-meta`.
- Cargo em `h3`.
- Empresa em `.career-company`.
- Tags de tecnologias/práticas.
- Texto descritivo.
- Lista de destaques em `.career-highlights`.
- Preview visual lateral.

### Artigos

Local: `index.html`, seção `#artigos`.

Os artigos usam imagens em `img/articles/` e links para o Medium. Ao adicionar um novo artigo, inclua:

- Um novo `article.article-row`.
- Imagem otimizada em `img/articles/`.
- `alt` descritivo.
- Link externo com `target="_blank"` e `rel="noopener noreferrer"`.
- Traduções correspondentes em `js/i18n.js`, se o conteúdo precisar mudar entre EN/PT.

### Recomendações

Local: `index.html`, seção `#recomendacoes`.

As recomendações são botões dentro de `.retro-testimonials-track`. Cada card contém:

- Imagem em `img/recommendations/`.
- Texto curto em `.retro-testimonial-quote`.
- Nome em `strong`.
- Cargo/descrição em `small`.
- Texto completo em `.retro-testimonial-full`.

O comportamento do carrossel e do modal fica em `js/recommendations.js`.

### Contato

Local: `index.html`, seção `#contato`.

O formulário envia para Formspree:

```html
action="https://formspree.io/f/xzdyjbln"
method="POST"
```

Campos:

- `name`
- `email`
- `message`
- `_subject`

Se o endpoint do Formspree mudar, atualize o atributo `action` do formulário.

### Footer

Local: `index.html`, elemento `footer.footer`.

Inclui links para:

- GitHub
- LinkedIn
- Email

## Internacionalização

Arquivo principal: `js/i18n.js`.

O site suporta:

- Inglês (`en`)
- Português (`pt`)

O idioma padrão é inglês:

```js
const DEFAULT_LANGUAGE = 'en';
```

O idioma escolhido é salvo em `localStorage` usando a chave:

```js
portfolio-language
```

### Como funciona

`js/i18n.js` mantém arrays de seletores:

- `textEntries`: textos visíveis.
- `attrEntries`: atributos como `aria-label`.
- `pageMeta`: `lang`, `title`, `description` e assunto do formulário.

Ao carregar a página, o script:

1. Lê o idioma salvo no navegador.
2. Aplica inglês caso não exista preferência salva.
3. Atualiza textos, metadados e atributos.
4. Marca o botão de idioma ativo com `aria-pressed`.
5. Adiciona `i18n-ready` ao elemento `html`.

### Atenção ao editar HTML

As traduções dependem de seletores CSS. Se mudar a estrutura do DOM, trocar a ordem de cards ou alterar classes importantes, revise também `js/i18n.js`.

Exemplo: seletores como este dependem da posição do item na lista:

```js
['#projetos .projects-list > article:nth-child(1) .project-info p', ...]
```

Se adicionar um projeto no meio da lista, os `nth-child` seguintes podem precisar de ajuste.

## Animações e interações

### `hero-animations.js`

Responsável por:

- Efeito de scramble em elementos com `data-scramble-text`.
- Chuva de caracteres na camada `.hero-rain`.
- Respeito a `prefers-reduced-motion`.
- Pausa/reinício de animação quando a aba fica oculta.

### `asmr-background.js`

Responsável pelo canvas fixo `.asmr-background-canvas`.

Características:

- Ativa o background somente depois que o usuário passa da seção hero.
- Usa partículas com interação magnética com mouse/toque.
- Respeita `prefers-reduced-motion`.
- Pausa quando a aba fica oculta.
- Recalcula densidade de partículas no resize.

### `js/recommendations.js`

Responsável por:

- Carrossel horizontal de recomendações.
- Botões anterior/próximo.
- Autoplay com pausa em hover, foco, toque e modal.
- Modal acessível com fechamento por botão, backdrop e tecla `Escape`.
- Retorno de foco para o card aberto.

## Manutenção de conteúdo

### Alterar o resume

1. Substitua o arquivo em:

```text
docs/Resume_alesson_2026.pdf
```

2. Se o nome do arquivo mudar, atualize o CTA no `index.html`:

```html
<a class="btn btn-outline" href="docs/Resume_alesson_2026.pdf" download="Resume_alesson_2026.pdf">
  Download Resume
</a>
```

3. Rode o build:

```sh
bash scripts/build-static.sh
```

4. Confirme se o arquivo foi copiado para:

```text
dist/docs/Resume_alesson_2026.pdf
```

### Adicionar projeto

1. Duplique um `article.project-row` em `#projetos`.
2. Ajuste título, tags, descrição e links.
3. Crie ou reaproveite um preview visual.
4. Adicione imagens em `img/`, se necessário.
5. Atualize `js/i18n.js` para inglês/português.
6. Teste desktop e mobile.

### Adicionar experiência profissional

1. Duplique um `article.career-row` em `#carreira`.
2. Ajuste período, cargo, empresa, tags e destaques.
3. Revise o preview lateral.
4. Atualize traduções em `js/i18n.js`.

### Adicionar artigo

1. Adicione a imagem em `img/articles/`.
2. Duplique um `article.article-row` em `#artigos`.
3. Ajuste metadados, título, tags, descrição, link e `alt`.
4. Atualize traduções em `js/i18n.js`.

### Adicionar recomendação

1. Adicione a imagem em `img/recommendations/`.
2. Duplique um `.retro-testimonial-card`.
3. Ajuste `aria-label`, imagem, resumo, nome, cargo e texto completo.
4. Atualize `js/i18n.js` se o texto tiver versão em mais de um idioma.

### Adicionar novos assets públicos

Se criar uma nova pasta pública, atualize `scripts/build-static.sh` para copiá-la para `dist/`.

Exemplo:

```sh
cp -R nova-pasta dist/
```

Se o fluxo Docker voltar a ser usado, mantenha o `Dockerfile` sincronizado com os arquivos públicos atuais.

## SEO e acessibilidade

Boas práticas já presentes:

- `title` e `meta description` controlados por idioma.
- `meta author`.
- Imagens relevantes com `alt` nas seções de artigos.
- Links externos com `rel="noopener noreferrer"`.
- Navegação por âncoras.
- Botões de idioma com `aria-pressed`.
- Modal de recomendações com `role="dialog"` e `aria-modal`.
- Scripts de animação respeitando `prefers-reduced-motion`.

Ao adicionar conteúdo:

- Use textos `alt` descritivos em imagens informativas.
- Preserve labels em formulários.
- Mantenha contraste adequado.
- Evite depender apenas de animação para comunicar informação.
- Revise atributos `aria-label` em botões iconográficos.

## Fluxos legados

### Docker

O projeto possui um `Dockerfile` baseado em Nginx Alpine:

```sh
docker build -t alesson-viana-site .
docker run --rm -p 8080:80 alesson-viana-site
```

Acesse:

```text
http://localhost:8080
```

Esse fluxo é opcional/legado. O deploy principal atual é o Render Static Site. Se novos assets forem adicionados, revise o `Dockerfile` antes de depender desse caminho.

### GitHub Actions

Existe um workflow em `.github/workflows/deploy.yml` para build e push de imagem Docker.

Pontos importantes:

- Dispara em push para `main`.
- Usa `docker/login-action`.
- Publica tags `alesson23/site:latest` e `alesson23/site:${{ github.sha }}`.
- O bloco de deploy Kubernetes está comentado.

Esse fluxo não é necessário para o deploy no Render.

### Kubernetes

A pasta `Kubernetes/` contém manifests legados para:

- Namespace `dev-site`.
- Deployment `static-site` com Nginx e exporter de métricas.
- Service LoadBalancer com annotations de MetalLB e Prometheus.

Esses manifests não são usados pelo Render.

## Checklist antes de publicar

Antes de fazer commit/push:

1. Rodar o build:

```sh
bash scripts/build-static.sh
```

2. Testar localmente:

```sh
python3 -m http.server 8080
```

3. Validar no navegador:

- Menu desktop e mobile.
- Alternância EN/PT.
- CTA `Download Resume`.
- Links externos de projetos/artigos.
- Carrossel e modal de recomendações.
- Formulário de contato.
- Responsividade em mobile.

4. Conferir o status do Git:

```sh
git status -sb
```

5. Fazer commit e push.

## Troubleshooting

### O site fica invisível por alguns instantes

O CSS esconde o `body` enquanto a internacionalização não terminou:

```css
html.js:not(.i18n-ready) body {
  opacity: 0;
}
```

Se o site permanecer invisível, verifique erros no console relacionados a `js/i18n.js`.

### Um texto não muda ao trocar idioma

Provavelmente o seletor correspondente em `js/i18n.js` não encontra mais o elemento. Verifique se a classe, estrutura ou ordem dos elementos mudou.

### O download do resume não funciona

Confirme se o arquivo existe:

```text
docs/Resume_alesson_2026.pdf
```

Depois rode:

```sh
bash scripts/build-static.sh
```

E confira se o arquivo foi copiado para:

```text
dist/docs/Resume_alesson_2026.pdf
```

### Imagens com espaço no nome não carregam

No HTML, nomes com espaço devem ser URL encoded. Exemplo:

```html
src="img/articles/HA%20Kubernetes%20Cluster%20no%20Alpine.png"
```

### Alterei HTML e as traduções ficaram erradas

Revise os seletores com `nth-child` em `js/i18n.js`. Ao inserir itens no meio de listas, a posição dos elementos muda.

### O deploy no Render não mostra a mudança

Verifique:

- Se o push foi feito para o branch conectado.
- Se o Render executou `bash scripts/build-static.sh`.
- Se o arquivo alterado está sendo copiado para `dist/`.
- Se o cache do navegador não está mostrando uma versão antiga.
