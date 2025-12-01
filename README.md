# Lichtsensor Events für Calliope mini

> supported by PXT/calliope

Diese Extension erweitert den Calliope mini um Event-basierte Licht-Erkennung mit konfigurierbaren Schwellenwerten.

## Features

- **Event-Handler** für Hell/Dunkel-Wechsel
- **Konfigurierbare Schwellenwerte** (0-255)
- **Hysterese** zur Vermeidung von Flackern
- **Einfache Blöcke** für den Unterricht

## Verwendung

### 1. Lichtwert messen

Zuerst den aktuellen Lichtwert messen:

```blocks
basic.forever(function() {
    basic.showNumber(lichtsensor.lichtwert())
})
```

### 2. Referenzlicht einstellen

Den gemessenen Wert als **Referenzlicht** eingeben. Der Schwellenwert wird automatisch berechnet:

```blocks
// Gemessener Wert z.B. 180
// Schwellenwert wird: 180 - 10 = 170
lichtsensor.setzeReferenzlicht(180)
```

**Optional:** Abstand individuell anpassen (Standard: 10)

```blocks
// Mit größerem Abstand (20 Stufen dunkler)
// Schwellenwert wird: 180 - 20 = 160
lichtsensor.setzeReferenzlicht(180, 20)
```

**Was bedeutet das?**
- **Referenzlicht 180** = Das gemessene helle Licht
- **Abstand 10** = Schwellenwert wird 170
- **≤ 170** = dunkel
- **> 170** = hell

**⚠️ Wichtig:** Dieser Block nutzt **KEINEN Hysterese-Puffer**! Bei Lichtwerten genau am Schwellenwert kann es flackern. Für stabilere Erkennung nutze die Experten-Blöcke unter "Mehr..."!

### 3. Licht-Events registrieren

```blocks
lichtsensor.wennLichtWechselt(LichtZustand.Dunkel, function () {
    basic.showIcon(IconNames.No)
})

lichtsensor.wennLichtWechselt(LichtZustand.Hell, function () {
    basic.showIcon(IconNames.Yes)
})
```

### 4. Lichtwert kontinuierlich anzeigen

```blocks
basic.forever(function () {
    basic.showNumber(lichtsensor.lichtwert())
    basic.pause(1000)
})
```

---

## Blöcke

### 📍 Ereignisse

- **wenn Licht [dunkel/hell]** - Wird ausgeführt bei Zustandswechsel

### ⚙️ Schwellenwerte

- **setze Referenzlicht [Wert]** ⊕ - Setzt Hell-Wert; optional: Abstand (Standard 10)
- **Lichtwert** - Gibt aktuellen Sensor-Wert zurück (0-255)

### ❓ Bedingungen

- **ist dunkel** - Prüft ob Lichtwert unter Dunkel-Schwelle
- **ist hell** - Prüft ob Lichtwert über Hell-Schwelle

### 🔧 Erweitert (unter "Mehr...")

- **setze Lichtschwellen dunkel [Wert] hell [Wert]** - Beide Schwellen manuell
- **setze [dunkel/hell] Schwellenwert auf [Wert]** - Einzelne Schwelle ändern

---

## 📖 Fachbegriffe

| Begriff | Bedeutung |
|---------|-----------|
| **Referenzwert** | Gemessener Ausgangswert zum Vergleichen (Messtechnik) |
| **Hysterese** | Differenz zwischen Ein- und Ausschaltpunkt |
| **Schaltschwellen** | Obere (hell) und untere (dunkel) Grenzwerte |
| **Schwellenwertschalter** | Sensor mit Schaltfunktion bei Grenzwerten |

## Funktionsweise

Die Extension nutzt Background-Polling mit 100ms Intervall. 

### Wie funktioniert der Referenzwert? (Einfacher Block)

Der einfache `setze Referenzlicht`-Block nutzt **EINEN einzelnen Schwellenwert** ohne Hysterese-Puffer:

```
Beispiel: Referenzlicht = 180, Abstand = 10
Schwellenwert = 180 - 10 = 170

┌─────────────────────────────────────┐
│ Lichtwert (0-255)                   │
├─────────────────────────────────────┤
│ 255 ┃                               │
│     ┃  ☀ HELL (> 170)               │
│     ┃                               │
│ 170 ╋━━━━━━━━━━ Schwellenwert       │
│     ┃  🌙 DUNKEL (≤ 170)            │
│     ┃                               │
│   0 ┃                               │
└─────────────────────────────────────┘

≤ 170 → dunkel
> 170 → hell
```

**⚠️ Problem bei Schwankungen:**
```
Lichtwert: 169 → 171 → 170 → 171 → 170
Zustand:   dunkel hell dunkel hell dunkel
           → FLACKERN! 💥
```

### Warum ist das didaktisch sinnvoll?

**Lernziel:** Schüler erleben selbst, warum Hysterese wichtig ist!

1. ✅ Schüler programmieren mit einfachem Block
2. ⚠️ Sie beobachten Flackern bei Grenzwerten
3. 💡 Sie verstehen: "Wir brauchen einen Puffer!"
4. 🔧 Sie nutzen Experten-Blöcke für Hysterese

### Für stabile Licht-Erkennung: Experten-Blöcke nutzen!

Die Experten-Blöcke unter "Mehr..." erlauben **zwei unterschiedliche Schwellenwerte** mit Hysterese:

```
Mit Hysterese (Experten-Block):
┌─────────────────────────────────────┐
│ 180 ╋━━━━━━━━━━ Hell-Schwelle       │
│     ┃ ╔═══════════════════╗         │
│     ┃ ║ HYSTERESE (10)    ║         │
│     ┃ ╚═══════════════════╝         │
│ 170 ╋━━━━━━━━━━ Dunkel-Schwelle     │
└─────────────────────────────────────┘

≤ 170 → dunkel
≥ 180 → hell
171-179 → KEINE ÄNDERUNG (stabil!)
```

**Standard-Werte (Experten-Blöcke):**
- Dunkel: ≤ 50
- Hell: ≥ 150
- **Hysterese-Bereich** (51-149): Keine Zustandsänderung

Dieses Verhalten entspricht einem **Schwellenwertschalter** mit Hysterese (auch **Schmitt-Trigger** genannt) und vermeidet unerwünschte Mehrfachschaltungen.

## Lizenz

MIT

## Unterstützte Targets

* PXT/calliope

---

**Metadata für die Suche**
```package
lichtsensor-events=github:gunst-at-hvh/pxt-lichtsensor-events
```
