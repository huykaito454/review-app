
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;

namespace CleanArchitecture.Application.Users.Commands.DeleteCustomerCommand;
public class DeleteCustomerCommand : IRequest<bool>
{
    public string Id { get; set; }
}
public class DeleteCustomerCommandHandler : IRequestHandler<DeleteCustomerCommand, bool>
{
    private readonly IApplicationDbContext context;
    private readonly ICurrentUserService currentUserService;
    private readonly IIdentityService identityService;
    private readonly IMediator mediator;
    private readonly IMapper mapper;
    public DeleteCustomerCommandHandler
        (IApplicationDbContext context
        , ICurrentUserService currentUserService
        , IIdentityService identityService
        , IMediator mediator,
IMapper mapper)
    {
        this.context = context;
        this.currentUserService = currentUserService;
        this.identityService = identityService;
        this.mediator = mediator;
        this.mapper = mapper;
    }
    public async Task<bool> Handle(DeleteCustomerCommand request, CancellationToken cancellationToken)
    {
        var result = await identityService.LockUser(request.Id);
        if(result.Succeeded)
        {
            return true;
        } else
        {
            return false;
        }    
    }
}
