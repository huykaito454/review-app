using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CleanArchitecture.Application.Categories.Commands.DeleteCategoryCommand;
public class DeleteCategoryCommand : IRequest<bool>
{
    public int Id { get; set; }
}
public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, bool>
{
    private IApplicationDbContext context;
    private readonly IMediator mediator;

    public DeleteCategoryCommandHandler
        (IApplicationDbContext context
        , IMediator mediator)
    {
        this.context = context;
        this.mediator = mediator;
    }
    public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        int result = 0;

        var category = await context.Categories.Where(o => o.Id == request.Id).FirstOrDefaultAsync();

        if (category != null)
        {
            category.IsDeleted = true;
            context.Categories.Update(category);
            result = await context.SaveChangesAsync(cancellationToken);
        }

        return result > 0;
    }
}
