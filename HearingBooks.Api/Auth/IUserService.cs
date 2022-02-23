using HearingBooks.Domain;

namespace HearingBooks.Api.Auth;

public interface IUserService
{
    string Authenticate(User user);
}