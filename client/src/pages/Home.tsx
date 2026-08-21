/* Aurora de Dados — narrativa de investigação, cases atuais e interações que revelam evidências sem transformar o portfólio em ruído. */
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Cpu,
  Download,
  Database,
  ExternalLink,
  FileCheck2,
  Github,
  Layers3,
  Linkedin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Compass,
} from "lucide-react";

const b = import.meta.env.BASE_URL;
const heroImage = `${b}marinize-hero-aurora.png`;
const ansImage = `${b}ans-architecture.jpg`;
const financeImage = `${b}monte-carlo.jpg`;
const igrImage = `${b}igr-dashboard.jpg`;
const treasuryImage = `${b}treasury-system.jpg`;
const auroraImage = `${b}aurora-coffee-bi.jpg`;
const oopImage = `${b}oop-rental-budget-simulator.jpg`;
const markImage = `${b}marinize-mark.png`;

const particles = Array.from({ length: 52 }, (_, index) => ({
  left: `${(index * 23 + 7) % 100}%`,
  delay: `${(index * 0.37) % 7}s`,
  duration: `${7 + ((index * 1.17) % 8)}s`,
  size: `${2 + (index % 3)}px`,
  opacity: 0.16 + (index % 5) * 0.045,
  depth: 0.4 + (index % 5) * 0.15,
}));

