import GameItem from "./GameItem.js";

export default class Pickup extends GameItem{

    constructor(canvas:HTMLCanvasElement){
        let name = "pointPickup"
        let xPos = GameItem.randomNumber(0, canvas.width - 50);
        let yPos = GameItem.randomNumber(70, canvas.height - 100);
        let image = GameItem.loadNewImage('/assets/images/goldApple.png'); 
        super(name, xPos,yPos,image);
        
        this.point = 1 ;
    }
}
    