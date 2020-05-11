import json
import os
import re

class StaticMockup(object):
    def __init__(self, folder_name):
        dirname = os.path.dirname(__file__)
        base_dir = os.path.join(dirname, "api_emulator", "redfish", folder_name)
        assert os.path.exists(base_dir), 'Folder from path ./api_emulator/redfish/' + folder_name + ' does not exist'
        self.folder_path = base_dir

    def change_index(self, json_path, **kwargs):
        index = self.get_index(json_path)
        with open(index, "r") as jsonFile:
            data = json.load(jsonFile)

        for key in kwargs:
            data[key] = kwargs[key]

        with open(index, "w") as jsonFile:
            json.dump(data, jsonFile, indent = 6)

    # This helper method allows for changes in nested fields by basically
    # copying the whole fields and allowing more minute changes
    def read_index_field(self, json_path, field):
        index = self.get_index(json_path)
        with open(index, "r") as jsonFile:
            data = json.load(jsonFile)
        if field in data:
            return { field : data[field] }
        return {}

    def get_index(self, json_path):
        base_dir = os.path.join(self.folder_path, json_path)
        index = os.path.join(base_dir, 'index.json')
        assert os.path.exists(index), 'Static data for ' + index + ' does not exist'
        return index

    def get_all_endpoints(self):
        index = self.get_index('Fabrics/GenZ/Endpoints')

        with open(index, "r") as jsonFile:
            data = json.load(jsonFile)

        endpoints = []

        for member in data["Members"]:
            endpoints.append(member["@odata.id"].replace('/redfish/v1/Fabrics/GenZ/Endpoints/', ''))

        return endpoints

    def build_mockup(self, assigned_endpoints):
        mockup = {}
        mockup['mockup'] = self

        endpoints = self.get_all_endpoints()
        for endpoint in assigned_endpoints:
            assert endpoint in endpoints, 'Assigned endpoint ' + endpoint + ' not found'

        mockup['endpoints'] = assigned_endpoints
        return mockup
