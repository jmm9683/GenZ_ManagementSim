# Copyright Notice:
# Copyright 2016-2019 DMTF. All rights reserved.
# License: BSD 3-Clause License. For full text see link: https://github.com/DMTF/Redfish-Interface-Emulator/blob/master/LICENSE.md

# Module for loading in static data (mockups)

import json
import os
import re

from .utils import process_id
from .exceptions import StaticLoadError
from .resource_dictionary import ResourceDictionary

class Member():
    def __init__(self, config):
        self.config = config

    @property
    def configuration(self):
        return self.config

def load_static(name, spec, mode, rest_base, resource_dictionary, mockup_parent):
    """
    Loads the static data starting at the directory ./<spec>/static/<name>, recursively.

    Populates the resdict dictionary, with the file path as the key.

    Expects a single index.json file in each directory.  Ignores other files.

    Arguments:
        name      - Name of the static data
        spec      - Which spec the data is under, must be either redfish
                    or chinook
        rest_base - Base URL of the RESTful interface
    """
    try:
        assert spec.lower() in ['redfish', 'chinook'], 'Unknown spec: ' + spec
        assert mode.lower() in ['local', 'cloud'], 'Unknown mode: ' + mode
        dirname = os.path.dirname(__file__)
        base_dir = os.path.join(dirname, spec.lower(), mockup_parent) #replaced 'static' with mockup_parent
        index = os.path.join(dirname, spec, mockup_parent, name, 'index.json') #replaced 'static' with mockup_parent
        assert os.path.exists(index), 'Static data for ' + name + ' does not exist'

        startDir = os.path.join(dirname, spec, mockup_parent, name) #replaced 'static' with mockup_parent
        for dirName, subdirList, fileList in os.walk(startDir):
#            print('Found directory: %s' % dirName)
            for fname in fileList:
                if fname != 'index.json':
                    continue
                path = os.path.join(dirName,fname)
                f = open(path)
                print(path)
                index = json.load(f)
                m = Member(index)

# Create shortpath starting at ServiceRoot
                if mode == 'Cloud':
                    shortpath = re.sub(os.path.join(dirname, spec, mockup_parent, '/'), '', path) #replaced 'static' with mockup_parent
                else:
                    relpath = os.path.join(dirname, spec, mockup_parent) #replaced 'static' with mockup_parent
                    shortpath = os.path.relpath(path, relpath)
                    shortpath = shortpath.replace('\\', '/')

                shortpath = re.sub('/index.json', '', shortpath)
                resource_dictionary.add_resource(shortpath, m)
# debug print
#        resource_dictionary.print_dictionary()

    except AssertionError as e:
        return None
        #raise StaticLoadError(e.message)
    return shortpath
