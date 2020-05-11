# Copyright Notice:
# Copyright 2016-2019 DMTF. All rights reserved.
# License: BSD 3-Clause License. For full text see link: https://github.com/DMTF/Redfish-Interface-Emulator/blob/master/LICENSE.md

# Resource Dictionary

# Variable to store resource dictionary
import logging

resdict = {}
full_paths = []

class ResourceDictionary(object):

    def __init__(self):
        logging.info('Init ResourceDictionary.')


    def get_resource(self, path):
        obj = resdict[path].configuration
        return obj

    def get_object(self, path):
        return resdict[path]

    def add_resource(self, path, obj, full_path):
        resdict[path] = obj
        full_paths.append(full_path)
        return obj

    def delete_resource(self, path):
        del resdict[path]

    def get_paths(self):
        return full_paths

    def print_dictionary(self):
        for x in resdict:
            print('Key: ')
            print(x)
            print('Value: ')
            print(resdict[x])

