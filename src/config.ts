import { IConfig } from "terraria-server";
import * as dotenv from "dotenv";
import * as os from "os";
import * as pogger from "pogger";

dotenv.config();

const supportedPlatforms = ["linux", "win32"];
const platform = os.platform();
if (!supportedPlatforms.includes(platform)) {
    pogger.error(`Supported platforms: ${supportedPlatforms.join(", ")}`);
    process.exit(1);
}

const BUILD_DIRECTORY = `${process.cwd()}/server`;

let SERVER_FOLDER = `${BUILD_DIRECTORY}/1423/Linux`;
let SERVER_FILE = `${BUILD_DIRECTORY}/1423/Linux/TerrariaServer.bin.x86_64`;
switch (platform) {
    case "linux":
        SERVER_FOLDER = `${BUILD_DIRECTORY}/1423/Linux`;
        SERVER_FILE = `${BUILD_DIRECTORY}/1423/Linux/TerrariaServer.bin.x86_64`;
        break;
    case "win32":
        SERVER_FOLDER = `${BUILD_DIRECTORY}/1423/Windows`;
        SERVER_FILE = `${BUILD_DIRECTORY}/1423/Windows/TerrariaServer.exe`;
        break;
}

const CONFIG: IConfig = {
    SERVER_URL:
        "https://terraria.org/api/download/pc-dedicated-server/terraria-server-1423.zip", // Terraria official server 1.4.2.3
    BUILD_DIRECTORY,
    SERVER_FOLDER,
    SERVER_FILE,
    FILE_NAME: "terraria-server-1423.zip",
    PORT: parseInt(process.env.PORT as string) || 3000,
    NGROK_TOKEN: process.env.NGROK_TOKEN as string,
    SERVER_CONFIG: {
        WORLDS_FOLDER: `${BUILD_DIRECTORY}/worlds`,
        WORLD_FILE: "McQuigha",
        BAN_LIST: "banlist",
        MOTD: "Welcome Racist's!",
        PORT: 7777,
        PASSWORD: "sodium",
        MAX_PLAYERS: 5,
        LANGUAGE: "en-US",
        DIFFICULTY: 2,
        WORLD_SIZE: 2,
    },
};

export default CONFIG;
