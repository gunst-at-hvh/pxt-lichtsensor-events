# 🚀 SCHNELLSTART: Copy-Paste Commands

## Option A: Mit Git (empfohlen)

```bash
# 1. In den Ordner wechseln
cd /Pfad/zum/pxt-lichtsensor-events

# 2. Alles auf einmal hochladen
git init
git add .
git commit -m "Initial commit: Lichtsensor Extension"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/pxt-lichtsensor-events.git
git push -u origin main
```

⚠️ **Vorher:** Repository auf GitHub erstellen unter https://github.com/new
⚠️ **DEIN-USERNAME** durch deinen echten GitHub-Namen ersetzen!

---

## Option B: Web-Upload (ohne Git)

1. Repository erstellen: https://github.com/new (Name: `pxt-lichtsensor-events`)
2. "uploading an existing file" klicken
3. Alle 6 Dateien reinziehen
4. "Commit changes" klicken

---

## Extension testen

```
https://makecode.calliope.cc
→ Einstellungen → Erweiterungen
→ URL eingeben: https://github.com/DEIN-USERNAME/pxt-lichtsensor-events
```

---

## Release erstellen (später)

```bash
git tag v0.1.0
git push origin v0.1.0
```
