Work.Credit = function(game) {
    this.credits;
    this.creditButton;
};

Work.Credit.prototype = {
	preload: function(){
        this.load.image('credits', 'assets/credits.png');
    },
    
    create : function(){
        
        function f(texteGauche,textDroit){ 
            $('#barre_gauche').html(texteGauche); 
            $('#barre_droite').html(textDroit);     
        } 
        textG = "Click:<p></br>flèche :</br>Retourne au Menu </br>";
        textD = "Voici le nom des créateurs de ce petit jeu";
        f(textG,textD);
        
        
        this.credits = this.add.sprite(0,0,'credits');
        this.returnButton = this.add.button(Work._WIDTH*0.9, 485, 'retour', this.retourMenu, this);
		this.returnButton.input.useHandCursor = true;
    },
    
    shutdown : function(){
        
        this.credits.destroy();
        this.returnButton.destroy();
    },
    
    retourMenu : function() {
        
        this.game.state.start('MainMenu');
    }
}