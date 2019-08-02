import pysher
import time
import sys

import logging
root = logging.getLogger()
root.setLevel(logging.INFO)
ch = logging.StreamHandler(sys.stdout)
root.addHandler(ch)

key = '0d0c62eb66a2a18bce0c'
secret = '5c2b481b3e10cf9b9919'

def msg_handler(data):
    print(data)


def connect_handler(data):
    channel = pusher.subscribe('smartlock')
    channel.bind('myevent', msg_handler)

pusher = pysher.Pusher(key)
pusher.connection.bind('pusher:connection_established', connect_handler)
pusher.connect()

while True:
    time.sleep(1)
