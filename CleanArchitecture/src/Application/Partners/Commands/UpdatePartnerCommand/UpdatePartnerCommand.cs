using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Partners.Commands.UpdatePartnerCommand;
public class UpdatePartnerCommand : IRequest<bool>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public string Path { get; set; }
}
public class UpdatePartnerCommandHandler : IRequestHandler<UpdatePartnerCommand, bool>
{
    private readonly IApplicationDbContext context;
    private readonly IMediator mediator;
    private readonly ICurrentUserService currentUserService;
    private readonly IIdentityService identityService;

    public UpdatePartnerCommandHandler(IApplicationDbContext context,
        IMediator mediator, ICurrentUserService currentUserService, IIdentityService identityService)
    {
        this.context = context;
        this.mediator = mediator;
        this.currentUserService = currentUserService;
        this.identityService = identityService;

    }
    public async Task<bool> Handle(UpdatePartnerCommand request, CancellationToken cancellationToken)
    {
        int rs = 0;
        bool create = false;
        var partner = await context.Partners.Where(o => o.Id == request.Id).FirstOrDefaultAsync();

        if (partner == null)
        {
            partner = new Partner();
            create = true;
        }
        partner.Name = request.Name;
        partner.Description = request.Description;
        partner.Path = request.Path;
        if (request.Image != null)
        {
            try
            {
                var folderAvatar = String.Concat("wwwroot", "/images/partners/", request.Name.Trim());
                var dataString = request.Image;
                byte[] data = null;
                if (!Directory.Exists(folderAvatar))
                {
                    Directory.CreateDirectory(folderAvatar);
                }
                if (dataString != null)
                {
                    var temp = dataString.Split(',');
                    var audioExtension = temp[0];
                    var from = audioExtension.IndexOf("/") + "-".Length;
                    var to = audioExtension.IndexOf(";");
                    var extension = audioExtension[from..to];
                    var avatarFile = temp[1];
                    data = Convert.FromBase64String(avatarFile);
                    DateTime zero = new DateTime(1970, 1, 1);
                    DateTime currentTime = DateTime.UtcNow;
                    TimeSpan span = currentTime.Subtract(zero);
                    var fileName = (long)span.TotalMilliseconds;
                    var fileForder = String.Concat(folderAvatar, "/", String.Concat(fileName, ".", extension));
                    using (FileStream fs = File.Create(fileForder))
                    {
                        fs.Write(data, 0, data.Length);
                    }
                    partner.Image = String.Concat("/images/partners/", request.Name.Trim(), "/", String.Concat(fileName, ".", extension));
                } else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                return false;
            }
        }
        if (create)
        {
            context.Partners.Add(partner);
            rs = await context.SaveChangesAsync(cancellationToken);

        }
        else
        {
            context.Partners.Update(partner);
            rs = await context.SaveChangesAsync(cancellationToken);
        }
        return rs > 0;
    }
}