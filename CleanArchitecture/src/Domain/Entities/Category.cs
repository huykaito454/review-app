using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class Category : BaseAuditableEntity
{
    public Category()
    {
        Posts = new List<Post>();

    }
    public int Id { get; set; }
    public string Name { get; set; }
    public IList<Post> Posts { get; set; }
    public string Description { get; set; }
    public string Path { get; set; }

}
