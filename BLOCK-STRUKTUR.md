# 📦 Finale Block-Struktur - Lichtsensor Extension

## ✅ SICHTBARE BLÖCKE (6 Stück)

### 📍 Ereignisse (Weight: 100)

```typescript
// 1. wenn Licht dunkel
lichtsensor.wennLichtWechselt(LichtZustand.Dunkel, function() {
    // Code hier
})

// 2. wenn Licht hell
lichtsensor.wennLichtWechselt(LichtZustand.Hell, function() {
    // Code hier
})
```

---

### ⚙️ Konfiguration & Messwerte (Weight: 95-90)

```typescript
// 3. setze Referenzlicht [180] ⊕ Abstand [10]
lichtsensor.setzeReferenzlicht(180)        // Abstand standardmäßig 10
lichtsensor.setzeReferenzlicht(180, 20)    // Mit individuellem Abstand

// 4. Lichtwert
let wert = lichtsensor.lichtwert()         // Gibt 0-255 zurück
```

**Block-Darstellung:**
```
┌─────────────────────────────┐
│ setze Referenzlicht [180] ⊕ │  ← Plus-Zeichen zum Aufklappen
└─────────────────────────────┘

┌─────────────────────────────┐
│ setze Referenzlicht [180] ⊖ │  ← Aufgeklappt
│   Abstand [10]              │
└─────────────────────────────┘
```

---

### ❓ Bedingungen (Weight: 85-84)

```typescript
// 5. ist dunkel
if (lichtsensor.istDunkel()) {
    // Code hier
}

// 6. ist hell
if (lichtsensor.istHell()) {
    // Code hier
}
```

---

## 🔧 ERWEITERTE BLÖCKE (unter "Mehr...")

### Für Fortgeschrittene (Weight: 85-80, advanced=true)

```typescript
// 7. setze Lichtschwellen dunkel [50] hell [150]
lichtsensor.setzeLichtschwellen(50, 150)

// 8. setze [dunkel/hell] Schwellenwert auf [100]
lichtsensor.setzeSchwellenwert(LichtZustand.Dunkel, 50)
lichtsensor.setzeSchwellenwert(LichtZustand.Hell, 150)
```

---

## 🎯 Block-Sortierung (Weight-System)

| Block | Weight | Sichtbarkeit |
|-------|--------|--------------|
| `wenn Licht dunkel/hell` | 100 | ⭐ Oben (Ereignisse) |
| `setze Referenzlicht` | 95 | ⭐ Hauptblock |
| `Lichtwert` | 90 | ⭐ Messwert |
| `ist dunkel` | 85 | ⭐ Bedingung |
| `ist hell` | 84 | ⭐ Bedingung |
| `setzeLichtschwellen` | 85 | 🔧 Erweitert |
| `setzeSchwellenwert` | 80 | 🔧 Erweitert |

**Höherer Weight = weiter oben in der Toolbox**

---

## 📋 Vergleich: Alt vs. Neu

### ❌ ALTE VERSION (zu komplex)
```blocks
// 3 Blöcke nötig!
lichtsensor.setzeSchwellenwert(LichtZustand.Dunkel, 50)
lichtsensor.setzeSchwellenwert(LichtZustand.Hell, 150)
// ODER
lichtsensor.setzeLichtschwellen(50, 150)
```

### ✅ NEUE VERSION (einfach & didaktisch)
```blocks
// 1 Block reicht!
lichtsensor.setzeReferenzlicht(180)

// Optional: Abstand anpassen
lichtsensor.setzeReferenzlicht(180, 20)
```

---

## 💡 Warum diese Struktur?

### Vorteile des Referenzwert-Ansatzes OHNE Hysterese

1. **Didaktisch wertvoll** ⭐⭐⭐
   - Schüler erleben das **Flackern-Problem** selbst
   - Sie verstehen WARUM Hysterese wichtig ist
   - Problem-based Learning: Problem → Erkenntnis → Lösung

