using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Enums;
using MediatR;

namespace CleanArchitecture.Application.Users.Commands.UpdateCustomerCommand;
public class UpdateCustomerCommand : IRequest<bool>
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string PassWord { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Avatar { get; set; }
}
public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand, bool>
{
    private readonly IApplicationDbContext context;
    private readonly IMediator mediator;
    private readonly IIdentityService identityService;
    private readonly ICurrentUserService currentUserService;

    public UpdateCustomerCommandHandler
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
    public async Task<bool> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
    {
        bool result = false;
        var role = await identityService.IsInRoleAsync(currentUserService.UserId, "SuperAdmin");
        if (role)
        {   
            if(request.Id != null)
            {
            var rs = await identityService.UpdateUser(request.Id, request.Email, request.PassWord, request.PhoneNumber,request.Name, request.Avatar);
            result = rs; 
            } else
            {
                var rs = await identityService.UpdateUser(currentUserService.UserId, request.Email, request.PassWord, request.PhoneNumber, request.Name, request.Avatar);
                result = rs;
            }
        } else
        {
            if (currentUserService.UserId ==  request.Id || request.Id == null)
            {
                var rs = await identityService.UpdateUser(currentUserService.UserId, request.Email, request.PassWord, request.PhoneNumber, request.Name, request.Avatar);
                result = rs;
            }
        }
        return result;
    }

}
