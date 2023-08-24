using System;
using Microsoft.AspNetCore.Identity;

namespace CleanArchitecture.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public string Avatar { get; set; }
    public string FullName { get; set; }
    public virtual DateTime? LastLoginTime { get; set; }
}
