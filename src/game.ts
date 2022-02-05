import Player1 from "./Player1.js";
import Player2 from "./player2.js";
import Pickup from "./Pickup.js";
import GameItem from "./GameItem.js";

export default class Game {

  private p1: Player1;
  private p2: Player2;

  private canvas: HTMLCanvasElement;
  
  private ctx: CanvasRenderingContext2D;

  //random X and Y for question box
  private score1: number;
  private score2: number;   

  private pickup: Pickup;

  private pickupSound: HTMLAudioElement

  private winner: string;

  /**
   * Initialize the Game class
   *
   * @param canvasId id of the canvas
   */
  public constructor(canvasId: HTMLCanvasElement) {
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    this.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
    
    this.p1 = new Player1(this.canvas);
    this.p2 = new Player2(this.canvas);

    this.pickup = new Pickup(this.canvas);

    this.loop();


    this.score1 = 0;
    this.score2= 0;

    this.winner = undefined;

    this.pickupSound = GameItem.loadNewAudio("/assets/sound/pickup.mp3");

  }

  /**
   * Draws Player 1 to canvas
   */
  private drawP1(): void {
      this.p1.draw(this.ctx);
  }

  /**
   * Draws Player 2 to canvas
   */
   private drawP2(): void {
      this.p2.draw(this.ctx);
  }

  /**
   * Draws pickups to the canvas
   */
  private spawnPickup (): void{
    this.pickup = new Pickup(this.canvas)

  }

  /**
   * Draws endgame screen to the canvas
   */
  private gameOver(): void{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.writeTextToCanvas(this.winner, 40,this.canvas.width/2, this.canvas.height /2)
  }

  
  /**
   * Draws all the necessary elements to the canvas
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Player1 events 
    this.drawP1();
    this.p1.colidesWithBorder(this.canvas);
    if(this.p1.colidesWithPickup(this.pickup)){
      this.score1 += this.pickup.point;
      this.spawnPickup();
      this.pickupSound.play();
      
    }

    //Player2 events
    this.drawP2();
    this.p2.colidesWithBorder(this.canvas);
    if(this.p2.colidesWithPickup(this.pickup)){
      this.score2 += this.pickup.point;
      this.spawnPickup();
      this.pickupSound.play();
      
    }

    this.pickup.drawPickup(this.ctx);

    // write p1 score using player name
    this.writeTextToCanvas(localStorage.getItem("player1Name") + ": " + this.score1, 36, 120, 50);

     // write p1 score
     this.writeTextToCanvas(localStorage.getItem("player2Name")+": "+ this.score2, 36, this.canvas.width - 250, 50)
  }

  /**
   * Method for the Game Loop
   */
  private loop = () => {
    if(this.score1 <= 20 || this.score2 <= 20){
      this.draw();
  
      this.p1.move();
      this.p2.move();
    }
    {
      
      if(this.score1> this.score2 && this.score1 >= 20){
        this.winner =`${localStorage.getItem("player1Name")} wins`
        this.p1.canMove = false;
        this.p2.canMove = false;
        this.gameOver();
      }
      else if(this.score2> this.score1 && this.score2 >= 20){
        this.winner =`${localStorage.getItem("player2Name")} wins`
          this.gameOver();
          this.p1.canMove = false;
        this.p2.canMove = false;
        }
    }
    requestAnimationFrame(this.loop);
  };

  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'white',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  
}
