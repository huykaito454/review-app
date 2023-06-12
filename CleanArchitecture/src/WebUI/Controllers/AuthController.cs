
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.WebUI.ViewModel;
using CleanArchitecture.Domain.Enums;
using CleanArchitecture.Application.Auth;
using CleanArchitecture.Application.Users.Commands.CreateCustomerCommand;

namespace CleanArchitecture.WebUI.Controllers;

[Authorize]
public class AuthController : ApiControllerBase
{
    private IIdentityService identityService;


    public AuthController(IIdentityService identityService, ICurrentUserService currentUser)
    {
        this.identityService = identityService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<TokenDto> Login(AuthenticateModel model)
    {
        var rs = await identityService.Login(model.Email, model.Password, AccountType.Admin);
        var result = new TokenDto();
        if (!rs.Succeeded)
        {
            result.Token = null;
            return result;
        }
        else
        {
            result.Token = rs.Data.ToString();
        }

        return result;
    }
    [HttpPost("register")]
    public async Task<ActionResult<bool>> Register(AuthenticateModel model)
    {
        var result = await Mediator.Send(new CreateCustomerCommand()
        {
            Name = model.Name,
            Email = model.Email,
            PhoneNumber = model.PhoneNumber,
            PassWord = model.Password,
            AccountType = AccountType.Admin,
        });
        return Ok(result);
    }

}
