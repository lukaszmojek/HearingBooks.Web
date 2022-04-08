using HearingBooks.Domain.Entities;
using HearingBooks.Domain.ValueObjects.User;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private IList<User> _users = new List<User>
    {
        new ()
        {
            Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
            FirstName = "Łukasz",
            LastName = "Mojek",
            Email = "lukasz@hb.com",
            UserName = "shaggy",
            Password = "zaq123",
            Type = UserType.HearingBooks,
            IsActive = true
        }
    };

    public async Task<User> GetUserById(Guid userId)
    {
        var user = _users.FirstOrDefault(x => x.Id == userId);

        if (user == null)
        {
            throw new Exception("User does not exist!");
        }

        return user;
    }

    public Task<User> GetUserById(int userId)
    {
        throw new NotImplementedException();
    }
    
    public User GetUserByCredentials(string email, string password)
    {
        var user = _users.SingleOrDefault(x => x.Email == email && x.Password == password);

        return user;
    }
}