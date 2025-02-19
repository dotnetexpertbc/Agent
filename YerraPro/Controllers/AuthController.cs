﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YerraPro.Data;
using YerraPro.Models;
using YerraPro.Services;
using YerraPro.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace YerraPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IYerraProService _yerraProService;
        public AuthController(IYerraProService service)
        {
            _yerraProService = service;
        }
        
        // POST api/account/register
        [HttpPost]
        [Route("Register")]
        [Obsolete]
        public IActionResult Register(Register user)
        {

            try
            {
                // create user
                return Ok(_yerraProService.Register(user));
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return Ok(ex.Message);
            }
        }
        [HttpPost]
        [Route("Login")]
        public IActionResult Login(Authenticate user)
        {
            try
            {
                // create user
                return Ok(_yerraProService.Authenticate(user.Email, user.Password));
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return Ok(ex.Message);
            }

        }

        //// PUT api/<AccountController>/5
        //[HttpPut("{id}")]
        //public void Put(ObjectId id, ApplicationUser user)
        //{
        //    _yerraProService.UpdateUser(id, user);
        //}

        
    }
}
