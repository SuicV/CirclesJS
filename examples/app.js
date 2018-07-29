/* BASIC USAGE EXAMPLE*/
new Circle(document.querySelector("#basic-usage"),{
    maxValue : 100,
    valueType : PERC
},90).startDrawing();
/* ADVANCED USAGE EXAMPLES */

// ANIMATION EXAMPLE
new Circle(document.querySelector(".addv1"),
    {
        lineForce : 10 ,
        color : "gold",
        withValue : true,
        withAnimation : true ,
        valueStyle : {
            font:"20px Arial"
        },
        startAngle : 180,
        maxValue : 100,
        valueType : PERC
    },90).startDrawing();
// CUSTOMIZE THE WROTH VALUE
var k = new Circle(document.querySelector(".addv2"),
    {
        lineForce :14 ,
        color : "#0093b3",
        withValue : true,
        withAnimation: true,
        valueStyle : {
            color : "#0093b3",
            font:"30px Arial"
        },
        maxAngle : (300) ,
        fillCirclRest: true,
        fillRestStyle : {
            color :"#8edcfb"
        },
        startAngle : 120 ,
        maxValue : 10000,
        valueType  : NUMB
    },9000);
// START DRAWING WHEN IT'S VISIBLE IN PAGE
document.addEventListener("scroll", function(){
    if(window.scrollY >= window.scrollMaxY - 50 ){
        if(!k.drawing ){
            k.startDrawing();
        }
    }
});