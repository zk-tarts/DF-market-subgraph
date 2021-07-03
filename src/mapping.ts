import { BigInt } from "@graphprotocol/graph-ts";
import { ListingUpdate } from "../generated/Market/Market"
import { ListedToken } from "../generated/schema"

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
