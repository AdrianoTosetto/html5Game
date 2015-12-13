var canvas;
var ctx;
var Bullet =  function(x,y){
	this.x = x;
	this.y = y;
	this.height = 20;
	this.width  = 20;
};
var player = {
	bullets:[new Bullet(0,0)],
	x:0,
	y:0,
	height:20,
	width:80,
	move:function(key){
		if(key.keyCode == 37){
			this.x-=3;
		}
		if(key.keyCode == 39){
			this.x+=3;
		}
	},
	shoot:function(key){
		if(key.keyCode == 32){
			this.bullets.push(new Bullet(player.x,player.y - player.height - 1));
			console.log(player.bullets.length)
		}
	}
};

var draw = function(){
	ctx.clearRect(0,0,canvas.height,canvas.width);
	ctx.fillRect(player.x,player.y,player.width,player.height);
	for(var i = 0; i < player.bullets.length;i++){
		ctx.fillRect(player.bullets[i].x,player.bullets[i].y,20,20);	
	}
	
	console.log(player.bullets[0].x);
}

var update = function(){
	document.onkeydown = function(key){
		player.move(key);
		player.shoot(key);
		
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
	},50);
}
