# 🐛 Bug-Fix: Universelle Polling-Logik

## Problem

Die ursprüngliche Polling-Logik funktionierte nur wenn `schwelleHell == schwelleDunkel` (ohne Hysterese):

```typescript
// ALTE LOGIK (fehlerhaft):
if (level <= schwelleDunkel) {
    aktuellerZustand = LichtZustand.Dunkel;
} else {
    aktuellerZustand = LichtZustand.Hell;  // ← Immer Hell wenn nicht dunkel!
}
```

### Szenario das nicht funktionierte:

```blocks
1. setze Referenzlicht 180         // schwelleHell = schwelleDunkel = 170
2. setze Lichtschwellen 50 hell 150  // schwelleDunkel = 50, schwelleHell = 150
```

**Bei Lichtwert 100:**
- ≤ 50? Nein
- else → **Hell!** ❌
- **Problem:** 100 liegt im Hysterese-Bereich (50-150)!

---

## Lösung

Neue universelle Logik die mit und ohne Hysterese funktioniert:

```typescript
// NEUE LOGIK (korrekt):
if (level <= schwelleDunkel) {
    aktuellerZustand = LichtZustand.Dunkel;
} else if (level >= schwelleHell) {
    aktuellerZustand = LichtZustand.Hell;
}
// Sonst: aktuellerZustand bleibt null → kein Event
```

### Funktioniert in beiden Modi:

**OHNE Hysterese (schwelleHell == schwelleDunkel = 170):**
```
Lichtwert 169:
  → ≤ 170? Ja → Dunkel ✅
  
Lichtwert 171:
  → ≤ 170? Nein
  → ≥ 170? Ja → Hell ✅
  
Lichtwert 170:
  → ≤ 170? Ja → Dunkel ✅
  → Flackert bei 170/171! (gewollt)
```

**MIT Hysterese (schwelleDunkel = 50, schwelleHell = 150):**
```
Lichtwert 40:
  → ≤ 50? Ja → Dunkel ✅
  
Lichtwert 160:
  → ≤ 50? Nein
  → ≥ 150? Ja → Hell ✅
  
Lichtwert 100:
  → ≤ 50? Nein
  → ≥ 150? Nein
  → null → KEIN Event ✅ (Hysterese!)
```

---

## Warum ist das wichtig?

### Flexibilität im Unterricht

Lehrer können nun:

1. **Start mit einfachem Block:**
   ```blocks
   setze Referenzlicht 180
   ```
   → Schüler erleben Flackern

2. **Dann Hysterese einführen:**
   ```blocks
   setze Lichtschwellen dunkel 170 hell 180
   ```
   → Funktioniert sofort! Keine Neuinitialisierung nötig

3. **Oder umgekehrt:**
   ```blocks
   setze Lichtschwellen dunkel 50 hell 150
   // Später experimentieren:
   setze Referenzlicht 120
   ```
   → Beide Richtungen funktionieren!

---

## Test-Szenarien

### Szenario 1: Einfach → Experte
```typescript
lichtsensor.setzeReferenzlicht(180);           // Schwellenwert 170
// ... Schüler sehen Flackern
lichtsensor.setzeLichtschwellen(170, 180);     // Jetzt mit Hysterese
// ✅ Funktioniert!
```

### Szenario 2: Experte → Einfach
```typescript
lichtsensor.setzeLichtschwellen(50, 150);      // Mit Hysterese
// ... Schüler testen
lichtsensor.setzeReferenzlicht(180);           // Zurück zu einfach
// ✅ Funktioniert!
```

### Szenario 3: Mehrfache Änderungen
```typescript
lichtsensor.setzeReferenzlicht(180);           // 170
lichtsensor.setzeReferenzlicht(150);           // 140
lichtsensor.setzeLichtschwellen(50, 150);      // 50/150
lichtsensor.setzeReferenzlicht(200, 30);       // 170
// ✅ Alle Änderungen funktionieren!
```

---

## Technische Details

### Warum `else if` statt `else`?

**Mit `else if`:**
- Hysterese-Bereich wird erkannt (aktuellerZustand = null)
- Kein Event wird ausgelöst
- System bleibt im letzten Zustand

**Mit `else` (alte Version):**
- Kein Hysterese-Bereich möglich
- Immer entweder dunkel ODER hell
- Funktioniert nur mit identischen Schwellenwerten

### Event-Logik

```typescript
if (aktuellerZustand !== null && 
    aktuellerZustand !== letzterZustand) {
    letzterZustand = aktuellerZustand;
    control.raiseEvent(LICHT_EVENT_ID, aktuellerZustand);
}
```

**Wichtig:** Event nur auslösen wenn:
1. `aktuellerZustand !== null` (nicht im Hysterese-Bereich)
2. `aktuellerZustand !== letzterZustand` (tatsächlich gewechselt)

---

## Zusammenfassung

✅ **Vorher:** Polling funktionierte nur mit einem Schwellenwert
✅ **Jetzt:** Polling funktioniert universell mit und ohne Hysterese
✅ **Ergebnis:** Blöcke können in beliebiger Reihenfolge verwendet werden

**Die Extension ist jetzt robuster und flexibler für den Unterricht! 🎓**
