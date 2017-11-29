using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsWebApi.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ContactsWebApi.Services;
using Microsoft.EntityFrameworkCore;
using ContactsWebApi.Models;

namespace ContactsWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IContactService, ContactService>();
            services.AddSingleton<IContactRepository, ContactRepository>();

            services.AddCors(o => o.AddPolicy("ContactsAppPolicy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            var connection = @"Server=tcp:sgl.database.windows.net,1433;Initial Catalog=contactsdb;Persist Security Info=False;User ID=semglad;Password=RsTFDrjUNDd3pekiJzF0;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            services.AddDbContext<ContactContext>(options => options.UseSqlServer(connection));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("ContactsAppPolicy");

            app.UseMvc();
        }
    }
}
