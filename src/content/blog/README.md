# Kako dodati blog post

1. Napravi fajl `naziv-posta.mdx` u ovom folderu. Ime fajla postaje URL: `/blog/naziv-posta`.
2. Na vrhu fajla stavi:

   ```js
   export const metadata = {
     title: "Naslov posta",
     description: "Kratak opis (za listu postova i Google).",
     date: "2026-11-16", // GGGG-MM-DD
     category: "Strategija",
     tags: ["rast", "procesi"],
     draft: false, // true = vidi se samo lokalno
   };
   ```

3. Ispod piši tekst u Markdown-u (`## podnaslov`, `**podebljano**`, liste, linkovi, tabele).
4. Slike stavi u `public/blog/` i ubaci ih sa `![opis](/blog/slika.jpg)`.

Najlakše: reci Claude-u „napiši post o ...“ ili mu daj tekst, pa će on napraviti fajl.
