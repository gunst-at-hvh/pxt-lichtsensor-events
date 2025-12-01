# ✅ FINALE VERSION - Bereit für die Examensstunde!

## 🎯 Was wurde geändert? (Variante A implementiert)

### ⚡ Hauptänderung: KEINE Hysterese im einfachen Block

**Vorher:**
```
setze Referenzlicht 180, Abstand 10
  → Hell-Schwelle: 180
  → Dunkel-Schwelle: 170
  → Hysterese: 10 Stufen zwischen 170-180
```

**Jetzt:**
```
setze Referenzlicht 180, Abstand 10
  → Schwellenwert: 170
  → ≤ 170: dunkel
  → > 170: hell
  → KEINE Hysterese → kann flackern! 💥
```

---

## 🎓 Didaktisches Konzept

### **Warum kein Hysterese-Puffer?**

Das Flackern ist **GEWOLLT**! 🎯

**Lernprozess:**
1. Schüler messen Lichtwert
2. Schüler programmieren mit einfachem Block
3. Schüler testen → **FLACKERN!** 😱
4. Schüler fragen: "Warum?"
5. Gemeinsam Problem analysieren
6. **Fachbegriff "Hysterese" einführen**
7. Experten-Blöcke als Lösung zeigen
8. Schüler: "Aha!" 💡

**Ergebnis:** Problem-based Learning - Schüler verstehen WARUM Hysterese wichtig ist!

---

## 📦 Block-Übersicht

### ⭐ SICHTBAR (6 Blöcke)

| Nr | Block | Funktion |
|----|-------|----------|
| 1 | `wenn Licht dunkel` | Event-Handler |
| 2 | `wenn Licht hell` | Event-Handler |
| 3 | `setze Referenzlicht [180] ⊕` | **Hauptblock** (OHNE Hysterese) |
| 4 | `Lichtwert` | Aktuellen Wert messen |
| 5 | `ist dunkel` | Bedingung prüfen |
| 6 | `ist hell` | Bedingung prüfen |

### 🔧 ERWEITERT (unter "Mehr...")

| Nr | Block | Funktion |
|----|-------|----------|
| 7 | `setze Lichtschwellen dunkel [] hell []` | **MIT Hysterese** |
| 8 | `setze [dunkel/hell] Schwellenwert []` | Einzelwerte ändern |

---

## 🔍 Technische Details

### Code-Änderungen

**setzeReferenzlicht():**
```typescript
export function setzeReferenzlicht(referenz: number, abstand: number = 10): void {
    const schwellenwert = referenz - abstand;
    
    // Beide Schwellen auf DENSELBEN Wert setzen
    schwelleHell = schwellenwert;
    schwelleDunkel = schwellenwert;
    
    // Sicherheit: nicht negativ
    if (schwelleDunkel < 0) {
        schwelleDunkel = 0;
        schwelleHell = 0;
    }
}
```

**startePolling():**
```typescript
// OHNE Hysterese: Genau ein Schwellenwert
if (level <= schwelleDunkel) {
    aktuellerZustand = LichtZustand.Dunkel;
} else {
    // level > schwellenwert
    aktuellerZustand = LichtZustand.Hell;
}
```

**istHell():**
```typescript
// Geändert von >= zu >
export function istHell(): boolean {
    return input.lightLevel() > schwelleHell;
}
```

---

## 📚 Dokumentation

### Neue/Aktualisierte Dateien:

| Datei | Status | Inhalt |
|-------|--------|--------|
| `main.ts` | ✅ Aktualisiert | Neue Logik implementiert |
| `test.ts` | ✅ Aktualisiert | Hinweis auf Flackern |
| `README.md` | ✅ Aktualisiert | Warnung vor Flackern |
| `EXAMENSSTUNDE.md` | ✅ Aktualisiert | Phase "Problem erkennen" hinzugefügt |
| `BLOCK-STRUKTUR.md` | ✅ Aktualisiert | Neues Konzept erklärt |
| `DIDAKTISCHES-KONZEPT.md` | ⭐ NEU | Ausführliche Begründung |

---

## 🎯 Für die Examensstunde (13. Januar)

### Ablauf (45 Min)

