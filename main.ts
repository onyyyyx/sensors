input.onPinPressed(TouchPin.P1, function () {
    if (logging) {
        ispaused = true
        n = 20
        serial.writeLine("P1: set n to 50")
        basic.showNumber(2)
        control.waitMicros(500000)
        basic.clearScreen()
        ispaused = false
    }
})
input.onPinPressed(TouchPin.P0, function () {
    if (logging) {
        ispaused = true
        n = 100
        serial.writeLine("P0: set n to 100")
        basic.showNumber(1)
        control.waitMicros(500000)
        basic.clearScreen()
        ispaused = false
    }
})
input.onButtonPressed(Button.A, function () {
    max += 0 - n
})
input.onButtonPressed(Button.B, function () {
    max += n
})
input.onButtonPressed(Button.AB, function () {
    if (logging) {
        logging = false
        serial.writeLine("Stopped logging (Button.AB)")
    } else {
        logging = true
        serial.writeLine("Started logging (Button.AB)")
    }
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P2, function () {
    if (logging) {
        ispaused = true
        n = 500
        serial.writeLine("P2: set n to 500")
        basic.showNumber(3)
        control.waitMicros(500000)
        basic.clearScreen()
        ispaused = false
    }
})
let ispaused = false
let n = 0
let logging=false
let max = 4000
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
serial.writeLine("started...")
n = 50
basic.forever(function () {
    if (logging && !(ispaused)) {
        led.setBrightness(255)
        led.plotBarGraph(
        input.magneticForce(Dimension.Strength),
        max,
        true
        )
        datalogger.log(
        datalogger.createCV("Force (µT)", input.magneticForce(Dimension.Strength)),
        datalogger.createCV("Scale", max)
        )
    } else {
        led.setBrightness(30)
        for (let i = 0; i <= 4; i++) {
            if (i % 2 == 0) {
                for (let j = 0; j <= 4; j++) {
                    led.toggle(i, j)
                    basic.pause(75)
                    if (logging) {
                        break;
                    }
                }
            } else if (i % 2 == 1) {
                for (let k=4; k>=0; k--) {
                    led.toggle(i,k)
                    basic.pause(75)
                    if (logging) {
                        break
                    }
                }
            } else {
                logging = false
            }
            if (logging) {
                break;
            }
        }
    }
})
