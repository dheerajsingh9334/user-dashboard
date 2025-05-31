import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Sun, Moon } from "lucide-react";

function MyApp({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <UserProvider>
      {/* Background Wrapper */}
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 ease-in-out">

        {/* Theme Toggle Button */}
        <button
          onClick={() => setDark((prev) => !prev)}
          className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur border border-gray-300 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-700 dark:text-white shadow-md hover:scale-105 active:scale-95 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {dark ? "Light" : "Dark"}
        </button>

        {/* Animated Route Transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            key={router.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-4xl mx-auto px-4 py-10"
          >
            <Component {...pageProps} />
          </motion.main>
        </AnimatePresence>
      </div>
    </UserProvider>
  );
}

export default MyApp;
