// baptiste millot 2017


Work.Platformer = function(game) {
	this.stylefontImprPause = { font: "65px Arial", fill: "#43d637", align: "center", fontWeight : 'bold',stroke : '#000000',strokeThickness : 6 };
	this.stylefontBulles = { font: "20px Arial", fill: "#43d637", align: "center", fontWeight : 'bold',stroke : '#000000',strokeThickness : 6 };
	this.stylefontTime = { font: "17px Arial", fill: "#43d637", align: "center", fontWeight : 'bold',stroke : '#000000',strokeThickness : 6 };

	this.timeJeu = 0;
	this.TextTime = 0;
	this.TextStartGame;
	this.fond;
	this.joueur;
	this.speed;
	this.ground;
	this.taille = 0.1;
	this.fin = 0;
	this.bpmText;
	this.ToucherText ;
	this.vitesse = 7;
	this.nuage;
	this.clicks = 0;
	this.interval =0;
	this.nbmeuf = 0;
	this.ElementToucher = 0;
	this.ElementToucherTimer = 0;
	this.FonctionPrintGAMEOVER = ()=>{


		this.game.input.onDown.removeAll();
		this.nuage.inputEnabled = false;
		//console.log(this.game.camera.view.x)
		this.screenGO = this.add.sprite(this.game.camera.view.x, 0, 'screenGO');
        this.returnButton = this.add.button(this.game.camera.view.x+Work._WIDTH*0.6, 400, 'retry', ()=>{
			if(this.textclick){
				this.textclick.destroy();
			}
			
			this.nuage.destroy();
			this.textNana.destroy();
			this.arretNana = 0 ;
			this.vitesse = 7;
			this.clicks = 0;
			this.interval =0;
			this.nbmeuf = 0;
			this.ElementToucher = 0;
			this.ElementToucherTimer = 0;
			this.timeJeu = 0;
			this.fin = 0;
			this.game.state.start('Platformer'); // a modifier Platformer
        });


	};
	

	this.fonctionMeuf= (positionNana)=>{
			
		if(this.joueur.x < positionNana - 300){
			return ;
			
		}
	    	if( ((this.joueur.x - 100) < positionNana -170) && ((this.joueur.x+ 100) > (positionNana -170-this.vitesse+1))  && this.arretNana != 1){
		    	//time**********************
		    	this.game.time.events.add(Phaser.Timer.SECOND * 6, ()=>{
		    		if(this.arretNana){
		    			
		    			this.FonctionPrintGAMEOVER() ;
		    		}
		    	});
		    	//time**********************
		    	this.arretNana = 1
		    	this.speed = this.vitesse;
		    	this.vitesse  =  0;
		    	this.nuage = this.game.add.sprite(this.joueur.x+50+30+10,15,'nuage');
				this.nuage.scale.setTo(0.7,0.5);
		    	this.textNana = this.game.add.text(this.joueur.x+65+40+15, 110,  "J'ai une pile de dossier pour vous", this.stylefontBulles);

		    	this.nuage.inputEnabled = true;

	    		this.nuage.events.onInputDown.add((item) => {
	    			this.clicks++;
	    			if(this.textclick){
						this.textclick.destroy();
	    			}	
		   			this.textclick = this.game.add.text(this.joueur.x-350+65+40+10, 80,  "clicked " + this.clicks + " times / 30", this.stylefontBulles);
	    			if(this.clicks>=30){
	    				this.arretNana = 0 ;
	    				switch(this.nbmeuf){
	    					case 0:
	    						this.meuf1.destroy();
	    						break;
	    					case 1:
	    						this.meuf2.destroy();
	    						break;
	    					case 2:
	    						this.meuf3.destroy();
	    						break;
	    					default:


	    				}
	    				
	    				this.textclick.destroy();
	    				this.nuage.destroy();
	    				this.textNana.destroy();
	    				this.vitesse =  this.speed;
	    				this.nbmeuf ++;
	    				this.clicks = 0;
	    			}
	    			
	    			
	    		});
	    }
	};

};

