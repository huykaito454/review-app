using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Common.Interfaces;
public interface IAuthenticationService
{
    public Task Login(string userName, string password);
    public Task Logout(string userName, string password);
}