const navItems = [
  { label: "Essência", href: "#essencia" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Cases", href: "#cases" },
  { label: "Stack", href: "#stack" },
];

type ProjectFilter = "all" | "data-engineering" | "data-analysis" | "development";
type ProjectKey = "ans" | "igr" | "aurora" | "treasury" | "montecarlo" | "realestate";

type ProjectDetail = {
  eyebrow: string;
  title: string;
  summary: string;
  architecture: string[];
  stack: string[];
  decision: string;
  outcome: string;
  learnings: string[];
  link?: { label: string; href: string };
};

const projectDetails: Record<ProjectKey, ProjectDetail> = {
  ans: {
    eyebrow: "engenharia de dados · case em evolução",
    title: "Plataforma Analítica ANS",
    summary: "A evolução de um teste técnico para um ecossistema analítico orientado por domínios, investigação e rastreabilidade.",
    architecture: [
      "Fontes públicas oficiais da ANS",
      "Bronze: preservação da origem e histórico",
      "Silver: padronização, enriquecimento e validações",
      "Gold: visão 360, indicadores, distribuições, inteligência e datasets para ML",
      "Enterprise Analytics: cruzamento entre domínios"
    ],
    stack: ["Python", "Pandas", "PySpark", "ETL / ELT", "MySQL → PostgreSQL", "Arquitetura Medallion", "Modelagem dimensional"],
    decision: "A investigação da UF “DE” mostrou que a inconsistência não era um erro do ETL, mas uma lacuna cadastral na fonte. Preservar o grupo e investigar sua origem tornou-se um princípio arquitetural.",
    outcome: "Uma base modular em construção, com quatro domínios analíticos, produtos padronizados e rastreabilidade desde a extração.",
    learnings: [
      "A sigla “DE” ensinou que uma saída inesperada pode ser evidência, não ruído.",
      "O Spark entrou quando o volume e as limitações do MySQL exigiram uma arquitetura híbrida.",
      "Logs, camadas e rastreabilidade transformaram cada erro em uma pista investigável."
    ],
    link: { label: "ver primeiro repositório", href: "https://github.com/marinizedev/data-pipeline-fastapi-ans" },
  },
  igr: {
    eyebrow: "análise de dados · Data Storytelling",
    title: "ANS Complaints Insights",
    summary: "Um projeto independente para transformar 151.501 registros de reclamações em uma narrativa analítica confiável.",
    architecture: [
      "Extração e preparação do arquivo oficial da ANS",
      "EDA com validação de tipos, nulos e duplicidades",
      "Cálculo do IGR com investigação metodológica",
      "Dashboard interativo com Streamlit e Plotly",
      "Testes de regras de negócio e Integração Contínua"
    ],
    stack: ["Python", "Pandas", "Streamlit", "Plotly", "Pytest", "GitHub Actions", "Deploy contínuo"],
    decision: "A metodologia inicialmente encontrada para o IGR não sustentava uma análise confiável. Ela foi investigada, corrigida e documentada sem apagar o caminho anterior.",
    outcome: "Um dashboard público em que a confiança da narrativa nasce antes da visualização.",
    learnings: [
      "Uma visualização estranha pode revelar uma pergunta melhor.",
      "Corrigir uma metodologia sem apagar o caminho anterior fortalece a confiabilidade da análise.",
      "Um dashboard só comunica bem quando a base e as hipóteses foram validadas antes."
    ],
    link: { label: "abrir projeto publicado", href: "https://huggingface.co/spaces/marinizeeng/ans-complaints-insights" },
  },
  aurora: {
    eyebrow: "desenvolvimento · Analytics Engineering",
    title: "Aurora Coffee BI v2",
    summary: "Um pipeline end-to-end revisado após auditoria de qualidade, conectando dados simulados a uma camada de decisão.",
    architecture: [
      "Geração e transformação com Python e Pandas",
      "MySQL com Star Schema e grão explícito da fato",
      "API REST com FastAPI",
      "Validação cruzada entre CSV, banco, API e Power BI",
      "Testes automatizados e CI com GitHub Actions"
    ],
    stack: ["Python", "Pandas", "MySQL", "Star Schema", "FastAPI", "Power BI", "Pytest", "GitHub Actions"],
    decision: "A auditoria EDAP confirmou a necessidade de deduplicação. A investigação encontrou a causa na granularidade da fato, além de corrigir UUID, validações defensivas e um problema de locale/tipagem no Power BI.",
    outcome: "Um projeto que transforma simulação em confiança por meio de consistência entre todas as camadas.",
    learnings: [
      "Auditoria externa é uma oportunidade de investigação, não apenas uma aprovação.",
      "O grão da fato precisa ser entendido antes de qualquer métrica ser consumida.",
      "CSV, banco, API e dashboard devem contar a mesma história."
    ],
    link: { label: "abrir repositório", href: "https://github.com/marinizedev/aurora-coffee-bi" },
  },
  treasury: {
    eyebrow: "desenvolvimento · solução real",
    title: "Sistema inteligente de tesouraria",
    summary: "Uma automação financeira e documental criada para uma necessidade real, usada mensalmente no trabalho de tesouraria da Igreja. A rotina que antes levava aproximadamente 4–5 horas de lançamentos, relatórios e comprovantes agora é concluída em poucos minutos.",

    architecture: [
      "Entrada de informações financeiras e documentos",
      "Tratamento tabular e geração de relatórios",
      "Automação de planilhas com openpyxl",
      "Organização de documentos e PDFs",
      "Rotina operacional acompanhada por validação humana"
    ],
    stack: ["Python", "Pandas", "openpyxl", "PDF", "Automação de processos", "Documentação"],
    decision: "A tecnologia foi escolhida para reduzir trabalho repetitivo sem remover a responsabilidade de conferência. O sistema foi avaliado e aprovado pelo contador responsável.",
    outcome: "Uma solução autoral em uso real, criada a partir de uma dor concreta e incorporada a uma rotina mensal.",
    learnings: [
      "Uma boa solução começa pela rotina real de quem vai utilizá-la.",
      "Automatizar não elimina a conferência: organiza o trabalho para torná-la mais segura.",
      "Validação técnica e validação humana precisam coexistir."
    ],
    link: { label: "abrir repositório", href: "https://github.com/marinizedev/nonprofit-financial-report-automation" },
  },
  montecarlo: {
    eyebrow: "engenharia de dados · simulação financeira",
    title: "Finance Analytics & Monte Carlo Simulation",
    summary: "Simulação estocástica para análise de risco financeiro e projeção de cenários econômicos com alta robustez.",
    architecture: [
      "Geração de distribuições probabilísticas",
      "Simulação de múltiplos cenários de risco",
      "Agregação e consolidação com Pandas",
      "Validação estatística dos resultados"
    ],
    stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Simulação de Monte Carlo"],
    decision: "Aplicar modelagem estocástica para antecipar variações de mercado e avaliar volatilidade de ativos com rigor estatístico.",
    outcome: "Modelo preditivo validado com relatórios automatizados de distribuição de probabilidade.",
    learnings: [
      "A incerteza pode ser modelada quando tratada com distribuições estatísticas rigorosas.",
      "Visualizar intervalos de confiança evita decisões baseadas em médias cegas."
    ],
    link: { label: "abrir repositório", href: "https://github.com/marinizedev/finance-analytics-pipeline" },
  },
  realestate: {
    eyebrow: "desenvolvimento · aplicação web",
    title: "OOP Rental & Budget Simulator",
    summary: "Aplicação web desenvolvida em Python e Flask para simular orçamentos de aluguel com regras de negócio reais de uma imobiliária.",
    architecture: [
      "Modelagem orientada a objetos (OOP )",
      "Regras de negócio encapsuladas",
      "Núcleo independente executável via CLI",
      "Interface web com Flask e deploy no Render"
    ],
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "OOP", "Render"],
    decision: "Separar a lógica de negócio da interface web, mantendo um núcleo orientado a objetos reutilizável via terminal e disponibilizando a aplicação pelo Flask.",
    outcome: "Aplicação publicada no Render, com execução via navegador ou CLI e geração de relatórios de orçamento em CSV.",
    learnings: [
      "A separação entre a lógica de negócio, a interface web e o deploy tornou a evolução do sistema mais organizada.",
      "A orientação a objetos ajudou a representar diferentes tipos de imóveis e suas regras específicas.",
      "Expandir um trabalho acadêmico para uma aplicação web exigiu integrar backend, frontend, experiência do usuário e publicação em produção."
    ],
    link: { label: "abrir repositório", href: "https://github.com/marinizedev/oop-rental-budget-simulator" },
  },

};

const stackGroups = [
  { label: "Construção", icon: Terminal, items: ["Python", "SQL", "Pandas", "PySpark", "ETL / ELT", "FastAPI", "Flask"] },
  { label: "Confiabilidade", icon: ShieldCheck, items: ["Pytest", "Docker", "GitHub Actions", "Data Quality", "Logs", "Rastreabilidade"] },
  { label: "Persistência", icon: Database, items: ["MySQL", "PostgreSQL", "Modelagem relacional", "Star Schema", "Staging", "Data Warehouse"] },
  { label: "Entrega", icon: Activity, items: ["Streamlit", "Plotly", "REST API", "Power BI", "Data Storytelling", "Documentação"] },
];

