
# ByggKoll - Tidrapportering för Proffs

Detta är ett modernt tidrapporteringssystem skräddarsytt för byggbranschen (PR BYGG OCH KAKEL), byggt med React, TypeScript och Vite, med AI-insikter via Google Gemini.

## Snabbstart

1. **Installera beroenden:**
   ```bash
   npm install
   ```

2. **Kör lokalt:**
   ```bash
   npm run dev
   ```

3. **Bygg för produktion:**
   ```bash
   npm run build
   ```

## Deployment

Detta projekt är optimerat för deployment till **Vercel**, **Netlify** eller **GitHub Pages**.

### Miljövariabler
För att AI-analysen ska fungera i produktion måste du lägga till följande miljövariabel i din hosting-panel:
- `API_KEY`: Din Google Gemini API-nyckel.

## Funktioner
- ✅ Fullständig tidrapportering per projekt och anställd.
- ✅ AI-analys av arbetsflöden och effektivitet.
- ✅ Automatisk lagring i webbläsaren (localStorage).
- ✅ Projektlogg med sortering och redigering.
- ✅ Responsivt gränssnitt för mobilen ute på bygget.
