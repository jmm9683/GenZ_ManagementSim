# Copyright Notice:
# Copyright 2016-2019 DMTF. All rights reserved.
# License: BSD 3-Clause License. For full text see link: https://github.com/DMTF/Redfish-Interface-Emulator/blob/master/LICENSE.md

# Fabric Template File

import copy
import strgen
from api_emulator.utils import replace_recurse

_TEMPLATE = \
    {
        "@odata.context": "{rb}$metadata#Fabric.Fabric",
        "@odata.id": "{rb}Fabrics/{id}",
        "@odata.type": "#Fabric.v1_0_3.Fabric",
        "Id": "{id}",
        "Name": "GenZ Fabric",
        "FabricType": "GenZ",
        "Description": "A GenZ Fabric Switch",
        "Status": {
            "State": "Enabled",
            "Health": "OK"
        },
        "Switches": {
            "@odata.id": "{rb}Fabrics/GenZ/Switches"
        },
        "EndPoints": {
            "@odata.id": "{rb}Fabrics/GenZ/EndPoints"
        },
        "Zones": {
            "@odata.id": "{rb}Fabrics/GenZ/Zones"
        },
        "Oem": {  }
    }


def get_Fabric_instance(wildcards):
    """
    Creates an instace of TEMPLATE and replace wildcards as specfied
    """
    c = copy.deepcopy(_TEMPLATE)
    replace_recurse(c, wildcards)
    return c
