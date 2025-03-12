using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using ConferenceManagement.Models;

namespace ConferenceManagement.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // In a real application, validate credentials against a database
                // For demo purposes, we'll just accept any valid form submission
                return RedirectToAction("Dashboard", new { role = model.Role });
            }
            return View(model);
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                // In a real application, save the user to a database
                return RedirectToAction("Login");
            }
            return View(model);
        }

        public IActionResult Dashboard(string role = "delegate")
        {
            ViewBag.Role = role;
            switch (role.ToLower())
            {
                case "administrator":
                    return View("AdminDashboard");
                case "staff":
                    return View("StaffDashboard");
                case "delegate":
                default:
                    return View("DelegateDashboard");
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
