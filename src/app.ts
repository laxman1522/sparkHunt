import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { CONSTANTS } from './constants';
import LoginController from './controllers/LoginController';
import GameController from './controllers/GameController';
import ConfigController from './controllers/ConfigController';


// Create a new express application instance
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Controllers
const loginController = new LoginController();
const gameController = new GameController();
const configController = new ConfigController();

// Get Initial Configurations on Application Start
configController.syncConfigurations();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Application Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send("Spark Hunt Application");
})

app.post(CONSTANTS.APIS.LOGIN_USER, async (req: Request, res: Response, next: NextFunction) => {
  res.send(await loginController.loginUser(req.body));
});

app.post(CONSTANTS.APIS.GET_USER_DATA, async (req: Request, res: Response, next: NextFunction) => {
  res.send(await gameController.getUserData(req.body.user, false));
});

app.post(CONSTANTS.APIS.CHECK_ANSWER, async (req: Request, res: Response, next: NextFunction) => {
  res.send(await gameController.checkAnswer(req.body));
});

app.get(CONSTANTS.APIS.GET_ACHIEVEMENTS, async (req: Request, res: Response, next: NextFunction) => {
  res.send(await gameController.getAchievements());
});

app.get(CONSTANTS.APIS.GET_RULES, async (req: Request, res: Response, next: NextFunction) => {
  res.send(await gameController.getRules());
});

app.get(CONSTANTS.APIS.SYNC_CONFIG, async (req: Request, res: Response, next: NextFunction) => {
  res.send(await configController.syncConfigurations());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Spark Hunt Server Started on ${PORT}`);
});