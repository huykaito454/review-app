
using Microsoft.AspNetCore.Identity;

using System.Threading.Tasks;



using Microsoft.EntityFrameworkCore;
using CleanArchitecture.Infrastructure.Identity;
using CleanArchitecture.Infrastructure.Persistence;
using System.Linq;

namespace System.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, ApplicationDbContext context)
        {
            var hasAdminRole = await roleManager.RoleExistsAsync("SuperAdmin");
            if (!hasAdminRole)
            {
                await roleManager.CreateAsync(new ApplicationRole("SuperAdmin") { });
                await roleManager.CreateAsync(new ApplicationRole("Admin") { });
                var defaultUser = new ApplicationUser { UserName = "admin@gmail.com", Email = "admin@gmail.com" };

                if (userManager.Users.All(u => u.Id != defaultUser.Id))
                {
                    await userManager.CreateAsync(defaultUser, "Hello@123");
                    await userManager.AddToRoleAsync(defaultUser, "SuperAdmin");
                }
                await context.SaveChangesAsync();
            }
        }
    }
}
