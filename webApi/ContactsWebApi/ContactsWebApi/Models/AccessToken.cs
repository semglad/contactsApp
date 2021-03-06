﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ContactsWebApi.Models
{
    public class AccessToken
    {
        [JsonProperty("token_type")]
        public string TokenType;

        [JsonProperty("scope")]
        public string Scope;

        [JsonProperty("expires_in")]
        public string ExpiresIn;

        [JsonProperty("ext_expires_in")]
        public string ExtExpiresIn;

        [JsonProperty("expires_on")]
        public string ExpiresOn;

        [JsonProperty("not_before")]
        public string NotBefore;

        [JsonProperty("resource")]
        public string Resource;

        [JsonProperty("access_token")]
        public string ActualAccessToken;

        [JsonProperty("refresh_token")]
        public string RefreshToken;

    }
}
