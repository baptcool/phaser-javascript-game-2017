Work.PaperStack = function(game) {
    this.GAME_OVER;
    this.GAME_START;
    this.background;
    this.stack;
    this.maxSheet;
    this.canDo;
    this.keys;
    this.timeContainer;
    this.timeBar;
    this.timeBarWidth;
    this.GAME_WIN;
};

Work.PaperStack.prototype = {
	preload: function() {
        
        this.load.image('background', 'assets/bureau_flat.png');
        this.load.image('screenGO', 'assets/gameOver.jpg');
        this.load.image('sheet1', 'assets/sheet1.png');
        this.load.image('sheet2', 'assets/sheet2.png');
        this.load.image('sheet3', 'assets/sheet3.png');
        this.load.image('sheet4', 'assets/sheet4.png');
        this.load.image('sheet4', 'assets/sheet4.png');
        this.load.image('retry', 'assets/tryAgain.png');
        
        this.load.image('timeContainer', 'assets/time-container.png');
		this.load.image('timeBar', 'assets/time-bar.png');

	},
    
    
	create: function() {
        
        function f(texteGauche,textDroit){ 
            $('#barre_gauche').html(texteGauche); 
            $('#barre_droite').html(textDroit);     
        } 
        textG = "touches:<p></br> ↑ :</br>Tampon Noir</br></br> ← : </br>Tampon Bleu</br></br> → :</br>Tampon Rouge</br></br>↓ :</br>Tampon Vert</p>";
        textD = "Trie cette pile de feuille de la bonne manière ou tu risques d'être licensié !<p>Regarde les commandes à gauche pour ne pas te tromper</p>";
        f(textG,textD);
        
        
        this.tempCanDo = 0;
        this.maxSheet = 10* Work._LVL;
        this.GAME_OVER = false;
        this.GAME_START = false;
        this.GAME_WIN = false;
        // Physique du jeu
		this.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.background = this.add.sprite(0, 0, 'background');
        this.constructStack();
		this.canDo = true;
        
        
        // ---- BARRE DE TEMPS
		// Container
		this.timeContainer = this.add.sprite(10, 97, 'timeContainer');
		// Barre
		this.timeBar = this.add.sprite(14, 100, 'timeBar');
        this.timeBarWidth = this.timeBar.width;
		// On crop la barre pour la diminuer de moitié
		var cropRect = new Phaser.Rectangle(0, 0, this.timeBarWidth, this.timeBar.height);
		this.timeBar.crop(cropRect);
		this.timeBar.updateCrop();
	},
    
    update: function() {
        
        
        if(this.GAME_START) {
            if(!this.GAME_WIN){
                // S'il reste du temps, mise à jour de la barre de temps
                if(this.timeBarWidth > 0) {
                    this.timeBarWidth -= (0.7);
                    var cropRect = new Phaser.Rectangle(0, 0, this.timeBarWidth, this.timeBar.height);
                    this.timeBar.crop(cropRect);
                    this.timeBar.updateCrop();
                } else {
                    this.death();
                }
            }
            else {
                this.win();
            }
		}
        
        this.keys = this.input.keyboard.createCursorKeys();
		// Si la partie n'est pas terminée
		if( !this.GAME_OVER ){
			// Détection des touches left et right du clavier

			if (this.keys.left.isDown){
                
		        this.listener('left');
            }
		    else if (this.keys.right.isDown){
                
		        this.listener('right');
            }
            else if (this.keys.up.isDown){
                
		        this.listener('up');
            }
            else if (this.keys.down.isDown){
                
		        this.listener('down');
            }
            
            if (this.keys.left.isUp && this.keys.right.isUp && this.keys.up.isUp && this.keys.down.isUp){
                this.canDo = true;
            }
		}
	},
    
    shutdown : function(){
        
        
        this.background.destroy();
        this.stack.destroy();

        this.timeContainer.destroy();
        this.timeBar.destroy();
        
    },
    
    listener: function(action) {

		if(this.canDo) {
            
            if(!this.GAME_START) {
				this.GAME_START = true;
			}
            
            var nameSheetToPush = this.stack.getAt(this.maxSheet-1).key;
            
            this.pushSheet(action);

			

			// Si la feuille avec le mauvais tampon part dans la mauvaise direction
			if( nameSheetToPush == 'sheet1' && action != 'left' || nameSheetToPush == 'sheet2' && action != 'right' || nameSheetToPush == 'sheet3' && action != 'up' || nameSheetToPush == 'sheet4' && action != 'down') {
				// Game Over
				this.death();
			
			} else if (this.stack.getAt(0).key == undefined){
                
                this.GAME_WIN = true;
			}
		}
	},
    
    pushSheet: function(action) {
		
        
		// On incrémente le score
		//this.increaseScore();


		// On crée une copie de la feuille a expulsé
		var sheetPush = this.add.sprite(180, 300, this.stack.getAt(this.maxSheet-1).key);
		// Et on supprime la feuille devant
		this.stack.remove(this.stack.getAt(this.maxSheet-1));
		// On active le système de physique sur ce sprite
		this.physics.enable(sheetPush, Phaser.Physics.ARCADE);
		// On déplace le centre de gravité du sprite en son milieu, ce qui nous permettra de lui faire faire une rotation sur lui même
		sheetPush.anchor.setTo(0.5, 0.5);
		sheetPush.x += sheetPush.width / 2;
		sheetPush.y += sheetPush.height / 2;

		var angle = 0;
		// Si la touche droite est pressée, on envoie la feuille vers la droite
		if(action == 'left') {
			sheetPush.body.velocity.x = -1300;
			angle = -400;
		// Sinon, on l'envoie vers la gauche
		} else if(action == 'right'){
			sheetPush.body.velocity.x = 1300;
			angle = 400;
		}else if(action == 'up'){
			sheetPush.body.velocity.y = -1300;
			angle = 400;
		}else if(action == 'down'){
			sheetPush.body.velocity.y = 1300;
			angle = 400;
		}

		// On ajoute une animation de rotation sur la feuille propulsé
		this.add.tween(sheetPush).to({angle: sheetPush.angle + angle}, 1000, Phaser.Easing.Linear.None,true);

		// On empêche une nouvelle pousse avant que les touches soient relevés
		
        this.canDo = false;
        
        this.maxSheet -= 1;
        
		var self = this;
        cmpt = this.maxSheet-1;
        this.stack.forEach(function(sheetPush) {
            if (cmpt < 4){
                var tween = self.add.tween(sheetPush).to({x: sheetPush.x - 20}, 100, Phaser.Easing.Linear.None,true);
            }
            cmpt--;
		});
	},

    
    constructStack: function() {
		// On construit le groupe stack qui va contenir toutes les feuilles
		this.stack = this.add.group();
        
        
		for(var i = 0; i < this.maxSheet; i++) {
			this.addSheet(i);
		}
	},
    
    addSheet: function(decal) {
		var sheets = ['sheet1','sheet2',"sheet3","sheet4"];
		
        if( decal > this.maxSheet - 5){
            this.stack.create(260 - (decal-(this.maxSheet-5))*20, 290, sheets[Math.floor(Math.random() * 4)]);
        }
        else{
            this.stack.create(260, 290, sheets[Math.floor(Math.random() * 4)]);
        }
			
    },
    
    death : function() {
        
        this.GAME_OVER = true;
        //this.canDo = false;
		this.input.onDown.removeAll();
        
        var screenGO = this.add.sprite(0, 0, 'screenGO');
        var returnButton = this.add.button(Work._WIDTH*0.6, 400, 'retry', this.retry, this);
        
    },
    
    win : function(){
        
        this.GAME_START = false;
        this.canDo = false;
        
        this.returnButton = this.add.button(Work._WIDTH*1.1, 500, 'retour', this.retourMenu, this);
		this.returnButton.input.useHandCursor = true;
		
        
    },
    
    retourMenu : function(){
    
        this.game.state.start('PrincipalGame');
        
    },
    
    retry : function() {
        
        this.game.state.start('PaperStack');
        
    }
    
}