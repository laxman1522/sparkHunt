import ErrorModel from "./ErrorModel";

export default interface User{
    id? : String,
    name? : String,
    picUrl? : String,
    level? : Number,
    token? : String,
    isNextLevel? : Boolean,
    isGameCompleted? : Boolean,
    isTeamNextLevel? : Boolean,
    isSinglePlayer? : Boolean,
    nextZoneStartTime? : String,
    isNewUser? : Boolean,
    noOfLives? : Number,
    error? : ErrorModel,
    livesCompleted?: Number,
    remCoolingTime? : Number,
    completedOn? : String,
    attempts? : {}
    
}