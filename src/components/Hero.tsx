import { FileText, Github, Play } from "lucide-react";

const badges = ["Python 3.11", "PyTorch", "CUDA", "Mamba", "MIT License", "Indonesian TTS"];

const authors = [
  "Muhammad Dzaky Haidar",
  "Benedictus Ryu Gunawan",
  "Muhammad Irzam Hafis Fabiansyah",
];

const actions = [
  {
    label: "Writeup",
    href: "https://gist.github.com/Ryu2804/8ecc9a85d46cf2b25b4c1fb77b4e011a",
    primary: true,
    icon: FileText,
  },
  {
    label: "Github Repo",
    href: "https://github.com/AneKazek/gardenbunga",
    icon: Github,
  },
  {
    label: "Demo",
    href: "https://cemetery-unavailable-search-kim.trycloudflare.com/",
    icon: Play,
  },
];

const Hero = () => (
  <header className="hero-shell px-4 pb-14 pt-16 md:pb-20 md:pt-24">
    <div className="hero-parallax mx-auto max-w-5xl text-center">
      <p className="hero-reveal hero-delay-1 mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-muted-foreground">
        Research Playground
      </p>

      <h1 className="hero-reveal hero-delay-2 text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
        <span className="gradient-text">GardenBunga</span>
      </h1>

      <p className="hero-reveal hero-delay-3 mx-auto mb-8 mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85 md:text-2xl">
        Efficient Hybrid Sequence Modeling for Indonesian Speech Synthesis via
        Multilingual Knowledge Transfer
      </p>

      <div className="hero-reveal hero-delay-4 mb-8 flex flex-wrap justify-center gap-2.5">
        {badges.map((badge) => (
          <span key={badge} className="badge-chip motion-chip">
            {badge}
          </span>
        ))}
      </div>

      <div className="hero-reveal hero-delay-5 flex flex-wrap justify-center gap-x-4 gap-y-3 text-sm md:text-base">
        {authors.map((author) => (
          <span
            key={author}
            className="rounded-full border border-border bg-card/85 px-4 py-1.5 font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            {author}
          </span>
        ))}
      </div>

      <div className="hero-reveal hero-delay-6 mx-auto mt-6 grid w-full max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          (() => {
            const Icon = action.icon;

            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={`cta-btn inline-flex items-center justify-center gap-2.5 rounded-xl border px-5 py-3 text-base font-semibold transition-all duration-200 ${
                  action.primary
                    ? "border-blue-600 bg-blue-600 text-white shadow-[0_8px_24px_-12px_rgba(37,99,235,0.85)] hover:border-blue-700 hover:bg-blue-700"
                    : "border-slate-300 bg-white/85 text-slate-600 hover:border-slate-400 hover:bg-white hover:text-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.2} />
                <span>{action.label}</span>
              </a>
            );
          })()
        ))}
      </div>
    </div>
  </header>
);

export default Hero;
