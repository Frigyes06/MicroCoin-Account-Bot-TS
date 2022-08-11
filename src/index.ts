import { Client } from "discord.js";
import { readFileSync } from "fs";
import { validateEnv } from "./utils/validateEnv.js";
import { onInteraction } from "./events/interaction.js";
import { onReady } from "./events/ready.js";

let packagedata = JSON.parse(readFileSync("./package.json", { encoding: "utf-8" }));
let version = packagedata["version"];

console.log(`Starting MicroCoin account bot v${version}`);

(async () => {
  if (!validateEnv()) return;

  const bot = new Client({ intents: ["Guilds"] });

  bot.on("ready", async () => await onReady(bot));

  bot.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
  );
  await bot.login(process.env.TOKEN);
})();
