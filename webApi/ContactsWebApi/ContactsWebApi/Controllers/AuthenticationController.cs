using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Models;
using ContactsWebApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Extensions.Configuration;

namespace ContactsWebApi.Controllers
{
    [Route("api/auth")]
    public class AuthenticationController : Controller
    {

        private readonly ITokenService _tokenService;
        public IConfiguration Configuration { get; }

        public AuthenticationController(ITokenService tokenService, IConfiguration configuration)
        {
            _tokenService = tokenService;
            Configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LoginCredentials loginCredential)
        {
            var accessToken = await _tokenService.GetToken(loginCredential);

            if (accessToken == null)
                return new UnauthorizedResult();
            return new JsonResult(accessToken);
        }
    }
}
