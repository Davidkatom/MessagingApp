using System.ComponentModel.DataAnnotations;
namespace WebApplication2.Models

{
    public class Review
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        [Range(1, 5)]
        public int Rate { get; set; }
        public DateTime Date { get; set; }
    }
}
