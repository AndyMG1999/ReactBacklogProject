using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IEmailServices
    {
        public void SendCustomEmail(string recipient, string subject, string body);
        public void SendConfirmEmail(string recipient, string userName, string emailConfirmCode);
        public void SendResetPasswordEmail(string recipient, string userName, string passwordRecoveryCode);
    }
}