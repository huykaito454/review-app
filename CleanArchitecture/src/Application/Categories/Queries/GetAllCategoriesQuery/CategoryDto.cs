using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Categories.Queries.GetAllCategoriesQuery;
public class CategoryDto : IMapFrom<Category>
{
    public int Id { get; set; }
    public string Path { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
