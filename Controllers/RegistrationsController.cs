using Microsoft.AspNetCore.Mvc;
using ConferenceManagement.Models;
using System.Collections.Generic;
using System;

namespace ConferenceManagement.Controllers
{
    public class RegistrationsController : Controller
    {
        public IActionResult Index(string status = "all")
        {
            var registrations = GetSampleRegistrations();
            if (status != "all")
            {
                registrations = registrations.FindAll(r => r.Status == status);
            }
            return View(registrations);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(RegistrationViewModel model)
        {
            if (ModelState.IsValid)
            {
                // In a real application, save to database
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        public IActionResult Edit(string id)
        {
            var registration = GetSampleRegistrations().Find(r => r.Id == id);
            if (registration == null)
            {
                return NotFound();
            }
            return View(registration);
        }

        [HttpPost]
        public IActionResult Edit(RegistrationViewModel model)
        {
            if (ModelState.IsValid)
            {
                // In a real application, update in database
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        public IActionResult Approve(string id)
        {
            // In a real application, update status in database
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Reject(string id)
        {
            // In a real application, update status in database
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Details(string id)
        {
            var registration = GetSampleRegistrations().Find(r => r.Id == id);
            if (registration == null)
            {
                return NotFound();
            }
            return View(registration);
        }

        private List<RegistrationViewModel> GetSampleRegistrations()
        {
            return new List<RegistrationViewModel>
            {
                new RegistrationViewModel
                {
                    Id = "1",
                    DelegateId = "d1",
                    DelegateName = "John Smith",
                    ConferenceId = "c1",
                    ConferenceName = "Annual Tech Summit 2023",
                    RegistrationDate = DateTime.Parse("2023-05-15"),
                    Status = "approved",
                    PaymentStatus = "paid",
                    TicketType = "VIP",
                    Amount = 299.99m
                },
                new RegistrationViewModel
                {
                    Id = "2",
                    DelegateId = "d2",
                    DelegateName = "Sarah Johnson",
                    ConferenceId = "c1",
                    ConferenceName = "Annual Tech Summit 2023",
                    RegistrationDate = DateTime.Parse("2023-05-16"),
                    Status = "pending",
                    PaymentStatus = "unpaid",
                    TicketType = "Standard",
                    Amount = 149.99m
                },
                new RegistrationViewModel
                {
                    Id = "3",
                    DelegateId = "d3",
                    DelegateName = "Michael Brown",
                    ConferenceId = "c2",
                    ConferenceName = "Developer Conference 2023",
                    RegistrationDate = DateTime.Parse("2023-06-01"),
                    Status = "approved",
                    PaymentStatus = "paid",
                    TicketType = "Early Bird",
                    Amount = 99.99m
                }
            };
        }
    }
}
