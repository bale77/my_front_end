#!/usr/bin/python

from datetime import datetime

time = datetime.now()

print time
print time.year
print time.month
print time.day
print time.hour
print time.minute
print time.second

dict = {'a':'b','c':'d'}
print dict.items()
print dict.keys()
print dict.values()

for i in dict:
	print i,dict[i]

print ['QW' for x in range(5) if x < 3]
print range(5)

str = 'abcdefg'
print str
#str[start:end:stride]
print str[1:5:2]
print str[::-1]

