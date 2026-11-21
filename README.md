# Social media pakket: Cafetaria De Zon

Concept ter beoordeling, niets is op Instagram of Facebook geplaatst. Open `index.html` voor de presentatie.

## Mappen

- `index.html` en `presentatie.pdf`: presentatie voor de klant
- `brand-guidelines`: merkrichtlijnen (HTML en PDF)
- `strategy`: strategie
- `content-calendar`: 30 dagen (CSV en MD)
- `feed-posts`, `carousels`, `stories`, `reels/covers`: masters (PNG)
- `reels`: videoformats V1 tot V5 en opnamelijst
- `videos`: MP4's M1 tot M3 en bronbestanden
- `captions`: captions (MD en CSV)
- `templates`: bewerkbare HTML van elk ontwerp (`html`) en sjablonen voor actie, foto en vraag (`sjablonen`)
- `assets`: lettertype, CSS, illustraties, iconen en profielafbeeldingen
- `legal`: assets, licenties en rechten
- `exports`: upload-klare JPG/PNG en MP4, op plaatsing gesorteerd

## Aanpassen en opnieuw maken

```
node tools/render.mjs        # alle ontwerpen naar PNG en JPG
node tools/video.mjs         # de MP4's (ffmpeg vereist)
node tools/docs.mjs --pdf    # captions, kalender, formats, presentatie en PDF's
```

Teksten staan in `src/pieces.mjs` (ontwerpen) en `src/content.mjs` (captions, formats, kalender). Playwright is nodig (`npm install`).

## Regels

- Alleen bevestigde feiten: naam, adres, telefoon, tijden, pin en contant, afhalen, categorieën.
- Geen prijzen, acties of productnamen zonder bevestiging van de eigenaar.
- Aanname: afhalen gaat via bellen of aan de balie. Bevestig dit.
- Geen stock, geen AI-beelden, geen muziek meegeleverd.
