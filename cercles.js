function degToRad(deg){
    return deg*Math.PI/180 ;
}
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
        if(this.style.hasOwnProperty("maxAngle")){
            return this.style.maxAngle*porce/100 ;
        }
        return 2*Math.PI*porce/100 ;
    };

    this.getTextMiddle = function (text){
        var textWdth = this.content.measureText(text).width;
        var Size = 16; // DEFAULT FONT SIZE 16 PX
        if(this.style.hasOwnProperty("valueStyle")){
            if(this.style.valueStyle.hasOwnProperty("font")){
                var fontSize = /\d+px/.exec(this.style.valueStyle.font)[0].split(/[A-z]+/);
                if(fontSize != null ){
                    Size = parseInt(fontSize);
                }
            }
        }

        return {
            x:Math.round(textWdth/2),
            y:Math.round(Size)/2
        }
    };

    this.draw = function(){
        this.content.beginPath();
        this.clearCanvas();
        var startAngle = 0,
            endAngle = this.porcToRad(this.perc);
        // ADD CONFIG CONFIG OF CIRCLE
        // ADD LINE WIDTH TO CIRCLE
        if(this.style.hasOwnProperty("lineForce")){
            this.content.lineWidth = this.style.lineForce ;
        }
        // ADD COLOR TO CIRCLE
        if(this.style.hasOwnProperty("color")){
            this.content.strokeStyle = this.style.color;
        }
        // ADD START ANGLE
        if(this.style.hasOwnProperty("startAngle")){
            startAngle = degToRad(this.style.startAngle);
        }
        // DRAW CIRCLE
        this.content.arc(this.dims.w/2 , this.dims.h/2 ,
            this.getRayon(),startAngle,startAngle + endAngle);
        this.content.stroke() ;

        if(this.style.hasOwnProperty("withValue") && this.style.withValue == true) {
            this.writeText();
        }
        };

    this.clearCanvas = function (){
        this.content.clearRect(0,0,this.dims.w,this.dims.h);
    };

    this.writeText = function (){
        // WRITING VALUE IF DEVELOPER SET IT
        if(this.style.hasOwnProperty("valueStyle")){
            if(this.style.valueStyle.hasOwnProperty("font")){
                this.content.font = this.style.valueStyle.font ;
            }
            if(this.style.valueStyle.hasOwnProperty("color")){
                this.content.fillStyle = this.style.valueStyle.color ;
            }
        }
        var text= this.perc + "%",
            textMiddle = this.getTextMiddle(text);
        this.content.fillText(text,this.dims.w/2 - textMiddle.x
            , this.dims.h/2 + textMiddle.y/2);
    };
    this.draw();
}
