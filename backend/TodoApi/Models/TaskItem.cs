using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoApi.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending";

        // Relay-compatible global ID
        public string NodeId => $"{Id}";

    }
}
