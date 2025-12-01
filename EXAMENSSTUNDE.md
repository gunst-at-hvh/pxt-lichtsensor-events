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

**Beobachtung:**
- Ab wann schaltet "dunkel"?
- Ab wann schaltet zurück auf "hell"?
- Was passiert bei mittleren Lichtwerten?

---

### Phase 5: Experimentieren (Optional, 10 Min)
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

**"Warum nicht einfach einen Wert für hell und einen für dunkel?"**
→ Genau das macht man bei manueller Konfiguration (unter "Mehr...")! Aber mit Referenzwert ist es einfacher: Schüler messen einmal und der Calliope rechnet automatisch.

**"Was ist dieser Abstand?"**
→ Das ist die **Hysterese** - wie viel dunkler es werden muss. Ohne Hysterese würde der Sensor bei kleinen Schwankungen ständig hin- und herspringen!

**"Warum steht da ein Plus-Zeichen?"**
→ Das bedeutet: Der Abstand ist **optional**. Standardmäßig ist er 10. Ihr könnt ihn ändern wenn ihr wollt!

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

### Prozess
- ✅ Systematisches Vorgehen
- ✅ Fehlersuche bei Problemen
- ✅ Experimentierfreude
- ✅ Dokumentation der Werte

---

## 🎓 Weiterführende Fragen

**Für schnelle Schüler:**
1. Was passiert wenn Referenzlicht = 10 und Abstand = 20?
2. Kann man auch mehrere Events gleichzeitig auslösen?
3. Wie könnte man einen Dämmerungsschalter bauen?
4. Was ist der Unterschied zwischen "ist dunkel" (Bedingung) und "wenn Licht dunkel" (Event)?

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
