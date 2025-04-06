import { ThemeDisplay } from "@/components/theme-display";
import { getThemeInfo } from "@/lib/theme-utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const themeInfo = getThemeInfo();
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Company Theme Test Section */}
        <div className="w-full max-w-2xl mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-primary">
          Flow Hub - {themeInfo.company}
          </h1>
          <p className="text-muted-foreground mb-6">
            This is a demo of the Flow Hub theme system. The current theme is <span className="font-semibold">{themeInfo.name}</span>.
          </p>
          
          <div className="flex justify-center">
            {/* Theme Display Component */}
            <ThemeDisplay />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-center">
          Flow Hub - {themeInfo.company}
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-[700px]">
          This is a demo of the theme system. The current theme is{" "}
          <span className="font-semibold">{themeInfo.name}</span>.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </main>
    </div>
  );
}