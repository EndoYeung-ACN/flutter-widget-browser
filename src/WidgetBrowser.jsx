
import { useState } from "react";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import Input from "./components/Input";
import Button from "./components/Button";
import { Tabs, TabsList, TabsTrigger } from "./components/Tabs";
import { motion } from "framer-motion";
import { Moon, Sun, Languages } from "lucide-react";

const WIDGETS = [
  {
    name: { zh: "ListTile", en: "ListTile" },
    category: "List",
    description: {
      zh: "一行固定高度的元件，通常包含文字或圖標。",
      en: "A single fixed-height row that typically contains some text and/or icons."
    },
    example: "ListTile(title: Text('Item'), subtitle: Text('Details'), leading: Icon(Icons.star))",
    placement: {
      zh: "放在 Scaffold > body 中的 ListView 或 Column",
      en: "Inside ListView or Column in Scaffold > body"
    }
  },
  {
    name: { zh: "Container", en: "Container" },
    category: "Layout",
    description: {
      zh: "結合繪圖、定位、尺寸等常用功能的容器元件。",
      en: "A convenience widget that combines common painting, positioning, and sizing widgets."
    },
    example: "Container(padding: EdgeInsets.all(16), child: Text('Hello'))",
    placement: {
      zh: "放在 Scaffold > body 中的 Column、Row 或 Stack",
      en: "Inside Column/Row/Stack in Scaffold > body"
    }
  },
  {
    name: { zh: "TextField", en: "TextField" },
    category: "Form",
    description: {
      zh: "基本的文字輸入欄位。",
      en: "A basic text input field."
    },
    example: "TextField(decoration: InputDecoration(labelText: 'Enter name'))",
    placement: {
      zh: "放在 Column 或 Form 中",
      en: "Inside Form or Column in body"
    }
  }
];

const categories = ["All", "Layout", "Form", "List"];

export default function WidgetBrowser() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("zh");

  const filtered = WIDGETS.filter(w => {
    const matchSearch =
      w.name[lang].toLowerCase().includes(search.toLowerCase()) ||
      w.description[lang].toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || w.category === filter;
    return matchSearch && matchFilter;
  });

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const exportMarkdown = () => {
    const markdown = filtered.map(w =>
      `### ${w.name[lang]}

${w.description[lang]}

\`\`\`dart
${w.example}
\`\`\`
📍 ${w.placement[lang]}
`
    ).join("\\n---\\n\\n");
---

");

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flutter_widgets.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Flutter Widget Browser</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportMarkdown}>
              {lang === "zh" ? "匯出" : "Export"}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDark}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
              <Languages className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Input
          placeholder={lang === "zh" ? "搜尋元件..." : "Search widgets..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        <Tabs value={filter}>
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                onClick={() => setFilter(cat)}
                selected={filter === cat}
              >
                {lang === "zh"
                  ? cat === "All" ? "全部" :
                    cat === "Layout" ? "佈局" :
                    cat === "Form" ? "表單" :
                    cat === "List" ? "清單" : cat
                  : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {filtered.map((widget) => (
            <motion.div
              key={widget.name.en}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent>
                  <h2 className="text-lg font-semibold mb-1">{widget.name[lang]}</h2>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{widget.description[lang]}</p>
                  <pre className="bg-gray-100 dark:bg-zinc-700 mt-3 p-3 rounded text-sm overflow-auto text-zinc-800 dark:text-gray-100">
                    <code>{widget.example}</code>
                  </pre>
                  <p className="text-xs text-zinc-500 mt-2">📍 {widget.placement[lang]}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-zinc-400 text-sm text-center mt-10">
            {lang === "zh" ? "找不到相關元件。" : "No matching widgets found."}
          </p>
        )}
      </div>
    </div>
  );
}
