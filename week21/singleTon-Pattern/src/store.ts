interface games {
    id : string;
    whilePlayer : string;
    BlackPlayer : string;
    moves : string[];
}

class GameManager{
    private games : games[] = [];
    private constructor(){
        this.games = [];
    }

    public addGames(games : games){
        this.games.push(games);
    }

    public getGames(id : string, moves : string){
        // so now first we have to find the game with that id 
        const currGame = this.games.find(game => game.id === id)
        if(currGame){
            currGame.moves.push(moves);
        }else{
            return("invalid id of the game");
        }
    }
    public logState(){
        console.log(this.games)
    }


    // static method is directly assosiated with the class rather than assosiated with the instance of class that is 
    // it dose not requried to create the object out of class for this function to run 
    private static instance : GameManager;
    
    public static getInstance(){
        if(!this.instance){
            this.instance = new GameManager();
        }
        return this.instance;
    }

}


// export const gameManager = new GameManager(); 


// // issue is that anyone can create the new game instance of it if they want to 
// so to meet this we have to intruduced the singlotn patter 
// so if we make the constructor private we can not create the instance outside hte class 


// so now we will have singleton class as we have created the static method 

export const gameManager = GameManager.getInstance();


// so if anyone created their new instance also then only this method will run 