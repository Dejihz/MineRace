import GameItem from "./GameItem.js";
import KeyboardListener from "./KeyboardListener.js";

export default class Player2 extends GameItem{
    private keyBoardListener: KeyboardListener;

    public up:HTMLImageElement;
    public left:HTMLImageElement;
    public right:HTMLImageElement;
    public down:HTMLImageElement;

    constructor(canvas:HTMLCanvasElement){
        let name = localStorage.getItem("player2Name")
        let xPos = GameItem.randomNumber(0, canvas.width - 50);
        let yPos = GameItem.randomNumber(70, canvas.height - 100);
        let image = GameItem.loadNewImage('../assets/images/alexFront.png'); //S

        super(name, xPos,yPos,image);
        this.keyBoardListener = new KeyboardListener();
        
        this.left = GameItem.loadNewImage('../assets/images/alexLeft.png'); //A
        this.right = GameItem.loadNewImage('../assets/images/alexRight.png'); // D
        this.up = GameItem.loadNewImage('../assets/images/alexBack.png');
        this.down = GameItem.loadNewImage('../assets/images/alexFront.png');

        this.stepSound = GameItem.loadNewAudio("../assets/sound/grass3.mp3");
        this.canMove = true;
    }



    /**
    * Method to move alex on the canvas
    */
     public move(): void {
        if(this.canMove == true){
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
                this.xPosition = this.xPosition - this.speed;
                this.image = this.left;
                this.stepSound.play();
                console.log(localStorage.getItem("player2Name"));
            }
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
                this.xPosition = this.xPosition + this.speed;
                this.image = this.right;
                this.stepSound.play();
            }
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
                this.yPosition = this.yPosition - this.speed;
                this.image =  this.up;
                this.stepSound.play();
            }
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
                this.yPosition = this.yPosition + this.speed;
                this.image =  this.down;
                this.stepSound.play();
            }
        }
        {
            console.log("p2 cannot move");
         }
    }     
    
   

}

    


    