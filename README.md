# homebridge-shell-switch

A homebridge switch which changes state only if the shell command is successful.
Shows pending state while command is being run.

### But why?

Suppose you to run a bash script on your homebridge host system, but it isn't guaranteed to work. You want to retry that command in a little while until it works.

- This switch won't change state until the script returns a successful exit code (zero). 
- If anything else happens, the switch will remain in its previous state.
- We'll show the "pending" switch state while the command is running.

The switch will maintain state between homebridge reboots, using `node-persist`.

Many thanks to [hans-1](https://github.com/hans-1/homebridge-cmdtriggerswitch) for providing a lovely base for this plugin to grow on.

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
