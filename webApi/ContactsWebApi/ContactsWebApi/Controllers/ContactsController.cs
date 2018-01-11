using ContactsWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ContactsWebApi.Repositories;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Authorization;

namespace ContactsWebApi.Controllers
{
    [Authorize]
    [Route("api/contacts")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;
        private readonly IContactRepository _contactRepository;

        public ContactsController(IContactService contactService, IContactRepository contactRepository)
        {
            this._contactService = contactService;
            this._contactRepository = contactRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;
            var contacts = _contactService.FindContacts();
            var result = new { resultContacts = contacts, resultUser = user };
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var contact = _contactService.FindContactById(id);
            return new JsonResult(contact);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Contact contact)
        {
            _contactRepository.Add(contact);
            return new OkResult();
        }

        [HttpPut]
        public IActionResult Update([FromBody]Contact contact)
        {
            _contactRepository.Update(contact);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var contactToDelete = _contactRepository.GetById(id);
            _contactRepository.Delete(contactToDelete);
            return new NoContentResult();
        }
    }
}
