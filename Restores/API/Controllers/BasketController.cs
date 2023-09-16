using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController: BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
            
        }


        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity,
                    PictureUrl = item.Product.PictureUrl,
                    
                    

                }).ToList()
            };
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity) {

            var basket = await RetrieveBasket();
            if(basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
    
    if (result)
    {
        // Return a 201 Created response with the location of the added item
          return CreatedAtRoute("GetBasket", MapBasketToDto(basket));
    }

            return BadRequest(new ProblemDetails{Title = "Problem savingg item to basked"});
        }

     
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity) {
        var basket = await RetrieveBasket();
    if (basket == null)
    {
        return NotFound(); // Basket not found, return 404
    }

    // Remove the specified quantity of the product from the basket
    basket.RemoveItem(productId, quantity);

    // Save the updated basket to the database
    var result = await _context.SaveChangesAsync() > 0;

    if (result)
    {
        return Ok(); // Return 200 OK if successful
    }
    else
    {
        return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
    }
        }

          private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerid"]);
        }

           private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket{BuyerId = buyerId};

            _context.Baskets.Add(basket);
            return basket;
        }

    }
}