using HearingBooks.Domain.Entities;

namespace Infrastructure.Repositories;

public interface IUserRepository
{
    Task<User> GetUserByIdAsync(Guid userId);
    Task<User> GetUserByCredentials(string email, string password);
}