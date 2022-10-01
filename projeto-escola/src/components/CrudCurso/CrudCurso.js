import React from "react";
import "./CrudCurso.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Main from "../template/Main";

export default function CrudCursos() {

    const [cursos, setCursos] = useState([]);

    const [inputCodCurso, setInputCodCurso] = useState(0);
    const [inputNome, setInputNome] = useState("");
    const [inputPeriodo, setInputPeriodo] = useState("");

    const [tableVisility, setTableVisility] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState();

    const api = "https://localhost:7056/api/Curso";

    useEffect(() => {
        getCursos();
    }, []);

    async function getCursos() {
        const response = await axios.get(api);
        setCursos(response.data);
    }

    async function deleteCurso(curso) {
        await axios.delete(`${api}/${curso.id}`);
        getCursos();
    }

    async function createCurso() {
        await axios.post(api, {
            codCurso: inputCodCurso,
            nomeCurso: inputNome,
            periodo: inputPeriodo
        });
        getCursos();
        limpaInput();
    }

    async function editCurso() {

        await axios.put(`${api}/${selectedCurso.id}`, {
            codCurso: inputCodCurso,
            nomeCurso: inputNome,
            periodo: inputPeriodo
        });
        setSelectedCurso();
        getCursos();
        limpaInput();
    }

    function limpaInput() {
        setInputNome("");
        setInputCodCurso("");
        setInputPeriodo("");
        setTableVisility(!tableVisility);

    }

    async function mostraForm() {
        setTableVisility(!tableVisility);
    }

    async function btnEdit(curso) {
        setSelectedCurso(curso);
        setTableVisility(true);
    }


    const Cursos = ({ cursos }) => {
        return (

            <div className="lista">
                <table className="listaCursos" id="tblListaCursos">
                    <thead>
                        <tr className="tblHead">
                            <th className="tblTituloCod">CodCurso</th>
                            <th className="tblTituloNome">NomeCurso</th>
                            <th className="tblTituloPeriodo">periodo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.map((curso) =>
                            <tr key={curso.id}>
                                <td>{curso.codCurso}</td>
                                <td>{curso.nomeCurso}</td>
                                <td>{curso.periodo}</td>
                                <td>
                                    <button onClick={() => { btnEdit(curso) }} className="btnAlt">
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => { deleteCurso(curso) }} className="btnRemove">
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    };


    return (
        <Main title={"Cadastro de cursos"} >
            <div className="main-container">
                <div className="include-container" style={{ display: tableVisility ? "block" : "none" }}>

                    <label>Código do Curso:</label>
                    <input
                        value={inputCodCurso}
                        className="form-input" type="number"
                        onChange={(event) => { setInputCodCurso(event.target.value); }}
                    />

                    <label>Nome do Curso:</label>
                    <input
                        value={inputNome}
                        className="form-input" type="text"
                        onChange={(event) => { setInputNome(event.target.value); }}
                    />

                    <label>Periodo:</label>
                    <input
                        value={inputPeriodo}
                        className="form-input"
                        type="text"
                        onChange={(event) => { setInputPeriodo(event.target.value); }}
                    />

                    <button
                        className="btnSalvar"
                        onClick={selectedCurso ? editCurso : createCurso}>
                        Salvar
                    </button>

                    <button
                        className="btnCancelar"
                        onClick={() => { limpaInput() }}>
                        cancelar
                    </button>

                </div>

                <button
                    className="btnNovoCurso"
                    style={{ display: tableVisility ? "none" : "block" }}
                    onClick={mostraForm}>
                    novo curso
                </button>

                <Cursos cursos={cursos} />
            </div>
        </Main>
    )
}