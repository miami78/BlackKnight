"use strict";!function(){function a(){return Math.floor(9*Math.random()+1)}function p(o,t){return $('div[data-col="'.concat(o,'"][data-row="').concat(t,'"]'))[0]}function e(){this.gridContainer=document.getElementById("grid-container"),this.player1=null,this.player2=null,this.barriers=[],this.weapons=e.WEAPONS,this.activePlayer="player1",this.defending=!1;var a=this;$(this.gridContainer).click(function(o){var t=o.target,e={col:Number(t.dataset.col),row:Number(t.dataset.row)};a.tryMoveActivePlayer(e),a.tryFight()})}var o="sword";function t(o,t){this.name=o,this.weapon=e.WEAPONS[t],this.position={col:1,row:1},this.lastPosition={col:1,row:1},this.health=100,this.inTurn=!1,this.fighting=!1,this.defending=!1}e.WEAPONS={sword:{key:"sword",position:null,damage:10,img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586770/BlackKnight/sword_qz2ido.gif>"},fire:{key:"fire",position:null,damage:15,img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586765/BlackKnight/fire_hheehz.gif>"},magic:{key:"magic",position:null,damage:20,img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586778/BlackKnight/magic_y0biuz.gif>"},staff:{key:"staff",position:null,damage:25,img:"<img src= https://res.cloudinary.com/dfqr8gqss/image/upload/v1590586769/BlackKnight/staff_ushxa4.png>"}},e.prototype.gameSetup=function(){this.barriers=[],this.weapons=e.WEAPONS,this.activePlayer="player1",this.createGrid();for(var o=0;o<13;o++)this.placeBarrier([o]);this.player1=this.createPlayer1(),this.player1.activePlayer=!0,this.placePlayer(this.player1),this.showAllMoves(this.player1.position),this.player2=this.createPlayer2(),this.placePlayer(this.player2),this.isReadyToFight()?this.gameSetup():(this.placeWeapon("sword"),this.placeWeapon("fire"),this.placeWeapon("magic"),this.placeWeapon("staff"),this.getPlayerStats(),console.log(this.player1),console.log(this.barriers),console.log(this.weapons))},e.prototype.createPlayer1=function(){return new t("player1",o)},e.prototype.createPlayer2=function(){return new t("player2",o)},e.prototype.createGrid=function(){for(var o="",t=1;t<11;t++)for(var e=1;e<11;e++)o+="<div class='grid-item' data-col=".concat(e," data-row=").concat(t," ></div>");this.gridContainer.innerHTML=o},t.prototype.getPosition=function(){return p(this.position.col,this.position.row)},e.prototype.isPositionAvailable=function(o,t){return!p(o.col,o.row).classList.contains("taken")||(console.log("position taken"),t&&t(),!1)},e.prototype.putClass=function(o,t,e){console.log(t);var a=p(o.col,o.row);a.classList.add(t),e||a.classList.add("taken")},e.prototype.putWeaponInfo=function(o){var t=p(o.col,o.row);console.log(newClass+"is in this position"),t.classList.add("sword")},e.prototype.removeClass=function(o,t){var e=p(o.col,o.row);console.log(e),e.classList.remove(t),e.classList.remove("taken")},e.prototype.placeBarrier=function(){var o={col:a(),row:a()},t=this;this.isPositionAvailable(o,function(){t.placeBarrier()})&&(this.barriers.push(o),this.putClass(o,"barrier"))},e.prototype.placeWeapon=function(o){var t={col:a(),row:a()},e=this;this.isPositionAvailable(t,function(){e.placeWeapon(o)})&&(this.weapons[o].position=t,this.putClass(t,o,!0),console.log(o))},e.prototype.placePlayer=function(o){var t={col:a(),row:a()},e=this;this.isPositionAvailable(t,function(){e.placePlayer(o)})&&(o.moveTo(t,!0),this.putClass(t,o.name))},e.prototype.hasBarriers=function(o,t){var e=t.col==o.col?"row":"col",a="col"==e?o.col-t.col:o.row-t.row,i="col"==e?o.col-1:o.col,r="row"==e?o.row-1:o.row;a<0&&(i="col"==e?o.col+1:o.col,r="row"==e?o.row+1:o.row);var s={col:i,row:r},n=p(s.col,s.row);return!!n&&(n.classList.contains("barrier")?(console.log("barrier exists"),!0):Math.abs(a)!==Math.abs(o[e]-s[e])&&this.hasBarriers(s,t))},t.prototype.moveTo=function(o){console.log(o),this.lastPosition=Object.assign({},this.position),console.log(this.lastPosition),this.position=o},e.prototype.movePlayer=function(o,t){console.log(o),this.removeClass(o.position,o.name),this.putClass(t,o.name),o.moveTo(t),console.log(t),this.switchWeapon(o),console.log(o.weapon)},t.prototype.canMoveTo=function(o,t){var e=o.col===this.position.col?"row":"col",a=Math.abs(this.position.col-o.col),i=Math.abs(this.position.row-o.row),r="col"==e&&a<=3&&0===i||"row"==e&&i<=3&&0===a;return r&&t&&t(),r},e.prototype.tryMovePlayer=function(o,t){var e=this,a=p(t.col,t.row);o.canMoveTo(t,function(){e.isPositionAvailable(t)&&!e.hasBarriers(o.position,t)&&a.classList.contains("highlight")&&(console.log(e.activePlayer),e.movePlayer(o,t),e.removeShowMove(),e.switchActivePlayer(),e.showAllMoves(e[e.activePlayer].position))})},e.prototype.tryMoveActivePlayer=function(o){this.tryMovePlayer(this[this.activePlayer],o),console.log(this.activePlayer)},e.prototype.showMove=function(o){p(o.col,o.row).classList.add("highlight")},e.prototype.removeShowMove=function(){for(var o=document.getElementsByClassName("highlight");o[0];)o[0].classList.remove("highlight")},e.prototype.showAllMoves=function(o){for(var t={col:o.col,row:o.row},e=0;e<3;e++){t.row+=1;var a=p(t.col,t.row);if(!(0<t.row&&t.row<11&&!1===a.classList.contains("barrier")))break;this.showMove(t)}t.row=o.row;for(var i=0;i<3;i++){t.col+=1;var r=p(t.col,t.row);if(!(0<t.col&&t.col<11&&!1===r.classList.contains("barrier")))break;this.showMove(t)}t.col=o.col;for(var s=0;s<3;s++){--t.row;var n=p(t.col,t.row);if(!(0<t.row&&t.row<11&&!1===n.classList.contains("barrier")))break;this.showMove(t)}t.row=o.row;for(var l=0;l<3;l++){--t.col;var c=p(t.col,t.row);if(!(0<t.col&&t.col<11&&!1===c.classList.contains("barrier")))break;this.showMove(t)}t.col=o.col},e.prototype.findWeaponByPosition=function(t){return Object.values(this.weapons).find(function(o){return o.position&&o.position.col===t.col&&o.position.row===t.row})},e.prototype.switchWeapon=function(o){var t=o.position,e=this.findWeaponByPosition(t);e&&(this.weapons[o.weapon.key].position=t,this.putClass(t,o.weapon.key,!0),this.getPlayerStats(),this.weapons[e.key].position=null,this.removeClass(t,e.key),o.weapon=this.weapons[e.key],this.getPlayerStats())},e.prototype.switchActivePlayer=function(){this.activePlayer="player1"===this.activePlayer?"player2":"player1";var o="player1"===this.activePlayer?"player2":"player1";this[this.activePlayer].activePlayer=!0,this[o].activePlayer=!1},e.prototype.isReadyToFight=function(){var o=this.player1.position.col,t=this.player1.position.row,e=this.player2.position.col,a=this.player2.position.row,i=Math.abs(o-e),r=Math.abs(t-a);return(1===i&&0===r||1===r&&0===i)&&(console.log("Player ready to fight"),!0)},e.prototype.getPlayerStats=function(){var o=document.querySelector("#knightHealthInput"),t=document.querySelector("#knightAttackInput"),e=document.querySelector("#knightWeaponPanel");o.innerHTML=this.player1.health,t.innerHTML=this.player1.weapon.damage,e.innerHTML=this.player1.weapon.img,console.log(this.player1.weapon);var a=document.querySelector("#dragonHealthInput"),i=document.querySelector("#dragonAttackInput"),r=document.querySelector("#dragonWeaponPanel");a.innerHTML=this.player2.health,i.innerHTML=this.player2.weapon.damage,r.innerHTML=this.player2.weapon.img},e.prototype.tryFight=function(){var a,i,r=this,s=this;s.isReadyToFight()&&(0<s.player1.health&&0<s.player2.health?(a=function(o){switch(o.type){case"attack":var t=r["player1"==r.activePlayer?"player2":"player1"],e=r[r.activePlayer];t.health-=t.defending?e.weapon.damage/2:e.weapon.damage,s.getPlayerStats(),console.log("health"+t.health+" weapon"+e.weapon.damage),t.defending=!1;break;case"defense":r[r.activePlayer].defending=!0}r.activePlayer="player1"==r.activePlayer?"player2":"player1"},(i=Array.from(document.querySelectorAll(".action"))).forEach(function(o){o.addEventListener("click",function(o){var t=o.target.dataset.actiontype;console.log(t),console.log(i);var e=o.target.dataset.playerkey;if(console.log(e),e!=r.activePlayer)return window.alert("You can't perform an action because the active player is: ".concat(r.activePlayer));switch(t){case"attack":a({type:"attack"});break;case"defense":a({type:"defense"})}})})):(s.player2.health<=0&&alert("PLAYER 1 WINS !!!"),s.player1.health<=0&&alert("PLAYER 2 WINS !!!"),s.gameSetup()))},$(window).on("load",function(){document.getElementById("newGameBtn").addEventListener("click",function(){(new e).gameSetup()})})}();