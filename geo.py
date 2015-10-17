import urllib
from urllib2 import urlopen

ip = urlopen('http://ip.42.pl/raw').read()
response = urllib.urlopen('http://api.hostip.info/get_html.php?ip=' + ip + '&position=true').read()

print(response)
