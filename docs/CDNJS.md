# Kā publicēt VitalyCSS npm un pievienot cdnjs

Šajā dokumentā ir viss ceļš no mapes datorā līdz saitei `cdnjs.cloudflare.com`.

## Vispirms — svarīgākais, ko vajag zināt

**cdnjs ir kurēta (rūpīgi atlasīta) CDN, un tā nepieņem katru bibliotēku.** Oficiālajā cdnjs/packages
dokumentācijā ir noteikta minimālā popularitāte: npm pakotnēm tie ir **800 vai vairāk lejupielādes mēnesī**
(vecākos dokumentos un rakstos minēts arī „ap 200 GitHub zvaigžņu”). Personīgie, vēl nezināmie projekti parasti tiek
noraidīti, tāpēc jaunai bibliotēkai uzreiz pēc izveides to izpildīt ir grūti.

Tas nenozīmē, ka jāgaida ar publicēšanu. Plāns ir šāds:

| Posms | Ko dari | Kad strādā |
|---|---|---|
| 1. GitHub + npm | Publicē kodu | Uzreiz |
| 2. jsDelivr / unpkg | Automātiski apkalpo npm pakotnes | Uzreiz, bez pieteikuma |
| 3. Popularitāte | Raksti README, rādi citiem, lieto reālos projektos | Nedēļas / mēneši |
| 4. cdnjs pieteikums | Pull request uz `cdnjs/packages` | Kad izpildīta popularitātes prasība |

