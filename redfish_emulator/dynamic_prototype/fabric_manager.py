import json
import os

from static_mockup import StaticMockup
class FabricManager(object):
    def __init__(self, mockups, uuid, cid, manager_type):
        self.mockups = mockups
        self.uuid = uuid
        self.cid = cid
        self.manager_type = manager_type

    def setGCID(self, mockup_index, cid, ssid, endpoint_id):
        mockup, index = self.checkMockupEndpoint(mockup_index, endpoint_id)
        index_field = 'ConnectedEntities'
        ce = mockup.read_index_field(index, index_field) # Grab the data to be able to do inplace replace of just the GCID nested field

        assert bool(ce), 'No ConnectedEntities field in endpoint ' + endpoint_id + ' in mockup ' + mockup.base_dir

        for e in ce[index_field]: # Change the cid and ssid in ce
            if 'GCID' in e:
                e['GCID'] = { 'ComponentID': cid, 'SubnetID': ssid }

        mockup.change_index(index, **ce)

    def write_mgr_bits(self, mockup_index, endpoint_id):
        mockup, index = self.checkMockupEndpoint(mockup_index, endpoint_id)
        index_field = {}
        index_field['MGR_UUID'] = self.uuid
        index_field['MGR_UUID_Enable'] = '0x1'
        index_field['PMCID'] = self.cid
        index_field['PrimaryManagerRole'] = self.manager_type

        mockup.change_index(index, **index_field)

    def set_C_UP(self, mockup_index, endpoint_id):
        mockup, index = self.checkMockupEndpoint(mockup_index, endpoint_id)
        index_field = {}
        index_field['C-STATE'] = 'C-UP'
        mockup.change_index(index, **index_field)

    def checkMockupEndpoint(self, mockup_index, endpoint_id):
        assert 0 <= mockup_index < len(self.mockups), 'Invalid mockup index'

        mockup = self.mockups[mockup_index]
        endpoints = mockup['endpoints']

        assert endpoint_id in endpoints, 'Invalid endpoint id: ' + endpoint_id
        index = 'Fabrics/GenZ/Endpoints/' + endpoint_id

        return mockup['mockup'], index
