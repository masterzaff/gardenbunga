interface StatCardProps {
  value: string;
  label: string;
  description: string;
}

const StatCard = ({ value, label, description }: StatCardProps) => (
  <div className="rounded-2xl border border-border bg-card/90 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="mb-2 text-3xl font-semibold tracking-tight text-primary md:text-4xl">{value}</div>
    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground/85">{label}</div>
    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>
);

export default StatCard;
