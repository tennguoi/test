using System.ComponentModel.DataAnnotations;

namespace ConferenceManagement.Models
{
    public class DelegateViewModel
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Organization { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public string Status { get; set; }

        [Display(Name = "Registered Events")]
        public int RegisteredEvents { get; set; }
    }
}
