Gen_Z_Extension_DMTF

This file structure is an extension of the publically available mockup data for an example
Gen-Z system found at dmtf.org/standards/redfish titled as Redfish Extensions for Gen-Z Bundle
currently under Work in Progress Documents. (https://www.dmtf.org/dsp/DSP-IS0009)

The ManagerView contains ALL the information in the system as if it were the fabric manager.
Each SwitchView represents the information understood by only a single Gen-Z switch.n
So, each SwitchView will only have the information of components connected to that switch.
There will be an image in this file that represents the connections as seen by the ManagerView.
The ManagerView is intended as an ease of use for simple debugging. Theoretically,
the same information should be understood if the ManagerView is taken out. That is
untested though.
