# 🦷 FacilitaLab — Front-end

Interface web do **FacilitaLab**, sistema de gerenciamento de fluxo de trabalho odontológico para laboratórios de prótese dentária. Este repositório contém apenas o **front-end** (SPA React) que consome a API REST do back-end Spring Boot.

> Projeto acadêmico desenvolvido no **SENAI Camaçari (SEDE)**, Bahia.

---

## 📋 Sobre o projeto

O front-end do FacilitaLab é uma SPA (Single Page Application) responsiva que substitui o antigo front estático em HTML/JS servido pelo próprio back-end. Ele consome a API REST do FacilitaLab para oferecer uma experiência moderna, componentizada e acessível a quatro perfis de usuário: **Dentista**, **Recepção**, **Cadista** e **Gestor**.

### O que ele faz

- 📋 **Dentista** — criar pedidos, anexar arquivos STL, acompanhar status, aprovar/rejeitar design e comentar.
- 📥 **Recepção** — receber e triar pedidos, aprovar ou devolver com motivo, gerenciar a fila inicial e finalizar pedidos.
- 🎨 **Cadista** — analisar pedidos tecnicamente, modelar, gerar versões, solicitar correções e enviar para aprovação.
- 📊 **Gestor** — monitorar o fluxo de pedidos, produtividade por cadista e prazos.

---

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| **Framework** | React 19 |
| **Build tool** | Vite |
| **Estilo** | Tailwind CSS 4 (via plugin `@tailwindcss/vite`) |
| **Roteamento** | react-router-dom v7 |
| **Ícones** | lucide-react |
| **Fonte** | Inter (Google Fonts) |
| **Cliente HTTP** | `fetch` nativo (sem axios) |
| **Validação de formulário** | Sem biblioteca — validação manual inline |
| **Linguagem** | JavaScript (JSX), sem TypeScript |

### Decisões técnicas

- **Sem TypeScript** — projeto acadêmico, mantém baixa barreira para contribuição.
- **Sem biblioteca de UI** — componentes próprios (Card, Tabela, Toast, ConfirmDialog, Campo) com Tailwind.
- **Sem biblioteca de formulários** — validação inline e máscaras manuais (CPF, telefone, data).
- **Sem biblioteca HTTP** — `fetch` encapsulado em `services/api.js`.
- **Sem biblioteca de estado global** — `useAuth` via Context API; restante é estado local.

---

## 📁 Estrutura de pastas

```
front-end/
├── public/
├── src/
│   ├── components/         Componentes reutilizáveis (Card, Tabela, Toast, etc.)
│   ├── constants/          Enums centralizados (enums.js)
│   ├── context/            AuthContext (sessão do usuário)
│   ├── pages/              Telas da aplicação (uma por arquivo)
│   ├── routes/             AppRoutes.jsx, ProtectedRoute.jsx
│   ├── services/           Cliente HTTP e services de API
│   ├── utils/              Formatadores, helpers de erro, mapeadores
│   ├── App.jsx             Provider principal
│   ├── main.jsx            Entry point
│   └── index.css           Tokens do tema (bloco @theme do Tailwind 4)
├── vite.config.js          Configuração do Vite + proxy de dev
├── package.json
└── README.md
```

---

## ✅ Pré-requisitos

- **Node.js 20+** (recomendado 22 LTS)
- **npm** ou **pnpm**
- **Back-end FacilitaLab rodando** em `http://localhost:8081` (Spring Boot)

---

## 🚀 Como executar

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd front-end
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` (ou `.env.local`) na raiz do projeto:

```env
# URL base da API. Em desenvolvimento, deixe vazio para usar o proxy do Vite.
VITE_API_URL=
```

> 💡 Em desenvolvimento, o Vite faz proxy de `/auth`, `/pedidos` e `/usuarios` para `http://localhost:8081`. Por isso `VITE_API_URL` pode ficar vazia.

### 4. Subir o back-end

Antes de iniciar o front, garanta que o back-end Spring Boot está rodando em `http://localhost:8081`. Veja o README do back-end para instruções.

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação sobe por padrão em **http://localhost:5173**.

### 6. Acessar

