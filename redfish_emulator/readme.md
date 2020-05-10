# Simulator Readme

## Mockup folder path (Holds the JSONs files that is being statically emulated)
GenZ_ManagementSim/redfish_emulator/Redfish_Emulator_Docker/Redfish-Interface-Emulator/api_emulator/redfish/static/

## Installing Docker and Docker-compose
`sudo apt update`

`sudo apt install docker.io docker-compose`

Optionally you can also run this command, so you don't have to do sudo everytime you use docker. Though you have to reboot for this command to take into effect.

`sudo usermod -a -G docker $USER`

## Running a single Redfish emulator
In the test_1 directory, you first build the docker image from the Dockerfile by running:

`$ docker build -t <image_name> . [--build-arg machine_config=<config_name>]`

If you want to change the machine that the emulator is simulating, include the `build_arg` with `config_name` matching a folder name in the `machine_configs` folder.

To run a container based on the new image.

`docker run --rm -it -p <localhost_port_number>:5000 <image_name>`

## Running multiple Redfish emulators at once
To run multiple redfish emulators, go to the the directory where the `docker-compose.yml` file is found and run:

`docker-compose up`

Note: This configuration works with the base emulator.py script which does not currently work with the modified redfish spec

To change the machines in the emulators built, you can add or change the args for machine_config like so:

    <container_name>:
      build:
        args:
          machine_config: <config_name>

To change the IP of a container, you add or change this part in the yaml file:

    <container_name>:
      networks:
        <network_name>:
          ipv4_address: <ip_name>
