using HearingBooks.Domain;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private IList<User> _users = new List<User>
    {
        new ()
        {
            Id = Guid.Parse("aaaaaaaaaaaaaaaaaa"),
            FirstName = "Łukasz",
            LastName = "Mojek",
            Email = "lukasz@hb.com",
            Type = UserType.HearingBooks,
            UserName = "shaggy",
            IsActive = true
        }
    };

    public async Task<User> GetUserById(Guid userId)
    {
        var user = _users.FirstOrDefault(x => x.Id == userId);

        if (user == null)
        {
            throw new Exception("User does not exists");
        }

        return user;
    }

    public Task<User> GetUserById(int userId)
    {
        throw new NotImplementedException();
    }
}