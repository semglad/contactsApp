using ContactsWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Services;

namespace ContactsWebApi.Controllers
{
    [Route("api/contacts")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;
        private readonly IContactRepository _contactRepository;
        private readonly ContactContext _context;

        public ContactsController(IContactService contactService, IContactRepository contactRepository, ContactContext context)
        {
            this._contactService = contactService;
            this._contactRepository = contactRepository;
            this._context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
//            var contacts = _contactService.FindContacts();
            var contacts = _context.ContactItems.ToList();
            return new JsonResult(contacts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
 //           var contact = _contactService.FindContactById(id);
            var contact = _context.ContactItems.FirstOrDefault(c => c.Id == id);
            return new JsonResult(contact);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Contact contact)
        {
//            _contactRepository.Add(contact);
            var contactToInsert = contact;
            contactToInsert.Id = 0;
            _context.ContactItems.Add(contact);
            _context.SaveChanges();
            return new OkResult();
        }

        [HttpPut]
        public IActionResult Update([FromBody]Contact contact)
        {
//            _contactRepository.Update(contact);
            var contactToUpdate = _context.ContactItems.FirstOrDefault(c => c.Id == contact.Id);
            contactToUpdate.FirstName = contact.FirstName;
            contactToUpdate.LastName = contact.LastName;
            contactToUpdate.Phone = contact.Phone;
            contactToUpdate.StreetAddress = contact.StreetAddress;
            contactToUpdate.City = contact.City;

            _context.ContactItems.Update(contactToUpdate);
            _context.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
//            var contactToDelete = _contactRepository.GetById(id);
//            _contactRepository.Delete(contactToDelete);

            var contactToDelete = _context.ContactItems.FirstOrDefault(c => c.Id == id);

            if (contactToDelete != null)
            {
                _context.ContactItems.Remove(contactToDelete);
                _context.SaveChanges();
            }
            
            return new NoContentResult();
        }
    }
}
