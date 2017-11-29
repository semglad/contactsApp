using System.Collections.Generic;
using System.Linq;
using ContactsWebApi.Services;
using ContactsWebApi.Models;

namespace ContactsWebApi.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private List<Contact> _contacts;

        public ContactRepository()
        {
            _contacts = new List<Contact>();
            Initialize();
        }

        public List<Contact> GetAll()
        {
            return _contacts;
        }

        public Contact GetById(int id)
        {
            return _contacts.FirstOrDefault(c => c.Id == id);
        }

        public void Add(Contact contact)
        {
            if (_contacts.Count > 0)
                contact.Id = _contacts.Max(c => c.Id) + 1;
            else
                contact.Id = 0 + 1;

            _contacts.Add(contact);
        }

        public void Update(Contact contact)
        {
            var oldContact = _contacts.FirstOrDefault(c => c.Id == contact.Id);
            _contacts.Remove(oldContact);
            _contacts.Add(contact);
        }

        public void Delete(Contact contact)
        {
            _contacts.Remove(contact);
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
