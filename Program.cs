var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaStaticFiles(options => { options.RootPath = "clientapp/build"; });
builder.Services.AddRazorPages();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHsts();    
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseSpaStaticFiles();
app.UseAuthorization();
app.MapRazorPages();
app.UseSpa(spa =>
     {
         if (app.Environment.IsDevelopment())
             spa.Options.SourcePath = "clientapp/";
         else
             spa.Options.SourcePath = "build";
     });
app.MapControllers();

app.Run();
