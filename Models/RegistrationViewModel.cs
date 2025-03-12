using System;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManagement.Models
{
    public class RegistrationViewModel
    {
        public string Id { get; set; }

        [Display(Name = "Delegate ID")]
        public string DelegateId { get; set; }

        [Display(Name = "Delegate Name")]
        public string DelegateName { get; set; }

        [Display(Name = "Conference ID")]
        public string ConferenceId { get; set; }

        [Display(Name = "Conference Name")]
        public string ConferenceName { get; set; }

        [Display(Name = "Registration Date")]
        [DataType(DataType.Date)]
        public DateTime RegistrationDate { get; set; }

        public string Status { get; set; }

        [Display(Name = "Payment Status")]
        public string PaymentStatus { get; set; }

        [Display(Name = "Ticket Type")]
        public string TicketType { get; set; }

        [DataType(DataType.Currency)]
        public decimal Amount { get; set; }
    }
}
