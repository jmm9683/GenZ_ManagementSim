FROM python:3.6

WORKDIR /app

COPY Redfish-Interface-Emulator/requirements.txt ./

RUN pip install -r requirements.txt

COPY Redfish-Interface-Emulator /app

EXPOSE 5000

CMD [ "python", "emulator.py" ]
