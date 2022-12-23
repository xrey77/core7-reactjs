using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace core7_reactjs.Models.products
{

    public class ProductModel
    {
        public int Id { get; set; }
        public string Prod_name { get; set; }
        public string Prod_desc { get; set; }
        public  decimal idprod_stockqty { get; set; }
        public string prod_unit { get; set; }
        public decimal prod_cost { get; set; }
        public decimal prod_sell { get; set; }
        public string prod_pic { get; set; }
        public string prod_category { get; set; }
        public decimal prod_saleprice { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public int userid { get; set; }
    }
    
}