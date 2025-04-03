import { useState } from "react";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import Input from "./components/Input";
import Button from "./components/Button";
import { Tabs, TabsList, TabsTrigger } from "./components/Tabs";
import { Moon, Sun, Languages } from "lucide-react";

const OVERVIEW = [
  {
    icon: "🧱",
    title: { zh: "結構 / 畫面架構", en: "Structure / App Skeleton" },
    widgets: [
      { name: "Scaffold", zh: "頁面框架" },
      { name: "AppBar", zh: "上方應用列" },
      { name: "BottomNavigationBar", zh: "底部導覽列" },
      { name: "TabBar", zh: "分頁列" },
      { name: "MaterialApp", zh: "根應用元件" }
    ]
  },
  {
    icon: "📐",
    title: { zh: "佈局（Layout）", en: "Layout" },
    widgets: [
      { name: "Column", zh: "垂直排列" },
      { name: "Row", zh: "水平排列" },
      { name: "Expanded", zh: "彈性空間" },
      { name: "Stack", zh: "疊加元件" }
    ]
  }
];

export default function WidgetBrowser() {
  const [lang, setLang] = useState("zh");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Flutter Widget Browser</h1>
          <div className="flex gap-2">
            <button onClick={toggleDark}>{darkMode ? "☀️" : "🌙"}</button>
            <button onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
              <Languages className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="grid gap-6">
          {OVERVIEW.map(section => (
            <Card key={section.title.en}>
              <CardContent>
                <h2 className="text-lg font-semibold mb-2">{section.icon} {section.title[lang]}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 text-sm text-zinc-800 dark:text-zinc-200">
                  {section.widgets.map(w => (
                    <li key={w.name}>- {w.name} / {w.zh}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
