import { ListingUpdate } from "../generated/Market/Market"
import { ListingChange } from "../generated/schema"

export function handleListingUpdate(event: ListingUpdate): void {
  let id = event.transaction.hash.toHex() + event.logIndex.toString();
  let update = new ListingChange(id);
  update.price = event.params.price
  update.save()
}
