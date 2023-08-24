using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Categories.Commands.CreateCategoryCommand;
public class UpdateCategoryCommand : IRequest<bool>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Path { get; set; }
}
public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, bool>
{
    private readonly IApplicationDbContext context;
    private readonly IMediator mediator;
    private readonly ICurrentUserService currentUserService;
    private readonly IIdentityService identityService;

    public UpdateCategoryCommandHandler(IApplicationDbContext context, 
        IMediator mediator, ICurrentUserService currentUserService, IIdentityService identityService)
    {
        this.context = context;
        this.mediator = mediator;
        this.currentUserService = currentUserService;
        this.identityService = identityService;

    }
    public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        int rs = 0;
        bool create = false;
        var category = await context.Categories.Where(o => o.Id == request.Id).FirstOrDefaultAsync();

        if (category == null)
        {
            category = new  Category();
            create = true;
        }
        category.Name = request.Name;
        category.Description = request.Description;
        category.Path = request.Path;
        if (create)
        {
            context.Categories.Add(category);
            rs = await context.SaveChangesAsync(cancellationToken);

        }
        else
        {
            context.Categories.Update(category);
            rs = await context.SaveChangesAsync(cancellationToken);
        }

        return rs > 0;
    }
}
