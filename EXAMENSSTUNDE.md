# 🎓 Lichtsensor Extension - Für die Examensstunde

## 🎯 Didaktisches Konzept

### Lernziele
1. **Messtechnik-Fachbegriff:** Referenzwert kennenlernen und anwenden
2. **Sensorik verstehen:** Wie funktioniert ein Lichtsensor?
3. **Event-Programmierung:** Asynchrone Ereignisse nutzen
4. **Schwellenwerte:** Hysterese praktisch erleben

---

## 📝 Aufgabenstellung für Schüler

### Phase 1: Messen (5-10 Min)
**Aufgabe:** "Messt das aktuelle Licht in eurem Klassenraum!"

```blocks
basic.forever(function () {
    basic.showNumber(lichtsensor.lichtwert())
})
```

**Schüler notieren:** z.B. 180

---

### Phase 2: Kalibrieren (5 Min)
**Aufgabe:** "Gebt euren gemessenen Wert als **Referenzlicht** ein!"

```blocks
lichtsensor.setzeReferenzlicht(180)
```

**Erklärung für Schüler:**
> Der **Referenzwert** ist das normale Licht, das ihr gerade gemessen habt. Das ist euer "Hell"-Wert. Der Calliope merkt sich: "Wenn es 10 Stufen dunkler wird, ist es dunkel!"

**Fachbegriff einführen:**
- **Referenzwert** = Ausgangswert zum Vergleichen (aus der Messtechnik)
- In der Industrie nutzt man Referenzwerte um Sensoren zu kalibrieren

---

### Phase 3: Event-Handler (10 Min)
**Aufgabe:** "Programmiert: Was soll passieren wenn es dunkel/hell wird?"

```blocks
lichtsensor.wennLichtWechselt(LichtZustand.Dunkel, function () {
    basic.showIcon(IconNames.No)
})

lichtsensor.wennLichtWechselt(LichtZustand.Hell, function () {
    basic.showIcon(IconNames.Yes)
})
```

---

### Phase 4: Testen (10 Min)
**Aufgabe:** "Testet euren Lichtsensor!"

**Testmethoden:**
- Hand über den Sensor halten
- Sensor unter den Tisch
- Taschenlampe draufleuchten
- **Langsam die Hand nähern/entfernen**

**Beobachtung:**
- Ab wann schaltet "dunkel"? → Bei Schwellenwert (z.B. 170)
- Ab wann schaltet zurück auf "hell"? → Bei Schwellenwert + 1 (z.B. 171)
- ⚠️ **Was passiert wenn Licht genau am Schwellenwert ist?** → FLACKERN!

**Didaktisches Ziel:**
Die Schüler sollen das **Flackern-Problem** selbst entdecken! 💡

---

### Phase 5: Problem erkennen & Hysterese verstehen (10 Min)

**Beobachtung gemeinsam besprechen:**
> "Was ist euch aufgefallen wenn das Licht genau bei 170 liegt?"
> → Antwort: "Es wechselt ständig zwischen dunkel und hell!"

**Problem verdeutlichen:**
```
Lichtwert: 169 → 171 → 170 → 171 → 170
           ↓     ↓     ↓     ↓     ↓
Zustand:   dunkel hell dunkel hell dunkel
```

**Fachbegriff einführen: HYSTERESE**

> "Damit das nicht passiert, brauchen wir einen **Puffer** zwischen den beiden Zuständen. Das nennt man **Hysterese**!"

**Lösung zeigen (Experten-Blöcke):**

```blocks
// OHNE Hysterese (einfacher Block):
lichtsensor.setzeReferenzlicht(180)
// Schwellenwert = 170
// ≤170 dunkel, >170 hell → FLACKERT!

// MIT Hysterese (Experten-Block):
lichtsensor.setzeLichtschwellen(170, 180)
// ≤170 dunkel, ≥180 hell
// 171-179 → Keine Änderung! → STABIL!
```

---

### Phase 6: Experimentieren mit Hysterese (Optional, 10 Min)
**Aufgabe:** "Ändert den Abstand und testet was passiert!"

```blocks
// Sehr empfindlich (Abstand 5)
lichtsensor.setzeReferenzlicht(180, 5)

// Normal (Abstand 10) - Standard
lichtsensor.setzeReferenzlicht(180, 10)

// Weniger empfindlich (Abstand 30)
lichtsensor.setzeReferenzlicht(180, 30)
```

**Diskussion:**
- Welcher Abstand funktioniert am besten?
- Warum gibt es die Hysterese?
- Was passiert ohne Hysterese?

---

## 🎨 Block-Übersicht für Schüler

### Sichtbare Blöcke (6 Stück)

