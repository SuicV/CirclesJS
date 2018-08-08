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
* use font awesome

how to use it
-------------
you have to initialize new Circle object and set arguments
1. first argument is a canvas **DOMElement**
2. second argument is a **Object** contain the circle attributes
3. third argument is the percentage to fill

**Note** when you wanna draw a time circle you have to set a time stamp in seconds or convert a time in form "HH:MM:SS" to a time stamp using STimeToTimeStamp function
take as parameter : string present time in the form above

#### Available attributes for the second argument
**Attributes of the circle**
> valueType

used to determinate type of the value that will the circle draw this argument **obligated**,
you can use the following const
* NUMB : to draw a number circle
* PERC : to draw a percentage circle
* TIME : to draw a time circle

> maxValue

used to specify the max value can the cirle draw this argument **obligated** **(type int)**

> startAngle

this attribute used to set the beginning angle of drawing in degree **(type int)**

>maxAngle

used to specify the max angle of the circle in degree **(type int)**
**note** you can use STimeToTimeStamp function to set Time form

> lineForce

used to set a width of circle line **(type int)**

> color

the color of circle **(type String)** Default color *black*

> withAnimation

used to tell the object to animate drawing the circle from 0% to the given percentage **(type bool)**

> animationDuration

this attribute used to set a time in ms to fill the circle **(type int)** by default is 1000 ms

> withEndLine

used to draw line from centre to end point of the filled circle **(type bool)**

>lineEndStyle

this attribute is an object , used to styling the line end take as attribute :

* **1- color** : to change default color (white) **(type string)**
* **2- lineForce** : to change default line width (1px) **(type number)**

> fillCirclRest

used to tell the object to fill unfilled part on the circle **(type bool)**

> fillRestStyle

this attribute is to set the style of filling the rest of circle **(type object)**
contain the following attributes

**1. color :** by default the color is gray set this attribute to change it

**2. lineForce :** this attribute used for setting the line width of the unfilled part of the circle by default is 1 px **(type number)**

> radius

to set the radius of the circle in px **(type int)**

**Attributes of written value in middle**

>withValue

used to write a value in middle to do that set this attribute as true

>valueStyle

this attribute is an object can have the following attribute

**1. font :**
used to set the font style of the value , you have to set the font size and the font family **(type string)** you can now use fontAwesome

**2. color :**
used to set the font color of the value **(type string)**

> icon

this attribute used to set the unicode character of font awesome to draw it as value in middle of circle

> whitBorder

this attribute used to draw a border around the whole circle , that attribute take an object with the following attributes

* **lineForce :** to set a width to the border which is around the circle this value **(type number)**

* **color :** to set a color to the border **(type : string)** . default color is **gray**

**Attributes of written value in corner**
> cornerValue

attribute used write the filled value of the circle at any top corner **(type bool)**

> atCorner

used to set a corner which you want to write the value in , this attribute take the following const or string

* rightTop
* leftTop

**Note :** this two attributes above is obligatory to write the value at corner

> cornerValueStyle

this attribute used to styling the written value in corner **(type object)** take as attributes

* **font**
* **color**

**Important Note** : to start drawing you have to call startDrawing Method we add this method to give choice to draw circle in any time

Examples
--------
you can find a good example on examples folder
