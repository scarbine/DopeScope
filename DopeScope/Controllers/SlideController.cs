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
        [Authorize]
    [Route("api/[controller]")]
        [ApiController]
        public class SlideController : ControllerBase
        {
            private readonly ISlideRepository _slideRepository;
            private readonly IMicroscopeRepository _microscopeRepository;
            private readonly IUserProfileRepository _userProfileRepository;

            public SlideController(
                ISlideRepository slideRepository,
                IMicroscopeRepository microscopeRepository,
                IUserProfileRepository userProfileRepository)
            {
                _slideRepository = slideRepository;
                _microscopeRepository = microscopeRepository;
                _userProfileRepository = userProfileRepository;
            }

            [HttpGet]
            public IActionResult Get()
            {
                return Ok(_slideRepository.GetAll());
            }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var slide = _slideRepository.GetById(id);
            if (slide != null)
            {
                NotFound();
            }
            return Ok(slide);
        }

        [HttpGet("GetUserSlides")]
        public IActionResult GetUserSlides(string firebaseId)
        {
            var slides = _slideRepository.GetUserSlides(firebaseId);
            return Ok(slides);
        }
        [HttpGet("CountSlides")]
        public IActionResult CountSlides()
        {
            var slideCount = _slideRepository.CountSlides();
            return Ok(slideCount);
        }

        [HttpGet("GetScopeSlides")]
        public IActionResult GetScopeSlides(int id)
        {
            var slides = _slideRepository.GetScopeSlides(id);
            return Ok(slides);
        }

        [HttpPost]
        public IActionResult Post(Slide slide)
        {
            slide.DateCreated = DateTime.Now;
            _slideRepository.Add(slide);
            return CreatedAtAction(nameof(Get), new { id = slide.Id }, slide);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Slide slide)
        {
            if (id != slide.Id)
            {
                return BadRequest();
            }
            _slideRepository.Update(slide);
            return Ok(slide);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _slideRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_slideRepository.SearchSlides(q));
        }


        private UserProfile GetCurrentUserProfile()
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
        }
    }

