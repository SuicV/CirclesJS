Circles library
===============

introduction
------------
**Circles** is a small javascript library to create **_percentage circle_** using canvas .
*by default the circle will take all width and height*

features
--------
* start draw circle from a given angle
* styling circle and written percentage on middle
* animate filling circle and written percentage
* compatible with mobiles

how to use it
-------------
you have to initialize new Circle object and set arguments
1. first argument is a canvas **DOMElement**
2. second argument is a **Object** contain the circle attributes
3. third argument is the percentage to fill

#### Available attributes for the second argument
**Attributes of the circle**
> valueType

used to determinate type of the value that will the circle draw this argument **obligated**,
you can use the following const
* NUMB : to draw a number
* PERC : to draw a percentage

> maxValue

used to specify the max value can the cirle draw this argument **obligated** **(type int)**

> startAngle

this attribute used to set the beginning angle of drawing in degree **(type int)**

>maxAngle

used to specify the max angle of the circle in degree **(type int)**

> lineForce

used to set a width of circle line **(type int)**

> color

the color of circle **(type String)**
> withAnimation

used to tell the object to animate drawing the circle from 0% to the given percentage **(type bool)**

> animationDuration

this attribute used to set a time in ms to fill the circle **(type int)** by default is 1000 ms

> withEndLine

used to draw line from centre to end point of the filled circle **(type bool)**

> fillCirclRest

used to tell the object to fill unfilled range on the circle **(type bool)**

> fillRestStyle

this attribute is to set the style of filling the rest of circle **(type object)**
contain the following attributes

**1. color :** to set the color by default the color is black set this attribute to change it

**Attributes of written value in middle**

>withValue

used to write a value in middle to do that set this attribute as true

>valueStyle

this attribute is an object can have the following attribute

**1. font :**
used to set the font style of the value , you have to set the font size and the font family
**(type string)**

**2. color :**
used to set the font color of the value **(type string)**

**Important Note** : to start drawing you have to call startDrawing Method we add this method to start drawing with the scroll

Examples
--------
you can find a good example on examples folder
