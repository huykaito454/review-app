using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.User.Queries;
using CleanArchitecture.Domain.Common;
using CleanArchitecture.Domain.Enums;
using MediatR;

namespace CleanArchitecture.Application.Users.Queries.GetAllUserQuery;
public class GetAllUserQuery : IRequest<UserListDto>
{
}
public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, UserListDto>
{
    private readonly ICurrentUserService currentUserService;
    private readonly IIdentityService identityService;

    public GetAllUserQueryHandler
        (IIdentityService identityService
        , ICurrentUserService currentUserService
        )
    {
        this.currentUserService = currentUserService;
        this.identityService = identityService;
    }
    public async Task<UserListDto> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
    {
        var role = await identityService.IsInRoleAsync(currentUserService.UserId, "SuperAdmin");
        var rs = new UserListDto();
        rs.ListUserDto = new List<UserModel>();
        if (true)
        {
            var users = await identityService.GetAllAdministrator();
            if(users.Count() > 0)
            {
                foreach (var user in users)
                {
                    if (!user.Disable)
                    {
                    rs.ListUserDto.Add(user);
                    }
                }
                rs.ListUserDto.Reverse();
            }
        }
        return rs;
    }
}
