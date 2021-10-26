using DopeScope.Repository;
using DopeScope.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace DopeScope.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {

        private readonly ILikeRepository _likeRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public LikeController(
            ILikeRepository likeRepository,
            IUserProfileRepository userProfileRepository)
        {
            _likeRepository = likeRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_likeRepository.GetAll());
        }

        [HttpGet("GetSlideLikes")]
        public IActionResult GetSlideLikes(int slideId)
        {
            return Ok(_likeRepository.GetSlideLikes(slideId));
        }

        [HttpGet("GetUserSlideLike")]
        public IActionResult GetUserSlideLike(int slideId, string firebaseId)
        {
            return Ok(_likeRepository.GetBySlideAndFirebaseId(slideId, firebaseId));
        }

       

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var quote = _likeRepository.GetById(id);
            if (quote != null)
            {
                NotFound();
            }
            return Ok(quote);
        }



        [HttpPost]
        public IActionResult Post(Like like)
        {
            var currentUserProfile = GetCurrentUserProfile();
            like.UserId = currentUserProfile.Id;
            _likeRepository.Add(like);
            return CreatedAtAction(nameof(Get), new { id = like.Id }, like);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _likeRepository.Delete(id);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

