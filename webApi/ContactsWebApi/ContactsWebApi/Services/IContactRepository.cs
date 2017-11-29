using ContactsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsWebApi.Services
{
    public interface IContactRepository
    {
        List<Contact> GetAll();
        Contact GetById(int id);
        void Add(Contact contact);
        void Update(Contact contact);
        void Delete(Contact contact);

        //TODO add, update, delete
    }
}
