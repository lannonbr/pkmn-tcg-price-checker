import { parseArgs } from "node:util";
import { readFile } from "node:fs/promises";
import pokemon from "pokemontcgsdk";

async function run() {
  const args = parseArgs({
    options: {
      setName: {
        type: "string",
        short: "s",
      },
      file: {
        type: "string",
        short: "f",
      },
    },
  });

  const { file, setName } = args.values;

  if (typeof file === "undefined" || typeof setName === "undefined") {
    console.error("Error: A set id and file path are required as flags");
    help();

    process.exit(1);
  }

  pokemon.configure({ apiKey: process.env["POKEMON_TCG_API_TOKEN"] });

  const cardIds = JSON.parse(await readFile(file));

  const set = await pokemon.set.find(setName);

  console.log(`Prices for remaining cards from ${set.name}`);
  console.log();

  for (let cardId of cardIds) {
    const card = await pokemon.card.find(`${setName}-${cardId}`);

    const prices = Object.entries(card.tcgplayer.prices).map(
      ([rarity, value]) => {
        return `${rarity}: ${value.market}`;
      }
    );

    console.log(card.number, card.name, prices);

    await sleep(250);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function help() {
  console.log("Flags:");
  console.log(
    "  --setName (-s): set ID as listed here: https://github.com/PokemonTCG/pokemon-tcg-data/blob/master/sets/en.json"
  );
  console.log(
    "  --file (-f): file of an array of integers corresponding to card numbers that you wish to look up"
  );
}

run();
