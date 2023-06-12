using System;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Common;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using Duende.IdentityServer.EntityFramework.Options;
using MediatR;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CleanArchitecture.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>, IApplicationDbContext
{
    private readonly ICurrentUserService currentUserService;
    private readonly IMediator _mediator;
    private readonly IDateTime dateTime;
    private readonly ILogger<ApplicationDbContext> logger;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options, 
        IOptions<OperationalStoreOptions> operationalStoreOptions, ILogger<ApplicationDbContext> logger,
        IMediator mediator
        , ICurrentUserService currentUserService, IDateTime dateTime) 
        : base(options)
    {
        this.currentUserService = currentUserService;
        this.dateTime = dateTime;
        this.logger = logger;
        _mediator = mediator;
    }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Partner> Partners { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            foreach (var entry in ChangeTracker.Entries<BaseAuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedBy = currentUserService.UserId;
                        entry.Entity.Created = dateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModifiedBy = currentUserService.UserId;
                        entry.Entity.LastModified = dateTime.Now;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError("Exception at ApplicationDbContext. Ex: {0}", ex.Message);
            return null;
        }
    }
}
