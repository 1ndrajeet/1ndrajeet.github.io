"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShinyButton } from "./magicui/shiny-button";
import RazorpayButton from "./magicui/RazorpayButton";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Define navigation items for reusability
const NAV_ITEMS = [
  { label: "Contact", href: "#contact" },
  { label: "Certificates", href: "/certifications" },
  { label: "Blog", href: "/blog" },
] as const;

const ADMIN_NAV_ITEMS = [
  { label: "Batcave", href: "/batcave" },
  { label: "Diaries", href: "/batcave/diaries" },
  { label: "Blog", href: "/batcave/blog" },
] as const;


// Interface for component props (optional if needed for reusability)
interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps = {}) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Memoize theme toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // Handle scroll effect with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 10);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Close mobile menu on resize or route change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on navigation
  const handleNavClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Memoize nav items rendering for performance
  const renderNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
          onClick={handleNavClick}
        >
          {item.label}
        </Link>
      )),
    [handleNavClick]
  );

  const renderAdminNavItems = useMemo(
    () =>
      ADMIN_NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1"
          onClick={handleNavClick}
        >
          {item.label}
        </Link>
      )),
    [handleNavClick]
  );

  return (
    <header
      className={cn(
        "sticky top-0 px-4 md:px-10 z-50 w-full border-b transition-all duration-300",
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-screen-xl",
        scrolled ? "border-border/40 shadow-sm" : "border-transparent",
        className
      )}
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 relative z-50"
            aria-label="Home"
          >
            <span className="text-lg font-bold tracking-tight">1ndrajeet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" role="navigation">
            <SignedOut>
              {renderNavItems}
              
            </SignedOut>
            <SignedIn>
              {renderAdminNavItems}
            </SignedIn>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <SignedOut>
              <RazorpayButton className="scale-90" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <Link href="#contact" className="hidden sm:flex">
            <ShinyButton className="text-sm font-semibold">
              Get in Touch
            </ShinyButton>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-accent"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden rounded-full hover:bg-accent"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border/40 bg-background"
            role="navigation"
          >
            <div className="container py-4 flex flex-col space-y-2">
              <SignedIn>
                {ADMIN_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium py-3 px-4 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </SignedIn>
              <SignedOut>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium py-3 px-4 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </Link>
                ))}
                
              </SignedOut>

            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}