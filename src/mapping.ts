import { Address, Bytes, ethereum, log, store } from "@graphprotocol/graph-ts";
import { Fee, ListedToken } from "../generated/schema";
import { Market } from "../generated/Market/Market"


export function handleBuy(tx: ethereum.Transaction): void {
  let id = tx.hash.toHex()
  store.remove('ListedToken',id)
}

export function handleUnist(tx: ethereum.Transaction): void {
  let id = tx.hash.toHex()
  store.remove('ListedToken',id)
}

export function handleList(tx: ethereum.Transaction): void {
  {
    let market = Market.bind(Address.fromString("0x3Fb840EbD1fFdD592228f7d23e9CA8D55F72F2F8"))
    let fee = Fee.load(market.endDate().toString())
    if (fee === null){
      fee = new Fee(market.endDate().toString())
      fee.fee = market.fee()
      fee.save()
    }
  }
  let id = tx.hash.toHex()
  log.info('handleList with tx hash {}',[id])
  log.debug('input before decode: {}', [tx.input.toHex()])
  let input = tx.input.subarray(3) as Bytes // remove first 4 bytes: function selector
  log.debug('input after slice: {}', [input.toHex()])
  let decodedInput = ethereum.decode("(uint256,uint256)",input) // abi decode
  log.debug('decoded minus function selector: {} , {}', decodedInput.toStringArray())
  let token = ListedToken.load(id)
  token = new ListedToken(id)
  token.tokenID = decodedInput.toBigIntArray()[0]
  token.owner = tx.from.toHexString()
  token.price = decodedInput.toBigIntArray()[1]
  token.save()
}

