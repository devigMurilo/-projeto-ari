# Protótipo de alta fidelidade — Portal da Prefeitura de São Tomé/RN

Redesign do portal <https://saotome.rn.gov.br/> como protótipo estático navegável.
HTML + CSS + JavaScript puros, sem build e sem dependências externas além das fontes do Google Fonts
e das imagens de exemplo (placehold.co).

## Como abrir

Abra `index.html` diretamente no navegador (funciona em `file://`) ou sirva a pasta:

```bash
python -m http.server 8000
```

## Rotas

| Arquivo | Página | Origem no site oficial |
|---|---|---|
| `index.html` | Home | `/` |
| `municipio.html` | O Município (dados, história, política, símbolos, hino) | `/o-municipio/` |
| `secretarias.html` | Secretarias Municipais | `/secretarias/` |
| `unidades-saude.html` | Unidades de Saúde | `/unidades-de-saude/` |
| `unidades-escolares.html` | Unidades Escolares | `/unidades-escolares/` |
| `transparencia.html` | Portal da Transparência | `/portais-transparencias/` |
| `licitacoes.html` | Licitações e Editais | `/licitacoes-de-despesas/`, `/editais-2/` |
| `legislacao.html` | Legislação Municipal | Diário Oficial / atos normativos |
| `camara.html` | Câmara Municipal | `/poder-lesgislativo/` |
| `ouvidoria.html` | Ouvidoria e e-SIC | `/ouvidoria/` |
| `servicos.html` | Central de Serviços | atalhos e serviços do portal |
| `noticias.html` | Lista de notícias | categorias do portal |
| `noticia.html` | Notícia (página de detalhe) | post individual |
| `contato.html` | Contato e Acessibilidade | rodapé / dados de atendimento |

## Estrutura

```
assets/css/site.css   folha de estilo única (tokens, componentes, responsivo)
assets/img/           brasão do município (logo do cabeçalho, rodapé e favicon)
assets/js/site.js     cabeçalho/rodapé compartilhados + interações
*.html                uma página por rota, apenas com o conteúdo do <main>
```

### Padronização

O cabeçalho (barra utilitária, menu, busca) e o rodapé **não são duplicados nas páginas**:
`assets/js/site.js` injeta os dois em toda página e marca o item de menu ativo a partir de
`<body data-page="chave">`. Para adicionar uma rota ao menu, inclua uma entrada no array `NAV`
(e, se for o caso, em `FOOTER`) no início do arquivo.

Todo o visual vem de `assets/css/site.css`, organizada em: tokens de design (cores, sombras,
raios, fontes), reset, acessibilidade, layout, tipografia, botões, chrome do site, heros,
componentes de conteúdo, utilitários e media queries.

### Componentes reutilizáveis

`card`, `news-card`, `service-card`, `unit-card`, `list-item`, `doc-item`, `stat`, `person`,
`table.data`, `datalist`, `accordion`, `tabs`, `chips`, `form`, `callout`, `pagination`,
`page-hero`, `breadcrumb`, `map-mock`.

### Comportamentos prontos

- **Acessibilidade**: escala de fonte (A / A+ / A++), persistida em `localStorage`.
- **Menu mobile**: alternado pelo botão hambúrguer abaixo de 1024px.
- **Busca do cabeçalho**: campo inline a partir de 1360px; abaixo disso, botão de lupa que abre um painel
  (fecha com `Esc`). Em qualquer caso envia para `servicos.html?q=termo`, que já filtra pelo parâmetro.
- **Filtros de lista**: qualquer bloco com `data-filter-scope` combina campo de busca
  (`data-filter-input`), chips (`data-filter`) e itens (`data-item data-category`),
  com contador (`data-filter-count`) e estado vazio (`.empty-state`).
- **Abas**: container `data-tabs` com botões `.tab` e painéis `.tab-panel`.
- **Formulários**: `data-mock-form` bloqueia o envio e exibe um protocolo simulado — nenhum dado sai do navegador.

## Dados e links externos

Nomes de secretarias, secretários, endereços, telefones, unidades de saúde e escolares foram
extraídos do portal oficial. Valores financeiros, licitações, atos normativos e a composição da
Câmara são **ilustrativos**, criados apenas para demonstrar as telas.

As **notícias são reais**: títulos, datas, imagens e links vêm das publicações de
`saotome.rn.gov.br` (API REST do WordPress do portal). Os resumos foram reescritos para caber no
layout. `noticia.html` demonstra a página de detalhe com um resumo próprio da matéria de 14/08/2026
e botão para a publicação original.

Todo card de serviço abre o sistema oficial correspondente em nova aba (classe `.ext`, que
desenha a seta de link externo):

| Serviço | Destino |
|---|---|
| IPTU, débitos, certidão negativa | Portal do Contribuinte (`app.topsolutionsrn.com.br`) |
| NFS-e | `gov.br/nfse` |
| Agendamento de consulta | Meu SUS Digital |
| Cartão Nacional de Saúde, vacinação | Ministério da Saúde (gov.br) |
| Matrícula na rede municipal | `saotome.rn.gov.br/unidades-escolares/` |
| Transporte escolar | FNDE — PNATE |
| Ouvidoria e e-SIC | Fala.BR (CGU) |
| CRAS e assistência social | Cadastro Único (gov.br) |
| Alvará e abertura de empresa | REDESIM |
| Licitações e editais | PNCP e portal do município |
| Receitas, despesas, folha, diárias | Portal da Transparência do município |
| Relatórios LRF (RREO/RGF) | Siconfi — Tesouro Nacional |
| Leis, decretos, portarias | Diário Oficial dos Municípios (FEMURN) |
