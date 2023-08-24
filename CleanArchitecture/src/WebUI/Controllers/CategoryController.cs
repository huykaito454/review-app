using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using CleanArchitecture.Application.Users.Queries.GetAllUserQuery;
using CleanArchitecture.Application.Categories.Queries.GetAllCategoriesQuery;
using CleanArchitecture.Application.Categories.Commands.CreateCategoryCommand;
using CleanArchitecture.Application.Users.Commands.DeleteCustomerCommand;
using CleanArchitecture.Application.Categories.Commands.DeleteCategoryCommand;

namespace CleanArchitecture.WebUI.Controllers;

[Authorize]
public class CategoryController : ApiControllerBase
{

    [HttpGet]
    public async Task<ActionResult<CategoryList>> GetAll()
    {
        var rs = await Mediator.Send(new GetAllCategoriesQuery());
        return Ok(rs);
    }
    [HttpPost]
    public async Task<ActionResult<bool>> Update(UpdateCategoryCommand command)
    {
        var rs = await Mediator.Send(command);
        return Ok(rs);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        var rs = await Mediator.Send(new DeleteCategoryCommand() { Id = id });

        return Ok(rs);
    }

}
