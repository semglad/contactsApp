using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ContactsWebApi.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace ContactsWebApi.Services
{
    public class TokenService : ITokenService
    {
        public IConfiguration Configuration { get; }

        public TokenService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<AccessToken> GetToken(LoginCredentials loginCredential, string refreshToken = null)
        {
            AccessToken token = null;

            var requestParams = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("client_id", Configuration["AuthRequestParams:client_id"]),
                new KeyValuePair<string, string>("resource", Configuration["AuthRequestParams:resource"]),
                new KeyValuePair<string, string>("client_secret", Configuration["AuthRequestParams:client_secret"])
            };

            if (refreshToken == null)
            {
                requestParams.Add(new KeyValuePair<string, string>("username", loginCredential.Username));
                requestParams.Add(new KeyValuePair<string, string>("password", loginCredential.Password));
                requestParams.Add(new KeyValuePair<string, string>("grant_type", Configuration["AuthRequestParams:grant_type"]));
            }
            else
            {
                requestParams.Add(new KeyValuePair<string, string>("grant_type", "refresh_token"));
                requestParams.Add(new KeyValuePair<string, string>("refresh_token", refreshToken));
            }


            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("Cache-Control", "no-cache");
                HttpContent content = new FormUrlEncodedContent(requestParams);
                var response = await httpClient.PostAsync(Configuration["AuthRequestParams:endpoint"], content);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    token = JsonConvert.DeserializeObject<AccessToken>(data);
                }
            }

            return token;
        }
    }
}
