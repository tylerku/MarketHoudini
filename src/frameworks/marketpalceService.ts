import {Item} from '../entities'

export default interface MarketplaceService {
    setup(): Promise<void> 
    fetchItemsForSale(searchString: string, count: number): Promise<Item[]>
  }