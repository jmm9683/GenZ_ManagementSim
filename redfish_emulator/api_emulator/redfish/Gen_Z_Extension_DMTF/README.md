# Gen_Z_Extension_DMTF

This set of folders is an extension of the publically available mockup data for an example Gen-Z system found at dmtf.org/standards/redfish titled as Redfish Extensions for Gen-Z Bundle
currently under Work in Progress Documents. 

(https://www.dmtf.org/dsp/DSP-IS0009)

## View Information
ManagerView contains the zone information (note, it is not accurately displayed by the dashboard. It only displays the switch ports properly).

Each SwitchView represents the information understood by only a single Gen-Z switch.

So, each SwitchView will only have the information of components connected to that switch in the form of endpoint information.

In the directory Project_Artifacts (top level), the Simulator_Diagram_and_Info contains an image of how the simulators are configured. Use that as the master representation for how things are configured.

A lot of data deep in the file structure is duplicated. This includes routing information, access keys, etc. If you want that fine-grained of a simulation where that needs to be accurate, you will have to change them.

## Changes to the Redfish standard

Links that reference a file found on another simulation have the port hardcoded in the link to indicate where it actually is. This makes it much easier for the backend and frontend.

- ex: "/redfish/v1/Chassis/example" existing on port 5006 but being referenced on port 5001 would look like "localhost:5006/redfish/v1/Chassis/example"

Memory chunks have their own endpoints. Previously, they were combined in an endpoint with their associated Media Controller. This created an edge case, so to make it easier on the backend and frontend we created endpoints for the individual memory chunks as well. (The endpoint information on the Media Controllers is not changed)

PCIe Devices each have their own individual fabric adapters that act like MediaControllers for Memory and allow for individual PCIe Devices to each have their own endpoint.

## Prototyping New Mockups
Master contains an older version of the file system before it was split between multiple simulators. 

It does not contain the pci, SingleComputeView, and MultiComputeView. Though it may not be accurate deep in the subdirectories, it can be used as a base to modify into other mockups like SwitchViews, ComputeViews, etc.
