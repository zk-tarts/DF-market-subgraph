import { BigInt } from "@graphprotocol/graph-ts"
import { Market, ListingUpdate } from "../generated/Market/Market"
import { ListingChange } from "../generated/schema"

export function handleListingUpdate(event: ListingUpdate): void {
  let id = event.transaction.hash.toString()
  let update = new ListingChange(id);
  update.price = event.params.price
  update.token = event.params.token
  update.save()
}
