using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Services
{
    public class EmailServices : IEmailServices
    {
        public const string smtpEmail = "andy.mailbot.noreply@gmail.com";
        public const string smtpPassword = "sibo wfwt raew jlau";

        public void SendConfirmEmail(string recipient, string userName, string emailConfirmCode)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new System.Net.NetworkCredential(smtpEmail, smtpPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false
            };

            MailMessage mail = new MailMessage { IsBodyHtml = true, };
            mail.From = new MailAddress(smtpEmail);
            mail.To.Add(recipient);
            mail.Subject = "bottles.io - Confirm Your Account!";
            mail.Body = EmailBodies.confirmEmailBody;
            mail.Body = mail.Body.Replace("{recipient}", userName).Replace("emailConfirmCode", emailConfirmCode);


            smtpClient.Send(mail);
        }

        public void SendCustomEmail(string recipient, string subject, string body)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new System.Net.NetworkCredential(smtpEmail, smtpPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false
            };

            smtpClient.Send(smtpEmail, recipient, subject, body);
        }

        public void SendResetPasswordEmail(string recipient, string userName, string passwordRecoveryCode)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new System.Net.NetworkCredential(smtpEmail, smtpPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false
            };

            MailMessage mail = new MailMessage { IsBodyHtml = true, };
            mail.From = new MailAddress(smtpEmail);
            mail.To.Add(recipient);
            mail.Subject = "bottles.io - Password Recovery";
            mail.Body = EmailBodies.passwordRecoveryBody;
            mail.Body = mail.Body.Replace("{recipient}", userName).Replace("passwordRecoveryCode", passwordRecoveryCode);

            smtpClient.Send(mail);
        }
    }
}