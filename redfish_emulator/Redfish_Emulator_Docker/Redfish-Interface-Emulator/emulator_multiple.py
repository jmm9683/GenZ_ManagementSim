''' 
HOW TO USE THIS FILE
file_port is a dictionary containing the names of the top level files as the keys and the port number as the values
the relative file path starts from /api_emulator/redfish/
ex: you want mockups in top level directories called foo and bar to be run on ports 4564 and 8734 respectively.
    you decide to put them in a directory called my_mockups that is in the same directory as this script
    set file_port = { "my_mockups/foo" : 4564, "my_mockups/bar" 8734 }
    
    
HOW DOES THIS FILE WORK:
    It creates seperate threads for each instance of the emulator, passing it a directory to run statically, but it turns on the -debug option
    so that any changes to the files will cause it to reload, therefore act dynamically (with a delay every reload!).
    You need to make sure that the entire process is done booting before starting the next thread, or else it will cause errors.
    That is why there are sleep() calls after starting threads.
    
NOTE: Stopping the parent thread will kill all the instances of the emulator because daemon=True when creating the thread
    
    
maintenance info for encountering errors/updating it:
If a certain instance never gets started for no apparent reason, or if multiple ports are sharing the same data, consider increasing the sleep time after
creating the thread (because some threads may be overwriting others)
TODO
'''

#base_path = "api_emulator/redfish"
#root_folder = "api_emulator/redfish/Gen_Z_Extension_DMTF/"
#static_path = "api_emulator/redfish/static" #This would be the path that would be run if you ran the emulator by itself
'''
EDIT file_port if you want to make your own or add more directories with information
file_port = {
    "parent_directory_relative_path" : portNumber
}
'''
file_port = {
    "Gen_Z_Extension_DMTF/ManagerView" : 5000,
    "Gen_Z_Extension_DMTF/Switch1View" : 5001,
    "Gen_Z_Extension_DMTF/Switch2View" : 5002,
    "Gen_Z_Extension_DMTF/Switch3View" : 5003
    
    }

import os 
import threading
import time
import sys

DEBUG = 0;

def main():
    #print (os.listdir(os.curdir))
    
    live_threads = {}   #List of threads that are alive
    

    
    for file in file_port:  
        if DEBUG: print(str(file) + ":" + str(file_port[file]))

        #full_path = base_path + file;
        #if DEBUG: print("full_path =" + full_path)
        #if DEBUG: print("renamed " + str(file))
        port_string = str(file_port[file])
        thread = threading.Thread( target=emulator_run, args= (port_string,file,) , daemon=True) #Create a thread to run the emulator on the port specified, using the directory that was put in static
        thread.start()
        time.sleep(0)   #yield to the thread that was created
        time.sleep(5)   #wait 5 seconds for safety (may need to be increased if errors occur)
        
        live_threads[str(file_port[file])] = thread #put the thread into the dictionary
    
        if DEBUG: print("past system call")
        

        
    if DEBUG: print("DONE :)")
    
    #This prints out the original ports that were running every minute
    while len(live_threads) > 0:
        print("Original Port Numbers:")
        for thread_name in live_threads:
            print(thread_name)
        time.sleep(60)

        
        
        
        
    #this is the function the new thread will execute. It will print out the port number it is running on and then make a system call to run the emulator
def emulator_run(port_number_as_string, parent_mockup_directory):
    print("running on " + port_number_as_string)
    os.system("python emulator.py -port " + port_number_as_string + " -mockup_parent_directory " + parent_mockup_directory + " -debug")
    
    
if __name__ == '__main__':
    main()
        
        
        
        
        