Use as credenciais do usuário **GESTOR** seed do back-end:

| Campo | Valor |
|---|---|
| E-mail | `admin@facilitalab.com` |
| Senha | `admin123` |

---

## 🎨 Identidade visual

Estilo clínico/azul, limpo, baseado em cards de cor sutil. Tokens do tema registrados em `src/index.css` no bloco `@theme` do Tailwind 4.

| Token | Cor | Uso |
|---|---|---|
| `bg-canvas` | `#f0f4f8` | Fundo geral |
| `bg-card` | `#ffffff` | Cards |
| `bg-input` | `#f7fafd` | Campos de formulário |
| `border-line` | `#dce6f0` | Bordas |
| `text-ink` | `#1e2d3d` | Texto principal |
| `text-muted` | `#6b7f94` | Texto secundário |
| `bg-accent` | `#2d6a9f` | Botões / destaques |
| `bg-accent-strong` | `#1a3a5c` | Hover do accent / sidebar |
| `bg-sidebar` | `#1a3a5c` | Sidebar |
| `text-danger` | `#c0392b` | Erros |
| `text-success` | `#1e7e4a` | Sucesso |

Badges de estado do pedido e prioridade usam cores semânticas definidas em `src/constants/enums.js`.

---

## 🗺️ Rotas da aplicação

### Públicas

| Rota | Tela |
|---|---|
| `/` ou `/login` | Login |
| `/recuperar-senha` | Solicitar recuperação de senha |
| `/redefinir-senha?token=` | Redefinir senha (link do e-mail) |

### Autenticadas (sob `/app/`)

| Rota | Tela | Perfis |
|---|---|---|
| `/app/dashboard` | Dashboard do Gestor | GESTOR |
| `/app/dashboard-dentista` | Dashboard do Dentista | DENTISTA |
| `/app/dashboard-recepcao` | Dashboard da Recepção | RECEPCAO |
| `/app/dashboard-cadista` | Dashboard do Cadista | CADISTA |
| `/app/usuarios` | Lista de Usuários | GESTOR, RECEPCAO |
| `/app/usuarios/novo` | Cadastro de Usuário | GESTOR, RECEPCAO |
| `/app/usuarios/:id/editar` | Edição de Usuário | GESTOR, RECEPCAO |
| `/app/pedidos` | Lista Geral de Pedidos | GESTOR, RECEPCAO, CADISTA |
| `/app/pedidos/novo` | Novo Pedido | DENTISTA |
| `/app/pedidos/:id` | Detalhe do Pedido | Todos (dentista só o próprio) |
| `/app/pedidos/:id/editar` | Edição do Pedido | Todos (dentista só o próprio) |
| `/app/meus-pedidos` | Meus Pedidos | DENTISTA |
| `/app/triagem` | Triagem | RECEPCAO |
| `/app/fila-modelagem` | Fila de Modelagem | CADISTA |
| `/app/producao` | Controle de Produção | GESTOR, RECEPCAO |
| `/app/relatorios` | Relatórios | GESTOR |
| `/app/perfil` | Perfil (somente leitura) | Todos |
| `/app/403` | Acesso negado | Autenticado |
| `*` | Página não encontrada | Qualquer |

Após o login, o redirecionamento é por perfil:
- DENTISTA → `/app/dashboard-dentista`
- RECEPCAO → `/app/dashboard-recepcao`
- GESTOR → `/app/dashboard`
- CADISTA → `/app/dashboard-cadista`

---

## 🔐 Autenticação e sessão

- Login via `POST /auth/login` retorna `{ id, token, nome, perfil }`.
- Sessão persistida em `localStorage` na chave `facilitalab.sessao`.
- Cabeçalho `Authorization: Bearer <token>` injetado automaticamente em todas as requisições pelo `services/api.js`.
- `ProtectedRoute` checa sessão e perfil; sem sessão → redireciona ao login; perfil não autorizado → `/app/403`.
- Logout limpa `localStorage` e volta ao login.

> ⚠️ **Sem `/me`**: o back-end não tem endpoint `/me`. A sessão usa os dados retornados no login.

---