function Mark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark ${small ? "brand-mark--small" : ""}`} aria-hidden="true"><img src={markImage} alt="" /></span>;
}

function SectionKicker({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="section-kicker">
      <span className="section-kicker__number">{number}</span>
      <span>{children}</span>
    </div>
  );
}

function ScrollLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };
  return <a className={className} href={href} onClick={handleClick}>{children}</a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("essencia");
  const [showTop, setShowTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [showInvestigationLog, setShowInvestigationLog] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const sectionIds = useMemo(() => ["essencia", "trajetoria", "cases", "stack", "contato"], []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTop(y > 800);
      const current = sectionIds.map((id) => ({ id, top: Math.abs(document.getElementById(id)?.getBoundingClientRect().top ?? 9999) })).sort((a, b) => a.top - b.top)[0];
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProjectModal();
    };
    if (activeProject) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  const closeMenu = () => setMenuOpen(false);
  const closeProjectModal = () => {
    if (!activeProject || isModalClosing) return;
    setIsModalClosing(true);
    window.setTimeout(() => {
      setActiveProject(null);
      setIsModalClosing(false);
    }, 220);
  };
  const shouldShowProject = (category: Exclude<ProjectFilter, "all">) => activeFilter === "all" || activeFilter === category;
  const openProject = (project: ProjectKey) => setActiveProject(project);
  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current?.style.setProperty("--pointer-x", `${x * 20}px`);
    heroRef.current?.style.setProperty("--pointer-y", `${y * 14}px`);
  };
  const resetHeroPointer = () => {
    heroRef.current?.style.setProperty("--pointer-x", "0px");
    heroRef.current?.style.setProperty("--pointer-y", "0px");
  };

  return (
    <div className="site-shell">
      <div className="noise-layer" aria-hidden="true" />
      <div className="investigation-line" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="header-inner">
          <a className="wordmark" href="#essencia" aria-label="Voltar ao início">
            <Mark small />
            <span>MARINIZE<span className="wordmark__dot">.</span></span>
          </a>
          <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="Navegação principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.replaceState(null, "", item.href);
                  closeMenu();
                }}
                className={activeSection === item.href.slice(1) ? "nav-link nav-link--active" : "nav-link"}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-availability" href="#contato">
              <span className="availability-dot" /> disponível para oportunidades
            </a>
            <a className="icon-link icon-link--header" href="https://www.linkedin.com/in/marinize-santana-47bb2b372" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="essencia" className="hero-section" ref={heroRef} onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroPointer}>
          <div className="hero-art" style={{ backgroundImage: `url(${heroImage})` }} aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="particle-field" aria-hidden="true">
            {particles.map((particle, index) => (
              <span
                key={index}
                className="data-particle"
                style={{
                  left: particle.left,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.opacity,
                  "--particle-depth": particle.depth,
                } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="container hero-content">
            <div className="hero-main">
              <div className="eyebrow reveal-up">
                <span className="eyebrow-pulse" /> estudante de ADS · engenheira de dados em formação
              </div>
              <h1 className="hero-title reveal-up reveal-delay-1">
                Eu não começo<br />pelo <em>gráfico.</em>
              </h1>
              <p className="hero-lede reveal-up reveal-delay-2">
                Começo pela pergunta que o dado ainda não respondeu — e sigo investigando até transformar complexidade em uma solução que faça sentido.
              </p>
              <div className="hero-actions reveal-up reveal-delay-3">
                <ScrollLink href="#cases" className="button button--primary">
                  <span>Explorar meus cases</span>
                  <ArrowUpRight size={17} />
                </ScrollLink>
                <ScrollLink href="#trajetoria" className="button button--quiet">
                  <span>Conhecer a trajetória</span>
                  <ChevronDown size={16} />
                </ScrollLink>
                <a className="button button--resume" href={`${import.meta.env.BASE_URL}curriculo-marinize-santana.pdf`} download>
                  <span>Baixar currículo</span>
                  <Download size={16} />
                </a>
              </div>
            </div>
            <div className="hero-side reveal-up reveal-delay-2">
              <div className="profile-photo-container" aria-label="Retrato profissional de Marinize Santana">
                <div className="hero-photo-wrapper">
                  <img src={`${import.meta.env.BASE_URL}marinize-foto-profissional.jpg`} alt="Marinize Santana" className="profile-photo-img" />
                  </div>
                <div className="profile-photo-badge">
                  <span className="telemetry-label">área de foco</span>
                  <strong> Engenheira de Dados</strong>
                </div>
              </div>
              <div className="hero-telemetry">
                <div className="telemetry-head">
                  <span><span className="live-dot" /> telemetria pessoal</span>
                  <span className="mono-text">v.2026</span>
                </div>
                <div className="telemetry-grid">
                  <div className="telemetry-cell"><span className="telemetry-label">modo</span><strong>investigação</strong></div>
                  <div className="telemetry-cell"><span className="telemetry-label">domínio</span><strong>dados</strong></div>
                  <div className="telemetry-cell"><span className="telemetry-label">foco</span><strong>confiabilidade</strong></div>
                  <div className="telemetry-cell"><span className="telemetry-label">status</span><strong className="status-amber">em evolução</strong></div>
                </div>
                <div className="telemetry-footer">
                  <span>curiosidade → evidência → arquitetura</span>
                  <span className="telemetry-bars"><i /><i /><i /><i /><i /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span className="hero-caption"><span className="caption-line" /> transformando realidade complexa em sistemas bem pensados</span>
            <span className="scroll-cue"><span>role para investigar</span><ChevronDown size={14} /></span>
          </div>
        </section>

        <section className="signal-strip" aria-label="Sinais da abordagem profissional">
          <div className="container signal-strip__inner">
            <span>01 / investigar</span><span className="signal-symbol">✦</span>
            <span>02 / validar</span><span className="signal-symbol">✦</span>
            <span>03 / estruturar</span><span className="signal-symbol">✦</span>
            <span>04 / entregar</span>
          </div>
        </section>

        <section className="manifesto-section section-light" aria-labelledby="manifesto-title">
          <div className="container manifesto-grid">
            <div className="manifesto-index">
              <span>01</span>
              <span className="vertical-rule" />
              <span>essência</span>
            </div>
            <div className="manifesto-copy">
              <SectionKicker number="01">o jeito marinize de construir</SectionKicker>
              <h2 id="manifesto-title">A confiança em uma análise é construída <em>antes</em> do dashboard.</h2>
              <p className="lead-paragraph">
                Minha marca registrada é explicar não apenas <strong>como</strong> algo foi feito, mas <strong>por que</strong> aquela decisão era necessária. Eu observo a nuance, levanto hipóteses, volto à fonte e documento o caminho.
              </p>
              <p>
                Foi assim que uma inconsistência visual deixou de ser apenas um erro aparente e virou investigação. Foi assim que um pipeline deixou de ser apenas um conjunto de scripts e passou a ser pensado como um ecossistema. É nessa interseção entre curiosidade, lógica e responsabilidade que eu encontro meu lar.
              </p>
              <div className="signature-line">
                <span className="signature-mark">M.</span>
                <span>Marinize Santana · data engineering</span>
              </div>
            </div>
            <div className="manifesto-aside">
              <div className="quote-card">
                <span className="quote-mark">“</span>
                <p>Dados não servem apenas para responder perguntas. Muitas vezes eles mostram que ainda existe muito mais para descobrir.</p>
                <span className="quote-source">— uma investigação em andamento</span>
              </div>
              <div className="aside-note">
                <Search size={15} />
                <span>perguntas melhores produzem sistemas melhores</span>
              </div>
            </div>
          </div>
        </section>

        <section id="trajetoria" className="journey-section section-dark" aria-labelledby="journey-title">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <SectionKicker number="02">a trajetória por trás do código</SectionKicker>
                <h2 id="journey-title">Cada refatoração mudou <em>o que eu conseguia enxergar.</em></h2>
              </div>
              <p>Não foi uma linha reta. Foi um sistema vivo: teste técnico, tecnologia aprendida na prática, falhas reveladas, perguntas novas e uma arquitetura que nasceu naturalmente da investigação.</p>
            </div>
            <div className="journey-timeline">
              <div className="timeline-track" aria-hidden="true"><span /></div>
              <article className="timeline-item timeline-item--active">
                <span className="timeline-marker">01</span>
                <div className="timeline-meta"><span>origem</span><span>2026</span></div>
                <div className="timeline-body">
                  <h3>O primeiro pipeline</h3>
                  <p>Um teste técnico com Python, Pandas, SQL, MySQL e FastAPI. Extração, validação, enriquecimento, modelagem relacional e API: o primeiro lugar onde a lógica encontrou uma forma concreta.</p>
                  <span className="timeline-tag">pipeline linear · API REST</span>
                </div>
              </article>
              <article className="timeline-item">
                <span className="timeline-marker">02</span>
                <div className="timeline-meta"><span>evolução</span><span>+4 meses</span></div>
                <div className="timeline-body">
                  <h3>Quando o ambiente respondeu</h3>
                  <p>Docker, Compose, Pytest, Spark, logs e GitHub Actions entraram como aprendizado aplicado. A containerização revelou defeitos no banco e no ETL que antes passavam despercebidos.</p>
                  <span className="timeline-tag">confiabilidade · observabilidade</span>
                </div>
              </article>
              <article className={`timeline-item ${showInvestigationLog ? "timeline-item--revealed" : ""}`}>
                <span className="timeline-marker">03</span>
                <div className="timeline-meta"><span>virada</span><span>Streamlit</span></div>
                <div className="timeline-body">
                  <h3>O gráfico que fez a pergunta</h3>
                  <p>A UF “DE” apareceu. Em vez de culpar o processamento, a investigação atravessou staging, SQL, banco, enriquecimento e fonte bruta. O desfecho: um grupo de operadoras com cadastro incompleto — “DE”, de desconhecido.</p>
                  <span className="timeline-tag timeline-tag--amber">qualidade de dados · causa raiz</span>
                  <button
                    className="timeline-reveal"
                    type="button"
                    onMouseEnter={() => setShowInvestigationLog(true)}
                    onMouseLeave={() => setShowInvestigationLog(false)}
                    onFocus={() => setShowInvestigationLog(true)}
                    onBlur={() => setShowInvestigationLog(false)}
                    onClick={() => setShowInvestigationLog((visible) => !visible)}
                    aria-expanded={showInvestigationLog}
                  >
                    <Terminal size={13} /> {showInvestigationLog ? "ocultar evidência" : "revelar evidência"}
                  </button>
                  {showInvestigationLog && (
                    <div className="timeline-log" role="status">
                      <span className="timeline-log__prompt">investigacao/sql&gt;</span>
                      <code>SELECT uf, COUNT(*) FROM operadoras_financeiras WHERE registro_ans NOT IN (SELECT registro_ans FROM operadoras_ativas);</code>
                      <strong>→ 11 registros · UF = “DE” · cadastro desconhecido</strong>
                    </div>
                  )}
                </div>
              </article>
              <article className="timeline-item">
                <span className="timeline-marker">04</span>
                <div className="timeline-meta"><span>visão atual</span><span>agora</span></div>
                <div className="timeline-body">
                  <h3>Do arquivo ao ecossistema</h3>
                  <p>A investigação ampliou o campo de visão: domínios analíticos, camadas Bronze/Silver/Gold, produtos padronizados e uma plataforma que continua em construção, com rastreabilidade desde a origem.</p>
                  <span className="timeline-tag">arquitetura · produtos de dados</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="portfolio-metrics-section" aria-label="Indicadores e Impacto Real">
          <div className="container metrics-grid">
            <div className="metric-card">
              <div className="metric-value">06</div>
              <div className="metric-label">Cases de Engenharia</div>
              <div className="metric-desc">
                Arquiteturas dimensionais, processamento híbrido e simulações estocásticas.
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-value">01</div>
              <div className="metric-label">Sistema em Uso Real</div>
              <div className="metric-desc">
                Automação financeira mensal avaliada pelo contador responsável.
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-value">4–5h → min</div>
              <div className="metric-label">Ganho de Eficiência</div>
              <div className="metric-desc">
                Redução do tempo operacional de uma rotina financeira recorrente.
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-value">04 Etapas</div>
              <div className="metric-label">Método Investigativo</div>
              <div className="metric-desc">
                Investigar, validar, estruturar e entregar com rastreabilidade.
              </div>
            </div>
          </div>
        </section>


        <section id="cases" className="cases-section section-light" aria-labelledby="cases-title">
          <div className="container">
            <div className="section-heading section-heading--cases">
              <div>
                <SectionKicker number="03">provas de construção</SectionKicker>
                <h2 id="cases-title">Projetos que carregam <em>decisões.</em></h2>
              </div>
              <p>Eu não coleciono tecnologias. Construo soluções para entender problemas reais — e registro o raciocínio que sustenta cada uma.</p>
            </div>
            <div className="project-filters" role="group" aria-label="Filtrar projetos por área">
              <span className="project-filters__label">filtrar por</span>
              {([["all", "todos"], ["data-engineering", "engenharia de dados"], ["data-analysis", "análise de dados"], ["development", "desenvolvimento"]] as [ProjectFilter, string][]).map(([value, label]) => (
                <button
                  key={value}
                  className={`filter-button ${activeFilter === value ? "filter-button--active" : ""}`}
                  type="button"
                  onClick={() => setActiveFilter(value)}
                  aria-pressed={activeFilter === value}
                >
                  {label}
                </button>
              ))}
            </div>

            {shouldShowProject("data-engineering") && (
              <article
                className="featured-case project-trigger"
                role="button"
                tabIndex={0}
                aria-label="Abrir detalhes técnicos da Plataforma Analítica ANS"
                onClick={() => openProject("ans")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProject("ans");
                  }
                }}
              >
                <div className="featured-case__visual visual-ans-art" style={{ backgroundImage: `url(${ansImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label="Visual abstrato de domínios conectados da Plataforma Analítica ANS">
                    <div className="layer-badge-container" aria-label="Camadas do pipeline analítico">
                  <span className="layer-pill bronze" role="listitem">
                    Bronze · Staging
                  </span>

                  <span className="layer-pill silver" role="listitem">
                    Silver · Modelada
                  </span>

                  <span className="layer-pill gold" role="listitem">
                    Gold · Analítica
                  </span>
                </div>

                  <div className="image-overlay-label"><span className="live-dot" /> case em evolução</div>
                  <div className="visual-corner visual-corner--top">SOURCE / ANS</div>
                  <div className="visual-corner visual-corner--bottom"><span className="ans-layer-reveal layer-bronze">BRONZE</span> · <span className="ans-layer-reveal layer-silver">SILVER</span> · <span className="ans-layer-reveal layer-gold">GOLD</span></div>
                </div>
                <div className="featured-case__content">
                  <div className="case-topline"><span>case 01</span><span>engenharia de dados</span></div>
                  <h3>Plataforma<br /><em>Analítica ANS</em></h3>
                  <p className="case-intro">O que começou como um pipeline de teste técnico se tornou um ecossistema de dados públicos orientado por domínios e guiado por investigação.</p>
                  
                  {/* Narrative Flow Added */}
                  <div className="ans-narrative-flow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0', padding: '0.6rem 0.8rem', background: 'rgba(15,15,15,0.05)', borderRadius: '0.375rem', fontSize: '0.75rem', border: '1px solid rgba(201,123,42,0.2)' }}>
                    <div className="narrative-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="n-num" style={{ fontFamily: 'monospace', color: '#C97B2A', fontWeight: 700 }}>01</span>
                      <span className="n-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fonte</span>
                    </div>
                    <span className="n-arrow" style={{ color: '#C97B2A' }}>→</span>
                    <div className="narrative-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="n-num" style={{ fontFamily: 'monospace', color: '#C97B2A', fontWeight: 700 }}>02</span>
                      <span className="n-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hipótese</span>
                    </div>
                    <span className="n-arrow" style={{ color: '#C97B2A' }}>→</span>
                    <div className="narrative-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="n-num" style={{ fontFamily: 'monospace', color: '#C97B2A', fontWeight: 700 }}>03</span>
                      <span className="n-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Investigação</span>
                    </div>
                    <span className="n-arrow" style={{ color: '#C97B2A' }}>→</span>
                    <div className="narrative-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="n-num" style={{ fontFamily: 'monospace', color: '#C97B2A', fontWeight: 700 }}>04</span>
                      <span className="n-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Arquitetura</span>
                    </div>
                  </div>

                  <div className="case-discovery">
                    <span className="discovery-icon"><Search size={15} /></span>
                    <div>
                      <span className="discovery-label">descoberta-chave</span>
                      <strong>“DE” não era um erro do ETL.</strong>
                      <p>Era a evidência de uma lacuna cadastral na fonte. O pipeline preservou o grupo; a investigação explicou a causa.</p>
                    </div>
                  </div>
                  <div className="case-tags"><span>Python</span><span>Pandas</span><span>PySpark</span><span>Medallion</span><span>MySQL → PostgreSQL</span></div>
                  <div className="case-footer">
                    <span className="case-status"><span className="status-ring" /> arquitetura em construção</span>
                    <span className="case-private">código ainda não público</span>
                  </div>
                </div>
              </article>
            )}

            <div className="secondary-cases">
              {shouldShowProject("data-analysis") && (
                <article
                  className="case-card project-trigger"
                  role="button"
                  tabIndex={0}
                  aria-label="Abrir detalhes técnicos do ANS Complaints Insights"
                  onClick={() => openProject("igr")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject("igr");
                    }
                  }}
                >
                  <div className="case-card__image case-card__image--igr" style={{ backgroundImage: `linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.3)), url(${igrImage})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-label="Visual abstrato da investigação do índice de reclamações">
                    <span className="case-number">02</span>
                  </div>
                  <div className="case-card__body">
                    <div className="case-topline"><span>análise de dados</span><span>ANS · IGR</span></div>
                    <h3>Quando o dashboard<br /><em>não era o fim.</em></h3>
                    <p>Projeto de Data Storytelling independente, atualizado com Pandas, Streamlit e Plotly: 151.501 registros, EDA aprofundada, correção metodológica do IGR, testes de regras de negócio, GitHub Actions e deploy contínuo.</p>
                    <div className="card-link">
                      <a href="https://huggingface.co/spaces/marinizeeng/ans-complaints-insights" target="_blank" rel="noreferrer">
                        <span>ver projeto publicado</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              )}

              {shouldShowProject("development") && (
                <article
                  className="case-card project-trigger"
                  role="button"
                  tabIndex={0}
                  aria-label="Abrir detalhes técnicos do Aurora Coffee BI"
                  onClick={() => openProject("aurora")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject("aurora");
                    }
                  }}
                >
                  <div className="case-card__image case-card__image--aurora" style={{ backgroundImage: `linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.22)), url(${auroraImage})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-label="Visual do projeto Aurora Coffee BI">
                    <span className="case-number">03</span>
                  </div>
                  <div className="case-card__body">
                    <div className="case-topline"><span>desenvolvimento</span><span>Aurora Coffee BI</span></div>
                    <h3>Da simulação<br /><em>à confiança.</em></h3>
                    <p>Projeto end-to-end revisado em v2: Python, Pandas, MySQL com Star Schema, FastAPI, Power BI, Pytest e GitHub Actions. A auditoria EDAP levou à correção do grão da fato, UUID e validações.</p>
                    <div className="card-link">
                      <a href="https://github.com/marinizedev/aurora-coffee-bi" target="_blank" rel="noreferrer">
                        <span>ver repositório</span>
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              )}

              {shouldShowProject("development") && (
                <article
                  className="case-card project-trigger"
                  role="button"
                  tabIndex={0}
                  aria-label="Abrir detalhes técnicos do Sistema inteligente de tesouraria"
                  onClick={() => openProject("treasury")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject("treasury");
                    }
                  }}
                >
                  <div className="case-card__image" style={{ backgroundImage: `linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.3)), url(${treasuryImage})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-label="Visual do sistema de tesouraria">
                    <span className="case-number">04</span>
                  </div>
                  <div className="case-card__body">
                    <div className="case-topline"><span>desenvolvimento</span><span>solução real</span></div>
                    <h3>Sistema inteligente<br /><em>de tesouraria.</em></h3>
                    <p>Automação financeira e documental criada para o trabalho de tesouraria da Igreja. Uma rotina que antes levava aproximadamente 4–5 horas de lançamentos, relatórios e comprovantes agora é concluída em poucos minutos, com validação do contador responsável.</p>

                    <div className="card-link">
                      <span>case autoral · solução em uso</span>
                      <ShieldCheck size={14} />
                    </div>
                  </div>
                </article>
              )}

              {shouldShowProject("data-engineering") && (
                <article
                  className="case-card project-trigger"
                  role="button"
                  tabIndex={0}
                  aria-label="Abrir detalhes técnicos do Finance Analytics"
                  onClick={() => openProject("montecarlo")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject("montecarlo");
                    }
                  }}
                >
                  <div className="case-card__image" style={{ backgroundImage: `linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.3)), url(${financeImage})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-label="Visual da simulação de Monte Carlo">
                    <span className="case-number">05</span>
                  </div>
                  <div className="case-card__body">
                    <div className="case-topline"><span>engenharia de dados</span><span>Monte Carlo</span></div>
                    <h3>Simulação de Risco<br /><em>Financeiro.</em></h3>
                    <p>Pipeline analítico aplicando simulação de Monte Carlo para análise de risco e projeções financeiras complexas com rigor estatístico.</p>
                    <div className="card-link">
                      <a href="https://github.com/marinizedev/finance-analytics-pipeline" target="_blank" rel="noreferrer">
                        <span>ver repositório</span>
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              )}

              {shouldShowProject("development") && (
                <article
                  className="case-card project-trigger"
                  role="button"
                  tabIndex={0}
                  aria-label="Abrir detalhes técnicos do Simulador Imobiliário"
                  onClick={() => openProject("realestate")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProject("realestate");
                    }
                  }}
                >
                  <div className="case-card__image case-card__image--system" style={{ backgroundImage: `linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.22)), url(${oopImage})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-label="Visual do simulador imobiliário">
                    <span className="case-number">06</span>
                  </div>
                  <div className="case-card__body">
                    <div className="case-topline"><span>desenvolvimento</span><span>Python & OOP</span></div>
                    <h3>Simulador de Orçamento<br /><em>Imobiliário.</em></h3>
                    <p>Aplicação web desenvolvida em Python e Flask, com regras de negócio orientadas a objetos, execução alternativa via CLI e deploy público no Render.</p>
                    <div className="card-link">
                      <a href="https://github.com/marinizedev/oop-rental-budget-simulator" target="_blank" rel="noreferrer">
                        <span>ver repositório</span>
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* New Section: Como eu penso */}
        <section className="thinking-section section-dark" aria-labelledby="thinking-title" style={{ padding: '6rem 0', background: '#0b0b0b', color: '#f5f0e8', borderTop: '1px solid rgba(232, 169, 74, 0.15)' }}>
          <div className="container">
            <div className="section-heading">
              <SectionKicker number="04">filosofia de trabalho</SectionKicker>
              <h2 id="thinking-title">Como eu transformo dados <em>em engenharia.</em></h2>
            </div>
            <div className="thinking-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
              <div className="thinking-card" style={{ background: 'rgba(25, 25, 25, 0.6)', border: '1px solid rgba(232, 169, 74, 0.15)', borderRadius: '0.75rem', padding: '2.25rem' }}>
                <span className="t-num" style={{ fontFamily: 'monospace', fontSize: '2rem', color: 'rgba(232, 169, 74, 0.3)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>01</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>Investigar a origem</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>Antes de escrever queries ou modelar tabelas, mapeio o contexto de negócio. Entendo de onde o dado vem e quais limitações ele carrega desde a raiz.</p>
              </div>
              <div className="thinking-card" style={{ background: 'rgba(25, 25, 25, 0.6)', border: '1px solid rgba(232, 169, 74, 0.15)', borderRadius: '0.75rem', padding: '2.25rem' }}>
                <span className="t-num" style={{ fontFamily: 'monospace', fontSize: '2rem', color: 'rgba(232, 169, 74, 0.3)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>02</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>Desconfiar dos resultados</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>Valido estágios intermediários, cruzo staging com banco relacional e confronto agregações. Um pipeline confiável resiste ao escrutínio rigoroso.</p>
              </div>
              <div className="thinking-card" style={{ background: 'rgba(25, 25, 25, 0.6)', border: '1px solid rgba(232, 169, 74, 0.15)', borderRadius: '0.75rem', padding: '2.25rem' }}>
                <span className="t-num" style={{ fontFamily: 'monospace', fontSize: '2rem', color: 'rgba(232, 169, 74, 0.3)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>03</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.75rem' }}>Estruturar com intenção</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.6 }}>Construo arquiteturas modulares, reutilizáveis e documentadas. O código precisa ser tão claro quanto a lógica que o fundamenta.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="stack-section section-dark" aria-labelledby="stack-title">
          <div className="container">
            <div className="section-heading section-heading--split stack-heading">
              <div>
                <SectionKicker number="05">ferramentas com intenção</SectionKicker>
                <h2 id="stack-title">Minha stack é um <em>meio.</em><br />A confiabilidade é o fim.</h2>
              </div>
              <p>As tecnologias entram quando resolvem uma necessidade: processar melhor, validar antes, observar o fluxo, servir o dado ou tornar uma decisão mais clara.</p>
            </div>
            <div className="stack-grid">
              {stackGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div className="stack-group" key={group.label}>
                    <div className="stack-group__heading">
                      <span className="stack-icon"><Icon size={17} /></span>
                      <h3>{group.label}</h3>
                    </div>
                    <div className="stack-items">
                      {group.items.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="stack-bottom">
              <div className="stack-bottom__line" />
              <span>aprendizado contínuo, sempre conectado a um problema real</span>
              <Sparkles size={17} />
            </div>
          </div>
        </section>

        <section className="proof-section section-light" aria-labelledby="proof-title">
          <div className="container proof-grid">
            <div className="proof-intro">
              <SectionKicker number="06">o que eu levo comigo</SectionKicker>
              <h2 id="proof-title">Profundidade também é uma <em>competência técnica.</em></h2>
              <p>Sou uma estudante de ADS, autodidata e em busca da primeira oportunidade formal. Não escondo isso. Pelo contrário: sei exatamente a dimensão do caminho que percorri e o tipo de profissional que estou construindo.</p>
            </div>
            <div className="proof-list">
              <div className="proof-item">
                <span className="proof-index">01</span>
                <div>
                  <h3>Investigo antes de concluir</h3>
                  <p>Hipóteses não são respostas. Volto à fonte, confronto camadas e documento a causa.</p>
                </div>
                <Search size={18} />
              </div>
              <div className="proof-item">
                <span className="proof-index">02</span>
                <div>
                  <h3>Aprendo na realidade</h3>
                  <p>Docker, Spark, testes e CI/CD entraram porque o projeto pediu — não porque a lista dizia.</p>
                </div>
                <Cpu size={18} />
              </div>
              <div className="proof-item">
                <span className="proof-index">03</span>
                <div>
                  <h3>Transformo complexidade</h3>
                  <p>Organizo o que parece disperso em uma narrativa, um pipeline e uma solução possível.</p>
                </div>
                <Layers3 size={18} />
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="contact-section section-dark" aria-labelledby="contact-title">
          <div className="contact-glow" aria-hidden="true" />
          <div className="container contact-content">
            <div className="contact-kicker"><span className="availability-dot" /> próxima investigação disponível</div>
            <h2 id="contact-title">Tem um problema de dados<br />que merece ser <em>entendido?</em></h2>
            <p> Estou aberta a conversar sobre estágio e primeira oportunidade formal em Engenharia de Dados, com interesse em Analytics Engineering e soluções de software aplicadas a dados.</p>
            <div className="contact-actions">
              <a className="button button--primary" href="https://www.linkedin.com/in/marinize-santana-47bb2b372" target="_blank" rel="noreferrer">
                <span>Conversar no LinkedIn</span>
                <Linkedin size={17} />
              </a>
              <a className="button button--outline" href="https://github.com/marinizedev/data-pipeline-fastapi-ans" target="_blank" rel="noreferrer">
                <span>Conhecer o primeiro repositório</span>
                <Github size={17} />
              </a>
            </div>
            <div className="contact-signature">
              <Mark />
              <span>Marinize Santana<br /><small>dados, investigação e propósito</small></span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© {new Date().getFullYear()} Marinize Santana</span>
          <span className="footer-center">feito com curiosidade <span>✦</span> e muitas perguntas</span>
          <span className="footer-right">
            <a className="footer-social" href="https://www.linkedin.com/in/marinize-santana-47bb2b372" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} /><span>LinkedIn</span>
            </a>
            <a className="footer-social" href="https://github.com/marinizedev" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={16} /><span>GitHub</span>
            </a>
            <a className="footer-social" href="mailto:marinize.santana.dev@gmail.com" aria-label="Enviar e-mail">
              <span>✉</span><span>Email</span>
            </a>
          </span>
        </div>
      </footer>

      {activeProject && (() => {
        const detail = projectDetails[activeProject];
        return (
          <div className={`project-modal-backdrop ${isModalClosing ? "project-modal-backdrop--closing" : ""}`} role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) closeProjectModal(); }}>
            <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
              <button className="project-modal__close" type="button" onClick={closeProjectModal} aria-label="Fechar detalhes do projeto">
                <X size={20} />
              </button>
              <div className="project-modal__eyebrow"><span className="live-dot" /> {detail.eyebrow}</div>
              <h2 id="project-modal-title">{detail.title}</h2>
              <p className="project-modal__summary">{detail.summary}</p>
              <div className="project-modal__grid">
                <div>
                  <span className="project-modal__label">arquitetura / fluxo</span>
                  <ol className="project-modal__architecture">
                    {detail.architecture.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="project-modal__side">
                  <div>
                    <span className="project-modal__label">stack em contexto</span>
                    <div className="project-modal__tags">
                      {detail.stack.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <div className="project-modal__note">
                    <span className="project-modal__label">decisão que sustenta o projeto</span>
                    <p>{detail.decision}</p>
                  </div>
                  <div className="project-modal__note">
                    <span className="project-modal__label">resultado</span>
                    <p>{detail.outcome}</p>
                  </div>
                  <div className="project-modal__learning">
                    <span className="project-modal__label">desafios e aprendizados</span>
                    <ul>
                      {detail.learnings.map((learning) => <li key={learning}>{learning}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
              {detail.link && (
                <a className="project-modal__link" href={detail.link.href} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                  {detail.link.label} <ExternalLink size={15} />
                </a>
              )}
            </section>
          </div>
        );
      })()}

      {showTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo">
          <ChevronDown size={16} />
        </button>
      )}
    </div>
  );
}
