using System.Collections.Generic;
using System.Linq;
using ContactsWebApi.Config;
using ContactsWebApi.Services;
using ContactsWebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private List<Contact> _contacts;
        private readonly ContactsDbContext _context;

        public ContactRepository(ContactsDbContext context)
        {
            _context = context;
            //_contacts = new List<Contact>();
            //Initialize();
        }

        public List<Contact> GetAll()
        {
            // System.Threading.Thread.Sleep(20000);
            return _context.ContactItems.ToList();
        }

        public Contact GetById(int id)
        {
            return _context.ContactItems.FirstOrDefault(c => c.Id == id);
        }

        public void Add(Contact contact)
        {
            var contactToInsert = contact;
            contactToInsert.Id = 0;
            _context.ContactItems.Add(contact);
            _context.SaveChanges();
        }

        public void Update(Contact contact)
        {
            var contactToUpdate = _context.ContactItems.FirstOrDefault(c => c.Id == contact.Id);
            contactToUpdate.FirstName = contact.FirstName;
            contactToUpdate.LastName = contact.LastName;
            contactToUpdate.Phone = contact.Phone;
            contactToUpdate.StreetAddress = contact.StreetAddress;
            contactToUpdate.City = contact.City;

            _context.ContactItems.Update(contactToUpdate);
            _context.SaveChanges();
        }

        public void Delete(Contact contact)
        {
            Contact contactToDelete = null;

            if (contact != null)
            {
                contactToDelete = _context.ContactItems.FirstOrDefault(c => c.Id == contact.Id);
            }
            
            if (contactToDelete != null)
            {
                _context.ContactItems.Remove(contactToDelete);
                _context.SaveChanges();
            }
        }

        private void Initialize()
        {
            _contacts = new List<Contact>
            {
                new Contact(1, "Em", "Toronen", "050456456", "Skinnarilankatu 36", "Lappeenranta"),
                new Contact(2, "Ari", "Käpyrä", "040123456", "Ratakatu 1", "Lappeenranta")
            };
        }
    }
}
