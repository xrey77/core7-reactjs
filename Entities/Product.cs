using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace core7_reactjs.Entities
{

    [Table("products")]
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Column("prod_name")]
        public string Prod_name { get; set; }

        [Column("prod_desc")]
        public string Prod_desc { get; set; }

        [Column("prod_stockqty")]
        public  decimal prod_stockqty { get; set; }
        public string prod_unit { get; set; }

        [Column("prod_cost")]
        public decimal prod_cost { get; set; }

        [Column("prod_sell")]
        public decimal prod_sell { get; set; }

        [Column("prod_pic")]
        public string prod_pic { get; set; }

        [Column("prod_category")]
        public string prod_category { get; set; }

        [Column(name: "prod_saleprice")]
        [Range(1, 100), DataType(DataType.Currency)]        
        // [Column(TypeName = "decimal(18, 2)")]
        public decimal prod_saleprice { get; set; }

        [Column("created_at")]
        // [Display(Name = "created_at")]
        [DisplayFormat(DataFormatString = "{0:MM-dd-yy HH:mm:ss}",ApplyFormatInEditMode=true)]
        [DataType(DataType.Date)]
        public DateTime? created_at { get; set; }

        [Column("updated_at")]
        // [DisplayFormat(DataFormatString = "{0:MM-dd-yy HH:mm:ss}")]
        [DisplayFormat(DataFormatString = "{0:MM-dd-yy HH:mm:ss}",ApplyFormatInEditMode=true)]
        [DataType(DataType.Date)]
        public DateTime? updated_at { get; set; }

        [Column("userid")]
        public int userid { get; set; }
    }   
}