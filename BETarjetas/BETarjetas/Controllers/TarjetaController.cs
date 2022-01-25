using BETarjetas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BETarjetas
{
	[Route("api/[controller]")]
	[ApiController]
	public class TarjetaController : ControllerBase
	{
		private readonly ApplicationDBContext _context;

		public TarjetaController(ApplicationDBContext context)
		{
			_context = context;
		}


		// GET: api/<TarjetaController>
		[HttpGet]
		public async Task<IActionResult> Get()
		{
			try
			{
				var listTarjetas = await _context.TarjetaCredito.ToListAsync();
				return Ok(listTarjetas);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// GET api/<TarjetaController>/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// POST api/<TarjetaController>
		[HttpPost]
		public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjetaCredito)
		{
			try
			{
				_context.TarjetaCredito.Add(tarjetaCredito);
				await _context.SaveChangesAsync();
				return Ok(tarjetaCredito);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// PUT api/<TarjetaController>/5
		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjetaCredito)
		{
			try
			{
				if (id != tarjetaCredito.Id)
				{
					return NotFound();
				}

				_context.TarjetaCredito.Update(tarjetaCredito);
				await _context.SaveChangesAsync();
				return Ok(new { mensaje = $"La tarjeta {tarjetaCredito.NumeroTarjeta} de {tarjetaCredito.Titular} se actualizo correctamente" });
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// DELETE api/<TarjetaController>/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			try
			{
				TarjetaCredito tarjetaCredito = await _context.FindAsync<TarjetaCredito>(id);

				if (tarjetaCredito == null)
				{
					return NotFound();
				}

				_context.TarjetaCredito.Remove(tarjetaCredito);
				await _context.SaveChangesAsync();
				return Ok(new { mensaje = $"La tarjeta {tarjetaCredito.NumeroTarjeta} de {tarjetaCredito.Titular} se eliminó correctamente" });
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
