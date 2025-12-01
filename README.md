# Lichtsensor Events für Calliope mini

> supported by PXT/calliope

Diese Extension erweitert den Calliope mini um Event-basierte Licht-Erkennung mit konfigurierbaren Schwellenwerten.

## Features

- **Event-Handler** für Hell/Dunkel-Wechsel
- **Konfigurierbare Schwellenwerte** (0-255)
- **Hysterese** zur Vermeidung von Flackern
- **Einfache Blöcke** für den Unterricht

## Verwendung

### Licht-Events registrieren

```blocks
lichtsensor.wennLichtWechselt(LichtZustand.Dunkel, function () {
    basic.showIcon(IconNames.No)
})

lichtsensor.wennLichtWechselt(LichtZustand.Hell, function () {
    basic.showIcon(IconNames.Yes)
})
```

### Schwellenwerte anpassen

```blocks
lichtsensor.setzeSchwellenwert(LichtZustand.Dunkel, 30)
lichtsensor.setzeSchwellenwert(LichtZustand.Hell, 180)
```

### Lichtwert auslesen

```blocks
basic.forever(function () {
    basic.showNumber(lichtsensor.lichtwert())
    basic.pause(1000)
})
```

### Bedingungen prüfen

```blocks
if (lichtsensor.istDunkel()) {
    basic.showIcon(IconNames.Moon)
}

if (lichtsensor.istHell()) {
    basic.showIcon(IconNames.Sun)
}
```

## Blöcke

### Ereignisse

- **wenn Licht [dunkel/hell]** - Wird ausgeführt bei Zustandswechsel

### Schwellenwerte

- **setze [dunkel/hell] Schwellenwert auf [Wert]** - Konfiguriert Grenzwert (0-255)
- **Lichtwert** - Gibt aktuellen Sensor-Wert zurück (0-255)
- **ist dunkel** - Prüft ob Lichtwert unter Dunkel-Schwelle
- **ist hell** - Prüft ob Lichtwert über Hell-Schwelle

## Funktionsweise

Die Extension nutzt Background-Polling mit 100ms Intervall. Hysterese zwischen den Schwellenwerten verhindert schnelles Hin- und Herspringen bei Grenzwerten.

**Standard-Schwellenwerte:**
- Dunkel: ≤ 50
- Hell: ≥ 150
- Zwischen 50-150: Keine Zustandsänderung

## Lizenz

MIT

## Unterstützte Targets

* PXT/calliope

---

**Metadata für die Suche**
```package
lichtsensor-events=github:DEIN-USERNAME/pxt-lichtsensor-events
```
