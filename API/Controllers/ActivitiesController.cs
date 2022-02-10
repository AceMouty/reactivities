using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using MediatR;

namespace API.Controllers
{
    public class ActivitiesController : ReactivityBaseController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<Activity> GetActivityByID(System.Guid Id)
        {
            return await Mediator.Send(new Details.Query{ Id = Id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewTask([FromBody] Activity activity)
        { 
            var result = await Mediator.Send(new Create.Command {Activity = activity});
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(Guid Id, [FromBody] Activity activity)
        {
            activity.Id = Id;
            var result = await Mediator.Send(new Edit.Command { Activity = activity });
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id)
        {
            await Mediator.Send(new Delete.Command {Id = Id});
            return Ok();
        }
    }
}