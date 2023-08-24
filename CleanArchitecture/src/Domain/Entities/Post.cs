using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;
public class Post : BaseAuditableEntity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Path { get; set; }
    public string Thumbnail { get; set; }
    public string Author { get; set; }
    public string Rate { get; set; }
    public string Content { get; set; }
    public Category Category { get; set; }
}
