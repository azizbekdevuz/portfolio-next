import { THEME_STORAGE_KEY } from "@/lib/theme-constants";

/** Runs before paint to prevent theme flash. Inline in document head. */
export function ThemeScript() {
  const js = `
(function(){
  try {
    var k = ${JSON.stringify(THEME_STORAGE_KEY)};
    var pref = localStorage.getItem(k);
    var dark;
    if (pref === 'light') dark = false;
    else if (pref === 'dark') dark = true;
    else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
