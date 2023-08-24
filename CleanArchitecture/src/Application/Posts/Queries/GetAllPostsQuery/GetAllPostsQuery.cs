using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Posts.Queries.GetAllPostsQuery;
public class GetAllPostsQuery : IRequest<PostList>
{
}
public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, PostList>
{
    private IApplicationDbContext context { get; set; }
    private readonly IMapper mapper;
    public GetAllPostsQueryHandler
        (IApplicationDbContext context
        , IMapper mapper
)
    {
        this.context = context;
        this.mapper = mapper;
    }
    public async Task<PostList> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
    {
        var posts = await mapper.ProjectTo<PostDto>(context.Posts.Where(o => !o.IsDeleted).OrderByDescending(o => o.Created)).ToListAsync();
        if (posts == null)
        {
            return null;
        }
        return new PostList() { PostDtos = posts };
    }
}
