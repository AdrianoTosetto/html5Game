/***
 *    ___________.__                    .__                                      ___.                                     
 *    \_   _____/|  |__     ____   ____ |__| ______   ______ ___  ___________    \_ |_________ __ _____  _______    ____  
 *     |    __)_ |  |  \   /    \ /  _ \|  |/  ___/  / ____/ \  \/ /  _ \__  \    | __ \_  __ \  |  \  \/  |__  \  /  _ \ 
 *     |        \|   Y  \ |   |  (  <_> )  |\___ \  < <_|  |  \   (  <_> ) __ \_  | \_\ \  | \/  |  />    < / __ \(  <_> )
 *    /_______  /|___|  / |___|  /\____/|__/____  >  \__   |   \_/ \____(____  /  |___  /__|  |____//__/\_ (____  /\____/ 
 *            \/      \/       \/               \/      |__|                 \/       \/                  \/    \/        
 */


var collision = false;
var canvas;
var ctx;
var enemies = [];
var Enemy  = function(x,y){
	this.x   = x;
	this.y   = y;
	this.src = "enemy.png";
	this.draw = function(context){
		var img = new Image();
		img.src = this.src;
		context.drawImage(img,this.x,this.y);
	}
	this.move = function(){
		if(this.x > 500){
			this.x = 0;
			this.y+=15;
		}else{
			this.x+=5;
		}
	}
}
enemy = new Enemy(10,10);
var Bullet =  function(x,y){
	this.x = x;
	this.y = y;
	this.height = 20;
	this.width  = 5;
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
			var x = player.x + player.width/2 - player.bullets[0].width/2;
			var y = player.y - player.height - 1;
			this.bullets.push(new Bullet(x,y));
			
		}
	},
	draw:function(context){
		context.fillRect(this.x,this.y,this.width,this.height);	
	}
};

var draw = function(){
	ctx.clearRect(0,0,canvas.height,canvas.width);
	player.draw(ctx);
	for(var i = 0; i < player.bullets.length;i++){
		ctx.fillRect(player.bullets[i].x,player.bullets[i].y,player.bullets[0].width,player.bullets[0].height);	
	}
	for(var i = 0; i < enemies.length;i++){
		enemies[i].draw(ctx);
	}
}

var update = function(){
	verifyCollisions();
	document.onkeydown = function(key){
		player.move(key);
	}
	document.onkeyup = function(key){
		player.shoot(key);
	}
	for(var i = 1; i < player.bullets.length;i++){
		if(player.bullets[i].y > 0){
			player.bullets[i].y -= 20
		}else{
			player.bullets.pop(i);
		}
	}
	for(var i = 0; i < enemies.length;i++){
		enemies[i].move();
	}
}

function verifyCollisions(){ //it needs to be improved
	for(var i = 0; i < enemies.length;i++){
		for(var j = 0; j < player.bullets.length;j++){
			if(Math.abs(player.bullets[j].x - enemies[i].x) < 30 && Math.abs(player.bullets[j].y - enemies[i].y) < 20){
				colision = true;
				enemies.pop(i);
				player.bullets.pop(j);
				break;
			}
		}
	}
}

function initEnemies(){ //grid of enemies: 4 x 8 
	var ens = [];
	var x = 20,y = 20;
	for(var i = 0; i < 16;i++){
		if(i % 4 == 0){
			y+=50;
			x=20;
		}
		x+=80;
		enemies.push(new Enemy(x,y));
	}

	return ens;
}

window.onload = function(){
	initEnemies();
	canvas =  document.getElementById("game");
	ctx    = canvas.getContext("2d");
	player.x = (canvas.width - player.width)/2;
	player.y = canvas.height - player.height;
	window.setInterval(function(){ //it will be used resquestAnimationFrame
		update();
		draw();
	},25);
}
