# 🌟 Lichtsensor Extension - Feature-Übersicht

## Was die Extension kann

### ✅ Event-basierte Licht-Erkennung
```
┌─────────────────────────────────────────┐
│  wenn Licht [dunkel/hell]               │
│    ➜ Führe Code aus                     │
└─────────────────────────────────────────┘
```

### ✅ Konfigurierbare Schwellenwerte mit Hysterese

```
Lichtwert (0-255)
    │
255 ├─────────────────────── ☀ HELL (≥150)
    │
    │  ╔═══════════════════╗
150 ├──╣  HYSTERESE-BEREICH ║  ← Keine Events
    │  ║   (50-150)        ║
    │  ╚═══════════════════╝
 50 ├──────────────────────── 🌙 DUNKEL (≤50)
    │
  0 └─────────────────────────
```

**Fachbegriff:** Diese Schaltdifferenz heißt **Hysterese** und verhindert 
unerwünschtes Mehrfachschalten bei Schwankungen.

---

## 📦 Alle Blöcke

### 🎯 Ereignisse (Events)
| Block | Beschreibung |
|-------|--------------|
| `wenn Licht dunkel` | Code wird ausgeführt wenn es dunkel wird |
| `wenn Licht hell` | Code wird ausgeführt wenn es hell wird |

### ⚙️ Schwellenwerte (Configuration)
| Block | Beschreibung |
|-------|--------------|
| `setze Lichtschwellen dunkel [30] hell [180]` | **Vereinfacht** - Beide Werte gleichzeitig |
| `Lichtwert` | Gibt aktuellen Sensor-Wert zurück (0-255) |
| `ist dunkel` | Prüft ob es dunkel ist (Boolean) |
| `ist hell` | Prüft ob es hell ist (Boolean) |

### 🔧 Erweitert (unter "Mehr...")
| Block | Beschreibung |
|-------|--------------|
| `setze dunkel Schwellenwert auf [50]` | Einzelnen Wert ändern |
| `setze hell Schwellenwert auf [150]` | Einzelnen Wert ändern |

---

## 🎓 Didaktischer Wert

### Für den Unterricht geeignet weil:
1. **Einfache Bedienung** - Ein Block für beide Schwellenwerte
2. **Fachbegriffe lernen** - Hysterese wird praktisch erlebbar
3. **Event-Programmierung** - Asynchrone Konzepte verstehen
4. **Sensorik-Grundlagen** - Schwellenwertschalter kennenlernen
5. **Debugging-Optionen** - Mit `ist dunkel`/`ist hell` testen

### Anwendungsbeispiele:
- 💡 Automatische Beleuchtung (Dämmerungsschalter)
- 🌡️ Tageslichterkennung
- 🎮 Lichtbasierte Spiele (Hand über Sensor)
- 🔋 Energiespar-Modi (bei Dunkelheit abschalten)
- 📊 Datenlogger für Lichtverhältnisse

---

## 🔧 Technische Details

**Polling-Intervall:** 100ms (10 Messungen/Sekunde)
**Sensor-Bereich:** 0-255 (8-bit Auflösung)
**Event-System:** MakeCode Control Events (ID 0x6001)
**Background-Verarbeitung:** control.inBackground()

**Standard-Werte:**
- Dunkel-Schwelle: 50
- Hell-Schwelle: 150
- Hysterese: 100 (150-50)

---

## 📚 Weiterführende Konzepte

**Für fortgeschrittene Schüler:**
- Was ist ein Schmitt-Trigger?
- Warum ist Hysterese wichtig?
- Wie funktioniert Event-basierte Programmierung?
- Unterschied zwischen Polling und Interrupt

---

## ✨ Das macht diese Extension besonders

1. **Vereinfachter Block** - Didaktisch optimiert
2. **Fachbegriffe** - Hysterese wird erklärt und angewendet
3. **Icon** - Visuell in der Extension-Suche erkennbar
4. **Dokumentation** - Vollständig auf Deutsch
5. **B1-Niveau** - Für Schüler mit geringeren Deutschkenntnissen geeignet

**Entwickelt für:** Schüler der ISS (Integrierte Sekundarschule)
**Testet:** Realistische Sensorik-Anwendungen
**Lehrt:** Wichtige Programmier- und Elektronik-Konzepte
