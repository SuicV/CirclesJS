/**
 * the main library
 * @param {object} canvasElement canvas dom element
 * @param {object} circleStyle object contain the circle styles
 * @param {Number} percentage number to design percentage of filled circle
 * */
function Cercle(canvasElement, circleStyle , percentage){
    this.dims = {
        w : canvasElement.offsetWidth ,
        h : canvasElement.offsetHeight
    };
    this.style = circleStyle ;
    this.content = canvasElement.getContext("2d");
    this.perc = percentage ;

    this.getRayon = function (){
        var center = this.dims.w/2;
        if(this.style.hasOwnProperty("lineForce") && this.style.lineForce > 1 ){
            return center- this.style.lineForce ;
        }
        return center ;
    };
    this.porcToRad = function (porce){
        return 2*Math.PI*porce/100
    };
    this.draw = function(){

        if(this.style.hasOwnProperty("lineForce")){
            this.content.lineWidth = this.style.lineForce ;
        }
        if(this.style.hasOwnProperty("color")){
            this.content.strokeStyle = this.style.color;
        }
        this.content.arc(this.dims.w/2 , this.dims.h/2 ,
            this.getRayon(),0,this.porcToRad(this.perc));
        this.content.stroke() ;

        if(this.style.hasOwnProperty("withValue") && this.style.withValue == true){
            this.content.fillText(this.perc+"%",this.dims.w/2,this.dims.h/2);
        }

    };
    //this.clearCanvas = function (){
    //    this.content.clearRect(0,0,this.dims.w,this.dims.h);
    //};
    this.draw();
}
var k = new Cercle(document.querySelector("#canvas"),
    {
        lineForce :10,
        color: "rgb(55,60,45)",
        withValue : true ,
        valueStyle : {
            color : "black",
            font : "15px arial"
        }
    }
    ,55);