import { store } from "@graphprotocol/graph-ts";
import { ListedToken } from "../generated/schema";
import { BuyCall, ListCall, UnlistCall } from "../generated/Market/Market"
export function handleBuy(tx: BuyCall): void {
  let id = tx.transaction.hash.toHex()
  store.remove('ListedToken',id)
}

export function handleUnist(tx: UnlistCall): void {
  let id = tx.transaction.hash.toHex()
  store.remove('ListedToken',id)
}

export function handleList(tx: ListCall): void {
  let id = tx.transaction.hash.toHex()
  let token = new ListedToken(id)
  token.tokenID = tx.inputs.tokenID
  token.owner = tx.from.toHexString()
  token.price = tx.inputs.price
  
  token.save()
}