Work.Platformer.prototype = {
	

    preload : function(){
      	this.start = 0;
        this.game.load.image('sky', 'assets/fond.png');
        //this.game.load.image('joueur', 'assets/perso.png')
        
        this.game.load.image('sol', 'assets/platform.png')
        this.game.time.advancedTiming = true;
        //*******************
        //******************* image de map .. 
        this.game.load.image('screenGO', 'assets/over.jpg')
        this.game.load.image('retour', 'assets/retour.png')
        this.game.load.image('retry', 'assets/tryAgain.png')
        this.game.load.image('nuage', 'assets/nuage.png')
        this.game.load.image('meuf1', 'assets/meuf.png')
        this.game.load.image('homme', 'assets/homme.png')
        this.game.load.image('meuf2', 'assets/secretaire2.png')
        this.game.load.image('imprimante', 'assets/imprimante.png')
        this.game.load.spritesheet('joueur', 'assets/ani.png', 100,299);
       // this.gamade.load.image('nuage', 'assets/nuage.png')

    },
	create: function() {
		
		function f(texteGauche,textDroit){
			$('#barre_gauche').html(texteGauche);
			$('#barre_droite').html(textDroit);
		}
		textG = "Touches:<p>Barre d'espace :</br> pause</br></p><p>flèche du haut :</br> sauter</br></p>";
		textD = "Pour réussir à traverser ce couloir infernal, tu dois te plier à certaines instructions:    		<p>-saute au dessus des imprimantes que les secrétaires ont disposées le long du couloir.</p> <p>-lorsque tu croises une secrétaire, clique sur le petit nuage 30 fois en moins de 6 secondes.</p>";
		
		f(textG,textD);
		///this.game.physics.startSystem(Phaser.Physics.ARCADE);

		
		
		
		//************************************************** image de fond
		this.game.world.setBounds(0, 0, 40000, 600);
		this.fond = this.game.add.sprite(0,0,'sky');
		this.fond2 = this.game.add.sprite(10000,0,'sky');
		this.fond3 = this.game.add.sprite(20000,0,'sky');
		this.fond4 = this.game.add.sprite(30000,0,'sky');
		//this.fond.scale.setTo(2,0);
		//*************************************************************
		
		
	
		//***************************************************** joueur 
		this.joueur = this.game.add.sprite(250,280,'joueur');
		this.game.physics.arcade.enable(this.joueur);
		//this.game.camera.follow(this.joueur, 600);
		//this.game.camera.follow(this.joueur);
		this.joueur.scale.setTo(1,1);
		this.joueur.body.collideWorldBounds = true;
		this.joueur.body.gravity.y = 1500;
		this.joueur.animations.add('right', [0, 1,2], 12, true);
		//***************************************************************** nuage etc..
		
		//*************************************************************  sol 
		this.grownd = this.game.add.sprite(0,580,'sol');
		this.game.physics.arcade.enable(this.grownd);
		this.grownd.scale.setTo(100,1);
		this.grownd.body.immovable = true;
		
		


		





		//************************************************************** controle du joueur
		

		this.cursors = this.game.input.keyboard.createCursorKeys();


		//*********************************************************************** controle barre espace

		this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(()=>{
			if(this.game.paused){
				this.game.paused =  !this.game.paused;
				this.bmpText.destroy();
			}
			else{
				this.game.paused =  !this.game.paused;
	   			this.bmpText = this.game.add.text(this.joueur.x+90, 200, "Pause", this.stylefontImprPause);
			}
		});
		


		//********************************** text
		this.bmpText = this.game.add.text(290, 200, "Pause", this.stylefontImprPause);

		this.TextStartGame = this.game.add.text(200, 100, "Press espace", this.stylefontImprPause);
   		
		//************************************************************* début de la procédure de remplicage de la map


		this.meuf1 = this.game.add.sprite(7400,180+101,'meuf1');
		this.meuf2 = this.game.add.sprite(17400,180+101,'homme');
		this.meuf3 = this.game.add.sprite(25555,180+101,'meuf2');

		this.imprimantes = this.game.add.group();
		this.imprimantes.enableBody = true;

	    for (var i = 1; i < 30; i++)
	    {
	        this.imprimante = this.imprimantes.create(i * 2000, 420, 'imprimante');
	        this.imprimante.scale.setTo(0.5,0.5);
	    }


		//************************************************************** fin de procédure de remplissage de la map
		
		//****************************** jeu en mode pause
		//this.joueur.x=7000;




		//*********************************************************
		this.game.time.events.loop(Phaser.Timer.SECOND,()=>{
			this.timeJeu++;
			
			if(this.TextTime != 0){
				this.TextTime.destroy();
				this.TextTime = this.game.add.text(this.joueur.x-200,20, "Time : "+this.timeJeu + " / " + (110 - (20 +( 10* Work._LVL))), this.stylefontTime);
			}else{
				this.TextTime = this.game.add.text(this.joueur.x-200,20, "Time : "+ this.timeJeu + " / " +(110 - (20 +( 10* Work._LVL))),this.stylefontTime);

			}
		});
    	
		//********************************************************
		this.game.paused = true;

	},
	update: function(){
		
		if(this.timeJeu >(110 - (20 +( 10* Work._LVL)))){

			this.FonctionPrintGAMEOVER();
		}
		//console.log(this.vitesse);
		//console.log("change");
		this.game.physics.arcade.collide( this.grownd,  this.joueur);

		//this.game.physics.arcade.collide(this.imprimantes, this.grownd);
		

		//********** detection colision avec l'imprimante 
  		this.game.physics.arcade.overlap(this.joueur, this.imprimantes, ()=>{
  			if(this.ElementToucher == 0 ){
  				this.ElementToucher++;
  				if(this.vitesse>11){
  					this.vitesse -= 2;
  				}
				
  				
	  			
	  			this.ToucherText  = this.game.add.text(this.joueur.x, 200, "Touché", this.stylefontImprPause);
  				
  			}
  		});
  		// procedure de l'effacement du texte de mise en garde si il y a eu collision avec une imprimante. 
  		if(this.ElementToucher != 0 && this.ElementToucherTimer ==0){
  			this.ElementToucherTimer =1;

  			this.game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
				this.ElementToucher = 0;
				this.ElementToucherTimer =0;
				this.ToucherText.destroy();
			});

  		}
  		//fin du jeu *** detection
		if(this.joueur.x > 39200 && this.fin != 1){
			this.vitesse = 0;
			this.fin = 1;
			this.joueur.animations.stop();
			this.game.add.text(this.joueur.x, 200, "Fin !", this.stylefontImprPause);
			this.game.time.events.add(Phaser.Timer.SECOND * 3, ()=>{

				this.vitesse = 7;
				this.clicks = 0;
				this.interval =0;
				this.nbmeuf = 0;
				this.ElementToucher = 0;
				this.ElementToucherTimer = 0;
				this.timeJeu = 0;
				this.fin = 0;
				

				this.game.state.start('PrincipalGame'); // redirection PrincipalGame
			});
			
		}

		//déplacement du joueur "joueur"
		this.joueur.x += this.vitesse;
		this.TextTime.x+= this.vitesse;
		//la variable interval nous permet de garder un contrôle sur l'avancement du joueur sur la map
		this.interval += this.vitesse;
		this.game.camera.x += this.vitesse;

		//tous les 1700 px, l'interval et réinitialiser et on augmente la vitesse du joueur. 
		if(this.interval > 1700){
			this.vitesse += 1;
			this.interval = 0;
			
		}
		//contrôle des touches
	    if ( this.cursors.up.isDown && this.joueur.body.touching.down)
	    {
	        this.joueur.body.velocity.y -= 1100;

	    }if(this.joueur.body.touching.down){

	       	this.joueur.animations.play('right');
	       	if(this.arretNana){
				this.joueur.animations.stop();
	  		 }

	    }else{
	    	this.joueur.animations.stop();
	    }

	    
	    //*****************************************************************
	    //console.log(this.nbmeuf);

	    //procedure en cas de rencontre avec une des secrétaires.
	    if(!this.arretNana){
			switch(this.nbmeuf){
				case 0:
					this.fonctionMeuf(this.meuf1.x);
					break;
				case 1:
					this.fonctionMeuf(this.meuf2.x);
					break;
				case 2:
					this.fonctionMeuf(this.meuf3.x);
					break;
				default:
					break;
			}	    	
	    }

	    

	    



 //******************************************************************
	},
    
    shutdown : function(){
    
        Work._LVL = 2;
    
    },
    
    
	render: function()
    {
      //  this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");   
		
    }
};


