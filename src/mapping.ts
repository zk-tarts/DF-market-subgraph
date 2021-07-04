import { Address, BigInt, Bytes, ethereum, log } from "@graphprotocol/graph-ts";
import { Fee, ListedToken } from "../generated/schema";
import { Market } from "../generated/Market/Market"


export function handleBlock(block: ethereum.Block): void {
  if (block.number.gt(BigInt.fromI32(16895823))){
    let market = Market.bind(Address.fromString("0x3Fb840EbD1fFdD592228f7d23e9CA8D55F72F2F8"))
    let fee = Fee.load(market.endDate().toString())
    if (fee == null){
      fee.fee = market.fee()
      fee.save()
    }
  }
}


export function handleList(tx: ethereum.Transaction): void {
  let id = tx.hash.toHex()
  log.info('handleList with tx hash {}',[id])
  let x = new Uint8Array(tx.input.byteLength-4) as Bytes
  for (let i =0; i<tx.input.byteLength-4;i++){   // remove function selector
    x[i] = tx.input[i]
  }
  let decodedInput = ethereum.decode("(uint256,uint256)",x) // abi decode
  log.debug('{} , {}', decodedInput.toStringArray())
  let token = ListedToken.load(id)
  token = new ListedToken(id)
  token.tokenID = decodedInput.toBigIntArray()[0]
  token.owner = tx.from.toHexString()
  token.price = decodedInput.toBigIntArray()[1]
  token.save()
}

