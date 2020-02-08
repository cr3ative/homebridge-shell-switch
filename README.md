# homebridge-shell-switch

A homebridge switch which changes state only if the shell command is successful.
Shows pending state while command is being run.

### But why?

Let's say you want to run a bash script on your homebridge host system, but it isn't guaranteed to work. This switch won't change state until the script returns a successful exit code (zero). If anything else happens, the switch will remain in its previous state.

The switch will maintain state between homebridge reboots, using `node-persist`.

Many thanks to [hans-1](https://github.com/hans-1/homebridge-cmdtriggerswitch) for providing a lovely base for this plugin to grow on.

### Does it work yet?

No.

## Installation

Example config.json:
```
    "accessories": [
        {
            "accessory": "ShellSwitch",
            "name": "TV Power",
            "onCmd": "/home/homebridge/control/tv_on.sh",
            "offCmd": "/home/homebridge/control/tv_off.sh"
        }
    ]
```
