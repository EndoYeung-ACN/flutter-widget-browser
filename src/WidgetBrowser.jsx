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
      { name: "MaterialApp", zh: "根應用元件" },
    ]
  },
  {
    icon: "📐",
    title: { zh: "佈局（Layout）", en: "Layout" },
    widgets: [
      { name: "Column", zh: "垂直排列" },
      { name: "Row", zh: "水平排列" },
      { name: "Expanded", zh: "彈性空間" },
      { name: "Stack", zh: "疊加元件" },
    ]
  },
  {
    icon: "📦",
    title: { zh: "容器與裝飾", en: "Container & Decoration" },
    widgets: [
      { name: "Container", zh: "基本容器" },
      { name: "Card", zh: "卡片元件" },
      { name: "DecoratedBox", zh: "裝飾盒" },
      { name: "ClipRRect", zh: "裁切矩形" },
    ]
  },
  {
    icon: "🧾",
    title: { zh: "文字與樣式", en: "Text & Style" },
    widgets: [
      { name: "Text", zh: "基本文字" },
      { name: "RichText", zh: "豐富文字" },
      { name: "DefaultTextStyle", zh: "預設樣式" },
    ]
  },
  {
    icon: "🎨",
    title: { zh: "圖片與媒體", en: "Images & Media" },
    widgets: [
      { name: "Image.asset", zh: "資源圖片" },
      { name: "Image.network", zh: "網路圖片" },
      { name: "Icon", zh: "圖標" },
    ]
  },
  {
    icon: "🔘",
    title: { zh: "按鈕與互動", en: "Buttons & Interaction" },
    widgets: [
      { name: "ElevatedButton", zh: "立體按鈕" },
      { name: "TextButton", zh: "文字按鈕" },
      { name: "GestureDetector", zh: "手勢偵測" },
    ]
  },
  {
    icon: "🖱",
    title: { zh: "滑動與清單", en: "Scrolling & Lists" },
    widgets: [
      { name: "ListView", zh: "清單列表" },
      { name: "GridView", zh: "網格列表" },
      { name: "ListTile", zh: "清單項目" },
    ]
  },
  {
    icon: "✍️",
    title: { zh: "表單與輸入", en: "Form & Input" },
    widgets: [
      { name: "TextField", zh: "文字輸入欄" },
      { name: "Checkbox", zh: "勾選框" },
      { name: "Slider", zh: "滑桿" },
    ]
  },
  {
    icon: "🔄",
    title: { zh: "動畫與資料處理", en: "Animation & Async" },
    widgets: [
      { name: "AnimatedContainer", zh: "動畫容器" },
      { name: "FutureBuilder", zh: "非同步處理" },
    ]
  },
  {
    icon: "🛠",
    title: { zh: "工具型 Widget", en: "Utility Widgets" },
    widgets: [
      { name: "SafeArea", zh: "安全區域" },
      { name: "Theme", zh: "主題控制" },
    ]
  },
  {
    icon: "🌙",
    title: { zh: "iOS 風格元件", en: "Cupertino Widgets" },
    widgets: [
      { name: "CupertinoButton", zh: "iOS 按鈕" },
      { name: "CupertinoNavigationBar", zh: "iOS 導覽列" },
    ]
  }
];

const TREE = `
MaterialApp / CupertinoApp
  |-- Scaffold
      |-- AppBar                  -> 頂部工具列 / Top App Bar
      |-- body                    -> 主畫面內容 / Main Content
      |   |-- Column / Row / Stack
      |       |-- Text, Button, Container, ...
      |-- drawer                 -> 側邊選單 / Side Drawer
      |-- bottomNavigationBar   -> 底部導覽列 / Bottom Navigation Bar
      |-- floatingActionButton  -> 漂浮按鈕 / Floating Action Button
`;

const TABLE = [
  { name: "appBar", belongsTo: "Scaffold", type: "AppBar Widget", zh: "頂部工具列", en: "Top app bar" },
  { name: "actions", belongsTo: "AppBar", type: "List<Widget>", zh: "功能按鈕列", en: "Action button list" },
  { name: "body", belongsTo: "Scaffold", type: "Widget", zh: "主要內容區", en: "Main content" },
  { name: "floatingActionButton", belongsTo: "Scaffold", type: "FloatingActionButton", zh: "漂浮按鈕", en: "FAB button" },
  { name: "drawer", belongsTo: "Scaffold", type: "Drawer", zh: "側邊選單", en: "Side drawer" },
  { name: "bottomNavigationBar", belongsTo: "Scaffold", type: "BottomNavigationBar", zh: "底部導覽列", en: "Bottom nav bar" },
  { name: "title", belongsTo: "AppBar", type: "Widget", zh: "標題", en: "Title" },
  { name: "leading", belongsTo: "AppBar", type: "Widget", zh: "左側圖標", en: "Leading icon" },
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
            <Button variant="ghost" size="icon" onClick={toggleDark}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
              <Languages className="w-5 h-5" />
            </Button>
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

        <div className="my-10" />

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