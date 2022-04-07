using HearingBooks.Domain;
using HearingBooks.Domain.Entities;

namespace Infrastructure.Repositories;

public interface IUserRepository
{
    Task<User> GetUserById(Guid userId);
    User GetUserByCredentials(string email, string password);
}