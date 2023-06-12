using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Domain.Common;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using static Duende.IdentityServer.Models.IdentityResources;

namespace CleanArchitecture.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;
    private readonly ILogger<IdentityService> logger;
    private readonly ICurrentUserService currentUserService;
    private readonly IApplicationDbContext context;
    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IAuthorizationService authorizationService,
        ICurrentUserService currentUserService, ILogger<IdentityService> logger, IApplicationDbContext context)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
        this.logger = logger;
        this.currentUserService = currentUserService;
        this.context = context;
    }
    public async Task<bool> UpdateUser(string userId, string email, string password, string phone, string name,string avatar)
    {
        var userExist = await _userManager.Users.FirstAsync(u => u.Email == email);
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);
        if (userExist == null || userExist.Id == user.Id)
        {
            user.Email = email; user.UserName = email; user.PhoneNumber = phone; user.FullName = name;

            if(avatar != null)
            {
                try
                {
                    var folderAvatar = String.Concat("wwwroot", "/images/avatar/");
                    var dataString = avatar;
                    byte[] data = null;
                    if (!Directory.Exists(folderAvatar))
                    {
                        Directory.CreateDirectory(folderAvatar);
                    }
                    if (dataString != null)
                    {
                        var temp = dataString.Split(',');
                        var audioExtension = temp[0];
                        var from = audioExtension.IndexOf("/") + "-".Length;
                        var to = audioExtension.IndexOf(";");
                        var extension = audioExtension[from..to];
                        var avatarFile = temp[1];
                        data = Convert.FromBase64String(avatarFile);
                        var fileForder = String.Concat(folderAvatar, "/", String.Concat(userId, ".", extension));
                        using (FileStream fs = File.Create(fileForder))
                        {
                            fs.Write(data, 0, data.Length);
                        }
                        user.Avatar = String.Concat("/images/avatar/", String.Concat(userId, ".", extension));
                    }
                    else
                    {
                        return false;
                    }

                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            var rs = await _userManager.UpdateAsync(user);
            if (rs.Succeeded && !string.IsNullOrEmpty(password))
            {
                var result = await _userManager.CheckPasswordAsync(user, password);
                if (rs.Succeeded)
                {
                    return true;
                } else
                {
                    return false;
                }
            } else
            {
                return false;
            }
        } else
        {
        return false;

        }
    }
    public async Task<Result> LockUser(string userId)
    {
        Result rs = Result.Failure();

        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                user.LockoutEnabled = false;
                user.LockoutEnd = DateTime.MaxValue;
                await _userManager.UpdateAsync(user);
            }

            rs = Result.Success();
        }
        catch (Exception ex)
        {
            logger.LogError("Exception at LockAllUser. Ex: {0}", ex.Message);
        }
        return rs;
    }
    public async Task<string?> GetUserNameAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

        return user.UserName;
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
    {
        var user = new ApplicationUser
        {
            UserName = userName,
            Email = userName,
        };

        var result = await _userManager.CreateAsync(user, password);

        return (result.ToApplicationResult(), user.Id);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null ? await DeleteUserAsync(user) : Result.Success();
    }

    public async Task<Result> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }

    public async Task<Result> Register(string userName, string phoneNumber, string password, string name)
    {
        Result rs = Result.Failure();
        try
        {
            IdentityResult result;
            var user = new ApplicationUser
            {
                UserName = userName,
                PhoneNumber = phoneNumber,
                Email = userName,
                FullName = name,
            };

            if (!string.IsNullOrEmpty(password))
            {
                result = await _userManager.CreateAsync(user, password);
            }
            else
            {
                result = await _userManager.CreateAsync(user);
            }

            if (!result.Succeeded)
            {
                rs = Result.Failure(result.Errors.ToList()[0].Description);
            }
            else
            {
                result = await _userManager.AddToRoleAsync(user, "Admin");
                if (!result.Succeeded)
                {
                    rs = Result.Failure(result.Errors.ToList()[0].Description);
                }
                else
                {
                    user.Avatar = "/images/avatar/default/user.jpg";
                    var resultAvatar = await _userManager.UpdateAsync(user);
                    if (resultAvatar.Succeeded)
                    {
                        rs = Result.Success(CreateToken(user, true));
                    } else
                    {
                        rs = Result.Failure(resultAvatar.Errors.ToList()[0].Description);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError("Exception at Register. Ex: {0}", ex.Message);
        }
        return rs;
    }

    public async Task<Result> Login(string userName, string passWord, AccountType accountType)
    {
        Result rs = Result.Failure();
        try
        {
            var user = await _userManager.FindByEmailAsync(userName);
            if (user == null)
            {
                rs = Result.Failure("Email does not exist");
            }
            else
            {
                if (!user.LockoutEnabled)
                {
                    rs = Result.Failure("Your account is disabled");
                }
                else
                {
                    bool isLogin = true;

                    if (accountType == AccountType.Admin)
                    {
                        var validPassword = await _userManager.CheckPasswordAsync(user, passWord);
                        if (!validPassword)
                        {
                            rs = Result.Failure("Email or password is incorrect");
                            isLogin = false;
                        }
                    }

                    if (isLogin)
                    {
                        user.LastLoginTime = DateTime.Now;
                        await _userManager.UpdateAsync(user);
                        string token = CreateToken(user, false, accountType);
                        rs = Result.Success(token);
                    }
                }

            }

        }
        catch (Exception ex)
        {
            logger.LogError("Exception at Login. Ex: {0}", ex.Message);
        }

        return rs;
    }
    public string CreateToken(ApplicationUser user, bool newAccount = false, AccountType accountType = AccountType.Admin)
    {
        string token = string.Empty;
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("12345678963254123");
            var role = _userManager.GetRolesAsync(user).Result.FirstOrDefault();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email.ToString()),
                    new Claim(ClaimTypes.Role, role == null ? "guest" :role),
                    new Claim("lastlogin",user.LastLoginTime.ToString()),
                    new Claim("picture",user.Avatar == null ? "" :user.Avatar),
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }
        catch (Exception ex)
        {
            logger.LogError("Exception at CreateToken. Ex: {0}", ex.Message);
        }
        return token;
    }
    public async Task<List<UserModel>> GetAllAdministrator()
    {
        List<UserModel> userModels = new List<UserModel>();

        var listUser = await _userManager.Users.ToListAsync();
        try
        {
            foreach (var user in listUser)
            {
                var rs = await _userManager.IsInRoleAsync(user, string.Concat("Admin"));
                if (rs)
                {
                    userModels.Add(new UserModel()
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        Disable = !user.LockoutEnabled, Avatar = user.Avatar,
                        FullName = user.FullName

                    });
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError("Exception at GetAllAdministrator. Ex: {0}", ex.Message);
            userModels = null;
        }

        return userModels;
    }
    public async Task<UserModel> GetUserById(string userId)
    {
        UserModel userModel = null;

        try
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user != null)
            {
                userModel = new UserModel()
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Avatar = user.Avatar,
                    FullName= user.FullName

                };

                if (!user.LockoutEnabled && user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.Now)
                {
                    userModel.Disable = true;
                }
                else
                {
                    userModel.Disable = false;

                }

            }
        }
        catch (Exception ex)
        {
            logger.LogError("Exception at GetUserByID. Ex: {0}", ex.Message);
        }

        return userModel;
    }
}
