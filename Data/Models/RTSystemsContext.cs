using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace RTSystem.Data
{
    public partial class RTSystemsContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public RTSystemsContext()
        {
        }

        public RTSystemsContext(DbContextOptions<RTSystemsContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<BuyerBid> BuyerBid { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<SellerBid> SellerBid { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("RTSystemDB")); 
                                        // ("Server=DESKTOP-4BPN7Q5;Database=RTSystems;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BuyerBid>(entity =>
            {
                entity.Property(e => e.BuyerBidId).HasColumnName("buyerBidId");

                entity.Property(e => e.PaymentIn)
                    .IsRequired()
                    .HasColumnName("paymentIn")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Quality)
                    .IsRequired()
                    .HasColumnName("quality")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.BuyerBid)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__BuyerBid__userId__286302EC");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderId).HasColumnName("orderId");

                entity.Property(e => e.BuyerBidId).HasColumnName("buyerBidId");

                entity.Property(e => e.SellerBidId).HasColumnName("sellerBidId");

                entity.HasOne(d => d.BuyerBid)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.BuyerBidId)
                    .HasConstraintName("FK__Order__buyerBidI__31EC6D26");

                entity.HasOne(d => d.SellerBid)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.SellerBidId)
                    .HasConstraintName("FK__Order__sellerBid__32E0915F");
            });

            modelBuilder.Entity<SellerBid>(entity =>
            {
                entity.Property(e => e.SellerBidId).HasColumnName("sellerBidId");

                entity.Property(e => e.BestPrice).HasColumnName("bestPrice");

                entity.Property(e => e.BuyerBidId).HasColumnName("buyerBidId");

                entity.Property(e => e.DeliveryDate)
                    .HasColumnName("deliveryDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TimeStamp)
                    .HasColumnName("timeStamp")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.ValidityPeriod).HasColumnName("validityPeriod");

                entity.HasOne(d => d.BuyerBid)
                    .WithMany(p => p.SellerBid)
                    .HasForeignKey(d => d.BuyerBidId)
                    .HasConstraintName("FK__SellerBid__buyer__2D27B809");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SellerBid)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__SellerBid__userI__2C3393D0");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.BusinessName)
                    .HasName("UQ__User__4B0B5668472A05BB")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__User__AB6E6164EC50B416")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.BusinessAddress)
                    .IsRequired()
                    .HasColumnName("businessAddress")
                    .IsUnicode(false);

                entity.Property(e => e.BusinessDescription)
                    .HasColumnName("businessDescription")
                    .IsUnicode(false);

                entity.Property(e => e.BusinessImage).HasColumnName("businessImage");

                entity.Property(e => e.BusinessName)
                    .IsRequired()
                    .HasColumnName("businessName")
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessPhone)
                    .IsRequired()
                    .HasColumnName("businessPhone")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessType)
                    .IsRequired()
                    .HasColumnName("businessType")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UserImage).HasColumnName("userImage");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
