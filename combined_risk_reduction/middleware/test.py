import requests
import datetime
import json
from requests.auth import HTTPBasicAuth
'''

url = 'http://127.0.0.1:8080/add'
myobj = {'contexturl': '',
        'etag': '',
        'redfishid':'',
        'name':'',
        'oem':'',
        'description':'',
        'address':'',
        'status':'ONLINE',
        'last_update': str(datetime.datetime.now())
}

x = requests.post(url, data = json.dumps(myobj))
print(x)

'''


# get the valid components from the redfish api


# redfish api



def check_redfish():
    urls = ["http://127.0.0.1:5000"]

    component_urls = []

    for url in urls:
        response = requests.get(url+"/redfish/v1/Systems",verify=False, auth=HTTPBasicAuth('root', 'password123456') )
        json_data = json.loads(response.text)
        Systems_ids = json_data['Members']
        print(Systems_ids)

        for comp in Systems_ids:
            component_urls.append(url+comp['@odata.id'])
    print(component_urls)

    for comp_url in component_urls:
        response = requests.get(comp_url,verify=False, auth=HTTPBasicAuth('root', 'password123456') )
        json_data = json.loads(response.text)

        status = json_data['Status']['Health']
        redfishid = json_data['Id']
        name = json_data['Name']
        description = json_data['Description']
        contexturl = comp_url
        address = comp_url
        etag = json_data['Model']
        oem = json_data['Manufacturer']


        # send changes to flask server


        url = 'http://10.145.238.171:8080/edit/'+redfishid
        myobj = {'contexturl': contexturl,
                'etag': etag,
                'name':name,
                'oem':oem,
                'description':description,
                'address':address,
                'status':status,
                'last_update': str(datetime.datetime.now())
        }

        x = requests.post(url, data = json.dumps(myobj))
        print(x)


    # sleep for 10 seconds


import time

while(True):
    check_redfish()
    time.sleep(1)


# if components is different -> add a new component

# if different ->

#    create request editing the data to the frontend

#    stamp the data and send
