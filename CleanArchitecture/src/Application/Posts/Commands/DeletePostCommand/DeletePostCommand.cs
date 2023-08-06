using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Posts.Commands.DeletePostCommand;
public class DeletePostCommand : IRequest<bool>
{
    public int Id { get; set; }
}
public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand, bool>
{
    private IApplicationDbContext context;
    private readonly IMediator mediator;

    public DeletePostCommandHandler
        (IApplicationDbContext context
        , IMediator mediator)
    {
        this.context = context;
        this.mediator = mediator;
    }
    public async Task<bool> Handle(DeletePostCommand request, CancellationToken cancellationToken)
    {
        int result = 0;

        var post = await context.Posts.Where(o => o.Id == request.Id).FirstOrDefaultAsync();

        if (post != null)
        {
            post.IsDeleted = true;
            context.Posts.Update(post);
            result = await context.SaveChangesAsync(cancellationToken);
        }

        return result > 0;
    }
}
