import Pickup from "./Pickup.js";

export default class GameItem {
    public name: string;
       
    public point: number;

    public xPosition: number;

    public yPosition: number;

    public speed: number;

    public image: HTMLImageElement;

    public stepSound : HTMLAudioElement;

    public canMove : boolean;

    public constructor(name: string, xPos: number,yPos: number, image:HTMLImageElement) {
        this.name = name;
        this.xPosition = xPos;
        this.yPosition = yPos;
        this.image = image;

        this.speed = 4;
        
    }

    /**
     * Get the name
     *
     * @returns the name of  the GameItem
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Set the name of the GameItem
     *
     * @param name of the GameItem
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Get the image
     *
     * @returns the image of  the GameItem
     */
    public getImage(): HTMLImageElement {
        return this.image;
    }

    /**
     * Set the image of the GameItem
     *
     * @param the image of the GameItem
     */
    public setImage(image: HTMLImageElement): void {
        this.image = image;
    }

    /**
     * Get the xPosition
     *
     * @returns returns the position on the x-axis
     */
    public getXPosition(): number {
        return this.xPosition;
    }

    /**
     * Set the xPosition
     *
     * @param xPosition - set a new xPosition
     */
    protected setXPosition(xPosition: number): void {
        this.xPosition = xPosition;
    }

    /**
     * Get the point
     *
     * @returns returns point of the pickups
     */
     public getPoint(): number {
        return this.point;
    }

    /**
     * Set the points
     *
     * @param point - set a new point value
     */
    protected setPoint(point: number): void {
        this.point = point;
    }

    /**
     * Get the yPosition
     *
     * @returns returns the position on the y-axis
     */
    public getYPosition(): number {
        return this.yPosition;
    }

    /**
     * Set the yPosition
     *
     * @param yPosition - set a new yPosition
     */
    protected setYPosition(yPosition: number): void {
        this.yPosition = yPosition;
    }

    /**
     * Get the speed
     *
     * @returns returns the speed
     */
    public getSpeed(): number {
        return this.speed;
    }

    /**
     * Set the speed
     *
     * @param speed - set a new speed
     */
    protected setSpeed(speed: number): void {
        this.speed = speed;
    }

    /**
     * Prevent Player from running off canvas to get Points
     * 
     * @param canvas 
     */
    public colidesWithBorder(canvas: HTMLCanvasElement): void{
        if(this.xPosition< 0){
            this.xPosition = 0;
        }
        if(this.xPosition+ this.image.width> canvas.width){
            this.xPosition = canvas.width - this.image.width;
        }
        if(this.yPosition< 60) {
            this.yPosition = 60;
        }
        if(this.yPosition + this.image.height> canvas.height){
            this.yPosition = canvas.height - this.image.height;
        }
    }



    /**
     * Draw the Normal Player on the canvas
     *
     * @param ctx rendering context
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
        // write the player name above player image to the canvas
        ctx.font = `16px sans-serif`;
        ctx.fillStyle = "white";
        ctx.fillText(this.name, this.xPosition - 0, this.yPosition - 10);
    }

    /**
     * Draw the Pickup on the canvas
     *
     * @param ctx rendering context
     */
     public drawPickup(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.xPosition, this.yPosition, 30, 30);
    } 

    /**
     * Assign pickup properties for collision
     * 
     * @param pickup 
     */
    public colidesWithPickup(pickup: Pickup): boolean{
        return this.xPosition <= pickup.getXPosition() + pickup.getImage().width &&
        this.xPosition + this.image.width >= pickup.getXPosition() &&
        this.yPosition <= pickup.getYPosition() + pickup.getImage().height &&
        this.yPosition + this.image.height >= pickup.getYPosition()
       
    }

    /**
   * Method to load an image
   *
   * @param source the image
   * @returns HTMLImageElement - returns an image
   */
    public static loadNewImage( source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
    }

    /**
   * Method to load an audio
   *
   * @param source the source
   * @returns HTMLAudioElement - returns an audio
   */
    public static loadNewAudio(source: string): HTMLAudioElement {
    const audio = new Audio();
    audio.src = source;
    audio.volume = 0.2;
    return audio;
    }


    /**
   * Returns a random number between min and max
   *
   * @param min - lower boundary
   * @param max - upper boundary
   * @returns a random number between min and max
   */
    public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
    }

}
