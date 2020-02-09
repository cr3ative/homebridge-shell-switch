# homebridge-shell-switch

A homebridge switch which changes state only if the shell command is successful.
Shows pending state while command is being run.
Kills the command if it exceeds `timeout` seconds.

## Installation

Example config.json:
```
    "accessories": [
        {
            "accessory": "ShellSwitch",
            "name": "TV Power",
            "onCmd": "/home/homebridge/control/tv_on.sh",
            "offCmd": "/home/homebridge/control/tv_off.sh",
            "timeout": 30
        }
    ]
```