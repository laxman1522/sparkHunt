import Question from "./Question";
import GameConfig from "./GameConfig";
import User from "./User";

export default interface Game {
    question : Question | undefined;
    user : User;
    gameConfig : GameConfig;
}