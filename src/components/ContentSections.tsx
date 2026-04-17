import { useEffect, useState } from "react";
import Equation from "./Equation";
import Section from "./SectionObserver";
import selamatPrabowoAudio from "../audio/selamat_prabowo.wav";
import luarAngkasaPrabowoAudio from "../audio/luar-angkasa_prabowo.wav";

const FIGURE_IMAGES = {
  transformer: "https://gist.github.com/user-attachments/assets/b7500923-c840-4ee3-b7fd-04dbc9ea32ee",
  mamba: "https://gist.github.com/user-attachments/assets/56955fd1-621c-4ced-a73a-915cb8a7b6dc",
  dit: "https://gist.github.com/user-attachments/assets/ca057700-98cd-44d7-8760-cd6f7e7aefff",
  f5: "https://gist.github.com/user-attachments/assets/f68bccd7-728f-46e3-bbf9-e14b2d090b2a",
};

const DEMO_PROMPTS = [
  {
    label: "Prompt 1",
    text: "Selamat Pagi, Siang Sore, dan Malam Peserta KCVanguard",
    audioSrc: selamatPrabowoAudio,
  },
  {
    label: "Prompt 2",
    text: "aku pengen terbang keluar angkasa",
    audioSrc: luarAngkasaPrabowoAudio,
  },
];

const LAYER_CONFIGS = [
  {
    name: "1:1 Interleaved",
    caption: "Transformer dan Mamba diselang-seling untuk menjaga konteks global.",
    pattern: ["T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M", "T", "M"],
  },
  {
    name: "1:3 Efficient",
    caption: "Satu Transformer diikuti tiga Mamba untuk penghematan cache lebih agresif.",
    pattern: ["T", "M", "M", "M", "T", "M", "M", "M", "T", "M", "M", "M", "T", "M", "M", "M", "T", "M", "M", "M", "T", "M", "M", "M"],
  },
  {
    name: "Late Transformer",
    caption: "Transformer dipusatkan di lapisan akhir untuk perbaikan fidelity akhir.",
    pattern: ["M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "M", "T", "M", "M", "M", "T", "M", "M", "M", "T", "M", "M", "T"],
  },
];

const FIGURES = [
  {
    title: "Hybrid Backbone Overview",
    description: "Alur dari text conditioning, diffusion block, hingga head vokoder dengan hybrid Mamba-DiT.",
    src: FIGURE_IMAGES.f5,
    alt: "F5-TTS hybrid architecture",
  },
  {
    title: "Transformer Baseline",
    description: "Blok attention penuh sebagai acuan sebelum penggantian selective SSM.",
    src: FIGURE_IMAGES.transformer,
    alt: "Transformer baseline architecture",
  },
  {
    title: "Mamba Selective Dynamics",
    description: "State update linear-time dengan selective memory untuk sequence panjang.",
    src: FIGURE_IMAGES.mamba,
    alt: "Mamba architecture",
  },
  {
    title: "DiT Conditioning Path",
    description: "Timestep embedding dan adaptive layer norm yang menjaga kualitas generatif.",
    src: FIGURE_IMAGES.dit,
    alt: "Diffusion Transformer diagram",
  },
];

const SectionTitle = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="section-title scroll-mt-28">
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="section-paragraph">{children}</p>
);

