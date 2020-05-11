import json
import requests
import g
#from .api_emulator.redfish.GenZSwitch_api import GenZSwitch, GenZSwitchCollection, CreateGenZSwitch
#import sys
# insert at 1, 0 is the script path (or '' in REPL)
#sys.path.append('/Redfish-Interface-Emulator-master/api_emulator/redfish/')
#from GenZSwitch_api import GenZSwitch, GenZSwitchCollection, CreateGenZSwitch
from api_emulator.redfish.GenZSwitch_api import GenZSwitch, GenZSwitchCollection, CreateGenZSwitch
#import api_emulator.redfish.GenZSwitch_api

port = 5000
#host_url = 'http://172.29.1.2'
host_url = 'http://localhost'

if __name__ == "__main__" :
    #create a GenZSwitch from the template
    s = CreateGenZSwitch(resource_class_kwargs={
                'rb': g.rest_base}).put('1')
    #create a second GenZSwitch from the template
    s2 = CreateGenZSwitch(resource_class_kwargs={
                'rb': g.rest_base}).put('2')

    #get the first GenZSwitch
    x = GenZSwitch.get('1')
    print(x)
    #get the second GenZSwitch
    x2 = GenZSwitch.get('2')
    print(x2)

    #delete the 2nd GenZSwitch
    GenZSwitch.delete('2')
    #try to get it after it is deleted
    x2 = GenZSwitch.get('2')
    print('x2 status:' + str(x2))
    #get x again after x2 was deleted
    x = GenZSwitch.get('1')
    print('after x2 was deleted: x is: ' + str(x))


    #r = requests.get(str(host_url) + ':' + str(port) + '/redfish/v1' )
    #print (r.content)
    r = requests.get(str(host_url) + ':' + str(port) + '/redfish/v1/Fabrics/GenZ/Switches' )
    print (r.content)
