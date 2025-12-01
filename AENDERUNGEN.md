# ✨ Neue Features und Verbesserungen

## 🎯 Vereinfachter Schwellenwert-Block

### Fachbegriff: **Hysterese**
Der korrekte Fachbegriff für den Bereich zwischen zwei Schwellenwerten ist **Hysterese** (auch Schaltdifferenz oder Differentialweg).

**Weitere Fachbegriffe:**
- **Schaltschwellen** - Obere (hell) und untere (dunkel) Grenzwerte
- **Schmitt-Trigger** - Elektronische Schaltung mit diesem Verhalten
- **Schwellenwertschalter** - Sensor mit Schaltfunktion

**Zweck der Hysterese:**
Vermeidet unerwünschte Mehrfachschaltungen bei Schwankungen um einen Grenzwert.

---

## 🆕 Neuer Block: `setzeLichtschwellen`

**Block-Syntax:**
```blocks
lichtsensor.setzeLichtschwellen(30, 180)
```

**Vorteile:**
- ✅ Setzt beide Schwellenwerte gleichzeitig
- ✅ Übersichtlicher für Schüler
- ✅ Weniger Blöcke notwendig
- ✅ Hysterese-Bereich wird direkt klar

**Der alte Block ist jetzt "Advanced":**
- Versteckt unter "Mehr..." in der Toolbox
- Für Fortgeschrittene, die einzelne Werte ändern möchten

---

## 🎨 Extension-Icon

**Was wurde erstellt:**
- `icon.png` (300×200 Pixel, 7KB)
- Zeigt: Dunkle/Helle Seite + Sensor-Symbol
- Links: Dunkel (Mond-ähnlich)
- Rechts: Hell (Sonne-ähnlich)
- Mitte: Sensor mit Lichtstrahlen

**Wo wird es angezeigt:**
In der Extension-Suche von MakeCode Calliope, wenn Nutzer nach Extensions suchen.

**Technische Anforderungen:**
✅ Format: PNG
✅ Größe: 300×200 Pixel
✅ Dateigröße: Unter 100KB (wir haben 7KB)
✅ Dateiname: `icon.png` im Repository-Root

---

## 📦 Alle Änderungen im Überblick

### Neue Dateien:
- ✅ `icon.png` - Extension-Icon für die Suche

### Geänderte Dateien:
- ✅ `main.ts` - Neuer vereinfachter Block hinzugefügt
- ✅ `README.md` - Dokumentation mit Fachbegriffen erweitert
- ✅ `test.ts` - Beispiel mit neuem Block aktualisiert

### Was bleibt gleich:
- ✅ Alle bisherigen Blöcke funktionieren weiter
- ✅ Alte Projekte bleiben kompatibel
- ✅ API ist rückwärtskompatibel

---

## 🚀 Nächste Schritte

1. **Alle Dateien hochladen** (siehe UPLOAD-ANLEITUNG.md)
2. **In MakeCode testen** mit der URL
3. **Optional:** Genehmigung bei Microsoft beantragen

Die Extension ist jetzt vollständig und bereit für den Upload!
