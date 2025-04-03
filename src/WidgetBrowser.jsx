
import { useState } from "react";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import Input from "./components/Input";
import Button from "./components/Button";
import { Tabs, TabsList, TabsTrigger } from "./components/Tabs";
import { motion } from "framer-motion";
import { Moon, Sun, Languages } from "lucide-react";

// Widgets data for demo
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
  }
];

// 完整分類總覽資料
const OVERVIEW = [
  {
    icon: "🧱",
    title: { zh: "結構 / 畫面架構", en: "Structure / App Skeleton" },
    widgets: [
      { name: "Scaffold", zh: "頁面框架" },
      { name: "AppBar", zh: "上方應用列" },
      { name: "BottomNavigationBar", zh: "底部導覽列" },
      { name: "TabBar", zh: "分頁列" }
    ]
  },
  {
    icon: "📐",
    title: { zh: "佈局（Layout）", en: "Layout" },
    widgets: [
      { name: "Column", zh: "垂直排列" },
      { name: "Row", zh: "水平排列" },
      { name: "Expanded", zh: "彈性佔滿空間" },
      { name: "Stack", zh: "疊加元件" }
    ]
  }
];

const categories = ["All", "Layout", "List"];

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
📍 ${w.placement[lang]}`
    ).join("\n---\n\n");

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
        {/* Header */}
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

        {/* Search + Filter */}
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
                    cat === "List" ? "清單" : cat
                  : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Filtered Cards */}
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

        {/* Overview Block */}
        <div className="mt-10 space-y-6">
          {OVERVIEW.map(section => (
            <div key={section.title.en}>
              <h2 className="text-xl font-bold mb-2">{section.icon} {section.title[lang]}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                {section.widgets.map(item => (
                  <li key={item.name}>- {item.name} / {item.zh}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
