using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhatsdownAPI.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContactRelation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Contacter = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contacted = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactedNickName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Server = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactRelation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NickName = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(type: "int", nullable: true),
                    RecieverId = table.Column<int>(type: "int", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Message_ContactRelation_RecieverId",
                        column: x => x.RecieverId,
                        principalTable: "ContactRelation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Message_ContactRelation_SenderId",
                        column: x => x.SenderId,
                        principalTable: "ContactRelation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Message_RecieverId",
                table: "Message",
                column: "RecieverId");

            migrationBuilder.CreateIndex(
                name: "IX_Message_SenderId",
                table: "Message",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "ContactRelation");
        }
    }
}
