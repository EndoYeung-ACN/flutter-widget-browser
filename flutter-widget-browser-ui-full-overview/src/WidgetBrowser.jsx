
import { useState } from "react";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import Input from "./components/Input";
import Button from "./components/Button";
import { Tabs, TabsList, TabsTrigger } from "./components/Tabs";
import { motion } from "framer-motion";
import { Moon, Sun, Languages } from "lucide-react";

const categories = ["All", "Layout", "Form", "List"];
const widgets = [];

const OVERVIEW = [
  {
    icon: "🧱",
    title: { zh: "結構 / 畫面架構", en: "Structure / App Skeleton" },
    widgets: [
      { name: "Scaffold", zh: "頁面框架" },
      { name: "AppBar", zh: "上方應用列" },
      { name: "Drawer", zh: "抽屜式選單" },
      { name: "BottomNavigationBar", zh: "底部導覽列" },
      { name: "TabBar / TabBarView", zh: "分頁導覽" },
      { name: "MaterialApp / CupertinoApp", zh: "整體應用" },
    ]
  },
  {
    icon: "📐",
    title: { zh: "佈局（Layout）", en: "Layout" },
    widgets: [
      { name: "Column / Row", zh: "垂直 / 水平排列" },
      { name: "Expanded / Flexible", zh: "彈性空間" },
      { name: "Padding / Align / Center", zh: "空間與對齊" },
      { name: "Stack / Positioned", zh: "堆疊元素" },
      { name: "SizedBox / ConstrainedBox", zh: "尺寸控制" },
    ]
  },
  {
    icon: "📦",
    title: { zh: "容器與裝飾", en: "Container & Decoration" },
    widgets: [
      { name: "Container / Card", zh: "基礎容器" },
      { name: "DecoratedBox / Material", zh: "裝飾容器" },
      { name: "ClipRRect / ClipOval", zh: "裁切效果" },
      { name: "BoxDecoration / Border", zh: "邊框與陰影" }
    ]
  },
  {
    icon: "🧾",
    title: { zh: "文字與樣式", en: "Text & Style" },
    widgets: [
      { name: "Text / RichText", zh: "文字顯示" },
      { name: "TextSpan / DefaultTextStyle", zh: "文字樣式" },
      { name: "TextTheme", zh: "主題樣式" }
    ]
  },
  {
    icon: "🎨",
    title: { zh: "圖片與媒體", en: "Images & Media" },
    widgets: [
      { name: "Image.asset / .network", zh: "圖片顯示" },
      { name: "Icon / IconButton", zh: "圖標與按鈕" },
      { name: "BackdropFilter / ShaderMask", zh: "圖像特效" }
    ]
  },
  {
    icon: "🔘",
    title: { zh: "按鈕與互動", en: "Buttons & Interaction" },
    widgets: [
      { name: "Elevated / Text / IconButton", zh: "常用按鈕" },
      { name: "GestureDetector / InkWell", zh: "點擊偵測" },
      { name: "FloatingActionButton", zh: "浮動按鈕" }
    ]
  },
  {
    icon: "🖱",
    title: { zh: "滑動與清單", en: "Scrolling & Lists" },
    widgets: [
      { name: "ListView / GridView", zh: "清單與網格" },
      { name: "SingleChildScrollView", zh: "可滾動容器" },
      { name: "ListTile / Dismissible", zh: "列表項目" }
    ]
  },
  {
    icon: "✍️",
    title: { zh: "表單與輸入", en: "Form & Input" },
    widgets: [
      { name: "TextField / TextFormField", zh: "文字輸入欄" },
      { name: "Checkbox / Radio / Switch", zh: "勾選選項" },
      { name: "Slider / DatePicker", zh: "滑桿與日期" }
    ]
  },
  {
    icon: "🔄",
    title: { zh: "動畫與資料處理", en: "Animation & Async" },
    widgets: [
      { name: "AnimatedContainer / Opacity", zh: "動畫過渡" },
      { name: "FutureBuilder / StreamBuilder", zh: "非同步顯示" }
    ]
  },
  {
    icon: "🛠",
    title: { zh: "工具型 Widget", en: "Utility Widgets" },
    widgets: [
      { name: "SafeArea / Builder", zh: "佈局與錯誤處理" },
      { name: "Theme / MediaQuery", zh: "外觀控制" }
    ]
  },
  {
    icon: "🌙",
    title: { zh: "iOS 風格（Cupertino）", en: "Cupertino" },
    widgets: [
      { name: "CupertinoButton / Switch", zh: "iOS 按鈕開關" },
      { name: "CupertinoNavigationBar", zh: "iOS 導覽列" }
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
    <div className="min-h-screen px-4 py-6 bg-gray-50 dark:bg-zinc-900 text-zinc-900 dark:text-white transition-colors md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Flutter Widget 分類總覽</h1>
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
                <h2 className="text-lg font-semibold mb-2">
                  {section.icon} {section.title[lang]}
                </h2>
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
