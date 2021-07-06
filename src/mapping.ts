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
  log.error('handleList with tx hash {}',[id])
  log.error('input before decode: {}', [tx.input.toHex()])
  let input = tx.input.subarray(3) as Bytes // remove first 4 bytes: function selector
  log.error('input after slice: {}', [input.toHex()])
  let decodedInput = ethereum.decode("(uint256,uint256)",input) // abi decode
  log.error('decoded minus function selector: {} , {}', decodedInput.toStringArray())
  let token = ListedToken.load(id)
  token = new ListedToken(id)
  token.tokenID = decodedInput.toBigIntArray()[0]
  token.owner = tx.from.toHexString()
  token.price = decodedInput.toBigIntArray()[1]
  token.save()
}

