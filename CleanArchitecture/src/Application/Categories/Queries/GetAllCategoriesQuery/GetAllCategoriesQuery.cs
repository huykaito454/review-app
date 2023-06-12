using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Categories.Queries.GetAllCategoriesQuery;
public class GetAllCategoriesQuery : IRequest<CategoryList>
{
}
public class GetAudiosListQueryHandler : IRequestHandler<GetAllCategoriesQuery, CategoryList>
{
    private IApplicationDbContext context { get; set; }
    private readonly IMapper mapper;
    public GetAudiosListQueryHandler
        (IApplicationDbContext context
        , IMapper mapper
)
    {
        this.context = context;
        this.mapper = mapper;
    }
    public async Task<CategoryList> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var category = await mapper.ProjectTo<CategoryDto>(context.Categories.Where(o => !o.IsDeleted).OrderByDescending(o => o.Created)).ToListAsync();
        if(category == null)
        {
            return null;
        }
        return new CategoryList() { CategoryDtos = category };
    }
}
