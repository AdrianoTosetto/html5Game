/***
 *    ___________.__                    .__                                      ___.                                     
 *    \_   _____/|  |__     ____   ____ |__| ______   ______ ___  ___________    \_ |_________ __ _____  _______    ____  
 *     |    __)_ |  |  \   /    \ /  _ \|  |/  ___/  / ____/ \  \/ /  _ \__  \    | __ \_  __ \  |  \  \/  |__  \  /  _ \ 
 *     |        \|   Y  \ |   |  (  <_> )  |\___ \  < <_|  |  \   (  <_> ) __ \_  | \_\ \  | \/  |  />    < / __ \(  <_> )
 *    /_______  /|___|  / |___|  /\____/|__/____  >  \__   |   \_/ \____(____  /  |___  /__|  |____//__/\_ (____  /\____/ 
 *            \/      \/       \/               \/      |__|                 \/       \/                  \/    \/        
 */

var canvas;
var ctx;
var Enemy  = function(x,y){
	this.x   = x;
	this.y   = y;
	this.src = "enemy.png";
	this.draw = function(context){
		var img = new Image();
		img.src = this.src;
		context.drawImage(img,0,0);
	}
}
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
			console.log(player.bullets.length)
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
	
	console.log(player.bullets[0].x);
	new Enemy(10,10).draw(ctx);
}

var update = function(){
	document.onkeydown = function(key){
		player.move(key);
	}
	document.onkeyup = function(key){
		player.shoot(key);
	}
	for(var i = 0; i < player.bullets.length;i++){
		player.bullets[i].y-=20;
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
