using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace WhatsdownAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //set login token configuration
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration confi)
        {
            _configuration = confi;
        }

        [HttpPost]
        public IActionResult LoginPost(string username, string password)
        {
            //todo add login logic here
            var varified = true;
            if (varified)
            {
                var claimes = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub,_configuration["JWTParams:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                    new Claim("UserId",username)
                    };
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTParams:SecretKey"]));
                var mac = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["JWTParams:Issuer"],
                    _configuration["JWTParams:Audience"],
                    claimes,
                    expires: DateTime.UtcNow.AddMinutes(20),
                    signingCredentials: mac);
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            //return ""; //check if valid return statement 
            return NotFound();

        }


        //end of login token configuration

    }
}
