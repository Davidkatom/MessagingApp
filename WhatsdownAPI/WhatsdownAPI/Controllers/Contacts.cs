using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WhatsdownAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Contacts : ControllerBase
    {
        // GET: api/<Contacts>
        [HttpGet]
        public string Get()
        {
            return "Hello";
        }

        // GET api/<Contacts>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Contacts>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Contacts>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Contacts>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
