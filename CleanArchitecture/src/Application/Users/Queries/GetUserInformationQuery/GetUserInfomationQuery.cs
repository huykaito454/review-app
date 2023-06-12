
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.User.Queries;

using MediatR;

namespace CleanArchitecture.Application.Users.Queries.GetUserInformationQuery;
public class GetUserInfomationQuery : IRequest<UserInformation>
{
}
public class GetUserInfomationQueryHandler : IRequestHandler<GetUserInfomationQuery, UserInformation>
{
    private readonly ICurrentUserService currentUserService;
    private readonly IIdentityService identityService;
    private readonly IMediator mediator;

    public GetUserInfomationQueryHandler
        (IIdentityService identityService
        , ICurrentUserService currentUserService
        , IMediator mediator)
    {
        this.currentUserService = currentUserService;
        this.identityService = identityService;
        this.mediator = mediator;
    }
    public async Task<UserInformation> Handle(GetUserInfomationQuery request, CancellationToken cancellationToken)
    {
        UserInformation customer = null;
        var userId = currentUserService.UserId;

        if (userId != null)
        {
            var user = await identityService.GetUserById(userId);

            customer = new UserInformation()
            {
                Email = user.Email,
                PhoneNumber = user == null ? "" : user.PhoneNumber,
                Avatar = user.Avatar == null ? "/images/avatar/default/user.jpg" : user.Avatar, UserName = user.UserName, Disable = user.Disable, FullName = user.FullName,
            };

        }

        return customer;
    }
}
