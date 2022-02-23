namespace HearingBooks.Domain;

public class User
{
    public Guid Id { get; set; }
    public UserType Type { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsActive { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
}

public enum UserType
{
    PayAsYouGo = 0,
    Subscriber = 1,
    Writer = 2,
    HearingBooks = 3,
}