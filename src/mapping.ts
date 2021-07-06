import { Bytes, ethereum, log, store } from "@graphprotocol/graph-ts";
import { ListedToken } from "../generated/schema";

export function handleBuy(tx: ethereum.Transaction): void {
  let id = tx.hash.toHex()
  store.remove('ListedToken',id)
}

export function handleUnist(tx: ethereum.Transaction): void {
  let id = tx.hash.toHex()
  store.remove('ListedToken',id)
}

export function handleList(tx: ethereum.Transaction): void {
  let id = tx.hash.toHex()
  let token = ListedToken.load(id)
  token = new ListedToken(id)
  let x = tx.input
  {
   // let input = tx.input.subarray(3) as Bytes // remove first 4 bytes: function selector
    //let decodedInput = ethereum.decode("(uint256,uint256)",tx.input) // abi decode
    //token.tokenID = decodedInput.toBigIntArray()[0]
    //token.owner = tx.from.toHexString()
    //token.price = decodedInput.toBigIntArray()[1]
  }
  token.save()
}

