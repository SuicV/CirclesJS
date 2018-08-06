/* BASIC USAGE EXAMPLE*/
new Circle(document.querySelector("#basic-usage"),{
    valueType : PERC,
    maxValue : 100
},90).startDrawing();
/* ADVANCED USAGE EXAMPLES */

// ANIMATION EXAMPLE
var percentageCirlce = new Circle(document.querySelector(".addv1"),
    {
        lineForce : 10 ,
        withValue : true,
        withAnimation : true ,
        valueStyle : {
            font:"20px Arial",
            color : "red"
        },
        startAngle : 46,
        valueType : PERC,
        maxValue : 100,
        animationDuration : 5000
    },90);

// CUSTOMIZE THE WROTH VALUE
var numberCircle = new Circle(document.querySelector(".addv2"),
    {
        lineForce :10 ,
        withAnimation : true,
        withValue : true,
        startAngle : 150,
        valueStyle : {
            color : "#0093b3",
            font:"30px Ubuntu"
        },
        maxAngle : (240) ,
        fillCirclRest : true ,
        valueType : NUMB,
        maxValue : 10000
    },6565);
var timeCircle = new Circle(document.querySelector(".addv3"),
    {
        valueType:TIME,
        maxValue : STimeToTimeStamp("00:05:10"),
        lineForce : 10,
        withValue:true,
        withAnimation : true,
        animationDuration : STimeToTimeStamp("00:01:05")*1000
    }
    , STimeToTimeStamp("00:01:05"));

document.addEventListener("scroll", function(){
    if(window.scrollY >= numberCircle.el.getBoundingClientRect().y+150 ){
        if(!numberCircle.drawing ){
            numberCircle.startDrawing();
        }
    }
    if(window.scrollY >= percentageCirlce.el.getBoundingClientRect().y+250){
        if(!percentageCirlce.drawing){
            percentageCirlce.startDrawing();
        }
    }
    if(window.scrollY >= timeCircle.el.getBoundingClientRect().y - 150){
        if(!timeCircle.drawing){
            timeCircle.startDrawing();
        }
    }
});
var k = new Circle(document.querySelector(".addv4"),
    {
        valueType: PERC,
        lineForce : 20,
        maxValue : 100,
        withEndLine : true,
        lineEndStyle :{
            color:"red",
            lineForce : 5
        },
        withValue : true,
        startAngle : 180,
        halfCircle:true,
        valueStyle:{
            font : "30px arial"
        },
        maxAngle:180
    },40).startDrawing();
new Circle(document.querySelector(".addv5"),{
    valueType : NUMB ,
    lineForce : 10 ,
    valueStyle :{
        font : "50px fontAwesome",
        color : "red"
    },
    withValue: true,
    maxValue : 100,
    icon : "\uf242",
    withEndLine : true,
    radius : 55,
    lineEndStyle : {
        color:"green",
        lineForce : 5
    }
},80).startDrawing();
new Circle(document.querySelector(".addv6"),{
    valueType : PERC,
    lineForce: 5,
    cornerValue : true,
    atCorner : leftTop,
    cornerValueStyle : {
        font : "15px arial",
        color : "green"
    },
    withValue:true,
    valueStyle : {
        font : "55px fontAwesome",
        color: "green"
    },
    icon : "\uf093",
    maxValue:100,
    maxAngle:180,
    startAngle : 180,
    radius:70,
    withAnimation : true ,
    fillCirclRest:true,
    fillRestStyle : {
        lineForce :5,
        color : "red"
    },
    color:"green",
    animationDuration : 5500
},100).startDrawing();