using System.Linq;
using core7_reactjs.Entities;
using core7_reactjs.Helpers;
using Microsoft.Extensions.Options;

namespace core7_reactjs.Services
{
    public interface IProductService
    {
        Product Create(Product product);
        void Update(Product product, int id);
        IEnumerable<Product> GetAllProducts(int pgno);
        Product GetById(int id);
        void Delete(int id);
        int TotalRecotds();
        
    }

    public class ProductService : IProductService 
    {
        private DataContext _context;
        // private readonly AppSettings _appSettings;

        //,IOptions<AppSettings> appSettings
        public ProductService(DataContext context)
        {
            _context = context;
            // _appSettings = appSettings.Value;
        }

        public Product Create(Product product)
        {
                _context.Product.Add(product);
                _context.SaveChanges();
                return product;
        }

        public void Delete(int id)
        {
            var product = _context.Product.Find(id);
            if (product != null)
            {
                _context.Product.Remove(product);
                _context.SaveChanges();
            }
            else {
                throw new AppException("Product not found");
            }
         }

        public IEnumerable<Product> GetAllProducts(int pgno)
        {
            var perPage = 10f;
            var totPage =  Math.Ceiling(_context.Product.Count() / perPage);
            

            var products =  _context.Product
                .Skip((pgno -1) * (int) perPage)
                .Take((int) perPage).ToList();


            return products;
         }

        public Product GetById(int id)
        {
            var product = _context.Product.Find(id);
            if (product == null) {
                throw new AppException("Product does'nt exists....");
            }
            return product;
         }

        public void Update(Product product, int id)
        {
            var prod = _context.Product.Find(id);
            if (prod == null) {
                    throw new AppException("Product not found");
            }
            prod.updated_at = System.DateTime.Now;
            _context.Product.Update(prod);
            _context.SaveChanges();
        }
        public int TotalRecotds() {
             var products =  _context.Product.ToList();

            var totrecs = products.Count();
            // var pagelimit = 10;

            // decimal tp = (totrecs + pagelimit - 1) / pagelimit;
            // var totPage = Math.Ceiling(tp);


            return totrecs;
        }

    }    
}