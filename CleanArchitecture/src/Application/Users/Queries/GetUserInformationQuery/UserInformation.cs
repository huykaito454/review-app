using System;
using System.Collections.Generic;
using System.Text;

namespace CleanArchitecture.Application.User.Queries
{
    public class UserInformation
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Avatar { get; set; }
        public bool Disable { get; set; }
    }
}
