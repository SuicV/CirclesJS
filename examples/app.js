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
        fillCirclRest : true,
        fillRestStyle : {
            color:"red"
        },
        startAngle : 180
    },90);
// CUSTOMIZE THE WROTH VALUE
new Circle(document.querySelector(".addv2"),
    {
        lineForce :14 ,
        color : "red",
        withEndLine : true ,
        withValue : true,
        withAnimation : true ,
        startAngle : 180,
        valueStyle : {
            color : "green",
            font:"30px Arial"
        },
        maxAngle : Math.PI ,
        fillCirclRest: true ,
        fillRestStyle : {
            color : "green"
        }
    },100);