## 🌐 Proxy de desenvolvimento

Para evitar CORS entre o front (5173) e o back (8081), o `vite.config.js` faz proxy das rotas da API:

```js
export default defineConfig({
  server: {
    proxy: {
      '/auth': 'http://localhost:8081',
      '/pedidos': 'http://localhost:8081',
      '/usuarios': 'http://localhost:8081',
    },
  },
})
```

Em produção, configure CORS no back-end ou empacote o build em `static/`.

---

## 📦 Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção para `dist/` |
| `npm run preview` | Servidor estático para pré-visualizar o build |
| `npm run lint` | Roda o ESLint |

---

## 📜 Convenções de código

- **JavaScript com JSX**, sem TypeScript.
- **Sem comentários no código** (regra do projeto).
- **Named exports** em todas as páginas e componentes (`export function Nome()`).
- **Páginas em `src/pages/`**, **componentes em `src/components/`**, **serviços em `src/services/`**.
- **Enums centralizados** em `src/constants/enums.js` — proibido duplicar rótulos ou cores em outros arquivos.
- **Todo texto de interface em PT-BR**.
- **Nunca usar `dangerouslySetInnerHTML`** com dados da API.
- **Datas `yyyy-MM-dd`** convertidas com `new Date(valor + 'T00:00:00')` para evitar deslocamento de fuso.
- **Componente reutilizável** só quando houver uso real em pelo menos duas telas.

---

## 🎯 Estado atual do desenvolvimento

Concluídas:
- ✅ Fase 0 — Fundação (tokens, enums, cliente HTTP, auth, layout, componentes UI base)
- ✅ Fase 1 — Acesso (login, recuperar senha, redefinir senha, 403, 404)
- ✅ Fase 2 — Usuários (lista, cadastro, edição)

Em desenvolvimento:
- 🔄 Fase 3 — Fluxo do Dentista (novo pedido, meus pedidos, detalhe, edição, dashboard)

Pendentes:
- ⏳ Fase 4 — Recepção (lista geral, triagem, dashboard, produção)
- ⏳ Fase 5 — Gestor (dashboard, relatórios)
- ⏳ Fase 6 — Cadista (fila de modelagem, dashboard)
- ⏳ Fase 7 — Qualidade e entrega (responsividade, acessibilidade, erros, testes, build)

> Veja o detalhamento no documento `PROGRESSO.md` (documento mestre do projeto).

---

## 🎯 Escopo do MVP

### ✅ Dentro do escopo

- SPA responsiva (desktop, tablet, mobile básico)
- Operação para um único laboratório
- Workflow completo de pedidos (criação → triagem → modelagem → aprovação → usinagem → finalização)
- Comentários e auditoria por pedido (quando o back-end suportar)
- Painel gerencial básico

### ❌ Fora do escopo

- Aplicativo mobile nativo
- Integração direta com fresadoras e impressoras 3D
- Notificações push (sem WebSocket/SSE no MVP)
- Suporte offline

---

## 👨‍💻 Equipe

| Nome | E-mail |
|---|---|
| Kaio Antunes | kaio.coelho@ba.estudante.senai.br |
| João Matheus do Nascimento Silva | joao.m.silva13@ba.estudante.senai.br |
| Juan Pablo Cano | juan.cano@ba.estudante.senai.br |
| Paulo Filipe Nascimento Santana | paulo.f.santana@ba.estudante.senai.br |
| Victor Hugo Reis | victor.h.reis@ba.estudante.senai.br |

**Instituição:** SENAI SEDE — Camaçari, Bahia.

---

## 📚 Documentação relacionada

- **Back-end FacilitaLab** — repositório separado com Spring Boot + MySQL
- **Documento de requisitos** — `Relatorio de Requisitos FacilitaLab.docx`
- **Briefing técnico** — `facilitalab-briefing-frontend.md` (contrato da API, enums, máquina de estados, permissões)
- **Roteiro de progresso** — `PROGRESSO.md` (fonte de verdade do andamento)

---

## 📄 Licença

Projeto acadêmico — uso restrito ao contexto do curso técnico SENAI. Sem licença open-source atribuída neste momento.
