using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CleanArchitecture.Application.Categories.Queries.GetAllCategoriesQuery;
using CleanArchitecture.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Partners.Queries.GetAllPartnerQuery;
public class GetAllPartnerQuery : IRequest<PartnerList>
{
}
public class GetAllPartnerQueryHandler : IRequestHandler<GetAllPartnerQuery, PartnerList>
{
    private IApplicationDbContext context { get; set; }
    private readonly IMapper mapper;
    public GetAllPartnerQueryHandler
        (IApplicationDbContext context
        , IMapper mapper
)
    {
        this.context = context;
        this.mapper = mapper;
    }
    public async Task<PartnerList> Handle(GetAllPartnerQuery request, CancellationToken cancellationToken)
    {
        var partner = await mapper.ProjectTo<PartnerDto>(context.Partners.Where(o => !o.IsDeleted).OrderByDescending(o => o.Created)).ToListAsync();
        if (partner == null)
        {
            return null;
        }
        return new PartnerList() { PartnerDtos = partner };
    }
}