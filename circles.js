const PERC = "percentage",NUMB= "number", TIME ="time";
/*
* requestAnimationFrame polyfille
* */
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
 * function to convert times in form HH:MM:SS to Seconds
 * @param {String} string
 * @return {number}
 */
function STimeToTimeStamp(string){
    var timeStamp=0 ;
    if(/^\d{1,3}:\d{1,2}:\d{1,2}$/.test(string)) {
        var times = string.split(":").reverse();
        for(var index = 0 ; index < times.length ; index++){
            timeStamp += parseInt(times[index])*Math.pow(60,index);
        }

    }
    return timeStamp ;
}
/**
 * function to add zero's to the beginning of number
 * @param {string} numb which you wanna add zero's
 * @param {number} MaxLength length of number as string start from 0
 * */
function withZero(numb,MaxLength){
    var res = String(numb);
    if(!isNaN(parseInt(numb)) && MaxLength >= 0){
        for(var i = String(numb).length ; i< MaxLength ; i++){
            res = "0"+res;
        }
    }
    return res;
}
/**
 * function to convert a time Stamp in Seconds to form HH:MM:SS
 * @return {string}
 * */
function TimeStampToString(timeStamp){
    var String = "";
    if(!isNaN(parseInt(timeStamp)) && timeStamp > 0){
        for(var i = 2 ; i>=1 ; i--){
            if(timeStamp > Math.floor(timeStamp/(Math.pow(60,i)))){
                var k = Math.floor(timeStamp/(Math.pow(60,i)));
                String += withZero(window.String(k),2)+":";
                timeStamp -= Math.floor(k*(Math.pow(60,i)));
            }else{
                String += "0:";
            }
        }
        if(timeStamp>=0){
            String += withZero(window.String(Math.floor(timeStamp)),2);
        }
    }
    return String ;
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
    this.el = canvasElement ;
    this.content = canvasElement.getContext("2d");
    this.perc = percentage ;
    this.oldPerc = 0;
    this.currentTime = 0 ;
    this.drawing = false ;

    this.getRayon = function (){
        var center = this.dims.w/2;
        if(this.style.hasOwnProperty("lineForce") && this.style.lineForce > 1 ){
            return center- this.style.lineForce ;
        }
        return center ;
    };

    /**
     * function return an angle in radian
     * @param {Number} value  percentage to convert in angle
     * */
    this.porcToRad = function (value){
        if(this.style.hasOwnProperty("maxValue")){
            if(this.style.hasOwnProperty("maxAngle")){
                return degToRad(this.style.maxAngle) * value/this.style.maxValue ;
            }
            return 2*Math.PI*value/this.style.maxValue ;
        }
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
            if(this.style.valueStyle.font != ""){
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
        }else {
            this.content.lineWidth = 1 ;
        }
        // ADD COLOR TO CIRCLE
        if(this.style.hasOwnProperty("color")){
            this.content.strokeStyle = this.style.color;
        }else {
            this.content.strokeStyle = "black";
        }
    };

    /**
     * function to set style of text
     * */
    this.setTextStyle = function (){
        // WRITING VALUE IF DEVELOPER SET IT
        this.content.fillStyle = "black";
        this.content.font = "10px arial";

        if(this.style.hasOwnProperty("valueStyle")){
            if(this.style.valueStyle.font !="" ){
                this.content.font = this.style.valueStyle.font ;
            }
            if(this.style.valueStyle.color != "" ){
                this.content.fillStyle = this.style.valueStyle.color ;
            }
        }
    };

    /**
     * function to draw the all content of canvas
     * */
    this.draw = function(value){

        if(this.drawing == false ){
            this.drawing = true ;
        }

        this.content.beginPath();
        this.clearCanvas();

        var startAngle = 0,
            endAngle = this.porcToRad(value);

        // ADD STYLE CONFIG OF CIRCLE

        this.setCircleStyle();

        // ADD START ANGLE
        if(this.style.hasOwnProperty("startAngle")){
            startAngle = degToRad(this.style.startAngle);
        }

        // DRAW CIRCLE
        this.content.arc(this.dims.w/2 , this.dims.h/2 ,
            this.getRayon(),startAngle,startAngle + endAngle);

        this.content.stroke() ;
        if(this.style.fillCirclRest == true){
            this.fillCircleRest(startAngle + endAngle) ;
        }
        // DRAW END LINE
        if(this.style.withEndLine == true){
            this.drawEndLine(startAngle + endAngle);
        }

        // write the value in middle
        if(this.style.hasOwnProperty("withValue") && this.style.withValue == true) {
            this.writeText(value);
        }

        // when you set withAnimation attribute
        if(this.style.withAnimation == true){
            this.animate();
        }
    };

    /**
     * function for animations
     * */
    this.animate = function(){

        if(!this.style.hasOwnProperty("animationDuration")){
            this.style.animationDuration = 1000 ;
        }

        if(this.currentTime <= this.style.animationDuration && this.oldPerc != this.perc){
            var value = 0 ;
            if(this.oldPerc < this.perc){
                value = this.linearAnimation(this.oldPerc,this.perc,this.style.animationDuration , this.currentTime) ;
            }else{
                value = this.linearAnimation(this.oldPerc,this.perc,this.style.animationDuration , this.currentTime) ;

            }
            window.requestAnimationFrame(this.draw.bind(this,value));
            this.currentTime += this.getAnimationStep() ;
        }else {
            this.oldPerc = this.perc ;
            this.currentTime = 0;
        }
    };
    this.getAnimationStep  = function(){
        for(var i = 10 ; i > 0 ; i--){
            if(this.style.animationDuration%i==0){
                return i ;
            }
        }
    };
    /**
     * function to get value to draw in relation with time
     * @param {number} from animation start from
     * @param {number} to the value to draw
     * @param {number} duration duration of animation
     * @param {number} time current time
     * @return {number} value to draw
     * */
    this.linearAnimation = function (from , to , duration , time){
        return Math.round(time*(to/duration-from/duration)+this.oldPerc);
    };

    /**
     * function to clear the canvas
     * */
    this.clearCanvas = function (){
        this.content.clearRect(0,0,this.dims.w,this.dims.h);
    };

    /**
     * function to write the value in the middle of canvas
     * */
    this.writeText = function (value){
        this.setTextStyle() ;

        var text= String(value) ;
        if(this.style.valueType == PERC){
            text += "%";
        }else if(this.style.valueType == TIME){
            text = TimeStampToString(value);
        }
        var textMiddle = this.getTextMiddle(String(text));

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
        this.content.moveTo(endPoint.x , endPoint.y );
        this.content.lineTo(this.dims.w/2, this.dims.h/2);
        this.content.stroke();

    };

    /**
     * function to fill the rest of circle
     * @param {number} startAngle radian angle
     * */
    this.fillCircleRest = function (startAngle){

        this.content.beginPath();
        this.content.strokeStyle = "gray";
        if(this.style.hasOwnProperty("fillRestStyle")){
            if(this.style.fillRestStyle.color != ""){
                this.content.strokeStyle = this.style.fillRestStyle.color;
            }
        }
        var endAngle = 2*Math.PI ;
        // ADD START ANGLE
        if(this.style.hasOwnProperty("maxAngle")){
            endAngle = degToRad(this.style.maxAngle) ;
        }
        if(this.style.startAngle>0){
            endAngle += degToRad(this.style.startAngle);
        }

        this.content.arc(this.dims.w/2 , this.dims.h/2 ,
            this.getRayon(),startAngle,endAngle);

        this.content.stroke();
    };

    this.setValue = function (value){
        this.perc = value ;
    };
    this.updateCircleStyle = function (style){
        this.style = style ;
    };

    this.startDrawing = function (){
        this.currentTime = 0 ;

        // WHEN DEV CREATE INSTANCE OF THIS OBJECT
        if(this.style.withAnimation != true){
            this.oldPerc = this.perc ;
        }
        this.draw(this.oldPerc);
        return this ;
    }
}