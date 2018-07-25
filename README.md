Circles library
===============

introduction
------------
**Circles** is a small javascript library to create **_percentage circle_** using canvas

features
--------
* start draw circle from a given angle
* styling circle and wroth percentage on middle

how to use it
-------------
you have to initialize new Circle object and set arguments
1. first argument is a canvas **DOMElement**
2. second argument is a **Object** contain the circle attributes
3. third argument is the percentage to fill

#### Available attributes for the second argument
**Attributes of the circle**
> startAngle

this attribute used to set the beginning angle of drawing in degree **(type int)**
> lineForce

used to set a width of circle line **(type int)**
> color

the color of circle (type String)

**Attributes of wroth value in middle**

>withValue

used to write a value in middle to do that set this attribute as true

>valueStyle

this attribute is an object can have the following attribute

**1. font :**
used to set the font style of the value , you have to set the font size and the font family

**2. color :**
used to set the font color of the value

Examples
--------
you can find a good example on examples folder
