import { store } from "@graphprotocol/graph-ts";
import { ListedToken, Sale, UnlistedToken } from "../generated/schema";
import { BuyCall, ListCall, UnlistCall } from "../generated/Market/Market"
export function handleBuy(tx: BuyCall): void {
  let id = tx.inputs.tokenID.toHexString()
  
  let x = ListedToken.load(id)
  
  {  
    let token = new UnlistedToken(id)
    token.tokenID = x.tokenID
    token.owner = x.owner
    token.price = x.price
    token.save()
  }
  {
    let sale = new Sale(tx.transaction.hash.toHexString())
    sale.token = tx.inputs.tokenID
    sale.price = tx.transaction.value
    sale.buyer = tx.from.toHexString()
    sale.save()
  }

  store.remove('ListedToken',id)
}

export function handleUnlist(tx: UnlistCall): void {
  let id = tx.inputs.id.toHexString()

  let x = ListedToken.load(id)
  let token = new UnlistedToken(id)
  token.tokenID = x.tokenID
  token.owner = x.owner
  token.price = x.price

  token.save()
  store.remove('ListedToken',id)
}

export function handleList(tx: ListCall): void {
  let id = tx.inputs.tokenID.toHexString()

  if( UnlistedToken.load(id)!==null){
    store.remove('UnlistedToken',id)
  }
  
  let token = new ListedToken(id)
  token.tokenID = tx.inputs.tokenID
  token.owner = tx.from.toHexString()
  token.price = tx.inputs.price
  
  token.save()
}