const ContentSections = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(DEMO_PROMPTS[0]);
  const [hoveredFigure, setHoveredFigure] = useState<(typeof FIGURES)[number] | null>(null);
  const [isFigurePreviewOpen, setIsFigurePreviewOpen] = useState(false);
  const [closePreviewTimer, setClosePreviewTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closePreviewTimer) {
        clearTimeout(closePreviewTimer);
      }
    };
  }, [closePreviewTimer]);

  const handleFigureEnter = (figure: (typeof FIGURES)[number]) => {
    if (closePreviewTimer) {
      clearTimeout(closePreviewTimer);
      setClosePreviewTimer(null);
    }

    setHoveredFigure(figure);
    setIsFigurePreviewOpen(true);
  };

  const handleFigureLeave = () => {
    setIsFigurePreviewOpen(false);

    const timer = setTimeout(() => {
      setHoveredFigure(null);
      setClosePreviewTimer(null);
    }, 180);

    setClosePreviewTimer(timer);
  };

  return (
    <div className="article-layout">
      <Section id="abstract">
        <SectionTitle>Abstract</SectionTitle>
        <P>
          GardenBunga adalah riset TTS bahasa Indonesia dengan pendekatan hybrid Mamba-Transformer untuk menyeimbangkan kualitas suara, efisiensi inference, dan penggunaan memori. Ide utamanya adalah mempertahankan kekuatan konteks global dari Transformer, sambil memindahkan sebagian komputasi sequence panjang ke blok Mamba yang linear-time.
        </P>
        <P>
          Melalui transfer pengetahuan dari backbone DiT yang sudah terlatih, model tetap stabil walau hanya melakukan fine-tuning pada subset data. Secara praktis, pendekatan ini menargetkan pipeline yang lebih hemat VRAM dan lebih siap dipakai untuk deployment real-time.
        </P>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "-34%", label: "VRAM", desc: "Pengurangan jejak memori saat inference sequence panjang." },
            { value: "Fast", label: "Scaling", desc: "Sebagian blok attention diganti selective state space." },
            { value: "4 Config", label: "Hybrid Ratio", desc: "Eksplorasi 1:1, 1:3, 1:5, dan late-transformer layout." },
            { value: "ID TTS", label: "Target", desc: "Difokuskan untuk kualitas suara bahasa Indonesia." },
          ].map((item) => (
            <article key={item.label} className="motion-card rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm">
              <p className="text-3xl font-semibold tracking-tight text-primary">{item.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-foreground/80">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="interactive-demo">
        <SectionTitle>Interactive Demo</SectionTitle>
        <P>
          Bagian ini menampilkan dua prompt tetap untuk demonstrasi audio. Text input bersifat read-only agar konten yang ditampilkan konsisten dengan sampel yang sudah disiapkan.
        </P>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="motion-card rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
            <div className="mb-3 flex flex-wrap gap-2">
              {DEMO_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedPrompt(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${selectedPrompt.label === item.label ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Text Input
            </label>
            <textarea
              value={selectedPrompt.text}
              readOnly
              rows={5}
              className="w-full cursor-default rounded-xl border border-border bg-background/80 px-4 py-3 text-sm leading-relaxed text-foreground outline-none"
            />

          </div>

          <div className="space-y-4">
            <article className="motion-card rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Output Speech</p>
              <audio className="mt-3 w-full" controls preload="none" src={selectedPrompt.audioSrc}>
                Browser kamu belum mendukung audio player.
              </audio>

              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">Model Used</p>
                <p className="mt-1 text-sm font-semibold text-foreground">GardenBunga Hybrid Mamba-DiT</p>
                <p className="mt-1 text-xs text-muted-foreground">Inference profile: Indonesian TTS demo configuration.</p>
              </div>
            </article>
          </div>
        </div>
      </Section>

      <Section id="architecture">
        <SectionTitle>Future Work</SectionTitle>
        <P>
          Arsitektur GardenBunga memakai pola interleaved di backbone 24 layer. Transformer dipertahankan pada titik tertentu untuk global context dan detail prosodi, sementara blok lain diganti Mamba agar memory growth lebih terkendali. Secara kasar, kompleksitas hybrid bisa ditulis sebagai:
        </P>

        <Equation math="\text{Cost}_{\text{hybrid}} = (N-k)\,O(n^2) + k\,O(n)" label="1" />

        <P>
          Dengan memilih <Equation math="k" display={false} /> yang tepat, kita bisa mendapat trade-off yang lebih baik antara naturalness dan biaya inferensi. Tabel konfigurasi berikut mencontohkan tata letak layer yang diuji.
        </P>

        <div className="mt-6 space-y-5">
          {LAYER_CONFIGS.map((config) => (
            <article key={config.name} className="motion-card rounded-2xl border border-border bg-card/90 p-5 shadow-sm">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold text-foreground">{config.name}</h3>
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">24-Layer Backbone</p>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="flex min-w-max gap-1.5">
                  {config.pattern.map((token, index) => (
                    <span
                      key={`${config.name}-${index}`}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[11px] font-bold ${token === "T" ? "bg-sky-100 text-sky-800" : "bg-emerald-100 text-emerald-800"}`}
                      title={`Layer ${index + 1}: ${token === "T" ? "Transformer" : "Mamba"}`}
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{config.caption}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="figures">
        <SectionTitle>Figures</SectionTitle>
        <P>
          Visual berikut merangkum baseline, selective state-space module, dan blok diffusion yang jadi fondasi eksperimen. Layout ini dibuat agar pengunjung bisa cepat memahami pipeline sebelum masuk ke evaluasi audio.
        </P>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {FIGURES.map((figure) => (
            <figure
              key={figure.title}
              className="figure-card motion-card overflow-hidden rounded-2xl border border-border bg-card/90 shadow-sm"
              onMouseEnter={() => handleFigureEnter(figure)}
              onMouseLeave={handleFigureLeave}
            >
              <img src={figure.src} alt={figure.alt} loading="lazy" className="h-64 w-full bg-slate-50/70 object-contain p-2" />
              <figcaption className="space-y-2 p-4">
                <p className="text-base font-semibold text-foreground">{figure.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{figure.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {hoveredFigure && (
          <div
            className={`pointer-events-none fixed inset-0 z-50 hidden items-center justify-center px-4 backdrop-blur-[2px] transition-all duration-300 md:flex ${
              isFigurePreviewOpen ? "bg-black/25 opacity-100" : "bg-black/0 opacity-0"
            }`}
          >
            <div
              className={`overflow-hidden rounded-2xl border border-white/40 bg-white/95 shadow-2xl transition-all duration-300 ${
                isFigurePreviewOpen ? "translate-y-0 scale-100" : "translate-y-2 scale-[0.985]"
              }`}
            >
              <img
                src={hoveredFigure.src}
                alt={hoveredFigure.alt}
                className="block h-auto max-h-[calc(92vh-4.5rem)] w-auto max-w-[92vw] object-contain"
              />
              <div className="border-t border-slate-200 px-5 py-3">
                <p className="text-sm font-semibold text-slate-800">{hoveredFigure.title}</p>
              </div>
            </div>
          </div>
        )}
      </Section>

      <Section id="cite">
        <SectionTitle>Cite</SectionTitle>
        <P>
          Jika kamu memakai ide atau desain eksperimen GardenBunga, kamu bisa pakai template sitasi berikut dan sesuaikan nama author sesuai versi rilis finalmu.
        </P>

        <div className="motion-card mt-5 rounded-2xl border border-border bg-foreground p-5 text-foreground">
          <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-relaxed text-background/95">
{`@inproceedings{gardenbunga2026,
  title     = {GardenBunga: Efficient Hybrid Sequence Modeling for Indonesian Speech Synthesis via Multilingual Knowledge Transfer},
  author    = {Haidar, Muhammad Dzaky and Gunawan, Benedictus Ryu and Fabiansyah, Muhammad Irzam Hafis},
  project   = {KCVanguard},
  year      = {2026},
  url       = {https://gist.github.com/Ryu2804/8ecc9a85d46cf2b25b4c1fb77b4e011a}
}`}
          </pre>
        </div>
      </Section>

      <footer className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
        <p>GardenBunga Project Page · Crafted for interactive research storytelling.</p>
      </footer>
    </div>
  );
};

export default ContentSections;
