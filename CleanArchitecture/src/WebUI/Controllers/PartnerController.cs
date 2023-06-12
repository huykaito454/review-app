using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Application.Partners.Queries.GetAllPartnerQuery;
using CleanArchitecture.Application.Partners.Commands.UpdatePartnerCommand;
using CleanArchitecture.Application.Partners.Commands.DeletePartnerCommand;

namespace CleanArchitecture.WebUI.Controllers;

[Authorize]
public class PartnerController : ApiControllerBase
{

    [HttpGet]
    public async Task<ActionResult<PartnerList>> GetAll()
    {
        var rs = await Mediator.Send(new GetAllPartnerQuery());
        return Ok(rs);
    }
    [HttpPost]
    public async Task<ActionResult<bool>> Update(UpdatePartnerCommand command)
    {
        var rs = await Mediator.Send(command);
        return Ok(rs);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        var rs = await Mediator.Send(new DeletePartnerCommand() { Id = id });

        return Ok(rs);
    }

}
