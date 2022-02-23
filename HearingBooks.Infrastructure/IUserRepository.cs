using HearingBooks.Domain;

namespace Infrastructure.Repositories;

public interface IUserRepository
{
    public Task<User> GetUserById(Guid userId);
}