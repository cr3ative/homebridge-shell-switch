# Change Log

All notable changes to this project are documented in this file. This project uses [Semantic Versioning](https://semver.org/).

## 0.0.[3-6] [9 Feb 2020]

- Bugfixes

## 0.0.2 [9 Feb 2020]

- Now supports pending status (callback after command) and the intended exit code monitoring.

## 0.0.1 [8 Feb 2020]

- Fork from https://github.com/hans-1/homebridge-cmdtriggerswitch (thank you!)
- Remove delay functionality
- Refactor in to class
- Install eslint and prettier rules
- Doesn't currently support these features which I want:
    - Pending status while command executes
    - Check exit code and set resultant state from it