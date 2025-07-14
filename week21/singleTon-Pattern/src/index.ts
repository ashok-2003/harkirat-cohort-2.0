import { gameManager } from "./store";

gameManager.logState(); // this log the state here 
gameManager.addGames({
    id: Math.random().toString(),
    whilePlayer: "alice",
    BlackPlayer: "bob",
    moves : []
})
gameManager.logState();