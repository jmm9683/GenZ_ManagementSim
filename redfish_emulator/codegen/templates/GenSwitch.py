#!/usr/bin/env python3
# Copyright Notice:
# Copyright 2017-2019 DMTF. All rights reserved.
# License: BSD 3-Clause License. For full text see link: https://github.com/DMTF/Redfish-Interface-Emulator/blob/master/LICENSE.md

# GenSwitch.py

import copy
import strgen
from api_emulator.utils import replace_recurse

_TEMPLATE = \
{
    "@Redfish.Copyright": "Copyright 2014-2019 DMTF. All rights reserved.",
    "@odata.id": "/redfish/v1/Fabrics/GenZ/Switches/Switch1",
    "@odata.type": "#Switch.v1_3_0.Switch",
    "Id": "Switch1",
    "Name": "Gen-Z Switch",
    "SwitchType": "GenZ",
    "Manufacturer": "Contoso",
    "Model": "Switch Model XM13",
    "SerialNumber": "2M220100SL",
    "Ports": {
        "@odata.id": "/redfish/v1/Fabrics/GenZ/Switches/Switch1/Ports"
    },
    "Status": {
        "State": "Disabled",
        "Health": "OK"
    },
    "UUID": "1ad59fe9-49f9-52fa-9a93-e3349f9477fe0",
    "Actions": {
        "#Switch.Reset": {
            "target": "/redfish/v1/Fabrics/GenZ/Switches/Switch1/Actions/Switch.Reset",
            "ResetType@Redfish.AllowableValues": [
                "ForceRestart"
            ]
        }
    },
    "Links": {
        "Endpoints": [
            {
                "@odata.id": "/redfish/v1/Fabrics/GenZ/Endpoints/2"
            }
        ]
    },
    "Oem": {}
}


def get_GenSwitch_instance(wildcards):
    c = copy.deepcopy(_TEMPLATE)
    replace_recurse(c, wildcards)
    return c
