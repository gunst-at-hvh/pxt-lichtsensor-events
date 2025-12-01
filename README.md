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

Den gemessenen Wert als **Referenzlicht** (Hell-Wert) eingeben:

```blocks
// Gemessener Wert z.B. 180
lichtsensor.setzeReferenzlicht(180)
```

**Optional:** Abstand individuell anpassen (Standard: 10)

```blocks
// Mit größerem Abstand (20 Stufen dunkler)
lichtsensor.setzeReferenzlicht(180, 20)
```

**Was bedeutet das?**
- **Referenzlicht 180** = Hell-Schwelle
- **Abstand 10** = Dunkel wird bei 180 - 10 = 170 erkannt
- **Hysterese** = 10 Stufen zwischen Hell und Dunkel

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

Die Extension nutzt Background-Polling mit 100ms Intervall. **Hysterese** (Schaltdifferenz) zwischen den Schwellenwerten verhindert schnelles Hin- und Herspringen bei Grenzwerten.

### Wie funktioniert der Referenzwert?

```
Beispiel: Referenzlicht = 180, Abstand = 10

┌─────────────────────────────────────┐
│ Lichtwert (0-255)                   │
├─────────────────────────────────────┤
│ 255 ┃                               │
│     ┃  ☀ HELL                       │
│ 180 ╋━━━━━━━━━━ Referenzlicht       │
│     ┃                               │
│     ┃ ╔═══════════════════╗         │
│     ┃ ║ HYSTERESE (10)    ║         │
│     ┃ ╚═══════════════════╝         │
│ 170 ╋━━━━━━━━━━ Dunkel-Schwelle     │
│     ┃  🌙 DUNKEL                    │
│   0 ┃                               │
└─────────────────────────────────────┘

Hell-Schwelle  = Referenzlicht = 180
Dunkel-Schwelle = Referenzlicht - Abstand = 170
```

**Standard-Werte:**
- Referenzlicht: 150 (wird von Schülern gemessen)
- Abstand: 10 (optional anpassbar)
- **Hysterese-Bereich**: 10 Stufen

Dieses Verhalten entspricht einem **Schwellenwertschalter** mit Hysterese und vermeidet unerwünschte Mehrfachschaltungen bei Schwankungen um einen Grenzwert.

## Lizenz

MIT

## Unterstützte Targets

* PXT/calliope

---

**Metadata für die Suche**
```package
lichtsensor-events=github:gunst-at-hvh/pxt-lichtsensor-events
```
