using Microsoft.AspNetCore.Identity;


namespace CleanArchitecture.Infrastructure.Identity;

public class ApplicationRole : IdentityRole
{
    public ApplicationRole(string roleName) : base(roleName)
    {

    }
    public ApplicationRole()
    {

    }

}
