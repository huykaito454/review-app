using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Posts.Commands.UpdatePostCommand;
public class UpdatePostCommand : IRequest<bool>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Path { get; set; }
    public string Content { get; set; }
    public string Thumbnail { get; set; }
    public string Rate { get; set; }
    public int Category { get; set; }
}
public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, bool>
{
    private readonly IApplicationDbContext context;
    private readonly IMediator mediator;
    private readonly ICurrentUserService currentUserService;
    private readonly IIdentityService identityService;

    public UpdatePostCommandHandler(IApplicationDbContext context,
        IMediator mediator, ICurrentUserService currentUserService, IIdentityService identityService)
    {
        this.context = context;
        this.mediator = mediator;
        this.currentUserService = currentUserService;
        this.identityService = identityService;

    }
    public async Task<bool> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        int rs = 0;
        bool create = false;
        var post = await context.Posts.Where(o => o.Id == request.Id && !o.IsDeleted).FirstOrDefaultAsync();
        var category = await context.Categories.Where(o => o.Id == request.Category && !o.IsDeleted).FirstOrDefaultAsync();
        if(category == null)
        {
            return false;
        }
        if (post == null)
        {
            post = new Post();
            create = true;
        }
        post.Title = request.Title;
        post.Description = request.Description;
        post.Path = String.Concat(category.Path, "/", request.Path);
        post.Category = category;
        post.Content = request.Content;
        if (request.Thumbnail != null)
        {
            try
            {
                var folderPost = String.Concat("wwwroot", "/posts/", "/", category.Path ,"/" , request.Path);
                var dataString = request.Thumbnail;
                byte[] data = null;
                if (!Directory.Exists(folderPost))
                {
                    Directory.CreateDirectory(folderPost);
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
                    var fileForder = String.Concat(folderPost, "/", String.Concat("thumbnail", ".", extension));
                    using (FileStream fs = File.Create(fileForder))
                    {
                        fs.Write(data, 0, data.Length);
                    }
                    post.Thumbnail = String.Concat("/posts", "/", category.Path, "/", request.Path, "/thumbnail.", extension);
                }
                else
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
            post.Rate = "0";
            context.Posts.Add(post);
            rs = await context.SaveChangesAsync(cancellationToken);

        }
        else
        {
            post.Rate = request.Rate;
            context.Posts.Update(post);
            rs = await context.SaveChangesAsync(cancellationToken);
        }

        return rs > 0;
    }
}
