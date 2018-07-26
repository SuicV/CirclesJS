/* BASIC USAGE EXAMPLE*/
var basic = new Cercle(document.querySelector("#basic-usage"),{},90);
/* ADVANCED USAGE EXAMPLES */

// ANIMATION EXAMPLE
var addvanced = new Cercle(document.querySelector(".addv1"),
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
var addvanced2 = new Cercle(document.querySelector(".addv2"),
    {
        lineForce : 25 ,
        color : "red",
        startAngle : 20,
        withValue : true,
        valueStyle : {
            color : "green",
            font:"30px Arial"
        }
    },54);