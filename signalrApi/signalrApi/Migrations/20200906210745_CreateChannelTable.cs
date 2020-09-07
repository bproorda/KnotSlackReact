using Microsoft.EntityFrameworkCore.Migrations;

namespace signalrApi.Migrations
{
    public partial class CreateChannelTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConnectionId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Channel",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Channel", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "UserChannels",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    ChannelName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserChannels", x => new { x.UserId, x.ChannelName });
                    table.ForeignKey(
                        name: "FK_UserChannels_Channel_ChannelName",
                        column: x => x.ChannelName,
                        principalTable: "Channel",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserChannels_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserChannels_ChannelName",
                table: "UserChannels",
                column: "ChannelName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserChannels");

            migrationBuilder.DropTable(
                name: "Channel");

            migrationBuilder.DropColumn(
                name: "ConnectionId",
                table: "AspNetUsers");
        }
    }
}
