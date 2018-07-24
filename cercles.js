/**
 * the main library
 * @param {object} canvasElement canvase dom element
 * @param {object} cercleStyle object contain the cercles styles
 * @param {Number} porcentage number to design porcentage of filled circle
 * */
function Cercle(canvasElement, cercleStyle , porcentage){
    this.dims = {
        w : canvasElement.offsetWidth ,
        h : canvasElement.offsetHeight
    };
    this.style = cercleStyle ;
    this.content = canvasElement.getContext("2d");
    this.porc = porcentage ;
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
        console.log(this.getRayon());
        if(this.style.hasOwnProperty("lineForce")){
            this.content.lineWidth = this.style.lineForce ;
        }
        this.content.arc(this.dims.w/2 , this.dims.h/2 ,
            this.getRayon(),0,this.porcToRad(this.porc));
        this.content.stroke() ;
    };

    this.draw();
}
var k = new Cercle(document.querySelector("#canvas"),{lineForce : 4},20);