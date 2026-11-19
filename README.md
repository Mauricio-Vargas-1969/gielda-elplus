# Giełda decyzji ELPLUS

Cloudflare Worker z grą decyzyjną dla zespołów (kody QR, ekran prowadzącego, panel admina).

## Ścieżki
- `/` – strona startowa
- `/g/<nr>` – strona zespołu
- `/screen` – ekran prowadzącego
- `/admin` – panel administratora (wymaga `ADMIN_KEY`)
- `/qr` – kody QR zespołów

## Konfiguracja
- `DB` – baza D1 `gielda-elplus` (tabele tworzą się automatycznie)
- `NUM_GROUPS` – liczba zespołów (domyślnie 10)
- `ADMIN_KEY` – sekret: `npx wrangler secret put ADMIN_KEY`

## Wdrożenie
```bash
npm install
npx wrangler deploy
```

> `src/worker.js` to wersja zbudowana (bundle) pobrana z aktywnego wdrożenia.
