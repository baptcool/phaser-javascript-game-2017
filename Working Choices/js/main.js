require.config({
    
    baseUrl: 'js',
    paths: {
        jquery:     'libs/jquery',
        phaser : 'libs/phaser'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        phaser: {
            exports: 'Phaser'
        }
        
    }
});
require(['jquery','phaser','Boot','MainMenu','Credit','Option', 'HealthBar','PaperStack','Platformer','PrincipalGame','PointAndClick'], function($, Phaser) {
    
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
    
	game.state.add('Boot', Work.Boot);
	game.state.add('MainMenu', Work.MainMenu);
	game.state.add('Credit', Work.Credit);
    game.state.add('Option', Work.Option);
    game.state.add('PaperStack', Work.PaperStack);
    game.state.add('Platformer', Work.Platformer);
    game.state.add('PrincipalGame', Work.PrincipalGame);
    game.state.add('PointAndClick', Work.PointAndClick);
    game.state.start('Boot');

});

