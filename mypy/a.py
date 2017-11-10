#!/usr/bin/env python
# -*- coding: utf-8 -*-
print 'hello world'

import os
os.system('hostname')

l = list('bale')
print l
print type(l)

import sys

print """aaa
bbb
ccc
"""

c = chr(97)
print "chr(97)'s value is",c

d = ord(c)
print "ord('a')'s value is",d

e = str(12)
print e
print type(e)

print range(10)

print max(1,2,3)
print min(1,2,3)
print len('abcdxxx')

print divmod(10,3)

print callable('a')
print callable(c)

f = range(5)
print f
print 1 in f
del f[1]
print f
print 1 in f
print len(f)

d1 = dict(name='huyang',age=10)
d2 = {'name':'huyang','age':10}
print d1
print d2

print {v:k for k,v in d1.items()}



class Point3D(object):
    def __init__(self,x,y,z):
        self.x=x
        self.y=y
        self.z=z
    def __repr__(self):
        return "(%d, %d, %d)" %(self.x,self.y,self.z)

my_point = Point3D(1,2,3)
print my_point
print type(my_point)

#lamdba

print locals()

u = "123"
print u.isdigit()

import os
print os.listdir('.')
print os.path.isdir('i.py')
print os.path.isfile('i.py')

print os.path.join('a','b','c')   #/a/b/c

