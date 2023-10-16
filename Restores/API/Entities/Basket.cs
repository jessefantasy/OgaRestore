using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id {get; set;}
        public string BuyerId {get; set;}

        public List<BasketItem> Items {get; set;} = new();

        public string PaymentIntentId {get; set;}

        public string ClientSecret {get; set;}



        public void AddItem(Product product, int quantity) {

     // Check if the product is already in the basket
    var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

    if (existingItem != null)
    {
        // If the product is already in the basket, update the quantity
        existingItem.Quantity += quantity;
    }
    else
    {
        // If the product is not in the basket, add a new BasketItem
        Items.Add(new BasketItem { Product = product, Quantity = quantity });
    }

}        

 public void RemoveItem(int productId, int quantityToRemove)
{
    // Find the item with the specified productId in the basket
    var itemToRemove = Items.FirstOrDefault(item => item.ProductId == productId);
    if (itemToRemove == null) return;
    itemToRemove.Quantity -= quantityToRemove;
    if(itemToRemove.Quantity == 0) Items.Remove(itemToRemove);

    }



}



}


