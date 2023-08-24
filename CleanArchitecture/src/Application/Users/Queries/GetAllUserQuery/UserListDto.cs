using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.User.Queries;
using CleanArchitecture.Domain.Common;

namespace CleanArchitecture.Application.Users.Queries.GetAllUserQuery;
public class UserListDto
{
    public List<UserModel> ListUserDto { get; set; }
}
