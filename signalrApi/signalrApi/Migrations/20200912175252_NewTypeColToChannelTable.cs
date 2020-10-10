using Microsoft.EntityFrameworkCore.Migrations;

namespace signalrApi.Migrations
{
    public partial class NewTypeColToChannelTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Channel",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Channel");
        }
    }
}
