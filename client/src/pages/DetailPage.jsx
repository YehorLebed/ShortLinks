import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader, LinkCard } from '../components';

const DetailPage = () => {

  const params = useParams();
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState('');


  const getLink = useCallback(async () => {
    try {

      const data = await request(`/api/links/${params.id}`, 'GET', null, {
        Authorization: 'Bearer ' + token
      });
      
      if (data && data.link) {
        setLink(data.link)
      }

    } catch (error) { }
  }, [token, params.id, request]);

  useEffect(() => { getLink() }, [getLink]);


  if (loading) return <Loader />

  return (

    <div>
      <div className='create-link row'>
        <div className="col s8 offset-s2">

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4 className="teal-text text-lighten-1">Информация о ссылкe:</h4>
            <div className="chip" style={{
              transform: 'translateY(25%)',
              marginLeft: '10px'
            }}>{params.id}</div>
          </div>
          {
            !loading && link && <LinkCard link={link} />
          }
        </div>
      </div>
    </div>
  )
}

export default DetailPage;