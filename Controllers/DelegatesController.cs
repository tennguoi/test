using Microsoft.AspNetCore.Mvc;
using ConferenceManagement.Models;
using System.Collections.Generic;

namespace ConferenceManagement.Controllers
{
    public class DelegatesController : Controller
    {
        public IActionResult Index()
        {
            var delegates = GetSampleDelegates();
            return View(delegates);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(DelegateViewModel model)
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
            // In a real application, fetch from database
            var delegateModel = GetSampleDelegates().Find(d => d.Id == id);
            if (delegateModel == null)
            {
                return NotFound();
            }
            return View(delegateModel);
        }

        [HttpPost]
        public IActionResult Edit(DelegateViewModel model)
        {
            if (ModelState.IsValid)
            {
                // In a real application, update in database
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        public IActionResult Details(string id)
        {
            var delegateModel = GetSampleDelegates().Find(d => d.Id == id);
            if (delegateModel == null)
            {
                return NotFound();
            }
            return View(delegateModel);
        }

        public IActionResult Delete(string id)
        {
            var delegateModel = GetSampleDelegates().Find(d => d.Id == id);
            if (delegateModel == null)
            {
                return NotFound();
            }
            return View(delegateModel);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(string id)
        {
            // In a real application, delete from database
            return RedirectToAction(nameof(Index));
        }

        private List<DelegateViewModel> GetSampleDelegates()
        {
            return new List<DelegateViewModel>
            {
                new DelegateViewModel
                {
                    Id = "1",
                    Name = "John Doe",
                    Email = "john.doe@example.com",
                    Organization = "Acme Inc.",
                    Phone = "+1 (555) 123-4567",
                    Status = "active",
                    RegisteredEvents = 3
                },
                new DelegateViewModel
                {
                    Id = "2",
                    Name = "Jane Smith",
                    Email = "jane.smith@example.com",
                    Organization = "Globex Corp",
                    Phone = "+1 (555) 987-6543",
                    Status = "active",
                    RegisteredEvents = 2
                },
                new DelegateViewModel
                {
                    Id = "3",
                    Name = "Robert Johnson",
                    Email = "robert.johnson@example.com",
                    Organization = "Initech",
                    Phone = "+1 (555) 456-7890",
                    Status = "inactive",
                    RegisteredEvents = 0
                }
            };
        }
    }
}
