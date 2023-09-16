using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; } // This property holds the ID of the associated product
        public Product Product { get; set; } // This property holds the reference to the associated product
        public int Quantity { get; set; }

        public int BasketId { get; set; }

        public Basket Basket {get; set;}
    }
}
