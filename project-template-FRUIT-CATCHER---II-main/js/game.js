class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                player.getPlayerAtEnd();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                         textSize(25);
                         fill("white");
                         text("Player 1 :" +allPlayers.player1.score,50,50);
                        text("Player 2 :" + allPlayers.player2.score, 50, 100);
                 
                 }
                
                if(player.score>=5){
                    player.rank += 1;
                    Player.updatePlayerAtEnd(player.rank);
                    player.update();
                    this.showRank();
                 gameState = 2; 

                }
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                      for (var i = 0; i < fruitGroup.length; i++) {
                          if (fruitGroup.get(i).isTouching(players)) {
                              fruitGroup.get(i).destroy();
                              player.score =player.score+1;
                              player.update();
                              
                          }
                          
                        }
                  }
                

         
         
        
                
    }
    showRank() {
        swal({
            title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
            text: "You reached the finish line successfully",
            imageUrl:
              "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
          });
        }
            


       

        gameOver() {
            swal({
                title: `oops!!!Game Over :(`,
                text: "You've lost all your fruit!!!Better luck next time .",
                imageUrl:"data:image/jpeg;base64,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",
                imageSize: "100x100",
                confirmButtonText: "thanks for playing "
              });
        }
            




            end(){
               console.log("Game Ended");
               console.log(player.rank)
               this.gameOver();
            }
        }