```
┌────────────────────────────────────────────┐
│ Phase 1: MESSEN (5 Min)                    │
│   → Lichtwert-Block nutzen                 │
│   → Wert notieren (z.B. 180)               │
├────────────────────────────────────────────┤
│ Phase 2: KALIBRIEREN (10 Min)              │
│   → setze Referenzlicht 180                │
│   → Event-Handler programmieren            │
├────────────────────────────────────────────┤
│ Phase 3: TESTEN (10 Min)                   │
│   → Hand über Sensor                       │
│   → ⚠️ FLACKERN beobachten!               │
├────────────────────────────────────────────┤
│ Phase 4: PROBLEM ERKENNEN (5 Min)          │
│   → "Warum flackert es?"                   │
│   → Ursache analysieren                    │
├────────────────────────────────────────────┤
│ Phase 5: HYSTERESE LERNEN (10 Min)         │
│   → Fachbegriff einführen                  │
│   → Experten-Block zeigen                  │
│   → setzeLichtschwellen(170, 180)          │
├────────────────────────────────────────────┤
│ Phase 6: ANWENDEN (5 Min)                  │
│   → Mit Hysterese testen                   │
│   → Stabil! ✅                             │
└────────────────────────────────────────────┘
```

---

## 📋 Checkliste Upload

- [ ] Alle Dateien im Ordner `pxt-lichtsensor-events`
- [ ] Icon vorhanden (300×200px, 7KB)
- [ ] README enthält "supported by PXT/calliope"
- [ ] test.ts kompiliert ohne Fehler
- [ ] Dokumentation vollständig

### Upload-Commands:

```bash
cd /pfad/zum/pxt-lichtsensor-events

git init
git add .
git commit -m "Lichtsensor Extension mit didaktischem Konzept: Hysterese durch Erleben lernen"
git branch -M main
git remote add origin https://github.com/gunst-at-hvh/pxt-lichtsensor-events.git
git push -u origin main
```

---

## 🎓 Erwartete Lernergebnisse

Nach der Stunde können Schüler:

1. ✅ **Referenzwert** als Fachbegriff erklären
2. ✅ **Schwellenwert** berechnen (Referenz - Abstand)
3. ✅ **Flackern-Problem** beschreiben
4. ✅ **Hysterese** als Lösung verstehen
5. ✅ Unterschied zwischen einem und zwei Schwellenwerten erklären
6. ✅ Anwendungsbeispiele für Hysterese nennen

---

## 💡 Tipps für die Durchführung

### Vorbereitung
- ✅ Raumbeleuchtung konstant halten
- ✅ Batterien im Calliope prüfen
- ✅ Beispielwerte vorher testen
- ✅ Tafelanschrift vorbereiten:
  ```
  Referenzwert = gemessenes Licht
  Schwellenwert = Referenzwert - Abstand
  Hysterese = Puffer gegen Flackern
  ```

### Während der Stunde
- ✅ Flackern gemeinsam beobachten (nicht übergehen!)
- ✅ Zeit für Diskussion einplanen
- ✅ Experten-Block erst NACH Problem-Erkennung zeigen
- ✅ Transfer zu Alltags-Beispielen (Thermostat)

### Mögliche Stolpersteine
- ⚠️ Zu helle/dunkle Räume → Referenzwert anpassen
- ⚠️ Schüler sehen kein Flackern → Langsam Hand bewegen!
- ⚠️ Zu schnell zur Lösung → Problem erst erleben lassen!

---

## 🎉 Zusammenfassung

**Was macht diese Extension besonders:**

1. **Didaktisch durchdacht** - Problem erleben statt erklären
2. **Fachlich korrekt** - Echte Messtechnik-Begriffe
3. **Flexibel** - Zwei Schwierigkeitsstufen
4. **Praxisnah** - Funktioniert wirklich
5. **Transferfähig** - Konzept in Alltag erkennbar

**Ergebnis:**
Schüler verstehen nachhaltig warum Hysterese in der Technik unverzichtbar ist - durch eigenes Erleben! 🎓✨

---

## 📞 Support

Bei Fragen oder Problemen:
- 📖 Siehe `EXAMENSSTUNDE.md` für detaillierten Ablauf
- 🎯 Siehe `DIDAKTISCHES-KONZEPT.md` für Begründung
- 🔧 Siehe `BLOCK-STRUKTUR.md` für technische Details

---

**Die Extension ist jetzt perfekt für deine Examensstunde am 13. Januar! Viel Erfolg! 🚀🎓**
