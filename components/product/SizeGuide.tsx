const rows = [
  ["XS", 32, 27, 35],
  ["S", 34, 29, 37],
  ["M", 36, 31, 39],
  ["L", 38, 33, 41],
  ["XL", 40, 35, 43],
  ["XXL", 42, 37, 45],
] as const;

export function SizeGuide() {
  return (
    <details className="group mt-3 text-sm">
      <summary className="cursor-pointer text-xs uppercase tracking-[0.16em] text-burgundy underline-offset-4 hover:underline">
        Size guide
      </summary>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-72 text-left text-xs">
          <caption className="mb-2 text-left text-espresso/60">Body measurements in inches (sample chart).</caption>
          <thead>
            <tr className="border-b border-champagne text-espresso/60">
              <th scope="col" className="py-2 font-normal">Size</th>
              <th scope="col" className="font-normal">Bust</th>
              <th scope="col" className="font-normal">Waist</th>
              <th scope="col" className="font-normal">Hip</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([s, ...m]) => (
              <tr key={s} className="border-b border-champagne/40">
                <th scope="row" className="py-2 font-medium">{s}</th>
                {m.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
