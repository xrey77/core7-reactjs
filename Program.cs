using System.Text;
using core7_reactjs.Helpers;
using core7_reactjs.models;
using core7_reactjs.Services;
using core7_reactjs.SignalRChat.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


if (builder.Environment.IsProduction()) {
    builder.Services.AddDbContext<DataContext>();
} else {
    builder.Services.AddDbContext<DataContext, SQLDataContext>();
}
builder.Services.AddControllers();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});

builder.Services.AddSpaStaticFiles(options => { options.RootPath = "clientapp/build"; });
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();
// builder.Services.AddScoped<IService, IServices>();


// ADD CROSS-ORIGIN RESOURCE SHARING (CORS)
builder.Services.AddCors();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
                .AllowCredentials();
        });
});

builder.Services.AddSingleton<IDictionary<string,ChatModel>>(opts => new Dictionary<string, ChatModel>());

//======GET SECRET FROM appsettings.json==================
var settings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(settings.Secret);
//========================================================

// ============VALIDATE IF JWT TOKEN HAS BEEN GENERATED===================================
// builder.Services.AddAuthentication();
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.Events = new JwtBearerEvents
    {

        OnTokenValidated = context =>
        {
            var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
            var userId = int.Parse(context.Principal.Identity.Name);
            var user = userService.GetById(userId);
            if (user == null)
            {
                context.Fail("Unauthorized");
            }
            return Task.CompletedTask;
        }
    };
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
//==========================================================================================


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
    app.UseHsts();    
}

// ==========VALIDATE IF END POINT IS AUTHORIZED================
app.UseStatusCodePages(async context =>
    {
        if (context.HttpContext.Request.Path.StartsWithSegments("/api"))
        {
            if (!context.HttpContext.Response.ContentLength.HasValue || context.HttpContext.Response.ContentLength == 0)
            {
                // You can change ContentType as json serialize
                context.HttpContext.Response.ContentType = "text/json";
                // await context.HttpContext.Response.WriteAsync("Unauthorized");
                await context.HttpContext.Response.WriteAsJsonAsync(new {message = "Unauthorized Access, Please Login using your account."});
                //$"Status Code: {context.HttpContext.Response.StatusCode}"
            }
        }
        else
        {
            // You can ignore redirect
            context.HttpContext.Response.Redirect($"/error?code={context.HttpContext.Response.StatusCode}");
        }
    });

//============================================================


// app.UseAuthentication();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();

app.UseCors("ClientPermission");
// app.UseCors(x => x
//         .AllowAnyMethod()
//         .AllowAnyHeader()
//         .SetIsOriginAllowed(origin => true) // allow any origin
//         .AllowCredentials()); // allow credentials


app.UseSpaStaticFiles();

//SERVE STATIC FILES =====================================
app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
    RequestPath = new PathString("/Resources")
});
//=========================================================
app.UseAuthorization();

// =======LOAD REACTJS============================
app.UseSpa(spa =>
     {
         if (app.Environment.IsDevelopment())
             spa.Options.SourcePath = "clientapp/";
         else
             spa.Options.SourcePath = "build";
     });
//=================================================

app.MapControllers();
// app.UseEndpoints(endpoints => endpoints.MapHub<ChatHub>("/chat"));

// app.UseEndpoints(endpoints => endpoints.MapControllers());
    // endpoints.MapHub<ChatHub>("/chat");
app.MapRazorPages();
app.MapHub<ChatHub>("/chatclient");
app.Run();


// CASSANDRA CONNECTION
// private Cluster Connect() {
//     string user = getAppSetting("cassandraUser");
//     string pwd = getAppSetting("cassandraPassword");
//     string[] nodes = getAppSetting("cassandraNodes").Split(',');

//     QueryOptions queryOptions = new QueryOptions().SetConsistencyLevel(ConsistencyLevel.One);


//     Cluster cluster = Cluster.Builder()
//         .AddContactPoints(nodes)
//         .WithCredentials(user, pwd)
//         .WithQueryOptions(queryOptions)
//         .Build();

//     return cluster;
// }