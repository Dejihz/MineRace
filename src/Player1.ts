import GameItem from "./GameItem.js";
import KeyboardListener from "./KeyboardListener.js";

export default class Player1 extends GameItem{
    private keyBoardListener: KeyboardListener;

    public w:HTMLImageElement;
    public a:HTMLImageElement;
    public s:HTMLImageElement;
    public d:HTMLImageElement;

    constructor(canvas:HTMLCanvasElement){
        let name = localStorage.getItem("player1Name")
        let xPos = GameItem.randomNumber(0, canvas.width - 50);
        let yPos = GameItem.randomNumber(70, canvas.height - 100);
        let image = GameItem.loadNewImage('../assets/images/steveFront.png'); //S
        super(name, xPos,yPos,image);

        this.keyBoardListener = new KeyboardListener();
        
        this.a = GameItem.loadNewImage('../assets/images/steveLeft.png'); //A
        this.d = GameItem.loadNewImage('../assets/images/steveRight.png'); // D
        this.w = GameItem.loadNewImage('../assets/images/steveBack.png');
        this.s = GameItem.loadNewImage('../assets/images/steveFront.png');

        this.stepSound = GameItem.loadNewAudio("../assets/sound/grass2.mp3");
        this.canMove = true;
    }



    /**
    * Method to move steve on the canvas
    */
     public move(): void {
         if(this.canMove == true){
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_A)) {
                this.xPosition = this.xPosition - this.speed;
                this.image = this.a;
                this.stepSound.play();
            }
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_D)) {
                this.xPosition = this.xPosition + this.speed;
                this.image = this.d;
                this.stepSound.play();
            }
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_W)) {
                this.yPosition = this.yPosition - this.speed;
                this.image =  this.w;
                this.stepSound.play();
            }
            if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_S)) {
                this.yPosition = this.yPosition + this.speed;
                this.image =  this.s;
                this.stepSound.play();
            }
         }{
            console.log("p1 cannot move");
         }
        
    }      

}
    