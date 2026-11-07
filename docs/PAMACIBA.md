# VitalyCSS — pilna pamācība

Šī pamācība ir domāta gan iesācējiem, gan pieredzējušiem. Ja steidzies, izlasi sadaļas **1–3**, un tev jau
būs strādājoša lapa.

## Satura rādītājs

1. [Kā pieslēgt](#1-kā-pieslēgt)
2. [Pirmā lapa (šablons)](#2-pirmā-lapa-šablons)
3. [Savas krāsas](#3-savas-krāsas)
4. [Tumšais režīms](#4-tumšais-režīms)
5. [Tipogrāfija](#5-tipogrāfija)
6. [Izkārtojums](#6-izkārtojums)
7. [Navigācija](#7-navigācija)
8. [Pogas](#8-pogas)
9. [Formas](#9-formas)
10. [Kartes](#10-kartes)
11. [Ziņojumi un nozīmes](#11-ziņojumi-un-nozīmes)
12. [Tabulas](#12-tabulas)
13. [JS komponenti](#13-js-komponenti)
14. [JavaScript API un notikumi](#14-javascript-api-un-notikumi)
15. [Palīgklases](#15-palīgklases)
16. [Pieejamība](#16-pieejamība)
17. [Biežākās problēmas](#17-biežākās-problēmas)
18. [Būvēšana un izstrāde](#18-būvēšana-un-izstrāde)

---

## 1. Kā pieslēgt

Ir trīs veidi. Visi dod vienādu rezultātu.

### A) No CDN (vienkāršākais)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.all.min.css">
<script src="https://cdn.jsdelivr.net/npm/vitaly-css@1.0.0/dist/vitaly.min.js"></script>
```

Kad bibliotēka būs pieņemta cdnjs (skat. [CDNJS.md](CDNJS.md)), derēs arī:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vitaly-css/1.0.0/vitaly.all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/vitaly-css/1.0.0/vitaly.min.js"></script>
```

> Vienmēr norādi konkrētu versiju (`@1.0.0`), nevis `@latest`, lai lapa nesalūztu, kad iznāk jauna versija.

### B) Caur npm

```bash
npm install vitaly-css
```

```html
<link rel="stylesheet" href="node_modules/vitaly-css/dist/vitaly.all.min.css">
<script src="node_modules/vitaly-css/dist/vitaly.min.js"></script>
```

Ja lieto būvēšanas rīku (Vite, webpack…): `import 'vitaly-css/dist/vitaly.all.min.css'; import 'vitaly-css/dist/vitaly.min.js';`

### C) Lejupielādē failus

Nokopē failus no `dist/` mapes savā projektā un pieslēdz kā parasti.

### Kurus failus izvēlēties?

| Fails | Kad lietot |
|---|---|
| `vitaly.all.min.css` | **Ieteicams.** Bāze + JS komponentu stili vienā failā |
| `vitaly.min.css` | Ja JS komponentus nelieto (tikai izskats) |
| `vitaly-js.min.css` | Tikai JS komponentu stili (kopā ar `vitaly.min.css`) |
| `vitaly.min.js` | JS komponenti (vajadzīgs tikai tad, ja lieto `data-v-*`) |
| `*.css` / `*.js` bez `.min` | Lasāmas versijas izstrādei |

`vitaly.all.css` = `vitaly.css` + `vitaly-js.css`. Ja lieto atsevišķi, `vitaly.css` jāpieslēdz **pirmais**.

---

## 2. Pirmā lapa (šablons)

Gatavs šablons ir failā [`examples/sakums.html`](../examples/sakums.html). Minimālā versija:

```html
<!DOCTYPE html>
<html lang="lv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mana lapa</title>
  <link rel="stylesheet" href="vitaly.all.min.css">
</head>
<body>
  <main class="saturs saturs--šaurs polst-xl">
    <h1>Sveika, pasaule!</h1>
    <p>Teksts, saites un virsraksti izskatās labi jau bez klasēm.</p>
    <button class="poga poga--pamata">Nospied mani</button>
  </main>
  <script src="vitaly.min.js"></script>
</body>
</html>
```

**Svarīgi:** `<meta name="viewport">` ir obligāts, citādi mobilajos pārlūkos izkārtojums nestrādās.

---

## 3. Savas krāsas

Visas krāsas ir CSS mainīgie. Lai nomainītu krāsas, savā stillapā (pēc VitalyCSS) pārraksti tos `:root` blokā:

```css
:root {
  --vitaly-pamata:       #6c3483;   /* galvenā krāsa */
  --vitaly-pamata-gaiss: #8e44ad;   /* gaišāks tonis (tumšajā režīmā tiek lietots tekstam) */
  --vitaly-pamata-tumss: #4a235a;   /* tumšāks tonis (hover) */
  --vitaly-akcents:      #f39c12;
}
```

Pārējais pielāgojas pats: pogas, saites, cilnes, akordeons, fokusa rāmji, progresa joslas.

### Visi mainīgie

**Krāsas**

| Mainīgais | Ko dara |
|---|---|
| `--vitaly-pamata` | Galvenā krāsa (pogas, aktīvie elementi) |
| `--vitaly-pamata-gaiss` / `-tumss` | Gaišāks / tumšāks tonis |
| `--vitaly-pamata-teksts` | Pamata krāsa, kad tā ir **teksts** (tumšajā režīmā automātiski kļūst gaišāka) |
| `--vitaly-akcents` (`-gaiss`, `-tumss`) | Akcenta krāsa |
| `--vitaly-briesmas` | Kļūdas, dzēšana |
| `--vitaly-uzmanies` | Brīdinājumi |
| `--vitaly-labi` | Veiksme |
| `--vitaly-info` | Informācija |
| `--vitaly-fons` | Lapas fons |
| `--vitaly-fons-kartes` | Karšu, logu, izvēlņu fons |
| `--vitaly-fons-klusums` | Sekundārs fons (kods, tabulu galvenes, hover) |
| `--vitaly-teksts`, `-gaiss`, `-kluss` | Teksta toņi |
| `--vitaly-saite`, `--vitaly-saite-virsma` | Saites krāsa / hover |
| `--vitaly-mala`, `--vitaly-mala-tumss` | Rāmji |

**Tipogrāfija un izmēri**

| Mainīgais | Noklusējums |
|---|---|
| `--vitaly-fonts` | Virsrakstu fonts (Georgia, serif) |
| `--vitaly-fonts-sans` | Pamatteksta fonts (sistēmas sans-serif) |
| `--vitaly-fonts-kods` | Kodam (monospace) |
| `--vitaly-rindiņa` | Rindu augstums (`1.65`) |
| `--vitaly-attālums-s/m/l/xl` | Atstarpes (0.5 / 1 / 2 / 3.5 rem) |
| `--vitaly-noapaļ`, `--vitaly-noapaļ-l` | Stūru noapaļojums (6px / 14px) |
| `--vitaly-ēna`, `--vitaly-ēna-l` | Ēnas |
| `--vitaly-pāreja` | Animācijas ātrums (0.18s) |

### Gatavas tēmas

```css
/* Jūra */
:root { --vitaly-pamata:#0b6e8a; --vitaly-pamata-gaiss:#2ea3c4; --vitaly-pamata-tumss:#07485c; --vitaly-akcents:#ff7f50; }

/* Saulriets */
:root { --vitaly-pamata:#c0392b; --vitaly-pamata-gaiss:#e55a4a; --vitaly-pamata-tumss:#8e2a20; --vitaly-akcents:#f5b041; }

/* Melns un balts */
:root { --vitaly-pamata:#111; --vitaly-pamata-gaiss:#555; --vitaly-pamata-tumss:#000; --vitaly-akcents:#111; }
```

### Savi fonti

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=Source+Sans+3&display=swap" rel="stylesheet">
<style>
  :root {
    --vitaly-fonts: "Fraunces", Georgia, serif;
    --vitaly-fonts-sans: "Source Sans 3", system-ui, sans-serif;
  }
</style>
```

### Krāsas tikai vienam blokam

Mainīgos var pārrakstīt jebkurā elementā, un izmaiņas attieksies tikai uz tā saturu:

```html
<section style="--vitaly-pamata: #c0392b;">
  <button class="poga poga--pamata">Šī poga ir sarkana</button>
</section>
```

---

## 4. Tumšais režīms

**Automātiski:** ja lietotāja ierīcei ir ieslēgts tumšais režīms, lapa kļūst tumša pati (`prefers-color-scheme`).

**Ar pārslēgu:** pievieno jebkuram elementam `data-v-tema`:

```html
<button class="poga poga--klusā" data-v-tema>◐ Tēma</button>
```

Izvēle tiek saglabāta pārlūkā (`localStorage`). Skripts uzliek `<html data-tema="tumša">` vai `"gaiša"`.

**Pielāgošana.** Tumšā režīma krāsas var pārrakstīt:

```css
:root[data-tema="tumša"] {
  --vitaly-fons: #0a0f0d;
  --vitaly-fons-kartes: #141c18;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-tema="gaiša"]) {
    --vitaly-fons: #0a0f0d;
    --vitaly-fons-kartes: #141c18;
  }
}
```

> Piezīme: ja esi pārrakstījis neitrālās krāsas (`--vitaly-fons`, `--vitaly-teksts`…) `:root`, bet
> tēmas pārslēgs vienalga uzliek savas vērtības, nokopē savas krāsas arī `:root[data-tema="gaiša"]` blokā.

---

## 5. Tipogrāfija

Visi standarta HTML elementi izskatās labi bez klasēm: `h1`–`h6`, `p`, `a`, `strong`, `em`, `small`, `blockquote`,
`code`, `pre`, `hr`.

```html
<h1>Virsraksts (pielāgojas ekrāna platumam)</h1>
<p>Teksts ar <a href="#">saiti</a>, <strong>treknrakstu</strong> un <code>kodu</code>.</p>
<blockquote>Citāts izskatās ar krāsainu joslu kreisajā pusē.</blockquote>
```

Teksta palīgklases:

| Klase | Rezultāts |
|---|---|
| `.teksts-c` / `.teksts-kr` / `.teksts-pa` | Centrēts / pa labi / pa kreisi |
| `.teksts--liels` / `.teksts--mazs` | Lielāks / mazāks |
| `.teksts--kluss` / `.teksts--klusākais` | Pelēks teksts |
| `.teksts--pamata`, `--akcents`, `--labi`, `--briesmas` | Krāsains teksts |
| `.teksts--treknraksts`, `--kursīvs`, `--lielo` | Trekns, slīpraksts, VERSĀLI |

---

## 6. Izkārtojums

### Konteiners — `.saturs`

Centrē saturu un ierobežo platumu.

```html
<div class="saturs">…</div>                 <!-- līdz 1200px -->
<div class="saturs saturs--šaurs">…</div>   <!-- 720px, ērts lasīšanai -->
<div class="saturs saturs--plats">…</div>   <!-- 1440px -->
<div class="saturs saturs--pilns">…</div>   <!-- pilns platums -->
```

### Režģis — `.režģis`

```html
<div class="režģis režģis--3">
  <div>1</div><div>2</div><div>3</div>
</div>
```

`režģis--2`, `--3`, `--4` — vienādas kolonnas. Telefonā (līdz 768px) tās automātiski kļūst par vienu kolonnu.

Brīvs 12 kolonnu režģis:

```html
<div class="režģis režģis--12">
  <aside class="kol-4">Sānjosla</aside>
  <main class="kol-8">Saturs</main>
</div>
```

Pieejami: `kol-1`, `kol-2`, `kol-3`, `kol-4`, `kol-6`, `kol-8`, `kol-12`.

### Rinda — `.rinda` (flexbox)

```html
<div class="rinda rinda--starp rinda--centrā">
  <span>Pa kreisi</span>
  <button class="poga">Pa labi</button>
</div>
```

| Modifikators | Nozīme |
|---|---|
| `rinda--centrā`, `--augšā`, `--apakšā`, `--izstiept` | Vertikālā līdzināšana |
| `rinda--starp`, `--ap`, `--centrs-x` | Horizontālā līdzināšana |
| `rinda--ietīt` | Ļauj elementiem pāriet uz nākamo rindu |
| `rinda--kolonna` | Elementi vienā kolonnā |
| `rinda--kol-mob` | Telefonā kļūst par kolonnu |

### Kaudze — `.kaudze`

Elementi cits zem cita ar vienādu atstarpi. Piemērota formām un sarakstiem.

### Atstarpes

| Klase | Ko dara |
|---|---|
| `.atstarpe-s/m/l/xl` | `gap` (kopā ar `.rinda`, `.kaudze`, `.režģis`) |
| `.polst-s/m/l/xl` | Iekšējā atstarpe (`padding`) |
| `.sprīdis-s/m/l/xl` | Atstarpe zem elementa |
| `.mt-s/m/l`, `.mb-s/m/l` | Atstarpe virs / zem |
| `.pt-s/m/l`, `.pb-s/m/l` | Iekšējā augšā / apakšā |
| `.mx-auto`, `.ml-auto`, `.mr-auto` | Centrē / pastumj uz sāniem |

### Redzamība

`.slēpt-mob` (slēpj telefonā), `.slēpt-gald` (slēpj datorā), `.slēpts`, `.neredzams`, `.ekrānlasītājiem` (redzams tikai ekrānlasītājiem).

---

## 7. Navigācija

```html
<nav class="josla">
  <a href="/" class="zīmols">Mana lapa</a>
  <ul class="saraksts-nav">
    <li><a href="#sakums" class="aktīvs">Sākums</a></li>
    <li><a href="#par">Par mums</a></li>
    <li><button class="poga poga--pamata poga--maza">Pieteikties</button></li>
  </ul>
</nav>
```

`.josla` ir „lipīga” (`sticky`), tā paliek ekrāna augšā ritinot. Lai aktīvā sadaļa izceltos pati, pievieno
`data-v-spiegs` uz `<ul>` ([skat. 13.12](#1312-scrollspy)).

---

## 8. Pogas

```html
<button class="poga poga--pamata">Pamata</button>
<button class="poga poga--akcents">Akcents</button>
<button class="poga poga--kontūra">Kontūra</button>
<button class="poga poga--klusā">Klusa</button>
<button class="poga poga--briesmas">Dzēst</button>

<button class="poga poga--pamata poga--maza">Maza</button>
<button class="poga poga--pamata poga--liela">Liela</button>
<button class="poga poga--pamata poga--pilna">Pilna platuma</button>
<button class="poga poga--pamata" disabled>Atspējota</button>
```

Klase `.poga` der arī uz saitēm: `<a href="/" class="poga poga--pamata">Saite kā poga</a>`.

---

## 9. Formas

```html
<form class="forma">
  <div class="lauks">
    <label class="etiķete etiķete--obligāts" for="vards">Vārds</label>
    <input id="vards" class="ievade" placeholder="Tavs vārds">
    <span class="palīgteksts">Kā tevi uzrunāt.</span>
  </div>

  <div class="lauks">
    <label class="etiķete" for="epasts">E-pasts</label>
    <input id="epasts" type="email" class="ievade ievade--kļūda">
    <span class="kļūdas-teksts">Nederīga e-pasta adrese.</span>
  </div>

  <div class="lauks">
    <label class="etiķete" for="valsts">Valsts</label>
    <select id="valsts" class="ievade"><option>Latvija</option><option>Lietuva</option></select>
  </div>

  <div class="lauks">
    <label class="etiķete" for="zina">Ziņa</label>
    <textarea id="zina" class="ievade"></textarea>
  </div>

  <label class="izvēlne"><input type="checkbox"> Piekrītu noteikumiem</label>
  <label class="izvēlne"><input type="radio" name="tips"> Privātpersona</label>

  <button class="poga poga--pamata">Nosūtīt</button>
</form>
```

| Klase | Nozīme |
|---|---|
| `.forma` | Forma ar vienādām atstarpēm |
| `.lauks` | Etiķete + ievade + teksts |
| `.etiķete--obligāts` | Pievieno sarkanu zvaigznīti |
| `.ievade--kļūda`, `.ievade--labi` | Sarkana / zaļa mala |
| `.palīgteksts`, `.kļūdas-teksts` | Teksts zem lauka |
| `.izvēlne` | Rūtiņa / radio ar etiķeti |
| `.slīdnis` | `<input type="range">` |

Vienmēr sasien `<label for>` ar `<input id>`, tas ir svarīgi pieejamībai.

---

## 10. Kartes

```html
<article class="karte karte--virsma">
  <div class="karte__attēls"><img src="foto.jpg" alt="Apraksts"></div>
  <div class="karte__saturs">
    <span class="nozīme nozīme--pamata mb-s">Jaunums</span>
    <h3 class="karte__virsraksts">Virsraksts</h3>
    <p class="karte__apraksts">Īss apraksts.</p>
    <button class="poga poga--pamata poga--maza">Lasīt vairāk</button>
  </div>
  <div class="karte__kājene">
    <small>12. janvāris</small>
  </div>
</article>
```

`karte--virsma` — karte nedaudz paceļas, kad uz tās uzbrauc ar peli. Visas daļas ir neobligātas.

---

## 11. Ziņojumi un nozīmes

```html
<div class="ziņa ziņa--info">Informācija.</div>
<div class="ziņa ziņa--labi">Veiksmīgi saglabāts.</div>
<div class="ziņa ziņa--uzmanies">Uzmanību!</div>
<div class="ziņa ziņa--briesmas">Radās kļūda.</div>

<span class="nozīme nozīme--pamata">Pamata</span>
<span class="nozīme nozīme--akcents">Akcents</span>
<span class="nozīme nozīme--klusa">Klusa</span>
<span class="nozīme nozīme--labi">Labi</span>
<span class="nozīme nozīme--uzmanies">Uzmanies</span>
<span class="nozīme nozīme--briesmas">Briesmas</span>
```

Ziņu var padarīt aizveramu: `<div class="ziņa ziņa--info">Teksts <button class="aizvērt-poga" data-v-aizvert>&times;</button></div>`

---

## 12. Tabulas

```html
<div class="tabula--apmale" style="overflow-x:auto">
  <table class="tabula tabula--svītraina">
    <thead><tr><th>Pilsēta</th><th>Iedzīvotāji</th></tr></thead>
    <tbody>
      <tr><td>Rīga</td><td>605 802</td></tr>
      <tr><td>Liepāja</td><td>67 936</td></tr>
    </tbody>
  </table>
</div>
```

Platas tabulas ieliec konteinerā ar `overflow-x:auto`, lai telefonā tās ritinātos sāniski.
Kārtošanu un meklēšanu pievieno ar [`data-v-kartot`](#1317-tabulas-kārtošana) un [`data-v-meklet`](#1318-meklēšana-un-filtrēšana).

---

## 13. JS komponenti

**Princips:** raksti HTML ar `data-v-…` atribūtiem. JavaScript nav jāraksta.

Komponenti, kas reaģē uz klikšķi (logi, izvēlnes, akordeons, sakļaujams bloks, sānpanelis, toast, kopēšana, parole,
kārtošana, meklēšana), darbojas arī elementiem, kurus lapai pievieno vēlāk. Savukārt cilnes, karuselis, skaitītāji,
parādīšanās ritinot un slinkā ielāde tiek sagatavoti vienreiz, kad lapa ir ielādēta. Ja šādus elementus pievieno
vēlāk (piem., ar citu bibliotēku), tie netiks sagatavoti.

> Atribūtu nosaukumi ir **bez garumzīmēm** (`data-v-pazinojums`, nevis `paziņojums`), jo tā tie droši
> darbojas visos pārlūkos un selektoros. Klašu nosaukumi ir ar garumzīmēm.

Kopsavilkums:

| # | Komponents | Galvenais atribūts |
|---|---|---|
| 13.1 | Modālais logs | `data-v-logs="#id"` |
| 13.2 | Nolaižamā izvēlne | `data-v-nolaist` |
| 13.3 | Cilnes | `data-v-cilnes`, `data-v-cilne="#id"` |
| 13.4 | Akordeons | `data-v-akordeons`, `data-v-akordeons-poga` |
| 13.5 | Sakļaujams bloks | `data-v-saklaut="#id"` |
| 13.6 | Sānpanelis | `data-v-sanpanelis="#id"` |
| 13.7 | Paziņojumi (toast) | `data-v-pazinojums="teksts"` |
| 13.8 | Rīka padoms | `data-v-padoms="teksts"` |
| 13.9 | Karuselis | `data-v-karuselis` |
| 13.10 | Kopēt starpliktuvē | `data-v-kopet` |
| 13.11 | Tēmas pārslēgs, "uz augšu", gluda ritināšana | `data-v-tema`, `data-v-uz-augsu`, `data-v-ritinat` |
| 13.12 | Scrollspy | `data-v-spiegs` |
| 13.13 | Skaitļu animācija | `data-v-skaititajs` |
| 13.14 | Parādīšanās ritinot | `data-v-paradit` |
| 13.15 | Slinkā ielāde un palielinājums | `data-v-slinks`, `data-v-gaisma` |
| 13.16 | Parole, rakstzīmju skaitītājs | `data-v-parole`, `data-v-simboli` |
| 13.17 | Tabulas kārtošana | `data-v-kartot` |
| 13.18 | Meklēšana un filtrēšana | `data-v-meklet` |
| 13.19 | Lasīšanas progress | `data-v-lasisanas-progress` |

### 13.1 Modālais logs

```html
<button class="poga poga--pamata" data-v-logs="#manslogs">Atvērt</button>

<div class="aizkars" id="manslogs" aria-hidden="true">
  <div class="logs">
    <div class="logs__galvene">
      Virsraksts
      <button class="aizvērt-poga" data-v-aizvert aria-label="Aizvērt">&times;</button>
    </div>
    <div class="logs__saturs">Saturs</div>
    <div class="logs__kājene">
      <button class="poga poga--klusā" data-v-aizvert>Atcelt</button>
      <button class="poga poga--pamata" data-v-aizvert>Labi</button>
    </div>
  </div>
</div>
```

- `data-v-logs="#id"` uz jebkura elementa atver logu.
- `data-v-aizvert` uz pogas to aizver. Aizveras arī ar **Esc** un klikšķi uz tumšā fona.
- `data-v-statisks` uz `.aizkars` aizliedz aizvēršanu ar fona klikšķi (labi apstiprinājumiem).
- Izmēri: `logs--mazs` (380px), `logs--liels` (860px).
- Fokuss paliek logā un pēc aizvēršanas atgriežas pie pogas. Lapa fonā neritinās.
- Dažus logus vari atvērt vienlaikus, Esc aizver pēdējo.

### 13.2 Nolaižamā izvēlne

```html
<div class="nolaižamais">
  <button class="poga poga--pamata" data-v-nolaist aria-haspopup="true" aria-expanded="false">Darbības ▾</button>
  <div class="nolaižamais__izvēlne">
    <a href="#">Rediģēt</a>
    <button>Dublēt</button>
    <div class="nolaižamais__dalītājs"></div>
    <button data-v-logs="#dzest">Dzēst…</button>
  </div>
</div>
```

Aizveras ar klikšķi ārpusē, uz izvēlnes vienumu vai ar **Esc**. Pievieno `data-v-paturet` vienumam, ja izvēlnei
jāpaliek atvērtai. `nolaižamais--pa-labi` pielīdzina izvēlni labajai malai.

### 13.3 Cilnes

```html
<div data-v-cilnes>
  <div class="cilnes__saraksts">
    <button class="cilne aktīvs" data-v-cilne="#c1">Pārskats</button>
    <button class="cilne" data-v-cilne="#c2">Iestatījumi</button>
  </div>
  <div class="cilnes__panelis" id="c1">Pirmās cilnes saturs</div>
  <div class="cilnes__panelis" id="c2">Otrās cilnes saturs</div>
</div>
```

Sākumā aktīva ir cilne ar klasi `aktīvs` (vai pirmā). Darbojas arī ar bultiņu taustiņiem ←/→, **Home** un **End**.

### 13.4 Akordeons

```html
<div class="akordeons" data-v-akordeons data-v-viens>
  <div class="akordeons__vienība akordeons__vienība--atvērta">
    <button class="akordeons__poga" data-v-akordeons-poga>Jautājums 1</button>
    <div class="sakļaujams"><div class="sakļaujams__iekša">
      <div class="akordeons__saturs">Atbilde 1</div>
    </div></div>
  </div>
  <div class="akordeons__vienība">
    <button class="akordeons__poga" data-v-akordeons-poga>Jautājums 2</button>
    <div class="sakļaujams"><div class="sakļaujams__iekša">
      <div class="akordeons__saturs">Atbilde 2</div>
    </div></div>
  </div>
</div>
```

- `data-v-viens` — vienlaikus var būt atvērta tikai viena vienība. Bez tā var atvērt vairākas.
- Atvērta no sākuma: klase `akordeons__vienība--atvērta`.
- Ieliktā `.sakļaujams > .sakļaujams__iekša` struktūra ir vajadzīga plūstošai animācijai.

### 13.5 Sakļaujams bloks

```html
<button class="poga poga--kontūra" data-v-saklaut="#vairak" aria-expanded="false">Rādīt vairāk</button>
<div class="sakļaujams" id="vairak">
  <div class="sakļaujams__iekša"><p>Slēptais saturs.</p></div>
</div>
```

### 13.6 Sānpanelis

```html
<button class="poga" data-v-sanpanelis="#panelis">☰ Izvēlne</button>

<aside class="sānpanelis" id="panelis">
  <button class="aizvērt-poga" data-v-aizvert aria-label="Aizvērt">&times;</button>
  <nav class="kaudze"><a href="#">Sākums</a><a href="#">Par mums</a></nav>
</aside>
```

Pēc noklusējuma panelis ir kreisajā pusē. `sānpanelis--pa-labi` pārliek to uz labo. Aizveras ar tumšo fonu, `Esc`
vai `data-v-aizvert`.

### 13.7 Paziņojumi (toast)

```html
<button data-v-pazinojums="Saglabāts!" data-v-veids="labi">Saglabāt</button>
<button data-v-pazinojums="Kļūda!" data-v-veids="briesmas" data-v-ilgums="0">Kļūda (paliek)</button>
```

| Atribūts | Vērtības |
|---|---|
| `data-v-pazinojums` | Teksts |
| `data-v-veids` | `info` (noklusējums), `labi`, `uzmanies`, `briesmas` |
| `data-v-ilgums` | Milisekundes (noklusējums `4000`); `0` = neaizveras pats |

Paziņojums parādās ekrāna augšējā labajā stūrī. Tekstu ievieto droši (kā tekstu, nevis kā HTML).

### 13.8 Rīka padoms

```html
<button class="poga" data-v-padoms="Saglabā izmaiņas">Saglabāt</button>
<button class="poga" data-v-padoms="Zem pogas" data-v-vieta="apaksa">Zem</button>
```

`data-v-vieta`: `augsa` (noklusējums), `apaksa`, `kreisi`, `labi`. Tas ir tīrs CSS, tāpēc strādā arī bez JS.
Rādās uz peles uzbraukšanu un uz tastatūras fokusu. Neliec uz elementiem ar `overflow:hidden`, tur padoms tiks nogriezts.

### 13.9 Karuselis

```html
<div class="karuselis" data-v-karuselis data-v-auto="4000">
  <div class="karuselis__josla">
    <div class="karuselis__slaids"><img src="1.jpg" alt=""></div>
    <div class="karuselis__slaids"><img src="2.jpg" alt=""></div>
    <div class="karuselis__slaids"><img src="3.jpg" alt=""></div>
  </div>
  <button class="karuselis__iepr" data-v-iepriekseja aria-label="Iepriekšējais">‹</button>
  <button class="karuselis__nak" data-v-nakama aria-label="Nākamais">›</button>
  <div class="karuselis__punkti"></div>
</div>
```

- `data-v-auto="4000"` — automātiska maiņa ik pēc 4 sekundēm (neobligāts). Apstājas, kad uzbrauc ar peli.
  Neieslēdzas, ja lietotājs sistēmā izvēlējies „samazināt kustību”.
- Punkti tiek izveidoti automātiski. Telefonā var pavilkt ar pirkstu.

### 13.10 Kopēt starpliktuvē

```html
<code id="komanda">npm install vitaly-css</code>
<button data-v-kopet="#komanda">Kopēt</button>

<button data-v-kopet="https://piemers.lv" data-v-kopets="Saite nokopēta ✓">Kopēt saiti</button>
```

Vērtība var būt elementa `#id` (nokopē tā tekstu vai `value`) vai tiešs teksts. Pēc kopēšanas poga uz brīdi parāda
`data-v-kopets` tekstu (noklusējums „Nokopēts!”). Uz `https://` un `localhost` tiek izmantota moderna starpliktuves metode, uz parastas `http://` lapas — rezerves metode.

### 13.11 Tēmas pārslēgs, „uz augšu”, gluda ritināšana

```html
<button data-v-tema>◐ Tēma</button>

<a href="#kontakti" data-v-ritinat="#kontakti">Uz kontaktiem</a>
<a href="#kontakti" data-v-ritinat="#kontakti" data-v-nobide="100">Ar lielāku atkāpi</a>

<button class="uz-augšu" data-v-uz-augsu aria-label="Uz augšu">↑</button>
```

- `data-v-nobide` — pikseļi, cik atkāpties no augšas (noklusējums 72, lai neparādītos zem lipīgās joslas).
- `.uz-augšu` poga parādās, kad lapa ir nolaista vairāk nekā 400px.

### 13.12 Scrollspy

```html
<ul class="saraksts-nav" data-v-spiegs>
  <li><a href="#sakums">Sākums</a></li>
  <li><a href="#cenas">Cenas</a></li>
</ul>
```

Saitei, kuras sadaļa ir redzama, tiek pievienota klase `aktīvs`. Katrai saitei `href` jāsakrīt ar sadaļas `id`.

### 13.13 Skaitļu animācija

```html
<span data-v-skaititajs="1250">0</span>
<span data-v-skaititajs="4.6" data-v-sufikss=" KB">0</span>
<span data-v-skaititajs="99" data-v-prefikss="€" data-v-ilgums="2500">0</span>
```

Skaitlis „saskrien” no nulles, kad elements parādās ekrānā. Formāts: latviešu (`1 250`, `4,6`).

### 13.14 Parādīšanās ritinot

```html
<div data-v-paradit>Parādās uz augšu</div>
<div data-v-paradit="kreisi">No kreisās</div>
<div data-v-paradit="labi" data-v-kave="200">No labās ar 200ms kavēšanos</div>
<div data-v-paradit="pieaugt">Pieaug</div>
```

Ja JavaScript nedarbojas, saturs paliek redzams.

### 13.15 Slinkā ielāde un attēlu palielinājums

```html
<img alt="Apraksts" width="400" height="260" data-v-slinks="liels-attels.jpg">

<img src="mazs.jpg" alt="Kaķis" data-v-gaisma>                       <!-- palielina pašu attēlu -->
<img src="mazs.jpg" alt="Kaķis" data-v-gaisma="liels.jpg">           <!-- palielina citu failu -->
<a href="liels.jpg" data-v-gaisma><img src="mazs.jpg" alt=""></a>    <!-- saite uz lielo attēlu -->
```

`data-v-slinks` ielādē attēlu tikai tad, kad tas tuvojas redzamajai zonai. Vienmēr norādi `width` un `height`, lai
lapa neizlēktu ielādes laikā. Palielinājumu aizver klikšķis vai **Esc**.

### 13.16 Parole un rakstzīmju skaitītājs

```html
<div class="ievades-grupa">
  <input id="pw" class="ievade" type="password">
  <button type="button" class="ievades-grupa__poga" data-v-parole="#pw">Rādīt</button>
</div>

<textarea class="ievade" maxlength="200" data-v-simboli="#sk"></textarea>
<span id="sk" class="palīgteksts"></span>   <!-- parādīs "17 / 200" -->
```

Pogas teksti maināmi: `data-v-radit="Rādīt"` un `data-v-slept="Slēpt"`.

### 13.17 Tabulas kārtošana

```html
<table class="tabula" data-v-kartot>…</table>
```

Klikšķis uz `<th>` kārto pēc kolonnas, otrs klikšķis apgriež secību. Skaitļi tiek kārtoti kā skaitļi (arī ar
atstarpēm: `605 802`), teksts pēc latviešu alfabēta.

### 13.18 Meklēšana un filtrēšana

```html
<input class="ievade" type="search" data-v-meklet="#saraksts" placeholder="Meklēt…">

<ul id="saraksts"><li>Rīga</li><li>Liepāja</li><li>Jūrmala</li></ul>
<!-- vai tabula: <table id="saraksts">…</table> -->
```

Meklē tūlīt rakstot un **neņem vērā garumzīmes**: „riga” atradīs „Rīga”, „jurmala” atradīs „Jūrmala”.
Slēpj `<li>` vai tabulas rindas, kas neatbilst.

### 13.19 Lasīšanas progress

```html
<div class="lasīšanas-josla" data-v-lasisanas-progress></div>
```

Plāna josla lapas augšā, kas aug, lapu ritinot.

---

## 14. JavaScript API un notikumi

Ja tomēr vajag rīkoties no koda, ir globāls objekts `Vitaly`:

```js
Vitaly.pazinot('Sveiki!', { veids: 'labi', ilgums: 3000 });  // toast
Vitaly.atvertLogu('#manslogs');
Vitaly.aizvertLogu('#manslogs');
Vitaly.atvertPaneli('#panelis');
Vitaly.parslegtTemu();
```

**Notikumi** (burbuļo uz augšu, tāpēc klausīties var uz `document`):

| Notikums | Kad | `e.detail` |
|---|---|---|
| `v:atverts` | Atvērts logs, panelis, akordeons, sakļaujams bloks | — |
| `v:aizverts` | Aizvērts tas pats | — |
| `v:cilne` | Nomainīta cilne | `{ poga }` |
| `v:tema` | Nomainīta tēma | `{ tema: 'tumša' \| 'gaiša' }` |

```js
document.addEventListener('v:atverts', e => console.log('Atvērts:', e.target.id));
document.addEventListener('v:tema', e => console.log('Tēma:', e.detail.tema));
```

---

## 15. Palīgklases

| Grupa | Klases |
|---|---|
| Fons | `.fons--pamata`, `.fons--akcents`, `.fons--klusums`, `.fons--kartes` |
| Izmēri | `.pilna-platuma`, `.pilna-augstuma`, `.aug-aptvert` (`flex:1`), `.aug-fiksēt` |
| Pārplūde | `.pārplūde-slēpta` |
| Redzamība | `.slēpts`, `.neredzams`, `.caurspīdīgs`, `.slēpt-mob`, `.slēpt-gald` |
| Ielāde | `.grieznis` (rotējošs indikators) |
| Progress | `.progresa-josla > span` (iestati `style="width:60%"`) |

```html
<div class="progresa-josla"><span style="width:60%"></span></div>
<div class="rinda rinda--centrā"><div class="grieznis"></div> Ielādē…</div>
```

---

## 16. Pieejamība

Ietvars ir veidots tā, lai pamatlietas strādātu bez papildu darba:

- Redzami fokusa rāmji (`:focus-visible`) uz visiem elementiem.
- Modālajos logos fokuss „ieslēdzas” logā; `Esc` aizver; fokuss atgriežas pēc aizvēršanas.
- Cilnēm un akordeoniem tiek uzstādīti `aria-*` atribūti un darbojas bultiņu taustiņi.
- Ja lietotājs sistēmā ieslēdzis „samazināt kustību”, animācijas tiek praktiski izslēgtas un automātiskais karuselis neiet.
- Paziņojumiem ir `role="status"` un `aria-live`.

**Kas jādara tev:**

- Katrai pogai ar ikonu bez teksta pievieno `aria-label`.
- Attēliem raksti jēgpilnu `alt`.
- Neraksti informāciju tikai ar krāsu (blakus sarkanai kļūdai liec arī tekstu).
- Pārbaudi kontrastu, ja maini krāsas. Tekstam vēlams vismaz 4,5:1 (ar [contrast-ratio.com](https://contrast-ratio.com)).

---

## 17. Biežākās problēmas

**Komponents nereaģē.**
Pārbaudi, vai `vitaly.min.js` ir pieslēgts (ideāli pirms `</body>`) un vai konsolē (F12) nav kļūdu. Pārbaudi arī,
vai atribūtā norādītais `#id` tiešām eksistē un sakrīt.

**Logs vai panelis ir redzams jau no sākuma, vai izskatās salauzts.**
Pārbaudi, vai ir pieslēgts `vitaly-js.css` (vai `vitaly.all.css`, kas to jau satur).

**Mani krāsu iestatījumi nedarbojas.**
Tavs `<style>` vai CSS fails jāpieslēdz **pēc** VitalyCSS. Ja tēmu pārslēdzējs uzliek savas neitrālās krāsas, skat. 4. sadaļu.

**Telefonā viss izskatās sīks.**
Trūkst `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

**Rīka padoms ir nogriezts.**
Vecāks elements ar `overflow:hidden`. Pārvieto padomu uz citu elementu vai maini vecāka `overflow`.

**Tēma uz mirkli „nomirgo” lapas ielādē.**
Pārliecinies, ka saglabātā tēma tiek uzlikta pēc iespējas ātrāk: ielādē `vitaly.min.js` lapas `<head>` ar
`<script src="vitaly.min.js"></script>` (bez `defer`). Komponenti tiks inicializēti, kad lapa būs ielādēta.

**Vecs pārlūks.**
Ietvars izmanto mūsdienu CSS (`color-mix()`, `grid-template-rows` animācijas, CSS mainīgie), tāpēc vajadzīgi
aptuveni 2023. gada un jaunāki pārlūki.

---

## 18. Būvēšana un izstrāde

Avota faili ir mapē `src/`. Tos labo, tad uzbūvē `dist/`:

```bash
npm install
npm run build
```

Skripts `build.js` nokopē failus, izveido `.min` versijas (ar esbuild) un apvieno `vitaly.all.css`.

Jaunas versijas izlaišana:

```bash
npm version patch        # 1.0.0 → 1.0.1 (vai minor / major)
npm publish
git push --follow-tags
```

Pēc tam jaunā versija automātiski parādās jsDelivr un (ja ietvars ir pieņemts) cdnjs. Detaļas: [CDNJS.md](CDNJS.md).
