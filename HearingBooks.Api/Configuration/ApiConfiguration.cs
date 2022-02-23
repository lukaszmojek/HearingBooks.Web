namespace HearingBooks.Api.Configuration;

public class ApiConfiguration : IApiConfiguration
{
    private readonly IConfiguration _configuration;
    
    public ApiConfiguration(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string JwtSecret() 
        => _configuration.GetSection("Authorization")["Secret"];
}