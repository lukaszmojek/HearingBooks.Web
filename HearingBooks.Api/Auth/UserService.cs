using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HearingBooks.Api.Configuration;
using HearingBooks.Domain;
using Microsoft.IdentityModel.Tokens;

namespace HearingBooks.Api.Auth;

public class UserService : IUserService
{
    private readonly IApiConfiguration _configuration;

    public UserService(IApiConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string Authenticate(User user)
    {
        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var secret = _configuration.JwtSecret();
        var key = Encoding.ASCII.GetBytes(secret);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("name", user.FirstName),
                    new Claim("role", user.Type.ToString())
                }
            ),

            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}