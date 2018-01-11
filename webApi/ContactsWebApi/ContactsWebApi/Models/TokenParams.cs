using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsWebApi.Models
{
    public class TokenParams
    {
        public LoginCredentials LoginCredential;
        public string RefreshToken;

        public TokenParams()
        {
        }
    }
}
