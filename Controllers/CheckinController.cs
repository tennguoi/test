using Microsoft.AspNetCore.Mvc;
using ConferenceManagement.Models;
using System.Collections.Generic;

namespace ConferenceManagement.Controllers
{
    public class CheckinController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Scanner()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ProcessQrCode(string qrCode)
        {
            // In a real application, validate QR code and find delegate
            var delegate_ = GetSampleDelegates().Find(d => d.BadgeId == qrCode);
            if (delegate_ == null)
            {
                return Json(new { success = false, message = "Invalid QR code" });
            }

            // Mark as checked in
            return Json(new { success = true, delegate_ });
        }

        public IActionResult Confirmation(string id)
        {
            var delegate_ = GetSampleDelegates().Find(d => d.Id == id);
            if (delegate_ == null)
            {
                return NotFound();
            }
            return View(delegate_);
        }

        private List<CheckinDelegateViewModel> GetSampleDelegates()
        {
            return new List<CheckinDelegateViewModel>
            {
                new CheckinDelegateViewModel
                {
                    Id = "1",
                    Name = "John Smith",
                    Email = "john.smith@example.com",
                    BadgeId = "DEL-1001",
                    Organization = "Acme Inc.",
                    ConferenceId = "conf-1",
                    ConferenceName = "Annual Tech Summit 2023",
                    CheckInStatus = "not-checked-in"
                },
                new CheckinDelegateViewModel
                {
                    Id = "2",
                    Name = "Sarah Johnson",
                    Email = "sarah.johnson@example.com",
                    BadgeId = "DEL-1002",
                    Organization = "Globex Corp",
                    ConferenceId = "conf-1",
                    ConferenceName = "Annual Tech Summit 2023",
                    CheckInStatus = "checked-in",
                    CheckInTime = "Today, 9:45 AM"
                }
            };
        }
    }
}
