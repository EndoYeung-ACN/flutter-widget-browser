import { useState } from "react";

const widgets = [
  {
    name: "ListTile",
    category: "List",
    description: "A single fixed-height row that typically contains some text and/or icons.",
    example: "ListTile(title: Text('Item'), subtitle: Text('Details'), leading: Icon(Icons.star))",
    placement: "Inside ListView or Column in Scaffold > body",
  },
  {
    name: "Container",
    category: "Layout",
    description: "Combines common painting, positioning, and sizing widgets.",
    example: "Container(padding: EdgeInsets.all(16), child: Text('Hello'))",
    placement: "Inside Column/Row/Stack in Scaffold > body",
  }
];

export default function WidgetBrowser() {
  const [search, setSearch] = useState("");

  const filtered = widgets.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Flutter Widget Browser</h1>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        placeholder="Search widgets..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.map(w => (
        <div key={w.name} className="border p-3 rounded mb-3">
          <h2 className="font-semibold">{w.name}</h2>
          <p className="text-sm text-gray-600">{w.description}</p>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">{w.example}</pre>
          <p className="text-xs text-gray-500 mt-1">📍 Placement: {w.placement}</p>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 text-center">No matching widgets.</p>
      )}
    </div>
  );
}
