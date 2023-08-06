using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CleanArchitecture.Application.Partners.Queries.GetAllPartnerQuery;
using CleanArchitecture.Application.Partners.Commands.UpdatePartnerCommand;
using CleanArchitecture.Application.Partners.Commands.DeletePartnerCommand;
using CleanArchitecture.Application.Posts.Queries.GetAllPostsQuery;
using CleanArchitecture.Application.Posts.Commands.UpdatePostCommand;
using CleanArchitecture.Application.Posts.Commands.DeletePostCommand;
using CleanArchitecture.Application.Posts.Queries.GetPostQuery;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.WebUI.Controllers;

[Authorize]
public class PostController : ApiControllerBase
{

    [HttpGet]
    public async Task<ActionResult<PostList>> GetAll()
    {
        var rs = await Mediator.Send(new GetAllPostsQuery());
        return Ok(rs);
    }
    [AllowAnonymous]
    [HttpPost("path")]
    public async Task<ActionResult<Post>> GetPost(GetPostQuery query)
    {
        var rs = await Mediator.Send(query);
        return Ok(rs);
    }
    [HttpPost]
    public async Task<ActionResult<bool>> Update(UpdatePostCommand command)
    {
        var rs = await Mediator.Send(command);
        return Ok(rs);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        var rs = await Mediator.Send(new DeletePostCommand() { Id = id });

        return Ok(rs);
    }

}
