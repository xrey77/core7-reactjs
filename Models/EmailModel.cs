namespace core7_reactjs.Models
{

    public class EmailModel {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public IFormFile Attachment { get; set; }
    }    
}