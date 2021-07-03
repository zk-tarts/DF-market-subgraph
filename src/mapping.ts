import { BigInt } from "@graphprotocol/graph-ts";
import { ListingUpdate, Market } from "../generated/Market/Market"
import { ListedToken, Fee } from "../generated/schema"

export function handleBlockWithCall(contract: Market): void{
  let feeStored = Fee.load("0");
  if (feeStored == null){
    feeStored = new Fee("0");
    feeStored.fee = contract.fee();
    feeStored.save()
  }
}

export function handleListingUpdate(event: ListingUpdate): void {
  let id = event.params.token.toHex()
  let  token = ListedToken.load(id);
  if (token == null){
    token= new ListedToken(id);
    token.price = event.params.price;
    token.tokenID = event.params.token;
  }
  
  if (event.params.price === new BigInt(0)){
    token = null;
    token.save()
  }
  else{
    token.save()
  }
  

}

