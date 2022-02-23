using HearingBooks.Domain;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HearingBooks.Api.Auth;

public static class AuthorizationFilterContextExtensions
{
    public static User User(this AuthorizationFilterContext context)
    {
        return (User) context.HttpContext.Items["User"];
    }
}