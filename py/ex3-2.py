#!/usr/bin/env python

from __future__ import print_function,division

def do_twice(f,args):
	f(args)
	f(args)

def print_spam(args):
	print(args)

do_twice(print_spam,'spam')