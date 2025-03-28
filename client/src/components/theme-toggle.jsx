// components/theme-toggle.jsx
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-provider";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            className="w-full hover:cursor-pointer hover:bg-gray-400"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
        >
            {theme === "light" ? <Sun size="40px" /> : <Moon size="40px" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
