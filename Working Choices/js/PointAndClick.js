	Work.PointAndClick = function(game){
    this.fond;
    var ClikSprite;
    var ValidSprite;
    var valid;
    var clickers;
    var ListClickSprite;
    this.cliclick;
    this.textNext;
    var score;
    var educ;
    var lesson;
    
    
    console.log("Load PointAndClick");
    
}



Work.PointAndClick.prototype = {
    
    preload : function(){
        this.game.load.image('sky','assets/sky.png');
        this.game.load.image('redcircle','assets/redcircle.png');
        this.game.load.image('redoval','assets/redoval.png');
        this.game.load.image('redbigoval','assets/redoval2.png');
        this.game.load.image('office','assets/office_p&c.png');
        this.game.load.image('bulle','assets/bulle.png');
    },
    
    
    create : function(){
        
        function f(texteGauche,textDroit){ 
            $('#barre_gauche').html(texteGauche); 
            $('#barre_droite').html(textDroit);     
        } 
        textG = "touches:<p></br> Clickez sur l'image</br></p>";
        textD = "<p>Identifie les problèmes sur cette image pour se sentir mieux en travaillant et conseiller ton collègue</p>";
        f(textG,textD);
        
        score = 0;
      
        this.game.world.setBounds(0, 0, 800, 600);
        
        ListClickSprite = [
            
            {   
                //dos
                x:374,
                y:328,
                forme : "redcircle",  
                spriteText: "D'après mon médecin, avoir le dos \ncourbé est l'un des plus grands dangers \nau travail. Apparement, tu peux attraper \npleins de trucs: scoliose, tour de reins, \narthrose, douleurs thoraciques. \nPeut-être que je vais commencer à me \ntenir droit.",
            },
            {   
                // plante morte
                x:40,
                y:465,
                forme : "redcircle",   
                spriteText: "Un ami jardinier m'a dit que les \nplantes vertes rajoutaient de la \nvie dans un bureau, mais qu'au \ncontraire, les \nplantes mortes réduisent le \nmoral et donc \nbaisse l'efficacité du travail. \nEt tout cela, inconsciement ! ",
            },
            {   
                //  boulettes
                x:500,
                y:539,
                forme : "redcircle",
                spriteText: "La direction nous assomme avec ça:\n Chacun à son poste participe à \nmaintenir son espace de travail. Ce qui n'est pas \nsans influence sur l'ambiance au sein de la \nsociété ou sur les performances de chacun.\n Sans négliger un impact sur l'image de \nl'entreprise. Tu as vu leur campagne de \npropagande sur la propreté ? ",
            },
            {   
                // fenêtre
                x:240,
                y:100,
                forme : "redbigoval",
                spriteText: "Ah oui, il me semble avoir lu \nque le bon  type de lumière peut avoir \nun effet profond sur notre humeur, notre \nproductivité et notre santé, ce qui nous \npermet de travailler plus efficacement, \nde nous rétablir plus rapidement de la \nmaladie et de nous sentir mieux.",
            },
            {   
                // chaise cassée
                x:453,
                y:460,
                forme : "redoval",
                spriteText: "Ouah ! Regarde sa chaise ! Je \nsouffrirais à rester tant d'heures sur une \nchaise comme ça... Je suis certain que je \nne serais plus aussi efficace au travail et \nque je fatiguerais beaucoup plus vite.",
            },
            {   
                // télé
                x:700,
                y:90,
                forme : "redoval",
                spriteText: "Aaah, j'aimerais bien avoir une \ntélé dans mon bureau aussi.. Mais je suis \ncertain que je n'arriverais même plus à \ntravailler avec ça en guise de distraction. \nSans compter sur les collègues qui \nrisqueraient de s'inviter dans mon bureau \npour venir me 'voir'.",
            },
            {   
                
                // écran-tête
                x:236,
                y:258,
                forme : "redcircle",  
                spriteText: "Ca me rappelle un article: De nombreuses \nétudes menées auprès de personnes \ntravaillant sur ordinateur montrent que \nla fatigue visuelle constitue le problème \nde santé le plus fréquemment rapporté par \nces travailleurs.Il regroupe un ensemble de \nsymptômes de fatigue: sécheresse oculaire, yeux \nirrités, maux de tête..."


            }
        ];
        
        
		this.game.add.sprite(0,0,'office');
        valid = this.game.add.group();
        clickers = this.game.add.group();        
        lessons = this.game.add.group();
       
        
        for(let i=0;i<ListClickSprite.length;i++){
                ClikSprite = clickers.create(ListClickSprite[i].x,ListClickSprite[i].y,ListClickSprite[i].forme);

                ClikSprite.centerX = ListClickSprite[i].x;
                ClikSprite.centerY = ListClickSprite[i].y;
                ClikSprite.inputEnabled = true;
                ClikSprite.alpha = 0;
                ClikSprite.text = ListClickSprite[i].spriteText;
                ClikSprite.events.onInputDown.add(function(){this.message( ListClickSprite[i].spriteText)},this);
                ClikSprite.events.onInputDown.add(this.found,this)      
            };  
        
        
        
        // scoreText = this.add.text(0, 10, 'score: 0', { fontSize: '32px', fill: '#000' });
        
        
        // dataText = this.add.text(0, 50, 'coor', { fontSize: '32px', fill: '#000' });      
        
  
        
    },
    
    
    update : function(){
        
       if(score == 7){
           this.returnButton = this.add.button(Work._WIDTH*1.1, 500, 'retour', this.retourMenu, this);
		  this.returnButton.input.useHandCursor = true;
       }
    },
    
    message : function(msg){
        educ= lessons.create(this.game.world.centerX,this.game.world.centerY,"bulle");
        
        this.textNext = this.add.text(this.game.world.centerX - 45, this.game.world.centerY -50, msg, { font: "20px Arial", fill: "#ff0044"});
        lessons.add(this.textNext);
        educ.centerX = this.game.world.centerX;
        educ.centerY = this.game.world.centerY;
        educ.events.onInputDown.add(this.spriteKiller,this);
        educ.inputEnabled = true;
        console.log(this.game.world.centerX);
       
    },
    
    spriteKiller : function(sprite){
        sprite.destroy();
        this.textNext.text = "";
    },
    
    found: function(sprite){  
        score++;
        console.log(score);
        //scoreText.text = 'Score: ' + score;
        //dataText.text = 'x: ' + sprite.x + ' y: ' + sprite.y;
        sprite.alpha = 1;
     
        sprite.inputEnabled = false;

    },
    
    retourMenu : function(){
    
        this.game.state.start('PrincipalGame');
        
    }
    
    
}



