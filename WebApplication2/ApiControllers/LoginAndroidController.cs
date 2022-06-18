using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WhatsdownAPI.Data;
using WebApplication2.Models;

namespace WebApplication2.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginAndroidController : ControllerBase
    {
        private readonly IConfiguration _configuration;//set login token configuration
        private readonly WhatsdownAPIContext _context;
        public LoginAndroidController(IConfiguration confi, WhatsdownAPIContext context)
        {
            _configuration = confi;
            _context = context;
        }
        /*
        [HttpGet]
        public string getUserr(string tokey)
        {
            //var jti = tokenS.Claims.First(claim => claim.Type == "jti").Value;

            var handler = new JwtSecurityTokenHandler();
            try
            {
                var jsonToken = handler.ReadToken(tokey);
                var tokenS = jsonToken as JwtSecurityToken;
                return tokenS.Claims.ToArray().GetValue(3).ToString();
            }
            catch
            {
                return "Authontication Error";
            }
        }
        */

        [HttpGet]
        public LoginResObject LoginGet(string username, string password)
        {
            var q = from user in _context.User
                    where user.Id.Equals(username) &&
                            user.Password.Equals(password)
                    select user;

            LoginResObject res = new LoginResObject();
            res.token = "Token here";
            res.username = "Username here";

            return res;

            //this is for later
            /*
            if (q.Any()) // if username and password found in User database
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
            return NotFound("UserName and or Password are incorrect.");//check if valid return statement 
            */
        }
    }
}
