using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Partners.Commands.DeletePartnerCommand;
public class DeletePartnerCommand : IRequest<bool>
{
    public int Id { get; set; }
}
public class DeletePartnerCommandHandler : IRequestHandler<DeletePartnerCommand, bool>
{
    private IApplicationDbContext context;
    private readonly IMediator mediator;

    public DeletePartnerCommandHandler
        (IApplicationDbContext context
        , IMediator mediator)
    {
        this.context = context;
        this.mediator = mediator;
    }
    public async Task<bool> Handle(DeletePartnerCommand request, CancellationToken cancellationToken)
    {
        int result = 0;

        var partner = await context.Partners.Where(o => o.Id == request.Id).FirstOrDefaultAsync();

        if (partner != null)
        {
            partner.IsDeleted = true;
            context.Partners.Update(partner);
            result = await context.SaveChangesAsync(cancellationToken);
        }

        return result > 0;
    }
}