Gatavo pieteikuma failu (`cdnjs/vitaly-css.json`) jau tagad, bet iesniedz to, kad lejupielāžu skaits to atļauj.
Pirms iesniegšanas **vienmēr pārbaudi aktuālo prasību** oficiālajā dokumentā
[github.com/cdnjs/packages → CONTRIBUTING.md](https://github.com/cdnjs/packages/blob/master/CONTRIBUTING.md),
jo noteikumi laika gaitā mainās.

---

## 1. solis — Sagatavo GitHub repozitoriju

1. Izveido jaunu publisku repozitoriju GitHub, piemēram `vitaly-css`.
2. Visā projektā aizstāj vietturi `JUSU_LIETOTAJVARDS` ar savu GitHub lietotājvārdu. Tas ir failos
   `package.json` un `cdnjs/vitaly-css.json`. Visērtāk to izdarīt ar redaktora „Atrast un aizvietot visos failos”
   (VS Code: `Ctrl+Shift+H`). Vai terminālī (Linux; macOS vajag `sed -i ''`):

   ```bash
   grep -rl "JUSU_LIETOTAJVARDS" . --exclude-dir=node_modules | xargs sed -i 's/JUSU_LIETOTAJVARDS/tavs-vards/g'
   ```

3. Augšupielādē kodu:

   ```bash
   git init
   git add .
   git commit -m "VitalyCSS 1.0.0"
   git branch -M main
   git remote add origin https://github.com/tavs-vards/vitaly-css.git
   git push -u origin main
   ```

4. Repozitorijam pievieno **Topics** (`css`, `css-framework`, `latvia`, `ui-components`), īsu aprakstu un saiti
   uz demo. Tas palīdz bibliotēku atrast.

## 2. solis — Publicē npm

Gan jsDelivr, gan cdnjs ņem failus no npm (vai Git), tāpēc šis ir galvenais solis.

1. Reģistrējies [npmjs.com](https://www.npmjs.com/signup) un ieslēdz divfaktoru autentifikāciju.
2. **Pārbaudi, vai nosaukums ir brīvs:**

   ```bash
   npm view vitaly-css
   ```

   Ja redzi kļūdu `404 Not Found` — nosaukums ir brīvs. Ja parāda pakotnes informāciju — nosaukums ir aizņemts;
   izvēlies citu (piem. `vitalycss`) un nomaini to `package.json` (`name`), `cdnjs/vitaly-css.json` un visās CDN saitēs.

3. Uzbūvē un publicē:

   ```bash
   npm install
   npm run build
   npm login
   npm pack --dry-run      # parāda, kuri faili tiks publicēti (jābūt dist/, src/, docs/, README, LICENSE)
   npm publish
   ```

4. Pārbaudi: atver `https://www.npmjs.com/package/vitaly-css`.

> `npm publish` publicē **konkrētu versiju uz visiem laikiem**. To nevar pārrakstīt, tikai izlaist jaunu versiju.
> Tāpēc pirms publicēšanas atver `examples/komponenti.html` un pārliecinies, ka viss strādā.

## 3. solis — Tūlītēja CDN no jsDelivr

Tiklīdz pakotne ir npm, tā automātiski pieejama (var paiet līdz dažām minūtēm):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.all.min.css">
<script src="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.min.js"></script>
```

Darbojas arī tieši no GitHub (vajadzīgs git tags, piem. `v1.0.0`):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tavs-vards/vitaly-css@1.0.0/dist/vitaly.all.min.css">
```

Tas ir pilnvērtīgs risinājums, kamēr cdnjs vēl nav pieejams.

## 4. solis — Pieteikums cdnjs

Pieteikums ir viens neliels JSON fails, ko pievieno repozitorijā `cdnjs/packages`. Pēc tā apstiprināšanas
cdnjs bots pats paņem visas jaunās versijas no npm.

### 4.1. Pārbaudi priekšnosacījumus

- [ ] Bibliotēka ir publicēta npm un ir izpildīta aktuālā popularitātes prasība
- [ ] Pakotnē ir gatavi `dist/` faili (cdnjs ņem tieši tos)
- [ ] Ir derīga licence (MIT ✔)
- [ ] Nosaukums sakrīt visās vietās
- [ ] Ir publicēta stabila versija (nevis alfa/beta)

### 4.2. Nofork repozitoriju `cdnjs/packages`

Atver [github.com/cdnjs/packages](https://github.com/cdnjs/packages) un nospied **Fork**.

> ⚠️ Forko tieši **`cdnjs/packages`**, nevis `cdnjs/cdnjs`. Repozitorijs `cdnjs/cdnjs` ir paredzēts tikai robotiem
> un pull request tajā netiek pieņemti.

### 4.3. Pievieno JSON failu

Savā forkā izveido failu ar ceļu:

```
packages/v/vitaly-css.json
```

Mape ir nosaukuma **pirmais burts** (`v`), bet faila nosaukums sakrīt ar bibliotēkas nosaukumu. Fails ir šī
projekta mapē `cdnjs/vitaly-css.json`, to vari vienkārši nokopēt:

```json
{
  "name": "vitaly-css",
  "description": "Latviešu CSS ietvars ar krāsu mainīgajiem un JS komponentiem, kas darbojas tikai ar data atribūtiem. Nav atkarību.",
  "keywords": ["css", "framework", "latvian", "ui", "components", "data-attributes", "dark-mode", "vanilla-js"],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/JUSU_LIETOTAJVARDS/vitaly-css.git"
  },
  "homepage": "https://github.com/JUSU_LIETOTAJVARDS/vitaly-css",
  "author": {
    "name": "Vitaly"
  },
  "filename": "vitaly.all.min.css",
  "autoupdate": {
    "source": "npm",
    "target": "vitaly-css",
    "fileMap": [
      {
        "basePath": "dist",
        "files": ["*.css", "*.js"]
      }
    ]
  }
}
```

**Ko katrs lauks nozīmē**

| Lauks | Nozīme |
|---|---|
| `name` | Bibliotēkas nosaukums cdnjs (jāsakrīt ar faila nosaukumu) |
| `filename` | Galvenais fails, ko cdnjs rāda kā noklusējuma saiti |
| `autoupdate.source` | `"npm"`, jauno versiju avots |
| `autoupdate.target` | npm pakotnes nosaukums (**jāsakrīt ar `name` failā `package.json`**) |
| `fileMap[].basePath` | Mape pakotnē, no kuras ņemt failus (`dist`). Šis ceļš CDN adresē tiek izlaists |
| `fileMap[].files` | Kuri faili tiek publicēti (`*.css`, `*.js`) |

Laukā `version` nav jābūt, versijas nāk automātiski no npm.

> **Godīgs brīdinājums:** failu struktūra (lauku kopa) ir sastādīta pēc cdnjs oficiālās lapas piemēra un
> parastās prakses. Pirms iesniegšanas atver pāris nesen pievienotus failus mapē `packages/` un salīdzini formātu.
> CONTRIBUTING.md ieteic tieši to: ņemt par paraugu jaunākos pakotņu failus. Ja formāts ir mainījies, pielāgo.

### 4.4. Nosūti pull request

1. Forkā nospied **Commit changes** (piem., ziņa `Add vitaly-css w/ npm auto-update`).
2. Spied **Contribute → Open pull request** uz `cdnjs/packages`.
3. Aizpildi pull request veidni (ja tāda ir) un īsi paskaidro, kas ir bibliotēka, ar saitēm uz npm un GitHub.
4. Gaidi pārskatīšanu. Automātiskie testi pārbauda pieteikuma formātu, un pārskatītāji var lūgt labojumus.

### 4.5. Kad pieteikums apstiprināts

Bibliotēka parādās [cdnjs.com/libraries/vitaly-css](https://cdnjs.com/libraries/vitaly-css), un lietot var šādi:

```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/vitaly-css/1.0.0/vitaly.all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/vitaly-css/1.0.0/vitaly.min.js"></script>
```

Adreses forma ir `https://cdnjs.cloudflare.com/ajax/libs/<nosaukums>/<versija>/<fails>`. Mape `dist` adresē
netiek rādīta. cdnjs lapā ir arī gatavi `<link>` un `<script>` fragmenti ar **SRI** (`integrity`) hešiem, kurus
vari kopēt.

## 5. solis — Jaunas versijas

Kad ietvars jau ir cdnjs, jaunas versijas publicē tikai caur npm, cdnjs bots tās ņem pats:

```bash
# izmaini kodu src/, pievieno ierakstu CHANGELOG.md
npm version patch        # vai minor / major, uzliek git tagu un maina package.json
npm publish              # npm run build palaižas automātiski (prepublishOnly)
git push --follow-tags
```

Versiju numuri pēc **semver**: `1.0.1` (kļūdu labojums), `1.1.0` (jauna funkcija, nesalauž veco), `2.0.0` (var salauzt veco).

## SRI (Subresource Integrity) pašiem

Ja lieto jsDelivr vai savu hostingu un gribi `integrity` atribūtu:

```bash
openssl dgst -sha384 -binary dist/vitaly.all.min.css | openssl base64 -A
```

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.all.min.css"
      integrity="sha384-IEGUVUSA_HESH"
      crossorigin="anonymous">
```

## Biežākās problēmas

| Problēma | Risinājums |
|---|---|
| `npm publish` saka, ka nosaukums aizņemts | Izvēlies citu nosaukumu (sk. 2. soli) un nomaini visur |
| `npm publish` prasa 2FA kodu | Ievadi kodu no autentifikatora lietotnes |
| jsDelivr nerāda jauno versiju | Pagaidi dažas minūtes; pārbaudi, vai versija tiešām ir npm |
| PR noraidīts „popularitātes” dēļ | Attīsti lietošanu, pievieno pieteikumu vēlāk. Pa to laiku lieto jsDelivr |
| cdnjs lapā trūkst failu | Pārbaudi `fileMap.basePath` un `files`, jābūt tādiem pašiem kā `npm pack` sarakstā |
| Testi PR krīt uz JSON | Pārbaudi komatus un pēdiņas ar [jsonlint.com](https://jsonlint.com) |
