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
    public class SlideTagController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ISlideTagRepository _slideTagRepository;

        public SlideTagController(
            ISlideTagRepository slideTagRepository,
            IUserProfileRepository userProfileRepository
           )
        {
            _slideTagRepository = slideTagRepository;

            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_slideTagRepository.GetAll());
        }

        [HttpGet("SlideTag")]
        public IActionResult Get(int id)
        {
            var slideTag = _slideTagRepository.GetById(id);
            if (slideTag != null)
            {
                NotFound();
            }
            return Ok(slideTag);
        }

        [HttpGet("SlideTagList")]
        public IActionResult GetAllBySlideId(int id)
        {
            var slideTag = _slideTagRepository.GetAllBySlideId(id);
            if (slideTag != null)
            {
                NotFound();
            }
            return Ok(slideTag);
        }

        [HttpGet("search")]
        public IActionResult Search(int id)
        {
            return Ok(_slideTagRepository.GetAllBySlidesByTagId(id));
        }

        [HttpPost]
        public IActionResult Post(SlideTag slideTag)
        {

            _slideTagRepository.Add(slideTag);
            return CreatedAtAction(nameof(Get), new { id = slideTag.Id }, slideTag);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, SlideTag slideTag)
        {
            if (id != slideTag.Id)
            {
                return BadRequest();
            }
            _slideTagRepository.Update(slideTag);
            return Ok(slideTag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _slideTagRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

