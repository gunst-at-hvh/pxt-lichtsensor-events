# 📤 Upload-Anleitung: Lichtsensor Extension zu GitHub

## ⚡ METHODE 1: Git Commands (EMPFOHLEN - alles auf einmal!)

### Voraussetzung
Git muss installiert sein. Prüfen mit:
```bash
git --version
```

Falls nicht installiert: https://git-scm.com/downloads

### Schritt-für-Schritt

1. **Auf GitHub.com ein neues Repository erstellen**
   - Gehe zu: https://github.com/new
   - Repository Name: `pxt-lichtsensor-events` (wichtig: Präfix `pxt-`)
   - ❌ KEIN README, KEINE .gitignore, KEINE Lizenz hinzufügen (haben wir schon!)
   - Klicke "Create repository"

2. **Terminal/Kommandozeile öffnen**
   - Windows: Git Bash oder PowerShell
   - Mac/Linux: Terminal

3. **In den Projektordner wechseln**
   ```bash
   cd /Pfad/zum/pxt-lichtsensor-events
   ```

4. **Git initialisieren und hochladen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Lichtsensor Extension"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/pxt-lichtsensor-events.git
   git push -u origin main
   ```
   
   ⚠️ Ersetze `DEIN-USERNAME` mit deinem GitHub-Nutzernamen!

**✅ FERTIG!** Die Extension ist jetzt auf GitHub.

---

## 🌐 METHODE 2: Web-Upload (umständlicher, aber ohne Git)

1. **Repository auf GitHub erstellen**
   - Gehe zu: https://github.com/new
   - Repository Name: `pxt-lichtsensor-events`
   - ❌ KEIN README, KEINE .gitignore, KEINE Lizenz
   - Klicke "Create repository"

2. **Dateien einzeln hochladen**
   - Klicke auf "uploading an existing file"
   - Ziehe alle 6 Dateien rein:
     * `.gitignore`
     * `LICENSE.txt`
     * `README.md`
     * `main.ts`
     * `pxt.json`
     * `test.ts`
   - Commit message: "Initial commit"
   - Klicke "Commit changes"

**✅ FERTIG!** Aber umständlicher als Methode 1.

---

## 🔧 Extension in MakeCode verwenden

1. Öffne https://makecode.calliope.cc
2. Erstelle ein neues Projekt
3. Klicke auf **Einstellungen (⚙️)** → **Erweiterungen**
4. Füge deine GitHub-URL ein:
   ```
   https://github.com/DEIN-USERNAME/pxt-lichtsensor-events
   ```
5. Die Extension wird geladen und ist sofort nutzbar!

---

## 📝 Nach dem Upload

### Wichtig: README.md anpassen
Im README.md steht noch `DEIN-USERNAME`. Ersetze das mit deinem echten GitHub-Namen:
```markdown
lichtsensor-events=github:DEIN-USERNAME/pxt-lichtsensor-events
```

### Release erstellen (optional, für Versionierung)
```bash
git tag v0.1.0
git push origin v0.1.0
```

---

## 🎯 Zusammenfassung

| Was | Wo |
|-----|-----|
| **Alle Dateien** | Im Ordner `pxt-lichtsensor-events` |
| **Hochladen** | Git Commands ODER Web-Upload |
| **Verwendung** | URL in MakeCode Extensions eingeben |
| **Genehmigung** | Optional - für Suchbarkeit bei makecode@microsoft.com anfragen |

**Viel Erfolg! 🚀**
