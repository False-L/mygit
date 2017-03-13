var raf;
var requestAnimationFrame= window.requestAnimationFrame||
						   window.mozrequestAnimationFrame||
						   window.webkitrequestAnimationFrame||
						   window.msrequestAnimationFrame;
//事件绑定
var EventUtil = {
	addHandler: function(element,type,handler){
		if(element.addEventListener){
		element.addEventListener(type,handler,false);		
		}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);	
		}else{
		element["on"+type]=handler;
		}	
	},
	getEvent: function(event){
	return event?event:window.event;
	},
	getTarget:function(event){
	return event.target||event.srcElement;
	},
	preventDefault: function(){
	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue=false;
		}
	},
	removeHandler: function(element,type, handler){
	if(element.removeEventListener){
		element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
		element.detachEvent("on"+type,handler);
		}else{
		element["on"+type]=null;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropation){
		event.stopPropagation();
		}else{event.cancelBubble=true;
		}
	}
};
//构造函数模式创建对象
function Wave(width,height,speed,color){
	this.x=width;
	this.y=height;
	this.vy=speed;
	this.color=color;
	this.draw=function(){
	ctx.beginPath();
	ctx.moveTo(0,this.height);
	for(var i=0;i<this.x;i++){
	ctx.lineTo(i,Math.sin(Math.PI*i/300-Math.PI*this.vy/120)*this.y+this.y+50);
	}
	ctx.lineTo(this.x,drawing.height);
	ctx.lineTo(0,drawing.height);
	ctx.closePath();
	ctx.fillStyle=this.color;
	ctx.fill();
	};
};
var wave=new Wave(600,50,2,'rgba(0,222,255,0.3)');//默认参数

function clear(){
	ctx.fillStyle= 'rgba(255,255,255,1)';
	ctx.fillRect(0,0,drawing.width,drawing.height);
	};
function loop(){
		clear();
		wave.draw();
		wave.vy +=1;
		raf=window.requestAnimationFrame(loop);
	}

