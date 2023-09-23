# Pokemon TCG Price Checker

a nodejs script that hits https://pokemontcg.io/ and indirectly TCGPlayer to fetch pricing data. This can be useful for trying to complete master sets of a particular set.

You will need to grab an API token from the site and then save it as an environment variable named `POKEMON_TCG_API_TOKEN`

# Example:

Fetch the prices for cards 1, 4, and 7 from SV: Obsidian Flames

obf.json:

```
[1, 4, 7]
```

Script:

```sh
node index.js --setName sv3 --file=./obf.json
```

Output:

```
Prices for cards from Obsidian Flames

1 Oddish [ 'reverseHolofoil: 0.07', 'normal: 0.04' ]
4 Scyther [ 'reverseHolofoil: 0.1', 'normal: 0.05' ]
7 Masquerain [ 'reverseHolofoil: 0.14', 'normal: 0.04' ]
```
