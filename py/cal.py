#!/usr/bin/python

from Tkinter import *
import math

key_list = ['7','8','9','+',
			'4','5','6','-',
			'1','2','3','*',
			'0','.','%','/']

top = Tk()
top.geometry('320x280')
top.resizable(False, False)     
def button(root,text,row,col,command = None):
    bt = Button(root,text = text,width = 10,height = 2,command = command)
    bt.grid(row = row,column = col)
    return bt
display = StringVar()


def colc(event):
    try:
        display.set(eval(display.get()))
    except:
        display.set('ERROR!')

Label(top,textvariable = display,bg = 'white',anchor = E,width = 44,height = 2).grid(columnspan = 20)

Key = enumerate(key_list)
for index,i in Key:
    row = index / 4 + 1
    col = index % 4
    button(top,i,row,col,lambda d = display,s = i:d.set(d.get() + s))

Keys = enumerate(['CLR','^','&','='])
for x,y in Keys:
    row = x / 4 + 5
    col = x % 4
    if(y == 'CLR'):
        button(top,y,row,col,lambda d = display:d.set(''))
    elif(y == '^'):
        button(top,y,row,col,lambda d = display:d.set(d.get() + '**'))
    elif(y == '&'):
        button(top,y,row,col,lambda d = display:d.set((math.sqrt(float(d.get()))))) 
    elif(y == '='):
        bt = button(top,y,row,col)
        bt.bind('',colc)
top.mainloop()

