﻿using DopeScope.Repository;
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
   

        //[Authorize]
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

        [HttpPost]
        public IActionResult Post(Microscope microscope)
        {
            var currentUserProfile = GetCurrentUserProfile();
            microscope.UserId = currentUserProfile.Id;
            _microscopeRepository.Add(microscope);
            return CreatedAtAction(nameof(Get), new { id = microscope.Id }, microscope);
        }

        private UserProfile GetCurrentUserProfile()
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
        }

    }

