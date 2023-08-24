using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Posts.Queries.GetAllPostsQuery;
public class PostDto : IMapFrom<Post>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Path { get; set; }
    public string Thumbnail { get; set; }
    public string Author { get; set; }
    public string Rate { get; set; }
    public Category Category { get; set; }
}