```
┌─────────────────────────────────────┐
│ 📍 EREIGNISSE                        │
│   • wenn Licht dunkel               │
│   • wenn Licht hell                 │
│                                     │
│ ⚙️ KONFIGURATION                     │
│   • setze Referenzlicht [180] ⊕     │
│     └─ Abstand [10] (optional)      │
│   • Lichtwert                       │
│                                     │
│ ❓ BEDINGUNGEN                       │
│   • ist dunkel                      │
│   • ist hell                        │
└─────────────────────────────────────┘
```

**Nicht verwirren:** Fortgeschrittene Blöcke sind unter "Mehr..." versteckt!

---

## 💡 Tipps für die Durchführung

### Vorbereitung
- ✅ Extension vorher selbst testen
- ✅ Batterien im Calliope prüfen
- ✅ Raumbeleuchtung konstant halten
- ✅ Beispielwerte für verschiedene Lichtsituationen kennen

### Typische Messwerte
| Situation | Lichtwert |
|-----------|-----------|
| Direktes Sonnenlicht | 220-255 |
| Heller Klassenraum | 150-200 |
| Normaler Klassenraum | 80-150 |
| Schatten/Hand drüber | 30-80 |
| Sehr dunkel | 0-30 |

### Häufige Schülerfragen

**"Warum wechselt es die ganze Zeit hin und her?"**
→ Perfekt! Das ist genau das Problem, das wir lösen wollen. Das nennt man **Flackern**. Dafür gibt es die **Hysterese**!

**"Warum nicht einfach einen Wert für hell und einen für dunkel?"**
→ Genau so macht man es! Das sind die Experten-Blöcke unter "Mehr...". Mit dem einfachen Block lernt ihr erst das Problem kennen.

**"Was ist dieser Abstand?"**
→ Der Abstand berechnet den **Schwellenwert**. Bei Referenz 180 und Abstand 10 ist der Schwellenwert 170. Alles ≤170 ist dunkel, >170 ist hell.

**"Warum steht da ein Plus-Zeichen?"**
→ Das bedeutet: Der Abstand ist **optional**. Standardmäßig ist er 10. Ihr könnt ihn ändern wenn ihr wollt!

**"Wie stoppe ich das Flackern?"**
→ Mit den Experten-Blöcken unter "Mehr..."! Dort könnt ihr zwei unterschiedliche Schwellenwerte einstellen - das macht eine **Hysterese**.

---

## 🔍 Fachbegriffe für die Stunde

| Begriff | Erklärung (B1-Niveau) |
|---------|------------------------|
| **Referenzwert** | Ein Wert zum Vergleichen. Wie eine Messlatte. |
| **Kalibrieren** | Den Sensor einstellen/anpassen. |
| **Sensor** | Ein Gerät das etwas misst (hier: Licht). |
| **Schwellenwert** | Eine Grenze. Ab diesem Wert passiert etwas. |
| **Hysterese** | Der Abstand zwischen zwei Schwellenwerten. Verhindert schnelles Hin-und-Her. |
| **Event** | Ein Ereignis. Wenn etwas passiert, wird Code ausgeführt. |

---

## 📊 Bewertungskriterien

### Inhaltlich
- ✅ Lichtwert korrekt gemessen
- ✅ Referenzwert eingetragen
- ✅ Event-Handler programmiert
- ✅ Funktioniert beim Testen
- ✅ Fachbegriff "Referenzwert" verwendet
- ⭐ **Flackern-Problem erkannt**
- ⭐ **Hysterese verstanden**

### Prozess
- ✅ Systematisches Vorgehen
- ✅ Fehlersuche bei Problemen
- ✅ Experimentierfreude
- ✅ Dokumentation der Werte
- ⭐ **Problem-Lösungs-Kompetenz**

---

## 🎓 Weiterführende Fragen

**Für schnelle Schüler:**
1. **Warum flackert der Sensor am Schwellenwert?** → Lichtwert springt hin und her
2. **Wie kann man das Flackern vermeiden?** → Zwei unterschiedliche Schwellenwerte (Hysterese)
3. **Was ist der Vorteil von Hysterese?** → Stabileres Schaltverhalten
4. **Wo wird Hysterese noch verwendet?** → Thermostate, Türöffner, Alarmanlagen...
5. Was ist der Unterschied zwischen "ist dunkel" (Bedingung) und "wenn Licht dunkel" (Event)?
6. Wie könnte man einen Dämmerungsschalter bauen?

---

## ✅ Checkliste Unterrichtsvorbereitung

- [ ] Extension getestet
- [ ] Beispielprogramm funktioniert
- [ ] Messwerte im Klassenraum getestet
- [ ] Arbeitsblatt vorbereitet
- [ ] Fachbegriffe an Tafel
- [ ] Sozialform festgelegt (Einzel/Partner)
- [ ] Zeitplan steht
- [ ] Differenzierung überlegt

---

**Viel Erfolg bei der Examensstunde! 🚀**
