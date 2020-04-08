from static_mockup import StaticMockup
from fabric_manager import FabricManager

def main():
    sm = StaticMockup('static')
    mockups = []
    mockups.append(sm.build_mockup(['1']))
    fm = FabricManager(mockups, '0x10', '0x11', '1')
    input("Press Enter to set GCID")
    mockup_index = 0
    endpoint_id = '1'
    fm.setGCID(mockup_index, '0x10', '0x11', endpoint_id)
    input("Press Enter to set Manager bits")
    fm.write_mgr_bits(mockup_index, endpoint_id)
    input("Press Enter to set C-State to C-UP")
    fm.set_C_UP(mockup_index, endpoint_id)
    print("Done")

if __name__ == '__main__':
    main()
