FROM python:3.6

# ARG machine_config=default_config

WORKDIR /app

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . /app

# Uncomment to allow for running a specific static config in the Gen_Z modified mockups
# COPY /app/api_emulator/Gen_Z_Extension_DMTF/$machine_config /app/api_emulator/redfish/static

EXPOSE 5000

CMD [ "python", "emulator.py", "-debug"]
