datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
serial.writeLine("started...")
let logging=false;
input.onButtonPressed(Button.A, function () {
    if (logging) {
        logging = false;
    } else {
        logging = true;
    }
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (logging) {
        logging = false;
    } else {
        logging = true;
    }
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    if (logging) {
        logging = false;
    } else {
        logging = true;
    }
    basic.clearScreen()
})
basic.forever(function on_forever() {
    if (logging) {
        led.setBrightness(255)
        led.plotBarGraph(input.magneticForce(Dimension.Strength), 5000, true)
        datalogger.log(datalogger.createCV("Force (µT)", input.magneticForce(Dimension.Strength)))
    } else {
        led.setBrightness(30)
        for (let i=0; i<5; i++) {
            if (i%2===0){
                for (let j=0; j<5; j++) {
                    led.toggle(i, j)
                    basic.pause(75)
                    if (logging) {
                        break
                    }
                }
            } else if (i%2===1) {
                for (let j=4; j>=0; j--) {
                    led.toggle(i,j)
                    basic.pause(75)
                    if (logging) {
                        break
                    }
                }
            } else {
                serial.writeLine("💥⚠ERROR !")
                logging=false;
            }
            if (logging) {
                break
            }
        }
    }
    
});
