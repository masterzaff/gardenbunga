

## GardenBunga Research Project Website

A single-page academic research website cloning the MamTra site's design language, populated with the GardenBunga writeup content.

### Design & Layout (matching MamTra style)
- Clean white background, subtle blue/purple accents
- Centered content layout with max-width container
- Smooth scroll navigation between sections
- Modern typography with serif headings and clean body text

### Sections (top to bottom)

1. **Hero** — Title "GardenBunga", subtitle "Efficient Hybrid Sequence Modeling for Indonesian Speech Synthesis via Multilingual Knowledge Transfer", author names + ITS affiliation, badge links (Python 3.11, PyTorch, CUDA, Mamba, MIT License, Indonesian TTS)

2. **Abstract** — Opening hook about TTS + attention bottleneck, leading into the GardenBunga hybrid DiT-Mamba approach. Key stat cards (similar to MamTra's −34% / Sub-Linear / 2% cards) adapted for GardenBunga's contributions

3. **Section 1: The Transformer Bottleneck** — Self-attention explanation with KaTeX-rendered equations, GitHub-hosted Transformer diagram and self-attention GIF

4. **Section 2: Two Promising Approaches** — SSMs/Mamba and Diffusion Transformers subsections with equations and images

5. **Section 3: Hybrid Mamba DiT** — Core contribution section with subsections: Why F5-TTS, Dataset, Conditional Flow Matching (with all sub-formulas), Block Replacement, Bidirectional Mamba-2, Safe Warm-Start, Gradual Handover, Training Objective, Training Schedule (3 stages), Which Blocks to Replace, Efficiency Motivation

6. **Section 4: Evaluation Plan** — MOS, SMOS, CMOS, WER/CER, MCD, F0 RMSE metric descriptions

7. **Further Contribution** — Future directions (more block replacements, Mamba-3)

8. **Summary** — Concise recap of the approach

9. **References** — Numbered reference list (10 entries)

### Technical Details
- **KaTeX** integration for all math equations (attention formula, SSM recurrence, CFM loss, block replacement equations, etc.)
- Images loaded from GitHub user-content URLs
- Responsive design with mobile support
- Smooth section transitions and scroll-based navigation
- Component-based architecture: Hero, Section, Equation, AuthorCard, StatCard, etc.

