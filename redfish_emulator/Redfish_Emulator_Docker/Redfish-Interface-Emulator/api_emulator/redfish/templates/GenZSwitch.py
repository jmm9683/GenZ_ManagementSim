#!/usr/bin/env python3
# Copyright Notice:
# Copyright 2017-2019 DMTF. All rights reserved.
# License: BSD 3-Clause License. For full text see link: https://github.com/DMTF/Redfish-Interface-Emulator/blob/master/LICENSE.md

# GenZSwitch.py

import copy
import strgen
from api_emulator.utils import replace_recurse

_TEMPLATE = \
{
    "@Redfish.Copyright": "Copyright 2014-2019 DMTF. All rights reserved.",
    "@odata.id": "{rb}Fabrics/GenZ/Switches/{id}",
    "@odata.type": "#Switch.v1_3_0.Switch",
    "Id": "{id}",
    "Name": "Gen-Z Switch",
    "SwitchType": "GenZ",
    "Manufacturer": "ManufacturerName",
    "Model": "ProductModelName",
    "SKU": "",
    "SerialNumber": "2M220100SL",
    "Ports": {
        "@data.id": "{rb}fabrics/GenZ/Switches/Switch1/Ports"
    },
    "Status": {
        "State": "Enabled",
        "Health": "OK"
    },
    "Links": {
        "Endpoints": [
            {
                "@odata.id": "{rb}Fabrics/GenZ/Endpoints/{id}"
            }
        ],
    },
    "Oem": {}
}

def get_GenZSwitch_instance(wildcards):
    #print('genz switch instance called')
    c = copy.deepcopy(_TEMPLATE)
    replace_recurse(c, wildcards)
    return c
