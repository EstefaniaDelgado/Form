import { Link } from 'react-router-dom';

function SurveyInfo({ infoSurvey, deleteRegister, getInfoById }) {
  console.log(infoSurvey)
  return (
    <>
      <div>
        {infoSurvey ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="text-center bg-primary">Full Name</th>
                <th className="text-center bg-primary ">Email</th>
                <th className="text-center bg-primary">Birthday</th>
                <th className="text-center bg-primary">Country</th>
               {/*  <th className="text-center bg-primary">Actualizar</th> */}
                <th className="text-center bg-primary">Eliminar</th>
              </tr>
            </thead>
            {infoSurvey.map((user) => {
  return (
    <tbody key={user.id}>
      <tr>
        <td className="text-center px-4">{user.full_name}</td>
        <td className="text-center px-4">{user.email}</td>
        <td className="text-center">{user.birth_date}</td>
        <td className="text-center px-4">
          {user.country_of_origin}
        </td>
       {/*  <td className="text-center px-4">
          <Link to={'/'}>
            <i
              className="material-icons"
              style={{ cursor: 'pointer' }}
              onClick={() => getInfoById(user.id)}
            >
              create
            </i>
          </Link>
        </td> */}
        <td className="text-center px-4">
          <i
            className="material-icons"
            style={{ cursor: 'pointer' }}
            onClick={() => deleteRegister(user.id)}
          >
            close
          </i>
        </td>
      </tr>
    </tbody>
  );
})}
          </table>
        ) : (
          <h1>Cargando</h1>
        )}
      </div>
      <br />
      <Link to={'/'}>
        <button className="btn btn-primary">Volver al Formulario</button>
      </Link>
    </>
  );
}

export default SurveyInfo;


