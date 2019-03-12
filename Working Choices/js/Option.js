Work.Option = function(game) {
    this.optionWall;
    this.returnButton;
    this.volumeButton;
};

Work.Option.prototype = {
	preload: function(){
        
        this.load.image('optionWallpaper', 'assets/optionWallpaper.png');
        this.load.image('volumeIcon', 'assets/volumeIcon.png');
    },
    
    create : function(){
        
        function f(texteGauche,textDroit){ 
            $('#barre_gauche').html(texteGauche); 
            $('#barre_droite').html(textDroit);     
        } 
        textG = "Click:<p></br>- :</br>Baisse le volume </br></br> + : </br>Augmente le volume</br></br> Bars :</br> Coupe le son</br></br> Flèche :</br> retourne au Menu</p>";
        textD = "Règle ici le volume et prends connaissance de l'utilité des cadres";
        f(textG,textD);
        
        this.optionWall = this.add.sprite(0,0,'optionWallpaper');
        
        this.returnButton = this.add.button(Work._WIDTH*1, 500, 'retour', this.retourMenu, this);
		this.returnButton.input.useHandCursor = true;
        
		this.input.onDown.add(this.reglVolume, this);
    },
    
    shutdown : function(){
        
        this.optionWall.destroy();
    },
    
    retourMenu : function() {
        
        this.game.state.start('MainMenu');
        
    },
    
    reglVolume : function(pointer){
        
        if (pointer.y < 529 && pointer.y > 437 && pointer.x > 303 && pointer.x < 528 ) { // x == 210 pour +
            Work._MUTE= !Work._MUTE;
        }
        if (pointer.y <= 600 && pointer.y >= 529) {
                if ( pointer.x < 528 && pointer.x > 406){
                    Work._VOLUME += 0.2;
                    Work._MUTE = false;
                }

                if ( pointer.x < 406 && pointer.x > 303){
                    Work._VOLUME -= 0.2;
                    Work._MUTE = false;
                }
            
        }
        Work._MUSIC.mute = Work._MUTE;
        Work._MUSIC.volume = Work._VOLUME;
    }
};