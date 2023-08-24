using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Enums;
using MediatR;


namespace CleanArchitecture.Application.Users.Commands.CreateCustomerCommand;
public class CreateCustomerCommand : IRequest<bool>
{
    public string Name { get; set; }
    public string PassWord { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public AccountType AccountType { get; set; }

}
public class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, bool>
{
    private readonly IApplicationDbContext context;
    private readonly IMediator mediator;
    private readonly IIdentityService identityService;
    private readonly ICurrentUserService currentUserService;

    public CreateCustomerCommandHandler
        (IApplicationDbContext context
        , IMediator mediator
        , IIdentityService identityService,
ICurrentUserService currentUserService)
    {
        this.context = context;
        this.mediator = mediator;
        this.identityService = identityService;
        this.currentUserService = currentUserService;
    }
    public async Task<bool> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
    {
        bool result = false;
        var role = await identityService.IsInRoleAsync(currentUserService.UserId, "SuperAdmin");
        if (role)
        {
            if (request.AccountType == AccountType.Admin && !string.IsNullOrEmpty(request.PassWord))
            {
                var rs = await identityService.Register(request.Email, request.PhoneNumber, request.PassWord, request.Name);
                result = rs.Succeeded ? true : false;
            }
        }
        return result;
    }

}
