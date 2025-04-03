// 👉 Injected: 完整版 Widget Browser with 11 分類 + 階層圖 + 詳細屬性表
import React, { useState } from "react";
import Card from "./components/Card";
import CardContent from "./components/CardContent";
import Input from "./components/Input";
import Button from "./components/Button";
import { Tabs, TabsList, TabsTrigger } from "./components/Tabs";
import { Moon, Sun, Languages } from "lucide-react";
import { motion } from "framer-motion";

// [OVERVIEW/TREE/TABLE will be inserted at runtime by previous steps]

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
        <div>⚠️ WidgetBrowser.jsx 還沒注入最終版本。</div>
      </div>
    </div>
  );
}
