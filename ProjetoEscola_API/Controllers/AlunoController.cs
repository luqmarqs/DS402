using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private EscolaContext _context;
        public AlunoController (EscolaContext context)
        {
            //construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Aluno>> GetAll(){
            return _context.Aluno.ToList();
        }

        [HttpGet("{AlunoId}")]
        public ActionResult<List<Aluno>> Get(int AlunoId)
        {
            try
            {
                var result = _context.Aluno.Find(AlunoId);
                if(result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Aluno model)
        {
            try
            {
                _context.Aluno.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/aluno/{model.Ra}", model);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }



        [HttpPut("{AlunoId}")]
        public async Task<ActionResult> put(int AlunoId, Aluno dadosAlunoAlt)
        {
            try
            {
                //verifica se existe aluno a ser alterado
                var result = await _context.Aluno.FindAsync(AlunoId);
                if(AlunoId != result.Id)
                {
                    return BadRequest();
                }
                result.Ra = dadosAlunoAlt.Ra;
                result.Nome = dadosAlunoAlt.Nome;
                result.CodCurso = dadosAlunoAlt.CodCurso;
                await _context.SaveChangesAsync();
                return Created($"/api/aluno/{dadosAlunoAlt.Ra}", dadosAlunoAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpDelete("{AlunoId}")]
        public async Task<ActionResult> delete (int AlunoId)
        {
            try
            {
                //verifica se existe aluno a sex excluído
                var aluno = await _context.Aluno.FindAsync(AlunoId);
                if (aluno == null)
                {
                    //método do EF
                    return NotFound();
                }
                _context.Remove(aluno);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}