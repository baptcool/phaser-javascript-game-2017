Work.MainMenu = function(game) {
    this.titleWallpaper;
    //this.titleWork;
    //this.titleChoices;
    this.musicTitle;
    this.startButton;
    this.creditButton;
    this.optionButton;
    
};

Work.MainMenu.prototype = {
    
    preload : function(){
        this.load.image('titleWallpaper','assets/titleWallpaper.png');
        //this.load.image('titleWork','assets/title_WORK.png');
        //this.load.image('titleChoices','assets/title_CHOICES.png');
        this.load.image('play','assets/play.png');
        this.load.image('credit','assets/credits_button.png');
        this.load.image('retour','assets/retour.png');
        this.load.audio('audio_title', 'audio/TitleScreen.mp3');
        
        this.load.image('optionButton','assets/option_button.png');
        
    },
	create: function() {
        
        function f(texteGauche,textDroit){ 
            $('#barre_gauche').html(texteGauche); 
            $('#barre_droite').html(textDroit);     
        } 
        textG = "touches:<p></br>Play:</br>Lance le jeu </br></br> Option : </br>Permet de régler le volume et de voir l'emplacement des instructions</br></br> Crédit :</br> Affiche le nom des développeurs</p>";
        textD = "Voici le début de ton aventure en entreprise: <p>Fais les bons choix et surmonte les épreuves qui se dresseront sur ton chemin</p>";
        f(textG,textD);
        
        
        Work._NBQUESTION = 0;
        Work._LVL = 1;
        
		this.titleWallpaper = this.add.sprite(0, 0, 'titleWallpaper');
        
        //this.titleWork = this.add.sprite(50, 50, 'titleWork');
        //this.titleChoices = this.add.sprite(350, 50, 'titleChoices');
        if (Work._MUSIC.name != "audio_title" ) {
            if (Work._MUSIC != 0){
                Work._MUSIC.stop();

               
            }
            Work._MUSIC = this.add.audio('audio_title');
            Work._MUSIC.volume = Work._VOLUME;
            Work._MUSIC.mute = Work._MUTE;
            Work._MUSIC.loop = true;
            Work._MUSIC.play();
        }
        
        this.startButton = this.add.button(Work._WIDTH*0.5, 270, 'play', this.startGame, this);
		this.startButton.input.useHandCursor = true;
        
        this.creditButton = this.add.button(Work._WIDTH*0.5, 470, 'credit', this.startCredits, this);
	    this.creditButton.input.useHandCursor = true;
        
        this.optionButton = this.add.button(Work._WIDTH*0.5, 370, 'optionButton', this.startOption, this);
        this.optionButton.input.useHandCursor = true;
        
        },
    
    shutdown : function(){
        
        this.titleWallpaper.destroy();
        //this.titleWork.destroy();
        //this.titleChoices.destroy();
        this.startButton.destroy();
        this.creditButton.destroy();
        this.optionButton.destroy();
    },
    
    startGame: function(){

		this.game.state.start('PrincipalGame');
        
    },
    
    startOption: function(){
        
        this.game.state.start('Option');
        
    },
    
    startCredits : function(){

        this.game.state.start('Credit');
    }
};