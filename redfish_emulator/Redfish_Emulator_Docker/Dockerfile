FROM python:3.6

# ARG machine_config=default_config

WORKDIR /app

COPY Redfish-Interface-Emulator/requirements.txt ./

RUN pip install -r requirements.txt

COPY Redfish-Interface-Emulator /app

# COPY machine_configs/$machine_config /app/api_emulator/redfish

EXPOSE 5000

CMD [ "python", "emulator.py" ]
