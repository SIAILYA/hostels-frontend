import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import bridge from "@vkontakte/vk-bridge";

// Init VK  Mini App
// bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));

// import("./eruda").then(({ default: eruda }) => {}); //runtime download

// if (process.env.NODE_ENV === "development") {
// }
