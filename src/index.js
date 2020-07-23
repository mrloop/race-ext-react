import SetupEvents from "./SetupEvents";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const setupEvents = new SetupEvents(document);
setupEvents.init();

serviceWorker.unregister();
