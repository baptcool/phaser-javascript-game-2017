var Work = {
	_WIDTH: 624,
	_HEIGHT: 437,
    _VOLUME: 1,
    _LVL : 1,
    _NBQUESTION : 0,
    _MUSIC : 0,
    _MUTE : false
};
Work.Boot = function(game) {};

Work.Boot.prototype = {
	preload: function() {
        
	},
	create: function() {
    
		this.game.state.start('MainMenu');
	}
};