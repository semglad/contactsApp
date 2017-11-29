using ContactsWebApi.Models;
using System.Collections.Generic;

namespace ContactsWebApi.Services
{
    public interface IContactService
    {
        List<Contact>FindContacts();
        Contact FindContactById(int id);
    }
}
