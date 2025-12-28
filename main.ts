namespace lichtsensor {
    const LICHTSENSOR_ID = 3200
    
    // Schwellenwerte (deine originale Logik!)
    let schwelleDunkel = 50
    let schwelleHell = 50
    let letzterZustand: LichtZustand | null = null

    export enum LichtZustand {
        //% block="dunkel"
        Dunkel = 1,
        //% block="hell"
        Hell = 2
    }

    /**
     * Setzt das Referenzlicht und berechnet den Schwellenwert
     * @param referenz der gemessene Referenzwert für helles Licht (0-255)
     * @param abstand wie viel dunkler der Schwellenwert sein soll (Standard: 10)
     */
    //% block="setze Referenzlicht auf $referenz || Abstand $abstand"
    //% referenz.min=0 referenz.max=255 referenz.defl=128
    //% abstand.min=1 abstand.max=100 abstand.defl=10
    //% expandableArgumentMode="toggle"
    //% weight=100
    //% color=#FFA500
    export function setzeReferenzlicht(referenz: number, abstand: number = 10): void {
        // Berechne Schwellenwert
        const schwellenwert = referenz - abstand
        
        // Setze beide Schwellen auf denselben Wert (KEINE Hysterese!)
        schwelleHell = schwellenwert
        schwelleDunkel = schwellenwert
        
        // Sicherstellen dass Schwellenwert nicht negativ wird
        if (schwelleDunkel < 0) {
            schwelleDunkel = 0
            schwelleHell = 0
        }
        
        // Reset Zustand nach Kalibrierung
        letzterZustand = null
    }

    /**
     * Gibt den aktuellen Lichtwert zurück (0-255)
     */
    //% block="Lichtwert"
    //% weight=90
    //% color=#FFA500
    export function lichtwert(): number {
        return input.lightLevel()
    }

    /**
     * Event das feuert wenn sich der Lichtzustand ändert
     * Nach dem Handler wird automatisch geprüft ob sich der Zustand geändert hat!
     */
    //% block="wenn Licht $zustand"
    //% weight=80
    //% color=#FFA500
    export function wennLichtWechselt(zustand: LichtZustand, handler: () => void): void {
        control.onEvent(LICHTSENSOR_ID, zustand, () => {
            // SuS-Handler ausführen (kann lange dauern!)
            handler()
            
            // SOFORT nach Handler: Prüfe ob Zustand sich geändert hat
            control.runInBackground(() => {
                basic.pause(10)  // Kurz warten damit Handler sicher fertig
                
                const level = input.lightLevel()
                let neuerZustand: LichtZustand | null = null
                
                // Zustand prüfen
                if (level <= schwelleDunkel) {
                    neuerZustand = LichtZustand.Dunkel
                } else if (level >= schwelleHell) {
                    neuerZustand = LichtZustand.Hell
                }
                
                // Wenn Zustand sich geändert hat → Event sofort feuern!
                if (neuerZustand !== null && neuerZustand !== letzterZustand) {
                    letzterZustand = neuerZustand
                    control.raiseEvent(LICHTSENSOR_ID, neuerZustand)
                }
            })
        })
    }

    // Kontinuierliche Überwachung (läuft immer im Hintergrund)
    control.inBackground(() => {
        // Erster Aufruf aktiviert Sensor
        input.lightLevel()
        basic.pause(100)
        
        while (true) {
            const level = input.lightLevel()
            let aktuellerZustand: LichtZustand | null = null

            // Schwellenwert-Logik (deine originale Logik!)
            if (level <= schwelleDunkel) {
                aktuellerZustand = LichtZustand.Dunkel
            } else if (level >= schwelleHell) {
                aktuellerZustand = LichtZustand.Hell
            }

            // Event nur bei Zustandswechsel auslösen
            if (aktuellerZustand !== null && 
                aktuellerZustand !== letzterZustand) {
                letzterZustand = aktuellerZustand
                control.raiseEvent(LICHTSENSOR_ID, aktuellerZustand)
            }

            basic.pause(50)  // Schneller Check (50ms)
        }
    })
}
