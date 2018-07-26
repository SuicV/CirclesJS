window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**
 * function return to convert degree angle to a radian angle
 * @param {number} deg the degree to convert
 * */
function degToRad(deg){
    return deg*Math.PI/180 ;
}

/**
 * function to get a cartesian coordination from polar coordination
 * @param {Number} circleR the rayon of the circle
 * @param {Number} angle angle of the polar coordination
 * */
function getCordFromAngle(circleR, angle){
    var pointCord = {};
    var x = circleR + circleR*Math.cos(angle);
    var y = circleR + circleR*Math.sin(angle);
    pointCord["x"] =Math.round( x );
    pointCord["y"] =Math.round( y );
    return pointCord ;
}

/**
 * the main library
 * @param {object} canvasElement canvas dom element
 * @param {object} circleStyle object contain the circle styles
 * @param {Number} percentage number to design percentage of filled circle
 * */
function Circle(canvasElement, circleStyle , percentage){
    this.dims = {
        w : canvasElement.offsetWidth ,
        h : canvasElement.offsetHeight
    };
    this.style = circleStyle ;
    this.content = canvasElement.getContext("2d");
    this.perc = percentage ;
    this.oldPerc = 0;

    this.getRayon = function (){
        var center = this.dims.w/2;
        if(this.style.hasOwnProperty("lineForce") && this.style.lineForce > 1 ){
            return center- this.style.lineForce ;
        }
        return center ;
    };
    /**
     * function return an angle in radian
     * @oaram {Number} perce of
     * */
    this.porcToRad = function (perce){
        if(this.style.hasOwnProperty("maxAngle")){
            return this.style.maxAngle*porce/100 ;
        }
        return 2*Math.PI*perce/100 ;
    };
    /**
     * function get coordination of a text if it in the middle
     * @param {String} text the value to write it in the middle of canvas
     * @return {Object} contain coordination o
     * */
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
    /**
     * function to set style of circle
     * */
    this.setCircleStyle = function(){
        // ADD LINE WIDTH TO CIRCLE
        if(this.style.hasOwnProperty("lineForce")){
            this.content.lineWidth = this.style.lineForce ;
        }
        // ADD COLOR TO CIRCLE
        if(this.style.hasOwnProperty("color")){
            this.content.strokeStyle = this.style.color;
        }
    };
    /**
     * function to set style of text
     * */
    this.setTextStyle = function (){
        // WRITING VALUE IF DEVELOPER SET IT
        if(this.style.hasOwnProperty("valueStyle")){
            if(this.style.valueStyle.hasOwnProperty("font")){
                this.content.font = this.style.valueStyle.font ;
            }
            if(this.style.valueStyle.hasOwnProperty("color")){
                this.content.fillStyle = this.style.valueStyle.color ;
            }
        }
    };

    /**
     * function to draw the all content of canvas
     * */
    this.draw = function(){
        console.log(this.content.font);
        if(this.oldPerc <= this.perc ){

            this.content.beginPath();
            this.clearCanvas();

            var startAngle = 0,
                endAngle = this.porcToRad(this.oldPerc);

            // ADD CONFIG CONFIG OF CIRCLE
            this.setCircleStyle();

            // ADD START ANGLE
            if(this.style.hasOwnProperty("startAngle")){
                startAngle = degToRad(this.style.startAngle);
            }

            // DRAW CIRCLE
            this.content.arc(this.dims.w/2 , this.dims.h/2 ,
                this.getRayon(),startAngle,startAngle + endAngle);

            this.content.stroke() ;

            // DRAW END LINE
            if(this.style.withEndLine == true){
                this.drawEndLine(startAngle + endAngle);
            }

            // write the value in middle
            if(this.style.hasOwnProperty("withValue") && this.style.withValue == true) {
                this.writeText();
            }
            // when you set withAnimation attribute
            if(this.style.withAnimation == true){

                this.oldPerc += 1 ;

                window.requestAnimationFrame(this.draw.bind(this));
            }
        }
    };

    /** function to clear the canvas
     * */
    this.clearCanvas = function (){
        this.content.clearRect(0,0,this.dims.w,this.dims.h);
    };

    /** function to write the value in the middle of canvas
     * */
    this.writeText = function (){
        this.setTextStyle() ;

        var text= this.oldPerc + "%",
            textMiddle = this.getTextMiddle(text);
        this.content.fillText(text,this.dims.w/2 - textMiddle.x
            , this.dims.h/2 + textMiddle.y/2);
    };
    /**
     * function to draw the line in the end of filled circle
     * @param {Number} angle radian angle
     * */
    this.drawEndLine = function(angle){
        var endPoint = getCordFromAngle(this.dims.w/2,angle);
        this.content.lineWidth = 4 ;
        this.content.beginPath();
        this.content.moveTo(this.dims.w/2 , this.dims.h/2);
        this.content.lineTo(endPoint.x , endPoint.y );
        this.content.stroke();
    };

    // WHEN DEV CREATE INSTANCE OF THIS OBJECT
    if(this.style.hasOwnProperty("withAnimation")){
        if(this.style.withAnimation == true){
            this.draw();
        }
    }else{
        this.oldPerc = this.perc ;
        this.draw();
    }
}