2. **Schülerzentriert**
   - Schüler messen selbst
   - Direkter Bezug zur Realität
   - Aktive Auseinandersetzung

3. **Fachlich korrekt**
   - "Referenzwert" ist echter Fachbegriff
   - Kalibrierung wird praktisch erlebt
   - Messtechnik-Grundlagen werden vermittelt

4. **Einfacher zu verstehen**
   - Nur 1 Wert eingeben (statt 2)
   - Automatische Berechnung
   - Klare Regel: ≤ Schwellenwert = dunkel

5. **Flexibel**
   - Standardwert (Abstand 10) funktioniert
   - Fortgeschrittene können Experten-Blöcke nutzen
   - Alte Blöcke bleiben für Hysterese verfügbar

### Das "Flackern" ist GEWOLLT! 💡

**Ohne Flackern kein Lernen:**
- Schüler erleben das Problem → Verstehen die Notwendigkeit
- Dann nutzen sie Experten-Blöcke → Lösen das Problem selbst
- Klassisches didaktisches Prinzip: "Problem → Lösung"

---

## 🎓 Typischer Ablauf im Unterricht

```
1️⃣ MESSEN
   → Schüler nutzen "Lichtwert"-Block
   → Notieren: z.B. 180

2️⃣ KALIBRIEREN
   → "setze Referenzlicht 180"
   → Calliope berechnet: Schwellenwert = 170

3️⃣ PROGRAMMIEREN
   → "wenn Licht dunkel" → Aktion
   → "wenn Licht hell" → Aktion

4️⃣ TESTEN
   → Hand über Sensor
   → ⚠️ Bei Schwellenwert: FLACKERN!

5️⃣ PROBLEM ERKENNEN
   → "Warum wechselt es ständig?"
   → Diskussion über Ursache

6️⃣ HYSTERESE LERNEN
   → Fachbegriff einführen
   → Experten-Blöcke zeigen
   → Problem gelöst!

7️⃣ EXPERIMENTIEREN (Optional)
   → Mit Hysterese arbeiten
   → Unterschiede verstehen
```

---

## 🔍 Technische Details

### Parameter-Konfiguration

```typescript
/**
 * @param referenz der gemessene Referenzwert für helles Licht (0-255)
 * @param abstand wie viel dunkler es werden muss für "dunkel" (Standard: 10)
 */
//% block="setze Referenzlicht $referenz || Abstand $abstand"
//% referenz.min=0 referenz.max=255 referenz.defl=150
//% abstand.min=1 abstand.max=100 abstand.defl=10
//% expandableArgumentMode="toggle"
export function setzeReferenzlicht(referenz: number, abstand: number = 10): void
```

**Wichtige Attribute:**
- `||` = Alles danach ist optional (mit Plus-Zeichen)
- `expandableArgumentMode="toggle"` = Klappbar
- `abstand.defl=10` = Standardwert 10
- `abstand: number = 10` = TypeScript Default-Parameter

### Interne Berechnung

```typescript
schwelleHell = referenz;              // z.B. 180
schwelleDunkel = referenz - abstand;  // z.B. 180 - 10 = 170

// Sicherheit: Dunkel-Schwelle nicht negativ
if (schwelleDunkel < 0) {
    schwelleDunkel = 0;
}
```

---

## ✨ Zusammenfassung

**Hauptblock für Examensstunde:**
```
setze Referenzlicht [180] ⊕
```

**Eigenschaften:**
- ✅ Einfach zu bedienen
- ✅ Fachbegriff "Referenzwert"
- ✅ Automatische Hysterese
- ✅ Optional erweiterbar
- ✅ Didaktisch optimiert
- ✅ B1-Niveau geeignet

**Alle anderen Blöcke:**
- Bleiben funktionsfähig
- Versteckt unter "Mehr..."
- Für Fortgeschrittene verfügbar
- Rückwärtskompatibel

---

**Die Extension ist jetzt perfekt für deine Examensstunde! 🎉**
