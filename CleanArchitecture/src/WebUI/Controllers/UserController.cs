using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Application.User.Queries;
using CleanArchitecture.Application.Users.Queries.GetUserInformationQuery;
using CleanArchitecture.Application.Users.Queries.GetAllUserQuery;
using CleanArchitecture.Application.Users.Commands.DeleteCustomerCommand;
using CleanArchitecture.Application.Users.Commands.UpdateCustomerCommand;

namespace CleanArchitecture.WebUI.Controllers;

[Authorize]
public class UserController : ApiControllerBase
{

    [HttpGet]
    public async Task<ActionResult<UserInformation>> GetUserAccount()
    {
        var rs = await Mediator.Send(new GetUserInfomationQuery());
        return Ok(rs);
    }
    [HttpGet("all")]
    public async Task<ActionResult<UserListDto>> GetAllUserAccount()
    {
        var rs = await Mediator.Send(new GetAllUserQuery());
        return Ok(rs);
    }
    [HttpPost("update")]
    public async Task<ActionResult<bool>> UpdateUserAccount(UpdateCustomerCommand command)
    {
        var rs = await Mediator.Send(command);
        return Ok(rs);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(string id)
    {
        var rs = await Mediator.Send(new DeleteCustomerCommand() { Id = id });

        return Ok(rs);
    }

}
