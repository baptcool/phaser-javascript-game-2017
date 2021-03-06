var HealthBar = function(game, providedConfig) {
  this.game = game;
 
  this.setupConfiguration(providedConfig);
  this.setPosition(this.config.x, this.config.y);
  this.drawBackground();
  this.drawHealthBar();
};
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
  this.config = this.mergeWithDefaultConfiguration(providedConfig);
};

HealthBar.prototype.mergeWithDefaultConfiguration = function(newConfig) {
  var defaultConfig= {
    width: 150,
    height: 30,
    x: 0,
    y: 0,
    bg: {
      color: '#bdc3c7'
    },
    bar: {
      color: '#eae8d9'
    }
  };
 
  return mergeObjetcs(defaultConfig, newConfig);
};
 
function mergeObjetcs(targetObj, newObj) {
  for (var p in newObj) {
    try {
      targetObj[p] = newObj[p].constructor==Object ? mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
    } catch(e) {
      targetObj[p] = newObj[p];
    }
  }
  return targetObj;
}


HealthBar.prototype.drawBackground = function() {
 
  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bg.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();
 
  this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
  this.bgSprite.anchor.set(0.5);
};


HealthBar.prototype.drawHealthBar = function() {
  var bmd = this.game.add.bitmapData(this.config.width/2, this.config.height);
  bmd.ctx.fillStyle = this.config.bar.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();
 
  this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
  this.barSprite.anchor.y = 0.5;
};


HealthBar.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
 
  if(this.bgSprite !== undefined && this.barSprite !== undefined){
    this.bgSprite.position.x = x;
    this.bgSprite.position.y = y;
 
    this.barSprite.position.x = x - this.config.width/2;
    this.barSprite.position.y = y;
  }
};

HealthBar.prototype.setPercent = function(newValue){
    if(newValue <= 0) newValue = 0;   if(newValue >= 100) newValue = 100;
 
    var newWidth =  (newValue * this.config.width) / 100;
    //var newWidth = (this.config.width + newValue );
    this.setWidth(newWidth);
};

 
HealthBar.prototype.setWidth = function(newWidth){
 
 this.game.add.tween(this.barSprite).to( { width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
 
};
console.log("Healthbar");