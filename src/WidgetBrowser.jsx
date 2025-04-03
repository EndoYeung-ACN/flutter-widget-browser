// Flutter Widget Browser - Interactive Web App (Mobile + Desktop Responsive)
import { useState } from "react";
import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";
import { Tabs, TabsList, TabsTrigger } from "/components/Tabs";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const widgets = [
  {
    name: "ListTile",
    category: "List",
    description:
      "A single fixed-height row that typically contains some text and/or icons.",
    example: "ListTile(title: Text('Item'), subtitle: Text('Details'), leading: Icon(Icons.star))",
    placement: "Inside ListView or Column in Scaffold > body",
  },
  {
    name: "Container",
    category: "Layout",
    description:
      "A convenience widget that combines common painting, positioning, and sizing widgets.",
    example: "Container(padding: EdgeInsets.all(16), child: Text('Hello'))",
    placement: "Inside Column/Row/Stack in Scaffold > body",
  },
  {
    name: "TextField",
    category: "Form",
    description: "A basic text input field.",
    example: "TextField(decoration: InputDecoration(labelText: 'Enter name'))",
    placement: "Inside Form or Column in body",
  },
];

const categories = ["All", "Layout", "Form", "List"];

export default function WidgetBrowser() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const filteredWidgets = widgets.filter((w) => {
    const matchSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || w.category === filter;
    return matchSearch && matchFilter;
  });

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const exportMarkdown = () => {
    const markdown = filteredWidgets.map(w => `### ${w.name}\n\n${w.description}\n\n\`\`\`dart\n${w.example}\n\`\`\`\n📍 ${w.placement}\n`).join("\n---\n\n");
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flutter_widgets.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-background text-foreground transition-colors md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Flutter Widget Browser</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportMarkdown}>Export</Button>
            <Button variant="ghost" size="icon" onClick={toggleDark}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <Input
          placeholder="Search widgets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <Tabs value={filter} onValueChange={setFilter} className="mb-4">
          <TabsList className="overflow-x-auto whitespace-nowrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredWidgets.map((widget) => (
            <motion.div
              key={widget.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-muted shadow-sm dark:bg-zinc-800">
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{widget.name}</h2>
                  <p className="text-sm text-muted-foreground">{widget.description}</p>
                  <pre className="bg-background border mt-3 p-3 rounded text-sm overflow-auto">
                    <code>{widget.example}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    📍 Placement: {widget.placement}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredWidgets.length === 0 && (
            <p className="text-muted-foreground text-sm text-center">
              No matching widgets found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
