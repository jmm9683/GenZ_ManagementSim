import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SystemSchema = new Schema({
    "@odata.context": {
        type: String
    }, 
    "@odata.id": {
        type: String
    }, 
    "@odata.type": {
        type: String
    }, 
    "Id": {
        type: Number
    }, 
    "Name": {
        type: String
    }, 
    "SystemType": {
        type: String
    }, 
    "AssetTag": {
        type: String
    }, 
    "Manufacturer": {
        type: String
    }, 
    "Model": {
        type: String
    }, 
    "SKU": {
        type: String
    }, 
    "SerialNumber": {
        type: String
    }, 
    "PartNumber": {
        type: String
    }, 
    "Description": {
        type: String
    }, 
    "UUID": {
        type: String
    }, 
    
    "Status": {
        "State": {
            type: String
        }, 
        "Health": {
            type: String
        }, 
        "HealthRollUp": {
            type: String
        }
    },
    "IndicatorLED": {
        type: String
    }, 
    "Power": {
        type: String
    }, 
    "Boot": {
        "BootSourceOverrideEnabled": {
            type: String
        }, 
        "BootSourceOverrideTarget": {
            type: String
        }, 
        "BootSourceOverrideSupported": [String],
        "UefiTargetBootSourceOverride": {
            type: String
        }, 
    "BiosVersion": {
        type: String
    }, 
    "Processors": {
        "Count": {
            type: Number
        }, 
        "Model": {
            type: String
        }, 
        "Status": {
            "State": {
                type: String
            }, 
            "Health": {
                type: String
            }, 
            "HealthRollUp": {
                type: String
            }
        }
    },
    "Memory": {
        "TotalSystemMemoryGB": {
            type: Number
        }, 
        "Status": {
            "State": {
                type: String
            }, 
            "Health": {
                type: String
            }, 
            "HealthRollUp": {
                type: String
            }
        }
    },
    "Links": {
        "Chassis": [
            {
                "@odata.id": {
                    type: String
                }, 
            }
        ],
        "ManagedBy": [
            {"@odata.id": {
                type: String
            }}
        ],
        "SimpleNetwork": {
            "@odata.id": {
                type: String
            }
        },
        "SimpleStorage": {
            "@odata.id": {
                type: String
            }
        }
    },
    "Actions": {
        "#ComputerSystem.Reset": {
            "target": {
                type: String
            }, 
            "ResetType@DMTF.AllowableValues": [String]
        }
        }
    }
});
