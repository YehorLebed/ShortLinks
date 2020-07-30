import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

import { LinkCard, Loader } from '../components';
import { Link } from 'react-router-dom';

const LinkPage = () => {

  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState(null);

  const getLinks = useCallback(async () => {
    try {

      const data = await request('/api/links/', 'GET', null, {
        Authorization: 'Bearer ' + token
      });

      console.log(data)
      if (data && data.links) {
        setLinks(data.links);
      }

    } catch (error) { }
  }, [token, request])

  useEffect(() => { getLinks() }, []);

  if (loading) return <Loader />


  return (
    <div>
      <div className='create-link row'>
        <div className="col s8 offset-s2">

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4 className="teal-text text-lighten-1">Мои ссылки: </h4>
          </div>

          <table>
            <thead>
              <tr>
                <th>Оригинальная ссылка</th>
                <th>Сокращенная ссылка</th>
                <th>Детальней</th>
              </tr>
            </thead>

            <tbody>
              {
                !loading && links && links.map(link => (
                  <tr>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td><Link to={`/detail/${link._id}`}>Открыть</Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default LinkPage;