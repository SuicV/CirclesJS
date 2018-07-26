/* BASIC USAGE EXAMPLE*/
new Circle(document.querySelector("#basic-usage"),{},90);
/* ADVANCED USAGE EXAMPLES */

// ANIMATION EXAMPLE
new Circle(document.querySelector(".addv1"),
    {
        lineForce : 10 ,
        color : "gold",
        startAngle : 20,
        withValue : true,
        withAnimation : true ,
        valueStyle : {
            font:"20px Arial"
        }
    },90);
// CUSTOMIZE THE WROTH VALUE
new Circle(document.querySelector(".addv2"),
    {
        lineForce :14 ,
        color : "red",
        withEndLine : true ,
        withValue : true,
        withAnimation: true,
        valueStyle : {
            color : "green",
            font:"30px Arial"
        }
    },100);