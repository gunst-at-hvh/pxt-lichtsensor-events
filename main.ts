/**
 * Licht-Zustände für Ereignis-Handler
 */
enum LichtZustand {
    //% block="dunkel"
    Dunkel = 1,
    //% block="hell"
    Hell = 2
}

/**
 * Lichtsensor-Ereignisse für Calliope mini
 */
//% color=#f59e42 weight=100 icon="\uf0eb" block="Lichtsensor"
//% groups=['Ereignisse', 'Schwellenwerte']
namespace lichtsensor {
    // Schwellenwert-Speicher
    let schwelleDunkel = 50;
    let schwelleHell = 150;
    let letzterZustand: LichtZustand = null;
    
    // Handler-Speicher (Flag-System!)
    let dunkelHandler: () => void = null;
    let hellHandler: () => void = null;
    
    // Flag: Läuft gerade ein Handler?
    let handlerLäuft = false;

    /**
     * Wird ausgeführt wenn sich der Licht-Zustand ändert
     * @param zustand der zu erkennende Lichtzustand
     * @param handler Code der ausgeführt wird
     */
    //% blockId=lichtsensor_on_changed
    //% block="wenn Licht $zustand"
    //% weight=100 group="Ereignisse"
    export function wennLichtWechselt(
        zustand: LichtZustand, 
        handler: () => void
    ): void {
        // Handler speichern (Flag-System, keine Events!)
        if (zustand === LichtZustand.Dunkel) {
            dunkelHandler = handler;
        } else {
            hellHandler = handler;
        }
    }

    /**
     * Speichert die Normal-Helligkeit (wie hell es ist wenn Licht an ist) und berechnet den Schwellenwert
     * @param normalHelligkeit die gemessene Helligkeit im hellen Raum (0-255)
     * @param abstand wie viel dunkler der Schwellenwert sein soll (Standard: 10)
     */
    //% blockId=lichtsensor_set_reference
    //% block="speichere Normal-Helligkeit $normalHelligkeit || Abstand $abstand"
    //% normalHelligkeit.min=0 normalHelligkeit.max=255 normalHelligkeit.defl=150
    //% abstand.min=1 abstand.max=100 abstand.defl=10
    //% expandableArgumentMode="toggle"
    //% weight=95 group="Schwellenwerte"
    export function setzeReferenzlicht(normalHelligkeit: number, abstand: number = 10): void {
        // Berechne Schwellenwert
        const schwellenwert = normalHelligkeit - abstand;
        
        // Setze beide Schwellen auf denselben Wert (KEINE Hysterese!)
        schwelleHell = schwellenwert;
        schwelleDunkel = schwellenwert;
        
        // Sicherstellen dass Schwellenwert nicht negativ wird
        if (schwelleDunkel < 0) {
            schwelleDunkel = 0;
            schwelleHell = 0;
        }
        
        // Reset Zustand
        letzterZustand = null;
    }

    /**
     * Setzt beide Schwellenwerte einzeln (für Fortgeschrittene)
     * @param dunkel Schwellenwert für dunkel (0-255)
     * @param hell Schwellenwert für hell (0-255)
     */
    //% blockId=lichtsensor_set_thresholds
    //% block="setze Lichtschwellen dunkel $dunkel hell $hell"
    //% dunkel.min=0 dunkel.max=255 dunkel.defl=50
    //% hell.min=0 hell.max=255 hell.defl=150
    //% weight=85 group="Schwellenwerte"
    //% advanced=true
    export function setzeLichtschwellen(dunkel: number, hell: number): void {
        schwelleDunkel = dunkel;
        schwelleHell = hell;
    }

    /**
     * Setzt den Schwellenwert für einen Lichtzustand einzeln
     * @param zustand der Zustand für den der Schwellenwert gilt
     * @param wert Schwellenwert (0-255)
     */
    //% blockId=lichtsensor_set_threshold
    //% block="setze $zustand Schwellenwert auf $wert"
    //% wert.min=0 wert.max=255 wert.defl=100
    //% weight=80 group="Schwellenwerte"
    //% advanced=true
    export function setzeSchwellenwert(zustand: LichtZustand, wert: number): void {
        if (zustand === LichtZustand.Dunkel) {
            schwelleDunkel = wert;
        } else {
            schwelleHell = wert;
        }
    }

    /**
     * Gibt den aktuellen Lichtwert zurück (0-255)
     */
    //% blockId=lichtsensor_wert
    //% block="Lichtwert"
    //% weight=90 group="Schwellenwerte"
    export function lichtwert(): number {
        return input.lightLevel();
    }

    /**
     * Gibt den aktuellen Dunkel-Schwellenwert zurück (zum Debuggen)
     */
    //% blockId=lichtsensor_dunkel_schwelle
    //% block="Dunkel-Schwelle"
    //% weight=70 group="Schwellenwerte"
    //% advanced=true
    export function dunkelSchwelle(): number {
        return schwelleDunkel;
    }

    /**
     * Gibt den aktuellen Hell-Schwellenwert zurück (zum Debuggen)
     */
    //% blockId=lichtsensor_hell_schwelle
    //% block="Hell-Schwelle"
    //% weight=69 group="Schwellenwerte"
    //% advanced=true
    export function hellSchwelle(): number {
        return schwelleHell;
    }

    /**
     * Prüft ob es aktuell dunkel ist
     */
    //% blockId=lichtsensor_ist_dunkel
    //% block="ist dunkel"
    //% weight=85 group="Schwellenwerte"
    export function istDunkel(): boolean {
        return input.lightLevel() <= schwelleDunkel;
    }

    /**
     * Prüft ob es aktuell hell ist
     */
    //% blockId=lichtsensor_ist_hell
    //% block="ist hell"
    //% weight=84 group="Schwellenwerte"
    export function istHell(): boolean {
        return input.lightLevel() > schwelleHell;
    }

    /**
     * Interne Funktion: Führt Handler aus und prüft danach sofort nochmal
     */
    function führeHandlerAus(zustand: LichtZustand): void {
        handlerLäuft = true;
        
        // Handler ausführen
        if (zustand === LichtZustand.Dunkel && dunkelHandler !== null) {
            dunkelHandler();
        } else if (zustand === LichtZustand.Hell && hellHandler !== null) {
            hellHandler();
        }
        
        handlerLäuft = false;
        
        // SOFORT nach Handler: Nochmal prüfen!
        basic.pause(10);
        prüfeUndReagiere();
    }

    /**
     * Interne Funktion: Prüft Zustand und führt Handler aus wenn nötig
     */
    function prüfeUndReagiere(): void {
        if (handlerLäuft) return;
        
        const level = input.lightLevel();
        let aktuellerZustand: LichtZustand = null;

        // Zustand bestimmen
        if (level <= schwelleDunkel) {
            aktuellerZustand = LichtZustand.Dunkel;
        } else if (level >= schwelleHell) {
            aktuellerZustand = LichtZustand.Hell;
        }

        // Wenn Zustand sich geändert hat → Handler ausführen!
        if (aktuellerZustand !== null && aktuellerZustand !== letzterZustand) {
            letzterZustand = aktuellerZustand;
            führeHandlerAus(aktuellerZustand);
        }
    }

    // Background-Loop: Schneller Check + Flag-System + Auto-ReCheck
    control.inBackground(() => {
        // Erster Aufruf aktiviert Sensor
        input.lightLevel();
        basic.pause(100);
        
        while (true) {
            prüfeUndReagiere();
            basic.pause(20);
        }
    });
}
