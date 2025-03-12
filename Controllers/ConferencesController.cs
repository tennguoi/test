using Microsoft.AspNetCore.Mvc;
using ConferenceManagement.Models;
using System.Collections.Generic;
using System;

namespace ConferenceManagement.Controllers
{
    public class ConferencesController : Controller
    {
        public IActionResult Index()
        {
            var conferences = GetSampleConferences();
            return View(conferences);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(ConferenceViewModel model)
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
            var conference = GetSampleConferences().Find(c => c.Id == id);
            if (conference == null)
            {
                return NotFound();
            }
            return View(conference);
        }

        [HttpPost]
        public IActionResult Edit(ConferenceViewModel model)
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
            var conference = GetSampleConferences().Find(c => c.Id == id);
            if (conference == null)
            {
                return NotFound();
            }
            return View(conference);
        }

        public IActionResult Delete(string id)
        {
            var conference = GetSampleConferences().Find(c => c.Id == id);
            if (conference == null)
            {
                return NotFound();
            }
            return View(conference);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(string id)
        {
            // In a real application, delete from database
            return RedirectToAction(nameof(Index));
        }

        private List<ConferenceViewModel> GetSampleConferences()
        {
            return new List<ConferenceViewModel>
            {
                new ConferenceViewModel
                {
                    Id = "1",
                    Name = "Annual Tech Summit 2023",
                    StartDate = DateTime.Parse("2023-10-15"),
                    EndDate = DateTime.Parse("2023-10-18"),
                    Location = "San Francisco, CA",
                    Capacity = 500,
                    Status = "upcoming",
                    Description = "The biggest tech conference of the year featuring keynotes from industry leaders."
                },
                new ConferenceViewModel
                {
                    Id = "2",
                    Name = "Healthcare Innovation Conference",
                    StartDate = DateTime.Parse("2023-11-05"),
                    EndDate = DateTime.Parse("2023-11-07"),
                    Location = "Boston, MA",
                    Capacity = 350,
                    Status = "upcoming",
                    Description = "Exploring the latest advancements in healthcare technology."
                },
                new ConferenceViewModel
                {
                    Id = "3",
                    Name = "Global Marketing Summit",
                    StartDate = DateTime.Parse("2023-09-10"),
                    EndDate = DateTime.Parse("2023-09-12"),
                    Location = "New York, NY",
                    Capacity = 400,
                    Status = "completed",
                    Description = "Connect with marketing professionals from around the world."
                }
            };
        }
    }
}
