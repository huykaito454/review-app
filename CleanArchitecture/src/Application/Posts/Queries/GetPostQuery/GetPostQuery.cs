using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Posts.Queries.GetAllPostsQuery;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Posts.Queries.GetPostQuery;
public class GetPostQuery : IRequest<Post>
{
    public string Path { get; set; }
}
public class GetPostQueryHandler : IRequestHandler<GetPostQuery, Post>
{
    private IApplicationDbContext context { get; set; }
    private readonly IMapper mapper;
    public GetPostQueryHandler
        (IApplicationDbContext context
        , IMapper mapper
)
    {
        this.context = context;
        this.mapper = mapper;
    }
    public async Task<Post> Handle(GetPostQuery request, CancellationToken cancellationToken)
    {
        var post = context.Posts.Where(o => o.Path.Equals(request.Path) && !o.IsDeleted).FirstOrDefault();
        if (post == null)
        {
            return null;
        }
        return post;
    }
}

