var canvas;
var ctx;
var player = {
	
	x:0,
	y:0,
	height:20,
	width:80,
	move:function(key){
		if(key == 37){
			this.x++;
			console.log(this.x);
		}	
	}
};

var draw = function(){
	ctx.fillRect(player.x,player.y,player.width,player.height);
}

var update = function(){
	document.onkeydown = function(key){
		player.move(key);
	}
}

window.onload = function(){

	canvas =  document.getElementById("game");
	ctx    = canvas.getContext("2d");
	player.x = (canvas.width - player.width)/2;
	player.y = canvas.height - player.height;
	window.setInterval(function(){ //it will be used resquestAnimationFrame
		update();
		draw();
	},500);
}
