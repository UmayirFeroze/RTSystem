using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RTSystem.Data
{
    public partial class RTSystemsContext : DbContext
    {
        public RTSystemsContext()
        {
        }

        public RTSystemsContext(DbContextOptions<RTSystemsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BuyerBids> BuyerBids { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<SellerBids> SellerBids { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-4BPN7Q5;Database=RTSystems;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BuyerBids>(entity =>
            {
                entity.HasKey(e => e.BuyerBidId)
                    .HasName("PK__BuyerBid__E41579E5B66A7BC7");

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
                    .WithMany(p => p.BuyerBids)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__BuyerBids__userI__286302EC");
            });

            modelBuilder.Entity<Orders>(entity =>
            {
                entity.HasKey(e => e.OrderId)
                    .HasName("PK__Orders__0809335D5610B005");

                entity.Property(e => e.OrderId).HasColumnName("orderId");

                entity.Property(e => e.BuyerBidId).HasColumnName("buyerBidId");

                entity.Property(e => e.SellerBidId).HasColumnName("sellerBidId");

                entity.HasOne(d => d.BuyerBid)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.BuyerBidId)
                    .HasConstraintName("FK__Orders__buyerBid__31EC6D26");

                entity.HasOne(d => d.SellerBid)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.SellerBidId)
                    .HasConstraintName("FK__Orders__sellerBi__32E0915F");
            });

            modelBuilder.Entity<SellerBids>(entity =>
            {
                entity.HasKey(e => e.SellerBidId)
                    .HasName("PK__SellerBi__DB1A445A48AA1008");

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

                entity.Property(e => e.ValidityPeriod)
                    .HasColumnName("validityPeriod")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.BuyerBid)
                    .WithMany(p => p.SellerBids)
                    .HasForeignKey(d => d.BuyerBidId)
                    .HasConstraintName("FK__SellerBid__buyer__2D27B809");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.SellerBids)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__SellerBid__userI__2C3393D0");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__Users__CB9A1CFF81FB7839");

                entity.HasIndex(e => e.BusinessName)
                    .HasName("UQ__Users__4B0B5668ADB66DBF")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Users__AB6E616442AE5016")
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
