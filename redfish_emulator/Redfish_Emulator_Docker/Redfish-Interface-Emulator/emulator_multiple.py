''' 
HOW TO USE THIS FILE
root_folder is the folder you have all the mockups in
static_path is the path where the original/default static file is located (if it doesn't exist, it is fine)
static_path_temp is the path the static_path will be renamed to temporarily
file_port is a dictionary containing the names of the top level files as the keys and the port number as the values

ex: you want mockups in top level directories called foo and bar to be run on ports 4564 and 8734 respectively.
    you decide to put them in a directory called my_mockups that is in the same directory as this script
    set root_folder to my_mockups/
    set file_port = { "foo" : 4564, "bar" 8734 }
    
    
maintenance info for encountering errors/updating it:
If a certain instance never gets started for no apparent reason, or if multiple ports are sharing the same data, consider increasing the sleep time after
creating the thread (because some threads may be overwriting others)
TODO
'''

base_path = "api_emulator/redfish"
root_folder = "api_emulator/redfish/Gen_Z_Extension_DMTF/"
static_path = "api_emulator/redfish/static" #DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING
static_path_temp = "api_emulator/redfish/static_old_temp"
file_port = {
    "Gen_Z_Extension_DMTF/FabricManagerView" : 5000,
    "Gen_Z_Extension_DMTF/Switch1View" : 5001,
    "Gen_Z_Extension_DMTF/Switch2View" : 5002,
    "Gen_Z_Extension_DMTF/Switch3View" : 5003
    
    }

import os 
import threading
import time
import sys

def main():
    #print (os.listdir(os.curdir))
    
    live_threads = {}   #List of threads that are alive
    
    #if os.path.exists(static_path): #if the static path exists, rename it to the temporary name specified
    #    os.rename(static_path, static_path_temp)
    
    for file in file_port:  
        print(str(file) + ":" + str(file_port[file]))
    #    os.rename(root_folder + str(file), static_path) #rename the directory to the api_emulator/redfish/static
        full_path = base_path + file;
        print("full_path =" + full_path)
        print("renamed " + str(file))
        port_string = str(file_port[file])
        thread = threading.Thread( target=emulator_run, args= (port_string,file,) , daemon=True) #Create a thread to run the emulator on the port specified, using the directory that was put in static
        thread.start()
        time.sleep(0)   #yield to the thread that was created
        time.sleep(5)   #wait 5 seconds for safety (may need to be increased if errors occur)
        
        live_threads[str(file_port[file])] = thread #put the thread into the dictionary
    
        print("past system call")
        
    #    os.rename(static_path, root_folder + str(file)) #rename the directory back to what it was
        
    #if os.path.exists(static_path_temp):    #put the old static file back as static if it existed
    #    os.rename(static_path_temp, static_path)
        
    print("DONE :)")
    
    #THIS ALLOWS FOR KILLING OF A SPECIFIC PORT
    while len(live_threads) > 0:
        print("Port numbers alive:")
        for thread_name in live_threads:
            print(thread_name)
        time.sleep(60)
        #num = input("Type in the number of the port you want to kill (and only the number of the port you want to kill")
        #if num == "0":
        #    os._exit(0)
            #sys.exit(0)
            #for thread_name in live_threads:
            #   live_threads[thread_name].raise_exception()
        #if num in live_threads:
            #live_threads[num].raise_exception()
            #print("should have killed thread in port " + num)
        #else:
            #print("'" + num + "'" + " not valid to kill")
        
        
        
        
def emulator_run(port_number_as_string, parent_mockup_directory):
    print("running on " + port_number_as_string)
    os.system("python emulator.py -port " + port_number_as_string + " -mockup_parent_directory " + parent_mockup_directory + " -debug")
    
    
if __name__ == '__main__':
    main()
        
        
        
        
        
