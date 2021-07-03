import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Transfer } from "../generated/WXDAI/WXDAI"
import { ListingUpdate } from "../generated/Market/Market"
import { ListedToken, Fee } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  if(event.params.src.toString()=="0xa954bae58FBE108795eCf188299DF885214786A1"){  
    let id = event.block.timestamp.toString()
    if (Fee.load(id) ==null){
      let feeStored = new Fee(id);
      feeStored.fee=event.params.wad
      feeStored.save()
    }
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

