const CLIENTS = ["Visa", "Morgan Stanley", "Capital One"];

export function ClientGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 mt-16 max-[600px]:grid-cols-2">
      {CLIENTS.map((name) => (
        <div
          key={name}
          className="relative h-[100px] border border-hairline rounded-card bg-white overflow-hidden flex items-center justify-center transition-all duration-base ease-standard hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:bg-signature after:scale-x-0 after:origin-left after:transition-transform after:duration-base after:ease-standard hover:after:scale-x-100"
        >
          <span className="font-display font-semibold text-[19px] tracking-[-0.01em] text-ink">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
