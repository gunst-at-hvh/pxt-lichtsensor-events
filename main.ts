/**
 * Licht-Zustände für Event-Handler
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
    // Event-Quelle ID (benutzerdefiniert, muss einzigartig sein)
    const LICHT_EVENT_ID = 0x6001;

    // Schwellenwert-Speicher
    let schwelleDunkel = 50;
    let schwelleHell = 150;
    let letzterZustand: LichtZustand = null;
    let pollingGestartet = false;

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
        // Event-Handler registrieren
        control.onEvent(LICHT_EVENT_ID, zustand, handler);
        
        // Polling starten (nur einmal)
        if (!pollingGestartet) {
            pollingGestartet = true;
            startePolling();
        }
    }

    /**
     * Setzt das Referenzlicht (Hell-Wert) und den Abstand für Dunkel
     * @param referenz der gemessene Referenzwert für helles Licht (0-255)
     * @param abstand wie viel dunkler es werden muss für "dunkel" (Standard: 10)
     */
    //% blockId=lichtsensor_set_reference
    //% block="setze Referenzlicht $referenz || Abstand $abstand"
    //% referenz.min=0 referenz.max=255 referenz.defl=150
    //% abstand.min=1 abstand.max=100 abstand.defl=10
    //% expandableArgumentMode="toggle"
    //% weight=95 group="Schwellenwerte"
    export function setzeReferenzlicht(referenz: number, abstand: number = 10): void {
        schwelleHell = referenz;
        schwelleDunkel = referenz - abstand;
        // Sicherstellen dass Dunkel-Schwelle nicht negativ wird
        if (schwelleDunkel < 0) {
            schwelleDunkel = 0;
        }
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
    //% inlineInputMode=inline
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
        return input.lightLevel() >= schwelleHell;
    }

    // Interne Polling-Funktion
    function startePolling(): void {
        control.inBackground(() => {
            // Erster Aufruf aktiviert Sensor
            input.lightLevel();
            basic.pause(100);
            
            while (true) {
                const level = input.lightLevel();
                let aktuellerZustand: LichtZustand = null;

                // Zustand basierend auf Schwellenwerten bestimmen
                // Hysterese: Werte zwischen Schwellen lösen kein Event aus
                if (level <= schwelleDunkel) {
                    aktuellerZustand = LichtZustand.Dunkel;
                } else if (level >= schwelleHell) {
                    aktuellerZustand = LichtZustand.Hell;
                }

                // Event nur bei Zustandswechsel auslösen
                if (aktuellerZustand !== null && 
                    aktuellerZustand !== letzterZustand) {
                    letzterZustand = aktuellerZustand;
                    control.raiseEvent(LICHT_EVENT_ID, aktuellerZustand);
                }

                // Polling-Intervall (100ms = 10 Prüfungen/Sekunde)
                basic.pause(100);
            }
        });
    }
}
