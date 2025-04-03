
import { useState } from "react";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import Button from "./components/Button";
import { Moon, Sun, Languages } from "lucide-react";

const TREE = `
MaterialApp / CupertinoApp
  └── Scaffold
        ├── AppBar                  → 頂部工具列 / Top App Bar
        ├── body                    → 主畫面內容 / Main Content
        │   └── Column / Row / Stack
        │       └── Text, Button, Container, ...
        ├── drawer                 → 側邊選單 / Side Drawer
        ├── bottomNavigationBar   → 底部導覽列 / Bottom Navigation Bar
        └── floatingActionButton  → 漂浮按鈕 / Floating Action Button
`;

const TABLE = [
  {
    name: "appBar",
    belongsTo: "Scaffold",
    type: "AppBar Widget",
    zh: "頂部工具列，通常放標題與功能按鈕",
    en: "Top bar for title and actions"
  },
  {
    name: "actions",
    belongsTo: "AppBar",
    type: "List<Widget>",
    zh: "AppBar 右上角的功能鍵清單",
    en: "Top-right icons in the AppBar"
  },
  {
    name: "body",
    belongsTo: "Scaffold",
    type: "Widget",
    zh: "畫面主要內容區塊",
    en: "Main content area"
  },
  {
    name: "floatingActionButton",
    belongsTo: "Scaffold",
    type: "FloatingActionButton",
    zh: "右下角漂浮操作按鈕",
    en: "Floating circular action button"
  },
  {
    name: "drawer",
    belongsTo: "Scaffold",
    type: "Drawer Widget",
    zh: "側邊抽屜選單",
    en: "Side navigation drawer"
  },
  {
    name: "bottomNavigationBar",
    belongsTo: "Scaffold",
    type: "BottomNavigationBar",
    zh: "畫面底部導覽列",
    en: "Bottom tab-style navigation bar"
  },
  {
    name: "title",
    belongsTo: "AppBar",
    type: "Widget",
    zh: "AppBar 中間標題",
    en: "Title shown in the AppBar"
  },
  {
    name: "leading",
    belongsTo: "AppBar",
    type: "Widget",
    zh: "AppBar 左側圖標，通常是返回箭頭",
    en: "Left-side icon, usually back button"
  },
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
          <h1 className="text-2xl font-bold">
            {lang === "zh" ? "Flutter Widget 層級關係總覽" : "Flutter Widget Hierarchy Overview"}
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDark}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
              <Languages className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">{lang === "zh" ? "階層結構圖" : "Widget Tree Structure"}</h2>
            <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
              {TREE}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">{lang === "zh" ? "詳細屬性對照表" : "Detailed Property Table"}</h2>
            <div className="overflow-x-auto text-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b dark:border-zinc-700 text-left">
                    <th className="py-2 px-2">名稱</th>
                    <th className="py-2 px-2">所屬</th>
                    <th className="py-2 px-2">類型</th>
                    <th className="py-2 px-2">{lang === "zh" ? "功能（繁）" : "Description"}</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map(row => (
                    <tr key={row.name} className="border-b last:border-none dark:border-zinc-800">
                      <td className="py-2 px-2 font-mono">{row.name}</td>
                      <td className="py-2 px-2">{row.belongsTo}</td>
                      <td className="py-2 px-2">{row.type}</td>
                      <td className="py-2 px-2">{lang === "zh" ? row.zh : row.en}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
