import katex from "katex";
import { useMemo } from "react";

interface EquationProps {
  math: string;
  display?: boolean;
  className?: string;
  label?: string;
}

const macros: Record<string, string> = {
  "\\RR": "\\mathbb{R}",
  "\\E": "\\mathbb{E}",
};

const normalizeMath = (rawMath: string, displayMode: boolean) => {
  const trimmed = rawMath.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
    return trimmed.slice(2, -2).trim();
  }

  if (trimmed.startsWith("\\[") && trimmed.endsWith("\\]")) {
    return trimmed.slice(2, -2).trim();
  }

  if (trimmed.startsWith("\\(") && trimmed.endsWith("\\)")) {
    return trimmed.slice(2, -2).trim();
  }

  if (!displayMode && trimmed.startsWith("$") && trimmed.endsWith("$")) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const Equation = ({ math, display = true, className = "", label }: EquationProps) => {
  const { html, hasError } = useMemo(() => {
    const normalizedMath = normalizeMath(math, display);

    if (!normalizedMath) {
      return { html: "", hasError: false };
    }

    try {
      return {
        html: katex.renderToString(normalizedMath, {
          displayMode: display,
          throwOnError: true,
          strict: "ignore",
          macros,
        }),
        hasError: false,
      };
    } catch {
      return {
        html: katex.renderToString(normalizedMath, {
          displayMode: display,
          throwOnError: false,
          strict: "ignore",
          macros,
          errorColor: "#b91c1c",
        }),
        hasError: true,
      };
    }
  }, [math, display]);

  if (!display) {
    return (
      <span
        className={`equation-inline ${className}`.trim()}
        data-katex-error={hasError ? "true" : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <figure className={`equation-block ${className}`.trim()} data-katex-error={hasError ? "true" : undefined}>
      <div className="equation-scroller">
        <div
          className="equation-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {label && (
        <figcaption className="equation-label">({label})</figcaption>
      )}
    </figure>
  );
};

export default Equation;
