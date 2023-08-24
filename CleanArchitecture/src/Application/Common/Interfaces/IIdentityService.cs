using System.Collections.Generic;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Domain.Common;
using CleanArchitecture.Domain.Enums;

namespace CleanArchitecture.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string?> GetUserNameAsync(string userId);
    Task<List<UserModel>> GetAllAdministrator();
    Task<bool> IsInRoleAsync(string userId, string role);
    Task<Result> LockUser(string userId);
    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<Result> Register(string userName, string phoneNumber, string password, string name);
    Task<Result> Login(string userName, string passWord, AccountType accountType);
    Task<UserModel> GetUserById(string userId);
    Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);
    Task<bool> UpdateUser(string userId, string email, string password, string phone, string name, string avatar);
    Task<Result> DeleteUserAsync(string userId);
}
