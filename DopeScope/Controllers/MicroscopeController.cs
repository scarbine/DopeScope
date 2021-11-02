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
   

        [Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class MicroscopeController : ControllerBase
        {
            private readonly IMicroscopeRepository _microscopeRepository;
            private readonly IUserProfileRepository _userProfileRepository;

            public MicroscopeController(
                IMicroscopeRepository microscopeRepository,
                IUserProfileRepository userProfileRepository)
            {
                _microscopeRepository = microscopeRepository;
                _userProfileRepository = userProfileRepository;
            }

            [HttpGet]
            public IActionResult Get()
            {
                return Ok(_microscopeRepository.GetAll());
            }

            [HttpGet("{id}")]
            public IActionResult Get(int id)
            {
                var quote = _microscopeRepository.GetById(id);
                if (quote != null)
                {
                    NotFound();
                }
                return Ok(quote);
            }

        [HttpGet("GetUserScopes")]
        public IActionResult GetUserScopes(string firebaseId)
        {
            var scopes = _microscopeRepository.GetUserScopes(firebaseId);
            return Ok(scopes);
        }

        [HttpPost]
        public IActionResult Post(Microscope microscope)
        {
            var currentUserProfile = GetCurrentUserProfile();
            microscope.UserId = currentUserProfile.Id;
            _microscopeRepository.Add(microscope);
            return CreatedAtAction(nameof(Get), new { id = microscope.Id }, microscope);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Microscope microscope)
        {
            if (id != microscope.Id)
            {
                return BadRequest();
            }
            _microscopeRepository.Update(microscope);
            return Ok(microscope);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _microscopeRepository.Delete(id);
            return NoContent();
        }


        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_microscopeRepository.Search(q));
        }

        private UserProfile GetCurrentUserProfile()
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
        }

    }

