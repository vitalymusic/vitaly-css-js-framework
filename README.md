# VitalyCSS

**Latviešu CSS ietvars ar JavaScript komponentiem, kas darbojas tikai ar `data-` atribūtiem.**

- 🇱🇻 Latviskas klases: `.poga`, `.karte`, `.režģis`, `.ievade`, `.ziņa`…
- 🎨 Visas krāsas ir CSS mainīgie, tāpēc tās pārraksta ar vienu bloku
- 🌓 Tumšais režīms (automātisks + pārslēdzams ar vienu atribūtu)
- ⚡ 23 JS komponenti bez rakstīta koda: modāļi, cilnes, akordeons, karuselis, toast…
- 📦 Nav atkarību (nav jQuery, nav Bootstrap)
- ♿ Tastatūras un ekrānlasītāju atbalsts

Dizains ir iedvesmots no [Pico CSS](https://picocss.com) pieejas (viegls, semantisks HTML, krāsu mainīgie), taču
VitalyCSS ir patstāvīgs ietvars ar savu kodu un savām klasēm.

| Fails | Izmērs (min / gzip) |
|---|---|
| `vitaly.all.min.css` (bāze + JS stili) | ~26 KB / ~6 KB |
| `vitaly.min.js` | ~13 KB / ~4,6 KB |

## Ātrais sākums

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.all.min.css">

<button class="poga poga--pamata" data-v-logs="#logs">Atvērt logu</button>

<div class="aizkars" id="logs" aria-hidden="true">
  <div class="logs">
    <div class="logs__saturs"><p>Sveiki!</p></div>
    <div class="logs__kājene"><button class="poga" data-v-aizvert>Aizvērt</button></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.min.js"></script>
```

Savas krāsas:

```css
:root {
  --vitaly-pamata:  #6c3483;
  --vitaly-akcents: #f39c12;
}
```

## Uzstādīšana

```bash
npm install vitaly-css
```

```html
<link rel="stylesheet" href="node_modules/vitaly-css/dist/vitaly.all.min.css">
<script src="node_modules/vitaly-css/dist/vitaly.min.js"></script>
```

Vai arī vienkārši lejupielādē failus no `dist/` mapes. Pilns apraksts ir
[docs/PAMACIBA.md](docs/PAMACIBA.md).

## Dokumentācija

- 📖 **[Pilna pamācība](docs/PAMACIBA.md)** — krāsas, izkārtojums, komponenti, JS atribūti, API
- 🌍 **[Publicēšana npm un cdnjs](docs/CDNJS.md)**
- 🧪 `examples/` — sākuma šablons un divas pilnas demonstrācijas

## Mapju struktūra

```
vitaly-css/
├── src/            avota faili (šeit labo)
├── dist/           sagatavotie faili (CDN un lietotājiem)
├── docs/           pamācība un publicēšanas instrukcijas
├── examples/       sakums.html, css-pamati.html, komponenti.html
├── cdnjs/          gatavs JSON fails cdnjs/packages pieteikumam
└── build.js        būvēšanas skripts
```

## Izstrāde

```bash
npm install
npm run build     # src/ → dist/ (+ .min versijas un vitaly.all.*)
```

## Pārlūku atbalsts

Moderni pārlūki (aptuveni 2023. gada un jaunāki). Ietvars izmanto `color-mix()`, CSS mainīgos un
`grid-template-rows` animācijas.

## Licence

MIT © Vitaly
