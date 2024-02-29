datalogger.include_timestamp(FlashLogTimeStampFormat.SECONDS)
serial.write_line("started...")

def on_forever():
    logging = 0
    if logging:
        led.plot_bar_graph(input.magnetic_force(Dimension.STRENGTH), 3000, True)
        datalogger.log(datalogger.create_cv("Force (µT)", input.magnetic_force(Dimension.STRENGTH)))
    else:
        pass
basic.forever(on_forever)
