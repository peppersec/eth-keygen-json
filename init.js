#!/usr/bin/env node

const { Wallet } = require("@ethersproject/wallet");
const inquirer = require("inquirer");
const fs = require("fs");
const question = [
  {
    type: "password",
    name: "password",
    message: "Please enter the password to encrypt your new ethereum key",
  },
];

async function main() {
  const answer = await inquirer.prompt(question);
  const w = Wallet.createRandom();
  console.log("Address:", w.address);
  console.log("Creating folder with your private key and json keystore.");
  let json = await w.encrypt(answer.password);
  fs.mkdirSync(w.address, { recursive: true });
  fs.writeFileSync(`${w.address}/${w.address}.json`, json);
  fs.writeFileSync(`${w.address}/${w.address}.pk`, w.privateKey);
}
main();
