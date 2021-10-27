using Microsoft.AspNetCore.Mvc;
using DopeScope.Models;
using DopeScope.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace DopeScope.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ITagRepository _tagRepository;

        public TagController(
            ITagRepository tagRepository,
            IUserProfileRepository userProfileRepository
           )
        {
            _tagRepository = tagRepository;

            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAll());
        }

        [HttpGet("Tag")]
        public IActionResult Get(int id)
        {
            var slideTag = _tagRepository.GetById(id);
            if (slideTag != null)
            {
                NotFound();
            }
            return Ok(slideTag);
        }


        [HttpPost]
        public IActionResult Post(Tag tag)
        {

            _tagRepository.Add(tag);
            return CreatedAtAction(nameof(Get), new { id = tag.Id }, tag);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }
            _tagRepository.Update(tag);
            return Ok(tag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
