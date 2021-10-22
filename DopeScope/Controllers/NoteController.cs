using DopeScope.Models;
using DopeScope.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DopeScope.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
      
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INoteRepository _noteRepository;

        public NoteController(
            ISlideRepository slideRepository,
            IMicroscopeRepository microscopeRepository,
            IUserProfileRepository userProfileRepository,
            INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
          
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_noteRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var note = _noteRepository.GetBySlideId(id);
            if (note != null)
            {
                NotFound();
            }
            return Ok(note);
        }

        [HttpPost]
        public IActionResult Post(Note note)
        {
           
            _noteRepository.Add(note);
            return CreatedAtAction(nameof(Get), new { id = note.Id }, note);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }
            _noteRepository.Update(note);
            return Ok(note);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _noteRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

