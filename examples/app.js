/* BASIC USAGE EXAMPLE*/
new Circle(document.querySelector("#basic-usage"),{},90);
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
        startAngle : 180
    },90);
// CUSTOMIZE THE WROTH VALUE
new Circle(document.querySelector(".addv2"),
    {
        lineForce :14 ,
        color : "#0093b3",
        withValue : true,
        withAnimation : true ,
        startAngle : 150,
        valueStyle : {
            color : "#0093b3",
            font:"30px Arial"
        },
        maxAngle : degToRad(240) ,
        fillCirclRest: true,
        fillRestStyle : {
            color :"#f6f6f6"
        }
    },55);