    Work.PrincipalGame = function(game){
    
    this.GAME_OVER;
    this.data;
    this.jauge1= 50;
    this.jauge2= 50;
    this.jauge3= 50;
    this.jauge4= 50;
    this.text1;
    this.text2;
    this.text3;
    this.text4;
    this.affjauge1;
    this.affjauge2;
    this.affjauge3;
    this.affjauge4;
    var dataText;
    this.bulleConvGroup;
    this.bulleConv;
    this.style;
    this.style2;

}



Work.PrincipalGame.prototype = {

    preload : function(){
        
        
        this.load.image('bureauPrincipal', 'assets/bureauPrincipal.png');
        this.load.image('screenGO', 'assets/gameOver.jpg');
        this.load.image('bulleQuestion', 'assets/bulleQuestion.png');
        this.load.image('bulleAnswer', 'assets/bulleAnswer.png');
        this.load.audio('audio_Principal', 'audio/MainGameMusic.mp3');
        
    },


    create : function(){
        
        function f(texteGauche,textDroit){ 
            $('#barre_gauche').html(texteGauche); 
            $('#barre_droite').html(textDroit);     
        } 
        textG = "touches:<p></br> Clickez sur les propositions </br></p>";
        textD = "Pour réussir à t'épanouir au travail, tu dois faire les choix adéquats: <p>Si l'une des jauges tombent à 0, le jeu se finit</p>";
        f(textG,textD);
        
        if( Work._MUSIC.name != "audio_Principal" ){
            Work._MUSIC.stop();
           
            Work._MUSIC = this.add.audio('audio_Principal');
            Work._MUSIC.volume = Work._VOLUME;
            Work._MUSIC.mute = Work._MUTE;
            Work._MUSIC.loop = true;
            Work._MUSIC.play();
        }
        
        this.GAME_OVER = false;

        /*this.jauge1=50;
        this.jauge2=50;
        this.jauge3=50;
        this.jauge4=50;*/

        
        this.style = { font: "17px Arial", fill: "#EAEAEA", align: "center", fontWeight : 'bold',stroke : '#',strokeThickness : 6, wordWrap: true, wordWrapWidth: 330 };
        
        this.style2 = { font: "17px Arial", fill: "#EAEAEA", align: "center", fontWeight : 'bold',stroke : '#',strokeThickness : 6, wordWrap: true, wordWrapWidth: 100 };
        
       this.data = [
           {
                question : "Tu travailles depuis plusieurs heures, tu veux prendre une pause ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Yes!",
                answer2: "Non merci, je peux encore assurer. ",
                jauge1: +10, //stress
                jauge2: +3, // santé
                jauge3: +5, //energie
                jauge4: +10, //productivité
                jauge1c2:  -10, // impact si réponse 2
                jauge2c2: +1,
                jauge3c2: -10,
                jauge4c2: -10

            },
            {
                question : "Je te propose de changer les couleurs de l’espace de travail pour du rouge et du jaune au lieu du gris, tu veux ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Chouette, ça change ! Mais j'ai autre chose à faire",
                answer2: "Roh...",
                jauge1: +10,
                jauge2: +3,
                jauge3: -10,
                jauge4: -5,
                jauge1c2: -10,
                jauge2c2: +3,
                jauge3c2: -5,
                jauge4c2: +0

            },
            {
                question : "Tu te lèves tôt et tu te couches tôt ou l’inverse ?",
                proposition1: "Première proposition",
                proposition2: "Deuxième proposition",
                answer1: "C'est ennuyeux mais c'est meilleur \npour la santé.",
                answer2: "Je me sens toujours fatigué..",
                jauge1: +10,
                jauge2: +5,
                jauge3: +18,
                jauge4: +0,
                jauge1c2: -10,
                jauge2c2: -5,
                jauge3c2: -18,
                jauge4c2: +5

            },
            {
                question : "Tu veux mettre quelle sorte de musique : Du Jazz ou du Rock ?",
                proposition1: "Jazz",
                proposition2: "Rock",
                answer1: "Sweet",
                answer2: "Rock n'roll !",
                jauge1: +10,
                jauge2: -1,
                jauge3: -5,
                jauge4: +5,
                jauge1c2: -20,
                jauge2c2: +0,
                jauge3c2: -5,
                jauge4c2: +5

            },
            {
                question : "Veux-tu te joindre à nous pour travailler ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Okay, mais ne parlez pas trop fort !",
                answer2: "Hum non je ne suis pas chaud.",
                jauge1: +5,
                jauge2: -0,
                jauge3: -6,
                jauge4: +10,
                jauge1c2: +15,
                jauge2c2: +0,
                jauge3c2: +6,
                jauge4c2: -20

            },
            {
                question : "Plutôt sucré ou non-sucré ton soda ?",
                proposition1: "Sucré",
                proposition2: "Non-sucré",
                answer1: "Sucre, sucre ! Ma drogue ! ",
                answer2: "Hum de l'eau ça ira.",
                jauge1: -10,
                jauge2: -20,
                jauge3: +10,
                jauge4: +15,
                jauge1c2: +5,
                jauge2c2: +10,
                jauge3c2: -5,
                jauge4c2: -5

            },
           
           {
                question : "Le patron veut que tu tries ce dossier, lis bien les consignes et redonne lui très vite !",
                proposition1: "C'est parti !",
                proposition2: "",
                answer1: "",
                answer2: "",
                jauge1: 0, //stress
                jauge2: 0, // santé
                jauge3: 0, //energie
                jauge4: 0, //productivité
                jauge1c2: 0, // impact si réponse 2
                jauge2c2: 0,
                jauge3c2: 0,
                jauge4c2: 0,
                jeu : "PaperStack"

            },
            {
                question : "Hey, tu vas aller voir le patron pour lui parler de ton collègue très embêtant ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Oui, il ne faut pas que je stress pour \ndes raisons inutiles.",
                answer2: "Non j’ai la flemme.",
                jauge1: +10,
                jauge2: +0,
                jauge3: -4,
                jauge4: +10,
                jauge1c2: -5,
                jauge2c2: +0,
                jauge3c2: -4,
                jauge4c2: -2

            },
            {
                question : "Tu préfères porter des lunettes quand tu es sur ton pc ou tu baisses la luminosité toi ?",
                proposition1: "Lunettes",
                proposition2: "Luminosité",
                answer1: "C’est mieux pour ma vision.",
                answer2: "Non, mais j’ai les yeux qui \npiquent du coup.",
                jauge1: 0,
                jauge2: +20,
                jauge3: 0,
                jauge4: 0,
                jauge1c2: 0,
                jauge2c2: -20,
                jauge3c2: 0,
                jauge4c2: 0

            },
            {
                question : "Tu veux faire du sport après le travail ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Toujours!",
                answer2: "Non, je préfère bosser un peu.",
                jauge1: 20,
                jauge2: +30,
                jauge3: -20,
                jauge4: -10,
                jauge1c2: 0,
                jauge2c2: -20,
                jauge3c2: 0,
                jauge4c2: 0

            },
            {
                question : "Patron : Je veux que tu restes travailler ce soir car il reste encore beaucoup de travail ! Tu es d’accord ?",
                proposition1: "Affirmatif",
                proposition2: "Non",
                answer1: "Bien sûr, pour le bien du boulot",
                answer2: "Je vous apporte un café en plus ?!",
                jauge1: -5,
                jauge2: 0,
                jauge3: -20,
                jauge4: +10,
                jauge1c2: 3,
                jauge2c2: 0,
                jauge3c2: +20,
                jauge4c2: -10

            },
            {
                question : "Tu ajustes ton siège sur dur ou mou ?",
                proposition1: "Dur.",
                proposition2: "Mou.",
                answer1: "Oui, il faut toujours que ça soit dur, sinon ça fait mal.",
                answer2: "Mou.. mais toi ça ne te fais pas mal \nau dos ? ",
                jauge1: -10,
                jauge2: +20,
                jauge3: 0,
                jauge4: 0,
                jauge1c2: +20,
                jauge2c2: -10,
                jauge3c2: 0,
                jauge4c2: 0

            },
            {
                question : "Et sinon, tu travailles debout?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "J’ai une santé de fer depuis que j’ai cette habitude.",
                answer2: "Non, malgré mes problèmes de \ncoeur, je reste toute la journée assis.",
                jauge1: -10,
                jauge2: +20,
                jauge3: -5,
                jauge4: 0,
                jauge1c2: -5,
                jauge2c2: -10,
                jauge3c2: +10,
                jauge4c2: 0

            },
            {
                question : "Un petit kebab ce midi ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Okay, comme hier ahah.",
                answer2: "Un repas équilibré préparé avec \namour par ma mère pour moi.",
                jauge1: 0,
                jauge2: -20,
                jauge3: +10,
                jauge4: +0,
                jauge1c2: +0,
                jauge2c2: +25,
                jauge3c2: -20,
                jauge4c2: 0

            },
            {
                question : "Une petite pause cigarette ?  ",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Oui, j’ai plus rien à perdre.",
                answer2: "Non, j’aime la vie moi, mais je viens prendre l'air quand même.",
                jauge1: 40,
                jauge2: -30,
                jauge3: -5,
                jauge4: -20,
                jauge1c2: -20,
                jauge2c2: +30,
                jauge3c2: 11,
                jauge4c2: 15

            },
           
           {
                question : "Sortons alors, mais évite les imprimantes et ne perds pas de temps avec les collègues il reste du boulot !",
                proposition1: "C'est parti !",
                proposition2: "",
                answer1: "",
                answer2: "",
                jauge1: 0, //stress
                jauge2: 0, // santé
                jauge3: 0, //energie
                jauge4: 0, //productivité
                jauge1c2: 0, // impact si réponse 2
                jauge2c2: 0,
                jauge3c2: 0,
                jauge4c2: 0,
                jeu : "Platformer"

            },
            {
                question : "Si tu as toujours mal à la tête, va voir le patron ou prends un cachet.",
                proposition1: "Patron",
                proposition2: "Cachet",
                answer1: "J’aurai surement ma journée pour regarder la télé.",
                answer2: "Un médicament de plus...",
                jauge1: -5,
                jauge2: +10,
                jauge3: 0,
                jauge4: +3,
                jauge1c2: 5,
                jauge2c2: -15,
                jauge3c2: -11,
                jauge4c2: +20

            },
            {
                question : "Un collègue me demande de l’aider, j’accepte malgré la perte de temps et d’énergie ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Oui, il me revaudra bien ça un jour",
                answer2: "Non c’est toujours le même qui a \nbesoin d’aide",
                jauge1: -10,
                jauge2: -3,
                jauge3: -20,
                jauge4: -20,
                jauge1c2: -3,
                jauge2c2: 3,
                jauge3c2: 20,
                jauge4c2: 30

            },
            {
                question : "J’ai du mal sur un dossier à rendre bientôt, je demande de l’aide à un collègue?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Philippe est très bon il doit pouvoir m’aider",
                answer2: "La secrétaire sur qui j'ai un crush pourrait penser que je ne suis pas au niveau",
                jauge1: 3,
                jauge2: +0,
                jauge3: +6,
                jauge4: +3,
                jauge1c2: 3,
                jauge2c2: 0,
                jauge3c2: -6,
                jauge4c2: -3

            },
            {
                question : "Tu veux faire la fête ce soir ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "J’aurais mal à la tête pour une semaine.",
                answer2: "Je vais pouvoir finir mon boulot.",
                jauge1: 20,
                jauge2: -20,
                jauge3: -15,
                jauge4: -15,
                jauge1c2: -10,
                jauge2c2: +5,
                jauge3c2: +10,
                jauge4c2: +20

            },
            {
                question : "Tu as l’air d’être fatigué, tu devrais faire une sieste de 40 minutes",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "C’est trop long, en fait je serais \nfatigué et peu efficace ensuite",
                answer2: "20 minutes auraient été parfaites ! Pas fatigué et réparateur !",
                jauge1: 30,
                jauge2: +20,
                jauge3: +10,
                jauge4: -20,
                jauge1c2: -20,
                jauge2c2: -10,
                jauge3c2: -20,
                jauge4c2: 20

            },
            {
                question : "Je vous propose une journée team building ? ",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Ça nous rapprochera.  ",
                answer2: "J’aime pas mes collègues.",
                jauge1: -3,
                jauge2: -0,
                jauge3: -6,
                jauge4: +10,
                jauge1c2: 3,
                jauge2c2: +0,
                jauge3c2: -6,
                jauge4c2: -10

            },
           
           {
                question : "Le patron veut que tu tries de nouveau un dossier, mais il faut lui rendre maitenant depêche toi !",
                proposition1: "C'est parti !",
                proposition2: "",
                answer1: "",
                answer2: "",
                jauge1: 0, //stress
                jauge2: 0, // santé
                jauge3: 0, //energie
                jauge4: 0, //productivité
                jauge1c2: 0, // impact si réponse 2
                jauge2c2: 0,
                jauge3c2: 0,
                jauge4c2: 0,
                jeu : "PaperStack"

            },
            {
                question : "Tu veux une pomme ou un jus d’orange ?",
                proposition1: "Pomme",
                proposition2: "Jus d’orange",
                answer1: "Une pomme bien verte pour une \nsanté de fer.",
                answer2: "C’est plus chimique mais ça suffira...",
                jauge1: -3,
                jauge2: +10,
                jauge3: +20,
                jauge4: -0,
                jauge1c2: -3,
                jauge2c2: -10,
                jauge3c2: +10,
                jauge4c2: +0

            },
            {
                question : "Tu as l’air un peu à cran, tu veux me rejoindre pour une pause café pour se détendre ? ",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Attention au delà de 42 doses \nmoyennes de café par jour \nc’est mortel ",
                answer2: "Non, le thé est meilleur pour la santé \nsur le long terme",
                jauge1: -25,
                jauge2: -10,
                jauge3: +30,
                jauge4: -3,
                jauge1c2: -10,
                jauge2c2: 10,
                jauge3c2: -20,
                jauge4c2: 3

            },
            {
                question : "Ton bureau est tout juste sous la lampe principale, on le bouge?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "J’avais mal à la tête avec cette \nlampe.",
                answer2: "Non mais je vois rien sur mon écran.",
                jauge1: -3,
                jauge2: +20,
                jauge3: -10,
                jauge4: -3,
                jauge1c2: -3,
                jauge2c2: -20,
                jauge3c2: 10,
                jauge4c2: -3

            },
            {
                question : " Penses tu qu’il faille nettoyer ton bureau chaque jour ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Bravo",
                answer2: "La propreté c’est pour les nuls",
                jauge1: 0,
                jauge2: +3,
                jauge3: 0,
                jauge4: 0,
                jauge1c2: 0,
                jauge2c2: -3,
                jauge3c2: 0,
                jauge4c2: 0

            },
            {
                question : "Hey tu veux venir mater le match de l’équipe de France chez moi ce soir, on aura des chips et des bières ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Sortir c’est bien, mais attention à l'alcool et au lendemain de soirées \nqui peuvent pénaliser le travail",
                answer2: "Rester chez soi tranquillement c’est bien aussi",
                jauge1: -5,
                jauge2: -5,
                jauge3: -15,
                jauge4: -20,
                jauge1c2: -5,
                jauge2c2: +5,
                jauge3c2: +6,
                jauge4c2: +15

            },
            {
                question : "Tu es assis depuis 2 heures, tu veux prendre 10 minutes pour t'étirer dehors même sans l’accord du patron  ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "On sort en cachette.",
                answer2: "Non je vais plutôt faire un tour dans le bureau.",
                jauge1: 20,
                jauge2: +25,
                jauge3: +15,
                jauge4: -20,
                jauge1c2: -15,
                jauge2c2: -15,
                jauge3c2: -5,
                jauge4c2: +30

            },
           
           {
                question : "D'accord mais ne prenons pas trop de temps, un nouveau projet nous attends juste après !",
                proposition1: "C'est parti !",
                proposition2: "",
                answer1: "",
                answer2: "",
                jauge1: 0, //stress
                jauge2: 0, // santé
                jauge3: 0, //energie
                jauge4: 0, //productivité
                jauge1c2: 0, // impact si réponse 2
                jauge2c2: 0,
                jauge3c2: 0,
                jauge4c2: 0,
                jeu : "Platformer"

            },
            {
                question : "Tu as le temps de venir manger avec nous à la cafétéria au 6ème ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "J’ai besoin de prendre une heure de pause pour manger et digérer",
                answer2: "Je n’ai pas le temps de manger autre chose que le sandwich que mamie m'a préparé",
                jauge1: 20,
                jauge2: +20,
                jauge3: +30,
                jauge4: -35,
                jauge1c2: -20,
                jauge2c2: -20,
                jauge3c2: -6,
                jauge4c2: +32

            },
            {
                question : "Michel mange dans notre bureau, on le vire ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Oui c’est pas hygiénique.",
                answer2: "Non, même si c’est sale.",
                jauge1: -5,
                jauge2: -0,
                jauge3: -10,
                jauge4: +2,
                jauge1c2: -25,
                jauge2c2: 0,
                jauge3c2: +6,
                jauge4c2: -5

            },
            {
                question : "La jolie rousse qui te plaît est à la fontaine à eau,  vas chercher un verre et parle-lui",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Oui, et puis ça me fera prendre une pause dans mon travail",
                answer2: "Elle n’est pas si mignonne que ça, et puis le travail n’attend pas",
                jauge1: -5,
                jauge2: +5,
                jauge3: -6,
                jauge4: -20,
                jauge1c2: -5,
                jauge2c2: +5,
                jauge3c2: +6,
                jauge4c2: +15

            },
            {
                question : "Le patron propose en assemblée de favoriser l’insonorisation des bâtiments et des bureaux ou la mutuelle , Tu veux quoi toi ?",
                proposition1: "\t\tL’insonorisation",
                proposition2: "La mutuelle.",
                answer1: "Enfin du calme.",
                answer2: "On va avoir de belles dents.",
                jauge1: 35,
                jauge2: +5,
                jauge3: +2,
                jauge4: 0,
                jauge1c2: 10,
                jauge2c2: +20,
                jauge3c2: +2,
                jauge4c2: +0

            },
            {
                question : "Votre équipe de projet vous propose de venir à pied et les accompagner ce matin, qu’en pensez vous ?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Un peu d’activité physique et de vie sociale ne fait de mal à personne",
                answer2: "J’aime le diesel et mon audi R8",
                jauge1: -5,
                jauge2: +10,
                jauge3: -5,
                jauge4: +5,
                jauge1c2: -5,
                jauge2c2: -8,
                jauge3c2: 0,
                jauge4c2: +1

            },
            {
                question : "Le patron te fait savoir qu’il veut t’inviter à manger. Ça fera la 5ème fois, tu vas y aller?",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "Je vais lui parler de plusieurs \nsolutions pour améliorer notre \nbonheur au travail. ",
                answer2: "Non merci, je préfère travailler.",
                jauge1: 5,
                jauge2: -12,
                jauge3: 20,
                jauge4: 0,
                jauge1c2: -3,
                jauge2c2: +10,
                jauge3c2: +3,
                jauge4c2: +20

            },
           
           {
                question : "Salut, je ne me sens pas très bien dans mon bureau et j'ai entendu dire que tu saurais pourquoi, regarde cette photo et dis moi ce qui ne vas pas.",
                proposition1: "C'est parti !",
                proposition2: "",
                answer1: "",
                answer2: "",
                jauge1: 0, //stress
                jauge2: 0, // santé
                jauge3: 0, //energie
                jauge4: 0, //productivité
                jauge1c2: 0, // impact si réponse 2
                jauge2c2: 0,
                jauge3c2: 0,
                jauge4c2: 0,
                jeu : "PointAndClick"

            },
            {
                question : "C’est le pot de départ de Patrick ce soir !  Tu y vas ??",
                proposition1: "Bien-sûr !",
                proposition2: "Non",
                answer1: "Une occasion de bien s’amuser avec \nles collègues",
                answer2: "Il ne m’a jamais apprécié",
                jauge1: 5,
                jauge2: -15,
                jauge3: -12,
                jauge4: -10,
                jauge1c2: -3,
                jauge2c2: +10,
                jauge3c2: +20,
                jauge4c2: +10

            },           {
                question : "Il fait beau, on va travailler un peu dehors ou on reste dans nos bureaux ? ",
                proposition1: "A l’envie",
                proposition2: "A ma place ou rien !",
                answer1: "Chouette enfin de l'espace et de la lumière naturelle !",
                answer2: "C’est idéal",
                jauge1: 6,
                jauge2: +4,
                jauge3: +5,
                jauge4: +3,
                jauge1c2: -15,
                jauge2c2: +0,
                jauge3c2: -5,
                jauge4c2: -3

            },            {
                question : "On met des plantes dans notre bureau, malgré les allergies de Jackie.",
                proposition1: "Oui",
                proposition2: "Non",
                answer1: "C’est bon pour notre santé mais par pour celle de Jackie.",
                answer2: "J’aime pas l’air pur.",
                jauge1: 15,
                jauge2: 15,
                jauge3: +5,
                jauge4: +2,
                jauge1c2: -20,
                jauge2c2: -5,
                jauge3c2: -2,
                jauge4c2: -1

            },            {
                question : "Une odeur étrange et désagréable se dégage du bureau du collègue en face de nous, on lui dit de prendre une douche? ",
                proposition1: "Bien-sûr !",
                proposition2: "Non",
                answer1: "Une bonne hygiène de vie est indispensable",
                answer2: "C’est dommage une bonne hygiène de vie est indispensable",
                jauge1: +20,
                jauge2: +5,
                jauge3: -5,
                jauge4: -6,
                jauge1c2: -20,
                jauge2c2: -9,
                jauge3c2: +5,
                jauge4c2: -5

            },          {
                question : "Crois-tu qu’une distance d’un bras entre toi et l’écran soit suffisant pour tes yeux ? ",
                proposition1: "Bien sur !",
                proposition2: "OMG NON",
                answer1: "La distance recommandée est effectivement d’un bras tendu entre l’écran",
                answer2: "C’était pourtant vrai",
                jauge1: +1,
                jauge2: +40,
                jauge3: +20,
                jauge4: +30,
                jauge1c2: -1,
                jauge2c2: -50,
                jauge3c2: -15,
                jauge4c2: -9

            }
        ];


        this.game.world.setBounds(0, 0, 800, 600);
        this.game.add.sprite(0,0,'bureauPrincipal');
        this.myHealthBar1 = new HealthBar(this.game, {x: 100, y: 20, bar: {color:'#f1c40f'}});
        this.myHealthBar2 = new HealthBar(this.game, {x: 300, y: 20, bar: {color:'#2ecc71'}});
        this.myHealthBar3 = new HealthBar(this.game, {x: 500, y: 20, bar: {color:'#2980b9'}});
        this.myHealthBar4 = new HealthBar(this.game, {x: 700, y: 20, bar: {color:'#9b59b6'}});
        this.bulleConvGroup = this.game.add.group();


        this.affjauge1 = this.add.text(50,35,"Sérénité" ,{font: "20px Arial", fill: "#EAEAEA", align: "center", fontWeight : 'bold',stroke : '#f1c40f',strokeThickness : 6});
        this.affjauge2 = this.add.text(250,35,"Santé" ,{font: "20px Arial", fill: "#EAEAEA", align: "center", fontWeight : 'bold',stroke : '#2ecc71',strokeThickness : 6 });
        this.affjauge3 = this.add.text(450,35,"Energie" ,{ font: "20px Arial", fill: "#EAEAEA", align: "center", fontWeight : 'bold',stroke : '#2980b9',strokeThickness : 6});
        this.affjauge4 = this.add.text(630,35,"Productivité" ,{ font: "20px Arial", fill: "#EAEAEA", align: "center", fontWeight : 'bold',stroke : '#9b59b6',strokeThickness : 6});
        
        //dataText = this.add.text(0, 50, 'coor', this.style);

        this.text1 = this.add.text(185, 340, "",this.style);
        this.text1.anchor.set(0.5);
        //this.text1.align = 'center';

        this.text2 = this.add.text(70, 530, "", this.style2);
        this.text2.anchor.set(0.5);
        //this.text2.align = 'center';

        this.text3 = this.add.text(300, 530, "", this.style2);
        this.text3.anchor.set(0.5);
        //this.text3.align = 'center';

        this.text4 = this.add.text(170, 550, "", this.style);
        this.text3.anchor.set(0.5);
        //this.text3.align = 'center';



        this.text2.inputEnabled = true;
        this.text2.events.onInputDown.add(this.questionAnswerFirst,this);

        this.text3.inputEnabled = true;
        this.text3.events.onInputDown.add(this.questionAnswerSecond,this);

        this.text4.inputEnabled = true;
        this.text4.events.onInputDown.add(this.newQuestion,this);

        this.actuJauge();
        this.newQuestion();

    },



    newQuestion : function(item){
        if(this.bulleConv != undefined){
                this.bulleConv.destroy();
            }
        
        if(this.GAME_OVER){
            var screenGO = this.add.sprite(0, 0, 'screenGO');
            this.jauge1=50;
        	this.jauge2=50;
        	this.jauge3=50;
        	this.jauge4=50;
            Work._LVL = 1;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, ()=>{ this.game.state.start('MainMenu'); });
            
        }
        else{
            this.bulleConv = this.bulleConvGroup.create(0,225,'bulleQuestion')
            this.text4.text = "";
            if(this.data[Work._NBQUESTION] != undefined){
                this.text1.text = this.data[Work._NBQUESTION].question;
                this.text2.text = this.data[Work._NBQUESTION].proposition1;
                this.text3.text = this.data[Work._NBQUESTION].proposition2;
            }
            else{
                this.text1.text = "Je vois que tu t'es épanouie \nau sein de cette entreprise\n et je pense que tu possèdes\n maitenant \toutes les clés pour être \nheureux dans ton propre travail ! ";
                /* \nNous t'invitons à recommencer \nle jeu pour prendre des choix\n différents, il n'y a pas \nqu'un seul chemin pour \nse sentir bien au travail. \nOu tu peux partager ce jeu à ton entourage \npour les aider à s'informer \nsur les bonnes pratiques et tester \nles différents moyens \nde se sentir bien au travail." */
                this.text2.text = "";
                this.text3.text = "";
                
                this.returnButton = this.add.button(Work._WIDTH*1.1, 500, 'retour', this.retourMenu, this);
		        this.returnButton.input.useHandCursor = true;
                Work._LVL = 1;
                this.jauge1=50;
                this.jauge2=50;
                this.jauge3=50;
                this.jauge4=50;
                
            }
        }
    },

    questionAnswerFirst : function(item){
        this.bulleConv.destroy();
        this.bulleConv = this.bulleConvGroup.create(0,225   ,'bulleAnswer');
        if(!this.data[Work._NBQUESTION].hasOwnProperty("jeu") ) {
            this.text1.text = this.data[Work._NBQUESTION].answer1;
            this.text2.text = "";
            this.text3.text = "";
            this.text4.text = "Next";
            this.incrementationJauge(0);
            
        }
        else{
            this.game.state.start(this.data[Work._NBQUESTION].jeu);
            
        }
        Work._NBQUESTION++;

    },

    questionAnswerSecond : function(item){
        this.bulleConv.destroy();
        this.bulleConv = this.bulleConvGroup.create(0,225   ,'bulleAnswer');
        this.text1.text = this.data[Work._NBQUESTION].answer2;
        this.text2.text = "";
        this.text3.text = "";
        this.text4.text = "Next";
        this.incrementationJauge(1);
        Work._NBQUESTION++;
    },

    incrementationJauge : function(sense){
        if(sense == 0 ){
            this.jauge1 += this.data[Work._NBQUESTION].jauge1;
            this.myHealthBar1.setPercent(this.jauge1);

            this.jauge2 += this.data[Work._NBQUESTION].jauge2;
            this.myHealthBar2.setPercent(this.jauge2);

            this.jauge3 += this.data[Work._NBQUESTION].jauge3;
            this.myHealthBar3.setPercent(this.jauge3);

            this.jauge4 += this.data[Work._NBQUESTION].jauge4;
            this.myHealthBar4.setPercent(this.jauge4);

        }
        else{
            this.jauge1 += this.data[Work._NBQUESTION].jauge1c2;
            this.myHealthBar1.setPercent(this.jauge1);

            this.jauge2 += this.data[Work._NBQUESTION].jauge2c2;
            this.myHealthBar2.setPercent(this.jauge2);

            this.jauge3 += this.data[Work._NBQUESTION].jauge3c2;
            this.myHealthBar3.setPercent(this.jauge3);

            this.jauge4 += this.data[Work._NBQUESTION].jauge4c2;
            this.myHealthBar4.setPercent(this.jauge4);
        }
        //this.affichageJauge();

        if (this.jauge1 < 0 || this.jauge2 < 0 || this.jauge3 < 0 || this.jauge4 < 0){
            this.text1.text = "Tu n'as pas réussi à gérer ton bien \nêtre en faisant les bons choix...";
            this.text2.text = "";
            this.text3.text = "";
            
            this.GAME_OVER = true;
            
        }

    },

    actuJauge: function (){
    	 this.myHealthBar1.setPercent(this.jauge1);
    	 this.myHealthBar2.setPercent(this.jauge2);
    	 this.myHealthBar3.setPercent(this.jauge3);
    	 this.myHealthBar4.setPercent(this.jauge4);
    },


   // affichageJauge: function(){
        //this.affjauge1.text = "Jauge1: " + this.jauge1;
        //this.affjauge2.text = "Jauge2: " + this.jauge2;
        //this.affjauge3.text = "Jauge3: " + this.jauge3;
        //this.affjauge4.text = "Jauge4: " + this.jauge4;
  //  },




    update : function(){
        //dataText.text = 'x: ' + this.input.activePointer.x + ' y: ' + this.input.activePointer.y;
    },
    
    retourMenu : function(){
    
        this.game.state.start('MainMenu');
        
    },
    
    
    shutdown : function(){
        //musicPrincipal.destroy();
       
    }






}



