using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsWebApi.Models;

namespace ContactsWebApi.Services
{
    public interface ITokenService
    {
        Task<AccessToken> GetToken(LoginCredentials loginCredential);
    }
}
