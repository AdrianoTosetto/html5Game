
var player = {
	
	x:0,
	y:0,
	height:20,
	width:80
};

var draw = function(){
	var canvas = document.getElementById("game");
	var ctx    = canvas.getContext("2d");
	player.x = (canvas.width - player.width)/2;
	player.y = canvas.height - player.height;
	ctx.fillRect(player.x,player.y,player.width,player.height);
}

window.onload = function(){
	draw();
}
