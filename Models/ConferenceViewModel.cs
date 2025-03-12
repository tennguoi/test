using System;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManagement.Models
{
    public class ConferenceViewModel
    {
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Start Date")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Display(Name = "End Date")]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [Required]
        public string Location { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Capacity { get; set; }

        public string Status { get; set; }

        public string Description { get; set; }
    }
}
